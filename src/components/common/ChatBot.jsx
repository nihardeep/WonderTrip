import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const ChatBot = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! 👋 How can I help you plan your next adventure today?", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);
    const { activeSessionId } = useAuth();

    useImperativeHandle(ref, () => ({
        openWithBotMessage: (text) => {
            setIsOpen(true);
            const newMessage = {
                id: Date.now(),
                text,
                sender: 'bot'
            };
            setMessages(prev => [...prev, newMessage]);
        }
    }));

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // Add user message
        const newMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user'
        };
        setMessages(prev => [...prev, newMessage]);
        setInputText('');

        // Simulate bot response logic could be here or handled externally

        // Send to n8n
        try {
            fetch('https://aiproject123.app.n8n.cloud/webhook/ac5d8037-976d-4384-8622-a08566629e3e', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    intent: 'Chatbox',
                    query: inputText,
                    sessionId: activeSessionId,
                    // email: user?.email // user is not available in props currently, simplifying
                }),
            })
                .then(async (res) => {
                    const contentType = res.headers.get("content-type");
                    let data;
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        data = await res.json();
                    } else {
                        // Handle text/html or text/plain
                        const text = await res.text();
                        // Sometimes simple text responses are just the message
                        data = { output: text };
                    }
                    return data;
                })
                .then(data => {
                    console.log('n8n ChatBot Raw Data:', data);

                    // Determine response text from various possible n8n structures
                    const responseItem = Array.isArray(data) ? data[0] : data;
                    console.log('n8n ChatBot ResponseItem:', responseItem);

                    // Check top-level fields or nested 'json' fields
                    // Common n8n output fields: output, text, message, answer, content
                    const reply =
                        responseItem?.output ||
                        responseItem?.text ||
                        responseItem?.message ||
                        responseItem?.answer ||
                        responseItem?.content ||
                        responseItem?.json?.output ||
                        responseItem?.json?.text ||
                        responseItem?.json?.message ||
                        responseItem?.json?.answer ||
                        responseItem?.json?.content ||
                        (typeof responseItem === 'string' ? responseItem : "I received your message.");

                    console.log('n8n ChatBot Final Reply:', reply);

                    if (!reply) {
                        console.warn("n8n ChatBot: Reply is empty or undefined");
                    }

                    const botMessage = {
                        id: Date.now() + 1,
                        text: reply,
                        sender: 'bot'
                    };
                    console.log('n8n ChatBot Setting Message:', botMessage);
                    setMessages(prev => [...prev, botMessage]);
                })
                .catch(err => {
                    console.error("Error sending chat:", err);
                });
        } catch (error) {
            console.error("Error sending chat:", error);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100 flex flex-col max-h-[600px]"
                        style={{ height: '500px' }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">WonderTrip Assistant</h3>
                                    <div className="flex items-center space-x-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                        <span className="text-xs text-white/80">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${message.sender === 'user'
                                            ? 'bg-purple-600 text-white rounded-br-none'
                                            : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-none'
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <form onSubmit={handleSendMessage} className="flex space-x-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2 bg-gray-100 border-transparent focus:bg-white border focus:border-purple-500 rounded-full text-sm outline-none transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim()}
                                    className="w-10 h-10 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600 rounded-full flex items-center justify-center text-white transition-colors shadow-sm"
                                >
                                    <Send className="w-4 h-4 ml-1" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 ${isOpen
                    ? 'bg-gray-800 text-white rotate-90'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-purple-500/30'
                    }`}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageCircle className="w-7 h-7" />
                )}
            </motion.button>
        </>
    );
});

ChatBot.displayName = 'ChatBot';

export default ChatBot;
