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
