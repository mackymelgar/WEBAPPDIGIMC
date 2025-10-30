import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, X, Sparkles, Bot, Smile } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { chat, getSettings, getHealth } from '../lib/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emoji?: string;
}

const quickActions = [
  { emoji: '🏛️', text: 'City Services', query: 'Tell me about city services' },
  { emoji: '📍', text: 'Locations', query: 'Show me important locations' },
  { emoji: '📞', text: 'Contact Info', query: 'How can I contact the city office?' },
  { emoji: '📋', text: 'Documents', query: 'What documents do I need?' },
];

const emojiReactions = ['👍', '❤️', '😊', '🎉', '👏'];

export function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [personaName, setPersonaName] = useState<string>('AI Assistant');
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  const renderText = (text: string) => {
    const parts = (text || '').split(/\n{2,}/g);
    return (
      <div className="whitespace-pre-wrap break-words leading-7 text-[15px]">{
        parts.map((p, i) => (
          <p key={i} className="mb-2 last:mb-0">{p}</p>
        ))
      }</div>
    );
  };

  useEffect(() => {
    const wrap = containerRef.current;
    if (!wrap) return;
    const viewport = wrap.querySelector('[data-slot="scroll-area-viewport"]') as HTMLElement | null;
    if (viewport) viewport.scrollTop = viewport.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const ac = new AbortController();
    Promise.all([getSettings(ac.signal), getHealth(ac.signal)])
      .then(([s, ok]) => {
        if (s?.persona_name) setPersonaName(s.persona_name);
        setApiOnline(ok);
      })
      .catch(() => setApiOnline(false));
    return () => ac.abort();
  }, []);

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;
    if (isSending) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    setShowQuickActions(false);
    setShowEmojiPicker(false);
    setIsSending(true);

    // Optimistic typing indicator
    const typingId = `typing-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: typingId, text: '…', sender: 'ai', timestamp: new Date(), emoji: '🟢' },
    ]);

    try {
      const result = await chat(messageText);

      // remove typing
      setMessages((prev) => prev.filter((m) => m.id !== typingId));

      // append assistant reply (hide sources/confidence details)
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          text: result.response || 'I apologize, I could not produce a reply.',
          sender: 'ai',
          timestamp: new Date(),
          emoji: '🤖',
        },
      ]);

    } catch (e: any) {
      // remove typing
      setMessages((prev) => prev.filter((m) => m.id !== typingId));
      setMessages((prev) => [
        ...prev,
        { id: `err-${Date.now()}`, text: `Sorry, I had trouble reaching the assistant. ${e?.message || ''}`.trim(), sender: 'ai', timestamp: new Date(), emoji: '⚠️' },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleQuickAction = (query: string) => {
    handleSend(query);
  };

  const addEmoji = (emoji: string) => {
    setInputValue((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 relative"
              size="icon"
            >
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs">
                ✨
              </div>
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] md:w-[460px] h-[85vh] md:h-[80vh] max-h-[90vh]"
          >
            <Card className="flex flex-col h-full shadow-2xl border-0 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 text-6xl opacity-10">✨</div>
                <div className="absolute bottom-0 left-0 text-4xl opacity-10">🤖</div>
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-white">{personaName} 💬</h3>
                    <div className="flex items-center gap-1">
                      <div className={`h-2 w-2 rounded-full ${apiOnline ? 'bg-green-400' : 'bg-amber-400'} animate-pulse`}></div>
                      <span className="text-white/90 text-xs">{apiOnline ? 'Online' : 'Checking...'}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20 relative z-10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages Area */}
              <div ref={containerRef} className="flex-1 min-h-0">
              <ScrollArea className="h-full w-full p-4 md:p-5 bg-gradient-to-b from-gray-50 to-white relative">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="absolute top-10 left-10 text-4xl">💬</div>
                  <div className="absolute top-32 right-8 text-3xl">✨</div>
                  <div className="absolute top-64 left-6 text-2xl">🎯</div>
                  <div className="absolute bottom-32 right-12 text-4xl">🌟</div>
                </div>
                
                <div className="space-y-4 relative z-10">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="flex items-end gap-2">
                        {message.sender === 'ai' && message.emoji && (
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-1 flex-shrink-0">
                            <span className="text-lg">{message.emoji}</span>
                          </div>
                        )}
                        <div
                          className={`max-w-[78%] md:max-w-[70%] rounded-2xl px-4 py-3 bg-white/100 ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md'
                              : 'border border-gray-200 shadow-sm'
                          }`}
                        >
                          {message.sender === 'ai' && (
                            <div className="flex items-center gap-2 mb-1">
                              <Sparkles className="h-3 w-3 text-purple-600" />
                              <span className="text-xs text-gray-500">AI Assistant</span>
                            </div>
                          )}
                          <div className={message.sender === 'user' ? 'text-white' : 'text-gray-800'}>
                            {renderText(message.text)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Quick Actions disabled for now */}
                </div>
              </ScrollArea>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-200">
                {/* Emoji Picker */}
                <AnimatePresence>
                  {showEmojiPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mb-3 p-3 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <div className="flex flex-wrap gap-2 justify-center">
                        {emojiReactions.map((emoji, index) => (
                          <button
                            key={index}
                            onClick={() => addEmoji(emoji)}
                            className="text-2xl hover:scale-125 transition-transform"
                          >
                            {emoji}
                          </button>
                        ))}
                        <button
                          onClick={() => addEmoji('😀')}
                          className="text-2xl hover:scale-125 transition-transform"
                        >
                          😀
                        </button>
                        <button
                          onClick={() => addEmoji('🎉')}
                          className="text-2xl hover:scale-125 transition-transform"
                        >
                          🎉
                        </button>
                        <button
                          onClick={() => addEmoji('📍')}
                          className="text-2xl hover:scale-125 transition-transform"
                        >
                          📍
                        </button>
                        <button
                          onClick={() => addEmoji('🏛️')}
                          className="text-2xl hover:scale-125 transition-transform"
                        >
                          🏛️
                        </button>
                        <button
                          onClick={() => addEmoji('✨')}
                          className="text-2xl hover:scale-125 transition-transform"
                        >
                          ✨
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-2 items-center">
                  <Button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 hover:bg-purple-50"
                  >
                    <Smile className="h-5 w-5 text-gray-600" />
                  </Button>
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message... 💬"
                    className="flex-1 bg-gray-100 border-0 focus-visible:ring-2 focus-visible:ring-purple-500"
                  />
                  <Button
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-br from-blue-600 to-purple-600 hover:opacity-90 flex-shrink-0"
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  ✨ Powered by AI • Malaybalay City 🏛️
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
