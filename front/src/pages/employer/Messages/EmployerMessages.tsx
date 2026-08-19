import React, { useState } from 'react';
import styles from './EmployerMessages.module.css';

interface Message {
  id: string;
  sender: 'employer' | 'worker';
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  workerName: string;
  workerInitials: string;
  workerBgColor: string;
  jobTitle: string;
  lastMessage: string;
  timeAgo: string;
  unreadCount?: number;
  messages: Message[];
}

export const EmployerMessages: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      workerName: 'Marcus Thompson',
      workerInitials: 'MT',
      workerBgColor: '#0b9982',
      jobTitle: 'Warehouse Picker & Packer',
      lastMessage: 'Do you have availability next Tue...',
      timeAgo: '4h ago',
      unreadCount: 1,
      messages: [
        { id: 'm1', sender: 'employer', text: 'Hi Marcus, thanks for your application.', time: '9:00 AM' },
        { id: 'm2', sender: 'employer', text: 'We would like to know — do you have forklift experience?', time: '9:01 AM' },
        { id: 'm3', sender: 'worker', text: 'Yes, I am forklift certified. I have 3 years of experience on sit-down counterbalance forklifts.', time: '9:45 AM' },
        { id: 'm4', sender: 'employer', text: 'Perfect. We would like to offer you the position. Start date is Monday August 15th at 7am.', time: '10:30 AM' },
        { id: 'm5', sender: 'worker', text: 'Excellent, I will be there. Is there a specific entrance I should use?', time: '10:35 AM' },
        { id: 'm6', sender: 'employer', text: 'Use the main gate on Atlantic Ave. Ask for Carlos at the security booth.', time: '11:00 AM' },
        { id: 'm7', sender: 'employer', text: 'Do you have availability next Tuesday morning?', time: '2:00 PM' },
      ],
    },
    {
      id: '2',
      workerName: 'Aisha Johnson',
      workerInitials: 'AJ',
      workerBgColor: '#0b9982',
      jobTitle: 'Professional Cleaner & Organizer',
      lastMessage: 'Sounds good! I can bring my own supplies.',
      timeAgo: '1d ago',
      messages: [
        { id: 'm10', sender: 'worker', text: 'Sounds good! I can bring my own supplies.', time: '10:00 AM' },
      ],
    },
    {
      id: '3',
      workerName: 'Elena Petrov',
      workerInitials: 'EP',
      workerBgColor: '#9f1239',
      jobTitle: 'Administrative Specialist',
      lastMessage: 'Thank you for the update.',
      timeAgo: '2d ago',
      messages: [
        { id: 'm20', sender: 'worker', text: 'Thank you for the update.', time: '3:15 PM' },
      ],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState<string | null>('1');
  const [inputMessage, setInputMessage] = useState<string>('');

  const activeConversation = conversations.find((c) => c.id === activeChatId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'employer',
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
        
        {/* Sidebar Izquierdo: Lista de Trabajadores */}
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
                  <div className={styles.avatar} style={{ backgroundColor: chat.workerBgColor }}>
                    {chat.workerInitials}
                  </div>
                  <div className="flex-grow-1 min-w-0">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h2 className="fw-bold text-dark small text-truncate mb-0">{chat.workerName}</h2>
                      <span className="text-muted extra-small ms-2">{chat.timeAgo}</span>
                    </div>
                    <p className="text-muted extra-small text-truncate mb-1">{chat.lastMessage}</p>
                    <span className="text-secondary extra-small d-block text-truncate">
                      Re: {chat.jobTitle}
                    </span>
                  </div>
                  {chat.unreadCount && !isActive && (
                    <span className={styles.unreadBadge}>{chat.unreadCount}</span>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Panel Derecho: Chat Activo */}
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
                    style={{ backgroundColor: activeConversation.workerBgColor }}
                  >
                    {activeConversation.workerInitials}
                  </div>
                  <div className="min-w-0">
                    <h2 className="fw-bold text-dark fs-6 text-truncate mb-0">
                      {activeConversation.workerName}
                    </h2>
                    <span className="text-muted extra-small text-truncate d-block">
                      Re: {activeConversation.jobTitle}
                    </span>
                  </div>
                </div>

                <a
                  href={`/employer/workers/${activeConversation.id}`}
                  className={`btn ${styles.btnViewJob} text-decoration-none`}
                >
                  View profile
                </a>
              </header>

              {/* Banner Informativo */}
              <div className={`px-3 py-2 ${styles.infoBanner}`}>
                <span className="extra-small text-teal text-truncate d-block">
                  📋 Conversation regarding candidate for: <strong>{activeConversation.jobTitle}</strong>
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
                        isEmployer ? 'align-self-end flex-row-reverse' : 'align-self-start'
                      }`}
                      style={{ maxWidth: '85%' }}
                    >
                      {!isEmployer && (
                        <div
                          className={styles.smallAvatar}
                          style={{ backgroundColor: activeConversation.workerBgColor }}
                        >
                          {activeConversation.workerInitials}
                        </div>
                      )}

                      <div>
                        <div
                          className={`p-3 ${
                            isEmployer ? styles.employerBubble : styles.workerBubble
                          }`}
                        >
                          <p className="mb-0 small">{msg.text}</p>
                        </div>
                        <span
                          className={`text-muted extra-small d-block mt-1 ${
                            isEmployer ? 'text-end' : 'text-start'
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
            /* Estado Vacío */
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center p-4 text-center">
              <div className={styles.emptyStateIcon}>💬</div>
              <h2 className="h5 fw-bold text-dark mb-2">Select a conversation</h2>
              <p className="text-muted small mb-0" style={{ maxWidth: '360px' }}>
                Choose a candidate from the list to discuss job requirements, confirm shift schedules, or send instructions.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};