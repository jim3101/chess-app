export default class LoginScreen {
    constructor(loginScreen, loginConfirmButton, usernameInputField, userTextField, socket) {
        this.loginScreen = loginScreen;
        this.loginConfirmButton = loginConfirmButton;
        this.usernameInputField = usernameInputField;
        this.userTextField = userTextField;
        this.socket = socket;

        this.addLoginEventListener();
    }

    addLoginEventListener() {
        this.loginConfirmButton.addEventListener('click', () => {
            this.userTextField.innerText = 'Username: ' + this.usernameInputField.value;
            this.socket.emit('login', this.usernameInputField.value);
            this.hide();
        })
    }

    show() {
        this.loginScreen.style.display = 'grid';
    }

    hide() {
        this.loginScreen.style.display = 'none';
    }

    toggle() {
        if (this.loginScreen.style.display === 'none' || this.loginScreen.style.display === '') {
            this.show();
        } else {
            this.hide();
        }
    }
}


// const loginButton = document.getElementById('login-button');
// loginButton.addEventListener('click', () => {
//     const loginScreen = document.getElementById('login');
//     const loginConfirmButton = document.getElementById('login-confirm-button');

//     function loginCallback() {
//         const usernameInputField = document.getElementById('username-input');
//         const userTextField = document.getElementById('user-text');
//         userTextField.innerText = 'Username: ' + usernameInputField.value;
//         socket.emit('login', usernameInputField.value);
//         loginConfirmButton.removeEventListener('click', loginCallback);
//         loginScreen.style.display = 'none';
//     }
    
//     if (loginScreen.style.display === 'none' || loginScreen.style.display === '') {
//         loginConfirmButton.addEventListener('click', loginCallback)
//         loginScreen.style.display = 'grid';
//     } else {
//         loginConfirmButton.removeEventListener('click', loginCallback);
//         loginScreen.style.display = 'none';
//     }
// })