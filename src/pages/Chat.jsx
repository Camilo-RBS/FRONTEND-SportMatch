import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useChat } from '../hooks/useChat';
import { useUsers } from '../hooks/useUsers';
import { MessageList } from '../components/chat/MessageList';
import { MessageInput } from '../components/chat/Messagelnput';
import { UserList } from '../components/chat/UserList';

export const Chat = () => {
    const location = useLocation();
    const [selectedUser, setSelectedUser] = useState(null);
    const { user } = useAuthStore();
    const { messages, sendMessage, fetchMessages } = useChat();
    const { users, searchUsers } = useUsers();

    useEffect(() => {
        searchUsers('');
    }, [searchUsers]);

    useEffect(() => {
        if (location.state?.selectedUserId) {
            const user = users.find(u => u._id === location.state.selectedUserId);
            if (user) {
                setSelectedUser(user);
                fetchMessages(location.state.selectedUserId);
            }
        }
    }, [location.state, users, fetchMessages]);

    const handleSearch = (searchTerm) => {
        searchUsers(searchTerm);
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        fetchMessages(user?._id);
    };

    const handleSendMessage = async (content) => {
        try {
            await sendMessage(content, selectedUser?._id);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="bg-gray-800 rounded-lg h-[calc(100vh-12rem)] flex">
                <div className="w-80 flex-shrink-0 border-r border-gray-700 flex flex-col">
                    <UserList
                        users={users}
                        selectedUser={selectedUser}
                        onSelectUser={handleSelectUser}
                        currentUser={user}
                        onSearch={handleSearch}
                    />
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="p-4 border-b border-gray-700 bg-gray-800">
                        <h2 className="text-xl font-semibold text-white">
                            {selectedUser ? `Chat con ${selectedUser.name}` : 'Chat Global'}
                        </h2>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <MessageList
                            messages={messages}
                            currentUser={user}
                        />
                    </div>

                    <div className="border-t border-gray-700">
                        <MessageInput onSendMessage={handleSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
};