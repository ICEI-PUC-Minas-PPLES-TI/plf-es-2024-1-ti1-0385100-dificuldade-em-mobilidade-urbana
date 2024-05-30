var clientes = getClientes();

if (!clientes) {
    clientes = [
        {
            "id": 1,
            "nome": "Fulano da Silva",
            "email": "fulano@gmail.com",
            "senha": "1234A",
            "template": 1,
            "favoritos": [1, 2],
            "img_url": "https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg?w=826"
        }
    ];

    setClientes(clientes);
};

console.log(clientes);

// Escolher um cliente aleatoriamente para simular a sessão
let cod = Math.floor(Math.random() * clientes.length) + 1;
var cliente = clientes.find(c => c.id == cod);
console.log(cliente);

var nameElements = document.getElementsByClassName("nameElements");
for (let i = 0; i < nameElements.length; i++) {
    nameElements[i].innerHTML = cliente.nome;
};

var emailElement = document.getElementById("emailElement");
emailElement.innerHTML = cliente.email;

var passwordElement = document.getElementById("passwordElement");
passwordElement.innerHTML = cliente.senha;

var imgElement = document.getElementById("imgElement");
imgElement.src = cliente.img_url;

function trocarTemplate(idTemplate) {
    console.log(idTemplate);
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

function removerCliente() {
    let clienteIndex = clientes.findIndex(c => c.id === cliente.id);
    clientes.splice(clienteIndex, 1);
    setClientes(clientes);
    alert("Conta deletada com sucesso!");
};


function setClientes(clientes) {
    localStorage.setItem('clientes', JSON.stringify(clientes));
};

function getClientes() {
    return JSON.parse(localStorage.getItem('clientes'));
};

