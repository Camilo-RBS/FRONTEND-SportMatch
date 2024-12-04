import { useState } from 'react';
import { Send } from 'lucide-react';

export const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <div className="p-4 border-t border-gray-700 bg-gray-800">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                    type="submit"
                    className="bg-emerald-500 text-white p-2 rounded-md hover:bg-emerald-600 transition-colors flex-shrink-0"
                >
                    <Send className="h-5 w-5" />
                </button>
            </form>
        </div>
    );
};                  