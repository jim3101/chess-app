class Chessboard {
    constructor(squareElements, initialPositions) {
        this.squareElements = squareElements;
        this.notation = 'off';
        this.positions = {};
        this.set_positions(initialPositions);
        this.render();
    }

    toggle_notation() {
        if (this.notation === 'off') {
            this.turn_on_notation();
            this.notation = 'on';
        } else if (this.notation === 'on') {
            this.turn_off_notation();
            this.notation = 'off';
        }
    }

    turn_off_notation() {
        Array.from(this.squareElements).forEach(square => {
            Array.from(square.children).forEach(childElement => {
                if (childElement.className === 'chessboard-square-text') {
                    square.removeChild(childElement);
                }
            })
        })
    }

    turn_on_notation() {
        Array.from(this.squareElements).forEach(square => {
            let p = document.createElement('DIV');
            p.classList.add('chessboard-square-text')
            p.innerHTML = square.id;
            square.appendChild(p);
        })
    }

    set_positions(positionObject) {
        this.positions = {...positionObject};
        this.render();
    }

    clear_render() {
        Array.from(this.squareElements).forEach(square => {
            Array.from(square.children).forEach(childElement => {
                if (childElement.className === 'chessboard-square-piece') {
                    square.removeChild(childElement);
                }
            })
        })
    }

    render() {
        this.clear_render();
        Array.from(this.squareElements).forEach(square => {
            if (this.positions.hasOwnProperty(square.id)) {
                let p = document.createElement('DIV');
                p.classList.add('chessboard-square-piece')
                p.setAttribute('draggable', 'true');
                p.id = square.id;
                p.textContent = this.positions[square.id];
                square.appendChild(p);
            }
        })
        this.set_piece_callbacks();
    }

    set_piece_callbacks() {
        let pieces = document.querySelectorAll('.chessboard-square-piece');
        Array.from(pieces).forEach(piece => {
            piece.addEventListener('dragstart', () => {
                piece.classList.add('dragging');
            })

            piece.addEventListener('dragend', () => {
                piece.classList.remove('dragging');
            })
        })

        Array.from(this.squareElements).forEach(square => {
            square.addEventListener('dragenter', () => {
                square.classList.add('dragging-over');
            })

            square.addEventListener('dragleave', () => {
                square.classList.remove('dragging-over');
            })

            square.addEventListener('dragover', (e) => {
                e.preventDefault();
            })

            square.addEventListener('drop', (e) => {
                square.classList.remove('dragging-over');
                let movingPiece = document.querySelector('.chessboard-square-piece.dragging');
                if (movingPiece != null) {
                    movingPiece.classList.remove('dragging');
                    delete this.positions[movingPiece.id];
                    this.positions[square.id] = movingPiece.textContent;
                    this.render();
                }
            })
        })
    }
}


let squares = document.getElementsByClassName('chessboard-square');
let notationToggleButton = document.getElementById('notation-toggle-button');
let initialPositionButton = document.getElementById('initial-position-button');

let initialPositions = {'a1': String.fromCharCode(9814), 'b1': String.fromCharCode(9816), 'c1': String.fromCharCode(9815), 'd1': String.fromCharCode(9813),
                        'e1': String.fromCharCode(9812), 'f1': String.fromCharCode(9815), 'g1': String.fromCharCode(9816), 'h1': String.fromCharCode(9814),
                        'a2': String.fromCharCode(9817), 'b2': String.fromCharCode(9817), 'c2': String.fromCharCode(9817), 'd2': String.fromCharCode(9817),
                        'e2': String.fromCharCode(9817), 'f2': String.fromCharCode(9817), 'g2': String.fromCharCode(9817), 'h2': String.fromCharCode(9817),};

let chessboard = new Chessboard(squares, initialPositions);

notationToggleButton.addEventListener('click', () => {
    chessboard.toggle_notation();
})

initialPositionButton.addEventListener('click', () => {
    chessboard.set_positions(initialPositions);
})
