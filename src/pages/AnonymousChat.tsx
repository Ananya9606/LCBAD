import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MessageCircle, 
  Send, 
  Users, 
  Shield, 
  Clock, 
  Flame,
  Eye,
  RefreshCw,
  UserPlus,
  Settings
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isEphemeral: boolean;
  isBurned: boolean;
}

interface AnonymousUser {
  address: string;
  pseudonym: string;
  reputation: number;
  isOnline: boolean;
}

const AnonymousChat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [anonymousIdentity, setAnonymousIdentity] = useState<{ address: string; pseudonym: string; reputation: number } | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<AnonymousUser[]>([
    { address: 'user1', pseudonym: 'ShadowTraveler#1234', reputation: 85, isOnline: true },
    { address: 'user2', pseudonym: 'MysterySeeker#5678', reputation: 92, isOnline: true },
    { address: 'user3', pseudonym: 'PhantomVoyager#9012', reputation: 78, isOnline: true }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [newPseudonym, setNewPseudonym] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Demo functions
  const initializeAnonymousChat = async () => {
    setIsLoading(true);
    setTimeout(() => {
      const identity = {
        address: 'demo_' + Math.random().toString(36).substr(2, 9),
        pseudonym: 'AnonymousUser' + Math.floor(Math.random() * 1000),
        reputation: Math.floor(Math.random() * 100)
      };
      setAnonymousIdentity(identity);
      setIsConnected(true);
      setIsLoading(false);
    }, 1000);
  };

  const sendMessage = async (receiverAddress: string, content: string) => {
    if (!anonymousIdentity) return;
    
    const message: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: anonymousIdentity.address,
      timestamp: new Date(),
      isEphemeral: false,
      isBurned: false
    };
    setMessages(prev => [...prev, message]);
  };

  const burnMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isBurned: true } : msg
    ));
  };

  const updatePseudonym = async (newPseudonym: string) => {
    if (!anonymousIdentity) return;
    setAnonymousIdentity(prev => prev ? { ...prev, pseudonym: newPseudonym } : null);
  };

  const discoverOnlineUsers = async () => {
    // Demo function - just refresh the list
    setOnlineUsers(prev => [...prev]);
  };

  const disconnect = () => {
    setIsConnected(false);
    setAnonymousIdentity(null);
    setMessages([]);
    setOnlineUsers([]);
    setError(null);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedUser) return;

    try {
      await sendMessage(selectedUser, messageInput.trim());
      setMessageInput('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleUpdatePseudonym = async () => {
    if (!newPseudonym.trim()) return;

    try {
      await updatePseudonym(newPseudonym.trim());
      setNewPseudonym('');
      setShowSettings(false);
    } catch (err) {
      console.error('Failed to update pseudonym:', err);
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(timestamp);
  };

  const getMessageStatusIcon = (message: ChatMessage) => {
    if (message.isBurned) return <Flame className="h-3 w-3 text-red-500" />;
    if (message.isEphemeral) return <Clock className="h-3 w-3 text-yellow-500" />;
    return <Eye className="h-3 w-3 text-green-500" />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Shield className="h-10 w-10 text-purple-400" />
              Anonymous Chat
            </h1>
            <p className="text-xl text-gray-300">
              Secure, private conversations without revealing your identity
            </p>
          </div>

          {/* Connection Status */}
          {!isConnected && (
            <Card className="bg-white/10 backdrop-blur-sm border-purple-500 mb-6">
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center gap-4">
                  <Shield className="h-12 w-12 text-purple-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Start Anonymous Chat
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Generate a secure anonymous identity to start chatting privately
                    </p>
                    <Button
                      onClick={initializeAnonymousChat}
                      disabled={isLoading}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating Identity...
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Start Chatting
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Display */}
          {error && (
            <Alert className="mb-6 border-red-500 bg-red-500/10">
              <AlertDescription className="text-red-300">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Main Chat Interface */}
          {isConnected && anonymousIdentity && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Online Users Sidebar */}
              <div className="lg:col-span-1">
                <Card className="bg-white/10 backdrop-blur-sm border-purple-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-purple-300">
                        <Users className="h-5 w-5" />
                        Online Users ({onlineUsers.length})
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={discoverOnlineUsers}
                        className="text-purple-300 hover:bg-purple-500/20"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-2">
                        {onlineUsers.map((user) => (
                          <div
                            key={user.address}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedUser === user.address
                                ? 'bg-purple-500/30 border border-purple-400'
                                : 'bg-white/5 hover:bg-white/10'
                            }`}
                            onClick={() => setSelectedUser(user.address)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white font-medium">
                                  {user.pseudonym}
                                </p>
                                <p className="text-xs text-gray-400">
                                  Reputation: {user.reputation}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full" />
                                <span className="text-xs text-gray-400">Online</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        {onlineUsers.length === 0 && (
                          <p className="text-gray-400 text-center py-4">
                            No other users online
                          </p>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Current Identity */}
                <Card className="bg-white/10 backdrop-blur-sm border-purple-500 mt-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-300">
                      <Shield className="h-5 w-5" />
                      Your Identity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-white font-medium">
                          {anonymousIdentity.pseudonym}
                        </p>
                        <p className="text-xs text-gray-400">
                          Reputation: {anonymousIdentity.reputation}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSettings(!showSettings)}
                        className="w-full border-purple-400 text-purple-300 hover:bg-purple-500/20"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chat Area */}
              <div className="lg:col-span-2">
                <Card className="bg-white/10 backdrop-blur-sm border-purple-500 h-[600px] flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-300">
                        {selectedUser ? (
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            Chat with {onlineUsers.find(u => u.address === selectedUser)?.pseudonym}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            Select a user to start chatting
                          </div>
                        )}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={disconnect}
                        className="text-red-300 hover:bg-red-500/20"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-grow flex flex-col p-0">
                    {/* Messages */}
                    <ScrollArea className="flex-grow p-4">
                      <div className="space-y-3">
                        {messages
                          .filter(msg => 
                            (msg.sender === selectedUser && msg.receiver === anonymousIdentity.address) ||
                            (msg.sender === anonymousIdentity.address && msg.receiver === selectedUser)
                          )
                          .map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.sender === anonymousIdentity.address ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[80%] p-3 rounded-lg ${
                                  message.sender === anonymousIdentity.address
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  {getMessageStatusIcon(message)}
                                  <span className="text-xs opacity-70">
                                    {message.sender === anonymousIdentity.address
                                      ? anonymousIdentity.pseudonym
                                      : onlineUsers.find(u => u.address === message.sender)?.pseudonym || 'Unknown'
                                    }
                                  </span>
                                  <Badge variant="secondary" className="text-xs">
                                    {formatTimestamp(message.timestamp)}
                                  </Badge>
                                </div>
                                <div className="whitespace-pre-wrap text-sm">
                                  {message.content}
                                </div>
                                {message.isEphemeral && message.expiresAt && (
                                  <div className="text-xs opacity-70 mt-1">
                                    Expires: {formatTimestamp(message.expiresAt)}
                                  </div>
                                )}
                                {!message.isBurned && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => burnMessage(message.id)}
                                    className="text-xs p-1 h-auto mt-1"
                                  >
                                    <Flame className="h-3 w-3 mr-1" />
                                    Burn
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        {selectedUser && messages.filter(msg => 
                          (msg.sender === selectedUser && msg.receiver === anonymousIdentity.address) ||
                          (msg.sender === anonymousIdentity.address && msg.receiver === selectedUser)
                        ).length === 0 && (
                          <div className="text-center text-gray-400 py-8">
                            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No messages yet. Start the conversation!</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                    
                    {/* Message Input */}
                    {selectedUser && (
                      <div className="p-4 border-t border-purple-500/30">
                        <div className="flex gap-2">
                          <Input
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 bg-white/10 border-purple-400 text-white placeholder:text-gray-400"
                          />
                          <Button
                            onClick={handleSendMessage}
                            disabled={!messageInput.trim()}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Settings Modal */}
          {showSettings && (
            <Card className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="bg-white/10 backdrop-blur-sm border-purple-500 w-96">
                <CardHeader>
                  <CardTitle className="text-purple-300">Update Pseudonym</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-white text-sm mb-2 block">
                        New Pseudonym
                      </label>
                      <Input
                        value={newPseudonym}
                        onChange={(e) => setNewPseudonym(e.target.value)}
                        placeholder="Enter new pseudonym..."
                        className="bg-white/10 border-purple-400 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleUpdatePseudonym}
                        disabled={!newPseudonym.trim()}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                      >
                        Update
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowSettings(false)}
                        className="border-purple-400 text-purple-300 hover:bg-purple-500/20"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AnonymousChat;