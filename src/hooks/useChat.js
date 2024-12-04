import { useState, useCallback, useEffect } from 'react';
import { chatService } from '../services/chatService';
import { useSocket } from './useSocket';

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const socket = useSocket();

    const fetchMessages = useCallback(async (userId = null) => {
        try {
            setError(null);
            const response = await chatService.getMessages(userId);
            setMessages(response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al cargar los mensajes';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    }, []);

    const sendMessage = async (content, receiverId = null) => {
        try {
            const messageData = {
                content,
                receiver: receiverId,
                isGlobal: !receiverId
            };

            const response = await chatService.sendMessage(messageData);
            setMessages(prev => [...prev, response.data]);

            if (socket) {
                socket.emit('new message', response.data);
            }

            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al enviar el mensaje';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on('message received', (newMessage) => {
                setMessages(prev => [...prev, newMessage]);
            });
        }

        return () => {
            if (socket) {
                socket.off('message received');
            }
        };
    }, [socket]);

    return {
        messages,
        error,
        fetchMessages,
        sendMessage
    };
};