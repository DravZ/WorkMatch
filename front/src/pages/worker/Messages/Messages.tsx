import React, { useState } from 'react';
import styles from './Messages.module.css';

interface Message {
  id: string;
  sender: 'employer' | 'user';
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  companyName: string;
  companyInitials: string;
  companyBgColor: string;
  jobTitle: string;
  lastMessage: string;
  timeAgo: string;
  unreadCount?: number;
  messages: Message[];
}

export const Messages: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      companyName: 'Metro Logistics Co.',
      companyInitials: 'ML',
      companyBgColor: '#0f172a',
      jobTitle: 'Warehouse Picker & Packer',
      lastMessage: 'Do you have availability next Tue...',
      timeAgo: '4h ago',
      unreadCount: 1,
      messages: [
        { id: 'm1', sender: 'employer', text: 'Hi Marcus, thanks for your application.', time: '9:00 AM' },
        { id: 'm2', sender: 'employer', text: 'We would like to know — do you have forklift experience?', time: '9:01 AM' },
        { id: 'm3', sender: 'user', text: 'Yes, I am forklift certified. I have 3 years of experience on sit-down counterbalance forklifts.', time: '9:45 AM' },
        { id: 'm4', sender: 'employer', text: 'Perfect. We would like to offer you the position. Start date is Monday August 15th at 7am.', time: '10:30 AM' },
        { id: 'm5', sender: 'user', text: 'Excellent, I will be there. Is there a specific entrance I should use?', time: '10:35 AM' },
        { id: 'm6', sender: 'employer', text: 'Use the main gate on Atlantic Ave. Ask for Carlos at the security booth.', time: '11:00 AM' },
        { id: 'm7', sender: 'employer', text: 'Do you have availability next Tuesday morning?', time: '2:00 PM' },
      ],
    },
    {
      id: '2',
      companyName: 'Prestige Events Group',
      companyInitials: 'PE',
      companyBgColor: '#0f172a',
      jobTitle: 'Event Setup Crew',
      lastMessage: 'We will send the full details shortly.',
      timeAgo: '2d ago',
      messages: [
        { id: 'm10', sender: 'employer', text: 'We will send the full details shortly.', time: '10:00 AM' },
      ],
    },
    {
      id: '3',
      companyName: 'Prestige Events Group',
      companyInitials: 'PE',
      companyBgColor: '#0f172a',
      jobTitle: 'Event Setup Crew',
      lastMessage: 'We will send the full details shortly.',
      timeAgo: '2d ago',
      messages: [
        { id: 'm10', sender: 'employer', text: 'We will send the full details shortly.', time: '10:00 AM' },
      ],
    },
    {
      id: '4',
      companyName: 'Prestige Events Group',
      companyInitials: 'PE',
      companyBgColor: '#0f172a',
      jobTitle: 'Event Setup Crew',
      lastMessage: 'We will send the full details shortly.',
      timeAgo: '2d ago',
      messages: [
        { id: 'm10', sender: 'employer', text: 'We will send the full details shortly.', time: '10:00 AM' },
      ],
    },
    {
      id: '5',
      companyName: 'Prestige Events Group',
      companyInitials: 'PE',
      companyBgColor: '#0f172a',
      jobTitle: 'Event Setup Crew',
      lastMessage: 'We will send the full details shortly.',
      timeAgo: '2d ago',
      messages: [
        { id: 'm10', sender: 'employer', text: 'We will send the full details shortly.', time: '10:00 AM' },
      ],
    },
    {
      id: '6',
      companyName: 'Prestige Events Group',
      companyInitials: 'PE',
      companyBgColor: '#0f172a',
      jobTitle: 'Event Setup Crew',
      lastMessage: 'We will send the full details shortly.',
      timeAgo: '2d ago',
      messages: [
        { id: 'm10', sender: 'employer', text: 'We will send the full details shortly.', time: '10:00 AM' },
      ],
    },
    {
      id: '7',
      companyName: 'Prestige Events Group',
      companyInitials: 'PE',
      companyBgColor: '#0f172a',
      jobTitle: 'Event Setup Crew',
      lastMessage: 'We will send the full details shortly.',
      timeAgo: '2d ago',
      messages: [
        { id: 'm10', sender: 'employer', text: 'We will send the full details shortly.', time: '10:00 AM' },
      ],
    },
    {
      id: '8',
      companyName: 'Prestige Events Group',
      companyInitials: 'PE',
      companyBgColor: '#0f172a',
      jobTitle: 'Event Setup Crew',
      lastMessage: 'We will send the full details shortly.',
      timeAgo: '2d ago',
      messages: [
        { id: 'm10', sender: 'employer', text: 'We will send the full details shortly.', time: '10:00 AM' },
      ],
    },
    {
      id: '9',
      companyName: 'Prestige Events Group',
      companyInitials: 'PE',
      companyBgColor: '#0f172a',
      jobTitle: 'Event Setup Crew',
      lastMessage: 'We will send the full details shortly.',
      timeAgo: '2d ago',
      messages: [
        { id: 'm10', sender: 'employer', text: 'We will send the full details shortly.', time: '10:00 AM' },
      ],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState<string>('');

  const activeConversation = conversations.find((c) => c.id === activeChatId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            lastMessage: inputMessage,
            timeAgo: 'Just now',
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      })
    );

    setInputMessage('');
  };

  return (
    <div className={styles.cont + " d-flex flex-column bg-light overflow-hidden"}>

      <div className="d-flex flex-grow-1 overflow-hidden position-relative">
        {/* Sidebar Izquierdo: Lista de Chats */}
        <aside
          className={`bg-white border-end ${styles.sidebar} ${
            activeChatId ? styles.sidebarHiddenMobile : ''
          }`}
        >
          <div className="p-3 border-bottom">
            <h1 className="h5 fw-bold text-dark mb-0">Messages</h1>
          </div>

          <div className={styles.conversationList}>
            {conversations.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`p-3 border-bottom d-flex gap-3 align-items-start ${
                    isActive ? styles.activeConversation : styles.conversationItem
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.avatar} style={{ backgroundColor: chat.companyBgColor }}>
                    {chat.companyInitials}
                  </div>
                  <div className="flex-grow-1 min-w-0">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h2 className="fw-bold text-dark small text-truncate mb-0">{chat.companyName}</h2>
                      <span className="text-muted extra-small ms-2">{chat.timeAgo}</span>
                    </div>
                    <p className="text-muted extra-small text-truncate mb-1">{chat.lastMessage}</p>
                    <span className="text-secondary extra-small d-block text-truncate">Re: {chat.jobTitle}</span>
                  </div>
                  {chat.unreadCount && !isActive && (
                    <span className={styles.unreadBadge}>{chat.unreadCount}</span>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Panel Derecho: Área del Chat Activo o Estado Vacío */}
        <section
          className={`flex-grow-1 d-flex flex-column bg-light h-100 ${styles.chatSection} ${
            !activeChatId ? styles.chatHiddenMobile : ''
          }`}
        >
          {activeConversation ? (
            <>
              {/* Header del Chat */}
              <header className="p-3 bg-white border-bottom d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  {/* Botón Volver (Móviles / WhatsApp Style) */}
                  <button
                    type="button"
                    onClick={() => setActiveChatId(null)}
                    className={`btn p-0 border-0 text-dark me-1 ${styles.btnBackMobile}`}
                    aria-label="Back to conversations"
                  >
                    ←
                  </button>

                  <div
                    className={styles.avatar}
                    style={{ backgroundColor: activeConversation.companyBgColor }}
                  >
                    {activeConversation.companyInitials}
                  </div>
                  <div className="min-w-0">
                    <h2 className="fw-bold text-dark fs-6 text-truncate mb-0">
                      {activeConversation.companyName}
                    </h2>
                    <span className="text-muted extra-small text-truncate d-block">
                      Re: {activeConversation.jobTitle}
                    </span>
                  </div>
                </div>

                <button type="button" className={`btn ${styles.btnViewJob}`}>
                  View job
                </button>
              </header>

              {/* Banner Informativo */}
              <div className={`px-3 py-2 bg-mint-subtle ${styles.infoBanner}`}>
                <span className="extra-small text-teal text-truncate d-block">
                  📋 Conversation about: <strong>{activeConversation.jobTitle}</strong>
                </span>
              </div>

              {/* Cuerpo de Mensajes */}
              <div className={`p-3 p-md-4 flex-grow-1 overflow-auto d-flex flex-column gap-3 ${styles.chatBody}`}>
                {activeConversation.messages.map((msg) => {
                  const isEmployer = msg.sender === 'employer';
                  return (
                    <div
                      key={msg.id}
                      className={`d-flex align-items-end gap-2 ${
                        isEmployer ? 'align-self-start' : 'align-self-end flex-row-reverse'
                      }`}
                      style={{ maxWidth: '85%' }}
                    >
                      {isEmployer && (
                        <div className={styles.smallAvatar}>
                          {activeConversation.companyInitials}
                        </div>
                      )}

                      <div>
                        <div
                          className={`p-3 ${
                            isEmployer ? styles.employerBubble : styles.userBubble
                          }`}
                        >
                          <p className="mb-0 small">{msg.text}</p>
                        </div>
                        <span
                          className={`text-muted extra-small d-block mt-1 ${
                            isEmployer ? 'text-start' : 'text-end'
                          }`}
                        >
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Footer */}
              <footer className="p-2 p-md-3 bg-white border-top">
                <form onSubmit={handleSendMessage} className="d-flex gap-2 align-items-center">
                  <input
                    type="text"
                    className={`form-control ${styles.messageInput}`}
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className={`btn ${
                      inputMessage.trim() ? styles.btnSendActive : styles.btnSendDisabled
                    }`}
                  >
                    Send
                  </button>
                </form>
              </footer>
            </>
          ) : (
            /* Estado Inicial */
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center p-4 text-center">
              <div className={styles.emptyStateIcon}>💬</div>
              <h2 className="h5 fw-bold text-dark mb-2">Select a conversation</h2>
              <p className="text-muted small mb-0" style={{ maxWidth: '360px' }}>
                Choose a chat from the list on the left to review shift details, discuss instructions, or message employers directly.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};