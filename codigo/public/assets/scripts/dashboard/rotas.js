let rotas = [];
const modal = document.getElementById('editModal');
const modal2 = document.getElementById('createModal');

const API_URL = 'https://idealbus.discloud.app/';

async function buscarDados() {
    const response = await fetch(`${API_URL}rotas`)
    .catch((error) => {alert('Erro ao buscar dados!')});

    const data = await response.json();
    rotas = [];

    data.forEach(rota => {
        rotas = rotas.concat(rota);
    });
    atualizarTabela();
}

function atualizarTabela() {
    const tabela = document.getElementById('tabela');
    tabela.innerHTML = '<tr><th>Nome</th><th>Pontos</th><th>Alertas</th><th>ID</th><th class="texto-acoes">Ações</th></tr>';

    rotas.forEach((rota, index) => {
        const linha = document.createElement('tr');
        Object.values(rota).forEach((valor) => {
            const celula = document.createElement('td');
            if (Array.isArray(valor)) {
                if (valor.length === 0) {
                    celula.textContent = "Nenhum";
                } else {
                    celula.textContent = valor[0].type ? valor.map(alerta => alerta.type).join(', ') : valor.map(ponto => ponto.endereco).join(', ');
                }
            } else {
                celula.textContent = valor;
            }
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
        botaoExcluir.onclick = () => excluirRota(rota.id);
        botaoEditar.onclick = () => abrirModalEditar(rota.id);

        celulaAcoes.appendChild(botaoEditar);
        celulaAcoes.appendChild(botaoExcluir);

        linha.appendChild(celulaAcoes);
        tabela.appendChild(linha);
    });
}

async function abrirModalEditar(id) {
    const response = await fetch(`${API_URL}rotas/${id}`)
    .catch((error) => {alert('Erro ao buscar dados!')});
    const data = await response.json();

    const pontosResponse = await fetch(`${API_URL}paradas`)
    .catch((error) => {alert('Erro ao buscar dados!')});
    const pontosData = await pontosResponse.json();

    const selector = document.getElementById('paradas');
    selector.innerHTML = '';

    pontosData.forEach(ponto => {
        const option = document.createElement('option');
        option.value = ponto.id;
        option.textContent = ponto.endereco;
        selector.appendChild(option);
    });

    modal.style.display = 'block';
    document.getElementById('editform').addEventListener('submit', (event) => {
        event.preventDefault();
        const paradas = document.getElementById('paradas');
        if(paradas.selectedOptions.length === 0) {
            return alert('Preencha todos os campos!');
        }

        atualizarRota(id, paradas);
    })
}

async function abrirModalCriar() {
    const pontosResponse = await fetch(`${API_URL}paradas`)
    .catch((error) => {alert('Erro ao buscar dados!')});
    const pontosData = await pontosResponse.json();

    const selector = document.getElementById('paradasCriar');
    selector.innerHTML = '';

    pontosData.forEach(ponto => {
        const option = document.createElement('option');
        option.value = ponto.id;
        option.textContent = ponto.endereco;
        selector.appendChild(option);
    });

    modal2.style.display = 'block';
    document.getElementById('createform').addEventListener('submit', (event) => {
        event.preventDefault();
        const paradas = document.getElementById('paradasCriar');
        if(paradas.selectedOptions.length === 0) {
            return alert('Preencha todos os campos!');
        }

        criarRota(paradas);
        fecharModal2Editor();
    });
}

async function criarRota(paradas) {
    const paradasArray = Array.from(paradas.selectedOptions).map(option => option.value);
    const name = document.getElementById('nameCreate').value;
    const response = await fetch(`${API_URL}rotas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stops: paradasArray, name: name })
    })
    .catch((error) => {alert('Erro ao criar rota!')});
    alert('Rota criada com sucesso!');
    buscarDados();
}

async function atualizarRota(id, paradas) {
    const paradasArray = Array.from(paradas.selectedOptions).map(option => option.value);
    const name = document.getElementById('nameUpdate').value;
    const response = await fetch(`${API_URL}rotas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stops: paradasArray, name: name })
    })
    .catch((error) => {alert('Erro ao atualizar rota!')});

    alert('Rota atualizada com sucesso!');
    buscarDados();
    fecharModalEditor();
}

async function excluirRota(id) {
    const response = await fetch(`${API_URL}rotas/${id}`, {
        method: 'DELETE'
    })
    .catch((error) => {alert('Erro ao excluir rota!')});

    alert('Rota excluída com sucesso!');
    buscarDados();
}

function fecharModalEditor() {
    modal.style.display = 'none';
}

function fecharModal2Editor() {
    modal2.style.display = 'none';
}

window.onload = buscarDados;