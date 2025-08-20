import Api from './Api';
//TODO: Remove this class and use Api class directly
export default class ChessApi {
    constructor() {
        const defaultUrl = '/api/chess';
        this.api = new Api(defaultUrl);
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
        const payload = { isAi };
        const res = await this.api.fetchJSON('/api/chess/newGame', {
            method: 'POST',
            body: JSON.stringify({ payload })
        })
        return res
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
        const res = await this.api.fetchJSON('/api/chess/getInfo', {
            method: 'POST',
            body: JSON.stringify({ gameId, playerId: this.playerId })
        })
        return res
    }
    /**
     * Send a move from to.
     * @param {string} gameId  
     * @param {{x:number,y:number}} from  
     * @param {{x:number,y:number}} to  
     */
    async movePiece(gameId, from, to, promoteTo = ''){
        const payload = { from: from, to: to , promoteTo: promoteTo }
        const res = await this.api.fetchJSON('/api/chess/move', {
            method: 'POST',
            body: JSON.stringify({ gameId, payload, playerId: this.playerId })
        })
        return res
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
        const res = await this.api.fetchJSON('/api/chess/chooseColor', {
            method: 'POST',
            body: JSON.stringify({ gameId, payload, playerId: this.playerId })
        })
        return res
    }
    async requestEndGame(gameId, type) {
        const res = await this.api.fetchJSON('/api/chess/requestEndGame', {
            method: 'POST',
            body: JSON.stringify({ gameId, payload: { type: type }, playerId: this.playerId })
        })
        return res
        
    }
    async respondDraw(gameId, accept) {
        const payload = { accept: accept }
        const res = await this.api.fetchJSON('/api/chess/drawResponse', {
            method: 'POST',
            body: JSON.stringify({ gameId, payload, playerId: this.playerId })
        })
        return res
    }
    async resign(gameId) {
        const payload = { resign: true }
        const res = await this.api.fetchJSON('/api/chess/resign', {
            method: 'POST',
            body: JSON.stringify({ gameId, payload, playerId: this.playerId })
        })
        return res
    }
    async claimDraw(gameId) {
        const payload = { claimDraw: true }
        const res = await this.api.fetchJSON('/api/chess/claimDraw', {
            method: 'POST',
            body: JSON.stringify({ gameId, payload, playerId: this.playerId })
        })
        return res
    }
}