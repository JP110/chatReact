export const chatAPI = {
    currentRoom: 'general',
    getMessages() {
      const messages = localStorage.getItem(`chatMessages_${this.currentRoom}`);
      return messages ? JSON.parse(messages) : [];
    },
    getLastMessage() {
      const messages = this.getMessages();
      return messages.length > 0 ? messages[messages.length - 1] : null;
    },
    sendMessage(author, message) {
      const messages = this.getMessages();
      messages.push({ author, text: message, timestamp: new Date() });
      localStorage.setItem(
        `chatMessages_${this.currentRoom}`,
        JSON.stringify(messages)
      );
      return messages;
    },
    onMessageReceived(callback) {
      const handler = (event) => {
        if (event.key === `chatMessages_${this.currentRoom}`) {
          const lastMessage = this.getLastMessage();
          if (lastMessage) {
            callback(lastMessage);
          }
        }
      };
      this.messageHandler = handler;
      window.addEventListener('storage', handler);
    },
    clearMessages() {
      localStorage.setItem(
        `chatMessages_${this.currentRoom}`,
        JSON.stringify([])
      );
    },
    switchRoom(roomName) {
      this.currentRoom = roomName;
    },
    connect(callback) {
      this.onMessageReceived(callback);
    },
    disconnect() {
      if (this.messageHandler) {
        window.removeEventListener('storage', this.messageHandler);
        this.messageHandler = null;
      }
    },
  };