Vue.component('App', {
    template: `
        <div class="app">
            <Navbar></Navbar>
            <Chessboard></Chessboard>
        </div>
    `
});


const app = new Vue({
    el: '#app'
});
