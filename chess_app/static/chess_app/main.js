import Chessboard from './chessboard.js';
import LoginScreen from './loginScreen.js';
import PlayersScreen from './playersScreen.js';
import { initialPositions } from './constants.js';


const socket = io('http://localhost:5001');
socket.on('welcome', msg => {
    console.log(msg);
})


let chessboard = new Chessboard(document.getElementsByClassName('chessboard-square'), 
                                initialPositions, 
                                document.getElementById('turn-text'), 
                                socket);


function initLoginScreen() {
    const loginDiv = document.getElementById('login');
    const loginConfirmButton = document.getElementById('login-confirm-button');
    const usernameInputField = document.getElementById('username-input');
    const userTextField = document.getElementById('user-text');
    let loginScreen = new LoginScreen(loginDiv, loginConfirmButton, usernameInputField, userTextField, socket);

    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', () => {
        loginScreen.toggle();
    })
}


function initPlayersScreen() {
    const allPlayersScreen = document.getElementById('all-players-div');
    const allPlayersList = document.getElementById('player-list');
    let playersScreen = new PlayersScreen(allPlayersScreen, allPlayersList);

    const showPlayersButton = document.getElementById('show-players-button')
    showPlayersButton.addEventListener('click', () => {
        playersScreen.toggle();
    })

    socket.on('playerUpdate', allPlayers => {
        playersScreen.updatePlayersList(allPlayers);
    })
}


initLoginScreen();
initPlayersScreen();


const initialPositionButton = document.getElementById('initial-position-button');
initialPositionButton.addEventListener('click', () => {
    chessboard.setTurn('white');
    chessboard.setPositions(initialPositions);
});


const flipBoardButton = document.getElementById('flip-board-button');
flipBoardButton.addEventListener('click', () => {
    const chessboardGrid = document.getElementById('chessboard');
    let chessboardChildren = Array.from(chessboardGrid.children);

    while (chessboardGrid.firstChild !== null) {
        chessboardGrid.removeChild(chessboardGrid.firstChild);
    }

    chessboardChildren.reverse();
    chessboardGrid.append(...chessboardChildren);
})
