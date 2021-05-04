let squares = document.getElementsByClassName('chessboard-square');
let notation_toggle_button = document.getElementById('notation-toggle-button');


notation_toggle_button.addEventListener('click', function() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML === '') {
            squares[i].innerHTML = squares[i].id
        } else {
            squares[i].innerHTML = ''
        }
    }
})
