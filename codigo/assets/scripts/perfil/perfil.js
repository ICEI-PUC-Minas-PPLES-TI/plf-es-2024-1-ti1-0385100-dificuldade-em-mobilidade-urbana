const params = new URLSearchParams(window.location.search);

function trocarTemplate(idTemplate) {
    cliente.template = idTemplate;
    setClientes(clientes);
    alert("Template alterado com sucesso!");
};

function trocarSenha() {
    let passwordElement = document.getElementById("newPassword");
    novaSenha = passwordElement.value;

    let clienteIndex = clientes.findIndex(c => c.id === cliente.id);
    clientes[clienteIndex].senha = novaSenha;

    setClientes(clientes);
    alert("Senha alterada com sucesso!");
};

function trocarEmail() {
    let emailElement = document.getElementById("newEmail");
    novoEmail = emailElement.value;

    let clienteIndex = clientes.findIndex(c => c.id === cliente.id);
    clientes[clienteIndex].email = novoEmail;

    setClientes(clientes);
    alert("Email alterado com sucesso!");
};

async function getClientes() {
    const email = params.get('email');
    const response = await fetch(`https://idealbus.discloud.app/getinfo/${email}`, {
        method: 'GET',
    });

    const data = await response.json();

    document.getElementById("imgElement").src = data.img_url || "https://pbs.twimg.com/media/EyQ9kUUXIAIDZXr.jpg";
    document.getElementById("emailElement").innerHTML = data.email;
    document.getElementById("nameElements").innerHTML = data.nome;
};

function sendFavs() {
    const email = params.get('email');
    return window.location.href = '../user/favoritas.html?email=' + email;
}

function sendMap() {
    const email = params.get('email');
    return window.location.href = '../mains/map.html?email=' + email;
}

getClientes();