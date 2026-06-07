import { MainPage } from "./pages/main/index.js";

const root = document.getElementById('root');
const homeLink = document.getElementById('home-link');

const startApp = (e) => {
    if(e) e.preventDefault();
    new MainPage(root).render();
};

homeLink.onclick = startApp;
startApp();
