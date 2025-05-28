export default class ChessUtil{
    static parseFen(fen){
        const board = Array.from({ length: 8 }, () => Array(8).fill(null))
        const rows = fen.split(' ')[0].split('/')
        for (let i = 0; i < 8; i++) {
            let file = 0
            for (const ch of rows[i]) {
            if (/\d/.test(ch)) {
                file += +ch
            } else {
                const y = 7 - i   // rank i → y
                board[y][file++] = ch
            }
            }
        }
        return board
    
    }

    static checkPromotion(rank, pieceChar){
        console.log('pieceChar: ', pieceChar);
        if((rank === 7 || rank === 0) && pieceChar.toLowerCase() === 'p'){
            return true;
        }
        return false;
    }
}