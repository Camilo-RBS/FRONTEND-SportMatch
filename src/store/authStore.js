import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "../lib/api";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        try {
          const response = await api.post("/api/auth/login", {
            email,
            password,
          });
          const { token, ...userData } = response.data;

          // Actualizar el token en las cabeceras de axios
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          set({ user: userData, token });
          return true;
        } catch (error) {
          console.error("Login error:", error);
          throw new Error(
            error.response?.data?.message || "Error al iniciar sesión"
          );
        }
      },
      register: async (userData) => {
        try {
          const response = await api.post("/api/auth/register", userData);
          return response.data;
        } catch (error) {
          console.error("Registration error:", error);
          throw new Error(
            error.response?.data?.message || "Error en el registro"
          );
        }
      },
      logout: () => {
        // Limpiar el token de las cabeceras de axios
        delete api.defaults.headers.common["Authorization"];
        set({ user: null, token: null });
      },
      restoreSession: async () => {
        const state = get();
        if (state.token) {
          try {
            // Restaurar el token en las cabeceras
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${state.token}`;

            // Verificar y actualizar los datos del usuario
            const response = await api.get("/api/auth/me");
            set({ user: response.data });
            return true;
          } catch (error) {
            console.error("Session restoration failed:", error);
            // Si hay error, limpiar el estado
            delete api.defaults.headers.common["Authorization"];
            set({ user: null, token: null });
            return false;
          }
        }
        return false;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
