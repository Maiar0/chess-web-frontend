export default class ChessApi {
    constructor() {
        const envUrl = import.meta.env.VITE_API_URL; //const envUrl = process.env.VITE_API_URL;
        const defaultUrl = '/api/chess/action';
        console.log('Computed baseUrl:', envUrl ? envUrl : defaultUrl);
        this.baseUrl = envUrl ? envUrl : defaultUrl;

        this.playerId = localStorage.getItem('chess-player-uuid');
        if (!this.playerId) {
            this.playerId = crypto.randomUUID();
            localStorage.setItem('chess-player-uuid', this.playerId);
        }
    }
    
    /**
     * @param {string} action
     * @param {string} gameId
     * @param {object} payload
     * @returns {Promise<any>}
     * @throws {Error} if the response is not ok
     * @description
     * This function sends a request to the chess API.
     * It takes an action, gameId and payload as parameters.
     * It returns a promise that resolves to the response data.
     * If the response is not ok, it throws an error with the status and text.
     */
    async request (action, gameId, payload = {}) {
        const res = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action, gameId, payload, playerId: this.playerId })
        });
        if (!res.ok) {
            const { error } = await res.json();
            const err = new Error(error.message);
            err.code = error.code;
            throw err;
        }
        return res.json();
    }
    /** Create a new game */
    newGame(isAi = false) {
        return this.request('newGame', '', {isAi: isAi});
    }
     /** Retrieve basic game info (e.g. FEN, captured pieces) */
    getInfo(gameId) {
        return this.request('info', gameId, {});
    }
    /**
     * Send a move from to.
     * @param {string} gameId  
     * @param {{x:number,y:number}} from  
     * @param {{x:number,y:number}} to  
     */
    movePiece(gameId, from, to, promoteTo = ''){
        return this.request('move', gameId, { from: from, to: to , promoteTo: promoteTo});
    }
}