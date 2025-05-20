export default class ChessApi {
    constructor(baseUrl = '/api/chess/action') {
        this.baseUrl = baseUrl + '/api/chess/action';
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
            body: JSON.stringify({ action, gameId, payload })
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`ChessApi error ${res.status}: ${text}`);
        }
        return res.json();
    }
    /** Create a new game */
    newGame() {
        return this.request('newGame', '', {});
    }
     /** Retrieve basic game info (e.g. FEN, captured pieces) */
    getInfo(gameId) {
        return this.request('info', gameId, {});
    }
    /**
     * Send a move from → to.
     * @param {string} gameId  
     * @param {{x:number,y:number}} from  
     * @param {{x:number,y:number}} to  
     */
    movePiece(gameId, from, to){
        return this.request('move', gameId, { from: from, to: to });
    }
}