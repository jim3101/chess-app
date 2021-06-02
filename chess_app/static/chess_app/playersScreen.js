export default class PlayersScreen {
    constructor(allPlayersScreen, allPlayersList) {
        this.allPlayersScreen = allPlayersScreen;
        this.allPlayersList = allPlayersList;
    }

    show() {
        this.allPlayersScreen.style.display = 'grid';
    }

    hide() {
        this.allPlayersScreen.style.display = 'none';
    }

    toggle() {
        if (this.allPlayersScreen.style.display === 'none' || this.allPlayersScreen.style.display === '') {
            this.show();
        } else {
            this.hide();
        }
    }

    updatePlayersList(allPlayers) {
        while (this.allPlayersList.children.length > 0) {
            this.allPlayersList.removeChild(this.allPlayersList.firstChild);
        }
    
        allPlayers.forEach(player => {
            let li = document.createElement('LI');
            li.innerText = player.username;
            this.allPlayersList.appendChild(li);
        })
    }
}
