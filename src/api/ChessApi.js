export default class ChessApi {
    constructor() {
        const envUrl = import.meta.env.VITE_API_URL; //const envUrl = process.env.VITE_API_URL;
        const defaultUrl = '/api/chess';
        console.log('Computed baseUrl:', envUrl ? envUrl : defaultUrl);
        this.baseUrl = envUrl ? envUrl : defaultUrl;

        this.playerId = localStorage.getItem('chess-player-uuid');
        if (!this.playerId) {
            this.playerId = crypto.randomUUID();
            localStorage.setItem('chess-player-uuid', this.playerId);
        }
    }
    
    /** Create a new game */
    /**
     * Starts a new chess game by sending a POST request to the backend.
     *
     * @async
     * @param {boolean} [isAi=false] - Whether to start a game against an AI opponent.
     * @returns {Promise<Object>} The response data from the backend containing game details.
     * @throws {Error} If the request fails, throws an error with a message and code from the backend.
     */
    async newGame(isAi = false) {
        const res = await fetch(this.baseUrl + '/newGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload: { isAi }, playerId: this.playerId })
        });
        if (!res.ok) {
            const { error } = await res.json();
            const err = new Error(error.message);
            err.code = error.code;
            throw err;
        }
        return res.json();
    }
    
    /**
     * Retrieves information about a chess game from the server.
     *
     * @async
     * @param {string} gameId - The unique identifier of the chess game.
     * @returns {Promise<Object>} A promise that resolves to the game information object.
     * @throws {Error} Throws an error if the server response is not OK, including an error message and code.
     */
    async getInfo(gameId) {
        const res = await fetch(this.baseUrl + '/getInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameId, playerId: this.playerId })
        });
        if (!res.ok) {
            const { error } = await res.json();
            const err = new Error(error.message);
            err.code = error.code;
            throw err;
        }
        return res.json();
    }
    /**
     * Send a move from to.
     * @param {string} gameId  
     * @param {{x:number,y:number}} from  
     * @param {{x:number,y:number}} to  
     */
    async movePiece(gameId, from, to, promoteTo = ''){
        const res = await fetch(this.baseUrl + '/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameId, payload: { from: from, to: to , promoteTo: promoteTo }, playerId: this.playerId })
        });
        if (!res.ok) {
            const { error } = await res.json();
            const err = new Error(error.message);
            err.code = error.code;
            throw err;
        }
        return res.json();
        //return this.requestAction('move', gameId, { from: from, to: to , promoteTo: promoteTo});
    }
    /**
     * Sends a request to choose a color for the specified game.
     *
     * @async
     * @param {string} gameId - The unique identifier of the game.
     * @param {string} color - The color to choose (e.g., "white" or "black").
     * @returns {Promise<Object>} The response data from the server.
     * @throws {Error} If the server responds with an error.
     */
    async chooseColor(gameId, color) {
        const payload = { color: color };
        const res = await fetch(this.baseUrl + '/chooseColor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'chooseColor', gameId, payload, playerId: this.playerId })
        });
        if (!res.ok) {
            const { error } = await res.json();
            const err = new Error(error.message);
            err.code = error.code;
            throw err;
        }
        return res.json();
    }
    async requestEndGame(gameId, type) {
        const res = await fetch(this.baseUrl + '/requestEndGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameId, playerId: this.playerId , payload: { type: type } })
        });
        if (!res.ok) {
            const { error } = await res.json();
            const err = new Error(error.message);
            err.code = error.code;
            throw err;
        }
        return res.json();
    }
    async respondDraw(gameId, accept) {
        const res = await fetch(this.baseUrl + '/drawResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameId, playerId: this.playerId , payload: { accept: accept } })
        });
        if (!res.ok) {
            const { error } = await res.json();
            const err = new Error(error.message);
            err.code = error.code;
            throw err;
        }
        return res.json();
    }
    async resign(gameId) {
        const res = await fetch(this.baseUrl + '/resign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameId, playerId: this.playerId, payload: { resign: true } })
        });
        if (!res.ok) {
            const { error } = await res.json();
            const err = new Error(error.message);
            err.code = error.code;
            throw err;
        }
        return res.json();
    }
    async claimDraw(gameId) {
        const res = await fetch(this.baseUrl + '/claimDraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameId, playerId: this.playerId, payload: { claimDraw: true } })
        });
        if (!res.ok) {
            const { error } = await res.json();
            const err = new Error(error.message);
            err.code = error.code;
            throw err;
        }
        return res.json();
    }
}