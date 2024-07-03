let pontos = [];
const modal = document.getElementById('editModal');
const modal2 = document.getElementById('createModal');

const API_URL = 'https://idealbus.discloud.app/';

async function buscarDados() {
    const response = await fetch(`${API_URL}paradas`)
    .catch((error) => {alert('Erro ao buscar dados!')});

    const data = await response.json();
    pontos = [];

    data.forEach(ponto => {
      pontos = pontos.concat(ponto);
    });
    atualizarTabela();
}

function atualizarTabela() {
    const tabela = document.getElementById('tabela');
    tabela.innerHTML = '<tr><th>Endereço</th><th>Latitude</th><th>Longitude</th><th>ID</th><th class="texto-acoes">Ações</th></tr>';

    pontos.forEach((ponto, index) => {
        const linha = document.createElement('tr');

        Object.values(ponto).forEach((valor) => {
            const celula = document.createElement('td');
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const celulaAcoes = document.createElement('td');
        celulaAcoes.className = 'acoes';

        const botaoExcluir = document.createElement('button');
        const botaoEditar = document.createElement('button');

        botaoExcluir.innerHTML = '<i class="fas fa-trash">';
        botaoEditar.innerHTML = '<i class="fas fa-pencil-alt">';
        botaoExcluir.className = 'botaoExcluir';
        botaoEditar.className = 'botaoEditar';
        botaoExcluir.onclick = () => excluirPonto(ponto.id);
        botaoEditar.onclick = () => abrirModalEditar(ponto.id);

        celulaAcoes.appendChild(botaoEditar);
        celulaAcoes.appendChild(botaoExcluir);

        linha.appendChild(celulaAcoes);
        tabela.appendChild(linha);
    });
}

async function abrirModalEditar(id) {
    const response = await fetch(`${API_URL}paradas/${id}`)
    .catch((error) => {alert('Erro ao buscar dados!')});
    
    const data = await response.json();

    document.getElementById('endereco').value = data.endereco;
    document.getElementById('latitude').value = data.latitude;
    document.getElementById('longitude').value = data.longitude;

    modal.style.display = 'block';
    document.getElementById('editform').addEventListener('submit', (event) => {
        event.preventDefault();
        const endereco = document.getElementById('endereco').value;
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;

        if(endereco == '' || !latitude || !longitude) return alert('Preencha todos os campos!');

        atualizarParada(id, endereco, latitude, longitude);
        alert('Parada atualizada com sucesso!');
    });
}

async function abrirModalCriar() {
    modal2.style.display = 'block';
    document.getElementById('createform').addEventListener('submit', (event) => {
        event.preventDefault();
        const endereco = document.getElementById('enderecoCadastrar').value;
        const latitude = document.getElementById('latitudeCadastrar').value;
        const longitude = document.getElementById('longitudeCadastrar').value;

        if(endereco == '' || !latitude || !longitude) return alert('Preencha todos os campos!');

        criarParada(endereco, latitude, longitude);
        alert('Parada criada com sucesso!');
    });
}

async function criarParada(endereco, latitude, longitude) {
    const response = await fetch(`${API_URL}paradas`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            endereco,
            latitude,
            longitude
        })
    })
    .catch((error) => {alert('Erro ao criar parada!')});

    const data = await response.json();
    buscarDados();
    fecharModal2Editor();
}

async function atualizarParada(id, endereco, latitude, longitude) {
    const response = await fetch(`https://idealbus.discloud.app/paradas/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            endereco,
            latitude,
            longitude
        })
    })
    .catch((error) => {alert('Erro ao atualizar parada!')});

    const data = await response.json();
    buscarDados();
    fecharModalEditor();
}

async function excluirPonto(id) {
    const response = await fetch(`https://idealbus.discloud.app/paradas/${id}`, {
        method: 'DELETE'
    })
    .catch((error) => {alert('Erro ao excluir parada!')});
    
    const data = await response.json();
    buscarDados();
}

function fecharModalEditor() {
    modal.style.display = 'none';
}

function fecharModal2Editor() {
    modal2.style.display = 'none';
    document.getElementById('enderecoCadastrar').value = '';
    document.getElementById('latitudeCadastrar').value = '';
    document.getElementById('longitudeCadastrar').value = '';
}

window.onclick = function(event) {
    if((event.target == modal && modal.style.display == 'block') || (event.target == modal2 && modal2.style.display == 'block')) {
        fecharModalEditor();
        fecharModal2Editor();
    }
}

window.onload = buscarDados;