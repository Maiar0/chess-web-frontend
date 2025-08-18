export default class Api{
    constructor(defualtUrl){const envUrl = import.meta.env.VITE_API_URL; //const envUrl = process.env.VITE_API_URL;
        console.log('Computed baseUrl:', envUrl ? envUrl : defaultUrl);
        this.baseUrl = envUrl ? envUrl : defaultUrl;

        this.playerId = localStorage.getItem('chess-player-uuid');
        if (!this.playerId) {
            this.playerId = crypto.randomUUID();
            localStorage.setItem('chess-player-uuid', this.playerId);
        }
    }

    async fetchJSON(endpoint, options = {headers: "POST"} ){
        const playerId = this.playerId
        options.headers = {
            ...options.headers,
            'Content-Type' : 'application/json'
        }
        try{
            const res = await fetch(this.baseUrl + endpoint, options)
        }catch(err){
            console.error("Network error:", err)
            window.location.href = "/broken-link"
        }
        if(!res.ok){
            const { error } = await res.json();
            const err = new Error(error.message)
            err.code = error.code
            throw err
        }
        return res.json()
    }
}