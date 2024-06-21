document.addEventListener("DOMContentLoaded", function() {

    const headerNav = document.getElementById('headerNav');
    const navbarMenu = document.getElementById('navbarMenu');

    headerNav.addEventListener('click', function() {
        if (navbarMenu.classList.contains('show')) {
            navbarMenu.classList.remove('show');
        } else {
            navbarMenu.classList.add('show');
        }
    });

    // Função para buscar informações da API
    function getInfo(email) {
        fetch('LINK_DA_API/getinfo', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    // Exemplo de chamada para buscar informações de um usuário
    getInfo('exemplo@gmail.com');

    // Função para editar usuário na API
    function editUser(id, nome, senha, layout, imagem) {
        fetch(`LINK_DA_API/edituser/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nome: nome, senha: senha, layout: layout, imagem: imagem })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    // Exemplo de chamada para editar um usuário
    editUser('ID_DO_USUARIO', 'NovoNome', 'NovaSenha', 1, 'https://novaimagem.com');

    // Função para buscar todas as rotas na API
    function getAllRoutes() {
        fetch('LINK_DA_API/rotas', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    // Exemplo de chamada para buscar todas as rotas
    getAllRoutes();

    // Função para buscar informações de uma rota específica na API
    function getRouteById(id) {
        fetch(`LINK_DA_API/rotas/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    // Exemplo de chamada para buscar informações de uma rota específica
    getRouteById('ID_DA_ROTA');

    // Função para buscar todas as paradas na API
    function getAllStops() {
        fetch('LINK_DA_API/paradas', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    // Exemplo de chamada para buscar todas as paradas
    getAllStops();

    // Função para buscar informações de uma parada específica na API
    function getStopById(id) {
        fetch(`LINK_DA_API/paradas/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    // Exemplo de chamada para buscar informações de uma parada específica
    getStopById('ID_DA_PARADA');
});