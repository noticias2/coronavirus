class Card {
    constructor(x, y, image, code) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.code = code;
        this.revealed = false;
    }
    
    getImage() {
        return this.image;
    }

    getCode() {
        return this.code;
    }

    getY() {
        return this.y;
    }

    getX() {
        return this.x;
    }

    reveal() {
        this.revealed = true;
    }

    isRevealed() {
        return this.revealed;
    }
}

class Board {
    constructor(board) {
        this.board = board;
        this.width = 4;
        this.height = 3;
        this.initialize();
    }

    initialize() {
        this.currentCard = null;
        this.cardsUp = 0;
        this.revealed = 0;

        this.matrix = new Array(this.height);
        for (let i = 0; i < this.height; i++) {
            this.matrix[i] = new Array(this.width);
        }

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.matrix[i][j] = -1;
            }
        }

        let cards = ['carta1.jpg', 'carta2.jpg', 'carta3.jpg', 'carta4.jpg', 'carta5.jpg', 'carta6.jpg'];
        for (let code = 0; code < cards.length; code++) {
            for(let n = 0; n < 2; n++) {
                let x = Math.floor(Math.random() * this.width);
                let y = Math.floor(Math.random() * this.height);
                while (this.matrix[y][x] != -1) {
                    x = Math.floor(Math.random() * this.width);
                    y = Math.floor(Math.random() * this.height);
                }
                this.matrix[y][x] = new Card(x, y, cards[code], code);
                document.write('<a class="card" id="c' + y + x + '" href="javascript:;" onClick="board.faceUp(\'c' + 
                    y + x + '\');" role="button"><img src="multimedia/dorso.jpg" alt="" width="200" height="200"/></a>')
            }
        }
    }

    faceUp(cardId) {
        if (this.cardsUp < 2) {
            this.cardsUp++;
            let at = cardId.replace('c', '');
            let card = this.matrix[parseInt(at[0])][parseInt(at[1])];
            document.getElementById(cardId).childNodes[0].src = "multimedia/" + 
                card.getImage();
            
            if (this.currentCard != null) {
                if (card.getCode() == this.currentCard.getCode() && !(card.getY() == this.currentCard.getY() &&
                    card.getX() == this.currentCard.getX())) {
                    this.reveal(this.currentCard);
                    this.reveal(card);
                } else {
                this.currentCard = card;
                setTimeout(this.faceDown, 1000, card, this);
                }
            } else {
                this.currentCard = card;
                setTimeout(this.faceDown, 1000, card, this);
            }
        }
    }

    faceDown(card, board) {
        if (!card.isRevealed()) {
            board.setCardsUp(board.getCardsUp()-1);
            document.getElementById("c" + card.getY() +  card.getX()).childNodes[0].src = "multimedia/dorso.jpg";
        }
    }

    setCardsUp(cardsUp) {
        this.cardsUp = cardsUp;
    }

    getCardsUp() {
        return this.cardsUp;
    }

    reveal(card) {
        this.currentCard = null;
        let cardInBoard = document.getElementById("c" + card.getY() + card.getX());
        cardInBoard.childNodes[0].src = "multimedia/" + card.getImage();
        cardInBoard.onclick = "";
        this.cardsUp--;
        card.reveal();
        this.revealed++;

        if (this.revealed == this.height * this.width) {
            let button = document.createElement('a');
            button.id = 'again';
            button.onclick = function() {location.reload()};
            button.setAttribute('role', 'button');
            button.innerHTML = '¡Juega de nuevo!';
            document.body.appendChild(button);
        }
    }
}

var board = new Board(document.getElementById("board"));