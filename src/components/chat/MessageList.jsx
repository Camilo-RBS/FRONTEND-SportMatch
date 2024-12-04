import { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const MessageList = ({ messages, currentUser }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="h-full overflow-y-auto px-4 py-2">
            {messages.map((message) => (
                <div
                    key={message._id}
                    className={`flex ${message.sender._id === currentUser._id ? 'justify-end' : 'justify-start'} mb-4`}
                >
                    <div
                        className={`max-w-[70%] rounded-lg p-3 ${message.sender._id === currentUser._id
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-700 text-white'
                            }`}
                    >
                        <p className="text-sm font-medium mb-1">{message.sender.name}</p>
                        <p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs mt-1 opacity-75">
                            {format(new Date(message.createdAt), 'HH:mm', { locale: es })}
                        </p>
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};