export default class WebSocketClient {
    constructor(url = 'ws://localhost:5000/ws') {
        this.url = url;
        this.socket = null;
        this.isConnected = false;
        this.eventListeners = new Map();
    }

    // Connect to the WebSocket server
    connect(playerId, gameId = '') {
        this.playerId = playerId;
        this.gameId = gameId;
        
        try {
            console.log('Connecting to WebSocket:', this.url, this.playerId, this.gameId);
            this.socket = new WebSocket(this.url);
            
            // Set up event handlers
            this.socket.onopen = this.handleOpen.bind(this);
            this.socket.onmessage = this.handleMessage.bind(this);
            this.socket.onclose = this.handleClose.bind(this);
            this.socket.onerror = this.handleError.bind(this);
            
        } catch (error) {
            console.error('Failed to create WebSocket:', error);
        }
    }

    // Handle connection opened
    handleOpen(event) {
        console.log('WebSocket connected!');
        this.isConnected = true;
        this.send('register', { playerId: this.playerId, gameId: this.gameId })
    }

    // Handle incoming messages
    handleMessage(event) {
        try {
            const message = JSON.parse(event.data);
            console.log('Received message:', message);
            
            // Trigger any listeners for this message type
            this.triggerEvent(message.type, message.data);
            
        } catch (error) {
            console.error('Failed to parse message:', error);
        }
    }

    // Handle connection closed
    handleClose(event) {
        console.log('WebSocket disconnected:', event.code, event.reason);
        this.isConnected = false;

        setTimeout(() => {
            console.log('Attempting to reconnect...');
            this.connect(this.playerId, this.gameId);
        }, 3000); // Wait 3 second before trying to reconnect
    }

    // Handle errors
    handleError(error) {
        console.error('WebSocket error:', error);
    }

    // Send a message to the server
    send(msg, data) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            const message = {
                message: msg,
                ...data
            };
    
            try {
                this.socket.send(JSON.stringify(message));
                console.log('Sent message:', message);
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        } else {
            console.warn('WebSocket not ready. Message queued.');
        }
    }

    // Listen for specific message types
    on(messageType, callback) {
        if (!this.eventListeners.has(messageType)) {
            this.eventListeners.set(messageType, []);
        }
        this.eventListeners.get(messageType).push(callback);
    }

    // Remove a specific listener
    off(messageType, callback) {
        if (this.eventListeners.has(messageType)) {
            const listeners = this.eventListeners.get(messageType);
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    // Trigger events for a specific message type
    triggerEvent(messageType, data) {
        if (this.eventListeners.has(messageType)) {
            this.eventListeners.get(messageType).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event listener for ${messageType}:`, error);
                }
            });
        }
    }

    // Disconnect from the server
    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        this.isConnected = false;
        this.eventListeners.clear();
    }

    // Check if connected
    get connected() {
        return this.isConnected;
    }
}

