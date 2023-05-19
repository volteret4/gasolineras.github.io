import { displayData } from "./displayData.js";
import { loadData } from "./loadData.js";

const gh = new GitHubLogin({
    clientId: "TU_CLIENT_ID_DE_GITHUB",
    redirectUri: "TU_REDIRECT_URI_DE_GITHUB",
    scope: "repo",
    });

let loggedIn = false;

function initGitHub() {
    const loginButton = gh.createLoginButton({
        id: "github-login",
        text: "Iniciar sesión con GitHub",
    });

    if (loggedIn) {
        loginButton.style.display = "none";
    }

    gh.onLogin(response => {
        // El usuario ha iniciado sesión con éxito
        console.log("Iniciaste sesión con éxito en GitHub", response);

        // Guardar el token de acceso personal del usuario en localStorage
        localStorage.setItem("github-token", response.token);

        // Actualizar las solicitudes HTTP para incluir el token de acceso personal del usuario
        fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${response.token}`,
        },
        })
        .then(response => response.json())
        .then(user => {
            fetch(`https://api.github.com/repos/${user.login}/reyes.json`, {
            headers: {
                Authorization: `Bearer ${response.token}`,
            },
            })
            .then(response => response.json())
            .then(data => {
                jsonData = data;
                displayData("");
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));

        loggedIn = true;
    });

    // Verificar si el usuario ya ha iniciado sesión anteriormente
    const token = localStorage.getItem("github-token");

    if (token) {
        // Actualizar las solicitudes HTTP para incluir el token de acceso personal del usuario
        fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        .then(response => response.json())
        .then(user => {
            fetch(`https://api.github.com/repos/${user.login}/reyes.json`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            })
            .then(response => response.json())
            .then(data => {
                jsonData = data;
                displayData("");
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    }
}

const nameSelect = document.getElementById("name");

nameSelect.addEventListener("change", event => {
    const name = event.target.value;
    displayData(name);
});

loadData().then(() => {
    displayData("");

    initGitHub();
});
