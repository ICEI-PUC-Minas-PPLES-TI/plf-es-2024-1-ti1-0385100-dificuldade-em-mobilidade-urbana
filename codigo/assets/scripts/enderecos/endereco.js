// Pegar endereços do localStorage
function getEnderecos() {
    let enderecos = localStorage.getItem("enderecos");
    if (!enderecos) {
        return null;
    };
    return JSON.parse(enderecos);
};

// Salvar endereços no localStorage
function setEnderecos(enderecos) {
    localStorage.setItem("enderecos", JSON.stringify(enderecos));
};

// Limpar modal
function limparModal() {
    document.getElementById("enderecoId").value = "";
    document.getElementById("modalType").value = "";

    document.getElementById("inputTitulo").value = "";
    document.getElementById("inputRua").value = "";
    document.getElementById("inputNum").value = "";
    document.getElementById("inputCep").value = "";
    document.getElementById("inputEstado").value = "";
    document.getElementById("inputCidade").value = "";
};

// Preenchendo e abrindo modal para editar endereço
function editEnderecoModal(id) {
    let enderecos = getEnderecos();
    let endereco = enderecos.find(endereco => endereco.id === id);

    limparModal();

    document.getElementById("enderecoId").value = id;
    document.getElementById("modalType").value = "edit";

    document.getElementById("inputTitulo").value = endereco.titulo;
    document.getElementById("inputRua").value = endereco.rua;
    document.getElementById("inputNum").value = endereco.numero;
    document.getElementById("inputCep").value = endereco.cep;
    document.getElementById("inputEstado").value = endereco.estado;
    document.getElementById("inputCidade").value = endereco.cidade;

    $('#modalEndereco').modal('show');
};

$("#adicionarEnd").click(function(e) {
    e.preventDefault();
    limparModal();
    document.getElementById("modalType").value = "add";
    $('#modalEndereco').modal('show');
});

$("#sendBtn").click(function(e) {
    e.preventDefault();
    console.log("Clicou no botão de enviar");
    let tipo = document.getElementById("modalType").value;
    if (tipo === "add") {
        adicionarEndereco();
    } else {
        editarEndereco();
    };
});


// Função para adicionar endereço
function adicionarEndereco() {
    let id = Math.floor(Math.random() * 1000000);
    document.getElementById("enderecoId").value = id;

    let titulo = document.getElementById("inputTitulo");
    let rua = document.getElementById("inputRua");
    let numero = document.getElementById("inputNum");
    let cep = document.getElementById("inputCep");
    let estado = document.getElementById("inputEstado");
    let cidade = document.getElementById("inputCidade");

    fetch('https://viacep.com.br/ws/'+cep.value+'/json/')
    .then(response => response.json())
    .then(data => {
        rua.value = data.logradouro;
        estado.value = data.uf;
        cidade.value = data.localidade;
        cep.value = data.cep;
    })
    .catch(error => {
        console.error('Erro:', error);
        return;
    });

    if (!titulo || !rua || !numero || !cep || !estado || !cidade) {
        alert("Preencha todos os campos");
        return;
    };

    let endereco = {
        "id": id,
        "titulo": titulo.value,
        "rua": rua.value,
        "numero": numero.value,
        "cep": cep.value,
        "estado": estado.value,
        "cidade": cidade.value
    };

    let enderecos = getEnderecos();
    if (!enderecos) {
        enderecos = [];
    };

    enderecos.push(endereco);
    setEnderecos(enderecos);

    $('#modalEndereco').modal('hide');
};

// Função para editar endereço
function editarEndereco() {
    let id = document.getElementById("enderecoId").value;

    let enderecos = getEnderecos();
    let endereco = enderecos.find(endereco => endereco.id === id);

    endereco.titulo = document.getElementById("inputTitulo").value;
    endereco.rua = document.getElementById("inputRua").value;
    endereco.numero = document.getElementById("inputNum").value;
    endereco.cep = document.getElementById("inputCep").value;
    endereco.estado = document.getElementById("inputEstado").value;
    endereco.cidade = document.getElementById("inputCidade").value;

    setEnderecos(enderecos);

    $('#modalEndereco').modal('hide');
};

// Função para remover endereço
function removerEndereco(id) {
    let enderecos = getEnderecos();
    let endereco = enderecos.find(endereco => endereco.id === id);

    let confirm = confirm(`Deseja realmente deletar ${endereco.titulo}?\n\nCidade: ${endereco.cidade}\nEstado: ${endereco.estado}\nRua: ${endereco.rua}\nNúmero: ${endereco.numero}\nCEP: ${endereco.comentario}`);

    if (confirm) {
        let novos = enderecos.filter(endereco => endereco.id !== id);
        setEnderecos(novos);
    }
};


// Agora o resto do código para manipular a DOM e exibir os endereços dinamicamente
window.onload = function() {
    let enderecos = getEnderecos();
    let listaEnderecos = document.getElementById("enderecos");

    if (!enderecos) {
        listaEnderecos.innerHTML = `<div class="col-12"><h4 class="text-center">Nenhum endereço encontrado!</h4></div>`;
        return;
    };

    enderecos.forEach(endereco => {
        let enderecoHtml = `
            <div class="col-12 col-sm-6 col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-header">
                        <h5 class="card-title">${endereco.titulo}</h5>
                    </div>
                    <div class="card-body">
                        <div class="row justify-content-end">
                            <div class="col-sm-8 col-12">
                                <p class="card-text my-2"><b>Cidade:</b> ${endereco.cidade}</p>
                                <p class="card-text my-2"><b>Estado:</b> ${endereco.estado}</p>
                                <p class="card-text my-2"><b>Rua:</b> ${endereco.rua}</p>
                                <p class="card-text my-2"><b>Número:</b> ${endereco.numero}</p>
                                <p class="card-text my-2"><b>CEP:</b> ${endereco.cep}</p>
                            </div>
                            <div class="col-sm-2 mt-sm-0 col-auto mt-3">
                                <button class="btn ib-btn-warning btn-sm card-edit-btn" onclick="editEnderecoModal(${endereco.id})"><i class="fa fa-pen-to-square"></i></button>
                            </div>
                            <div class="col-sm-2 mt-sm-0 col-auto mt-3">
                                <button class="btn ib-btn-danger btn-sm card-delete-btn" onclick="removerEndereco(${endereco.id})"><i class="fa fa-trash-alt"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">
                                Endereço ID: ${endereco.id}
                        </small>
                    </div>
                </div>
            </div>
        `;
        listaEnderecos.innerHTML += enderecoHtml;
    });
};