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
    let endereco = getEnderecoById(id);

    limparModal();

    document.getElementById("enderecoId").value = id;
    document.getElementById("modalType").value = "edit";

    document.getElementById("inputTitulo").value = endereco.titulo;
    document.getElementById("inputRua").value = endereco.rua;
    document.getElementById("inputNum").value = endereco.numero;
    document.getElementById("inputCep").value = endereco.cep || "";
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

async function cepFunc(cep) {
    var valor = cep?.value;
    valor = valor.replace(/\D/g,"")                    //Remove tudo o que não é dígito
                 .replace(/^(\d{5})(\d)/,"$1-$2")     //Coloca hífen entre o quinto e o sexto dígitos
                 .replace(/(\d{5}-\d{3}).*/,"$1");    //Remove qualquer coisa após o nono caractere
    cep.value = valor;
    console.log(cep.value);

    if (cep) {
        try {
            const response = await fetch('https://viacep.com.br/ws/'+cep.value+'/json/')
            const data = await response.json();
            console.log(data);

            document.getElementById("inputRua").value = data.logradouro;
            document.getElementById("inputEstado").value = data.uf;
            document.getElementById("inputCidade").value = data.localidade;
            document.getElementById("inputCep").value = data.cep;
        } catch(err) {
            console.log('Erro: ' + err);
        }
    };
};


// Função para adicionar endereço
async function adicionarEndereco() {
    let id = Math.floor(Math.random() * 1000000);
    document.getElementById("enderecoId").value = id;

    let titulo = document.getElementById("inputTitulo").value;
    let rua = document.getElementById("inputRua").value;
    let numero = document.getElementById("inputNum").value;
    let cep = document.getElementById("inputCep").value;
    let estado = document.getElementById("inputEstado").value;
    let cidade = document.getElementById("inputCidade").value;

    if (!cep || !titulo) {
        if (!rua || !numero || !estado || !cidade || !titulo) {
            alert("Preencha todos os campos");
            return;
        }
    } else if (!cep && ( !rua || !numero || !estado || !cidade )) {
        alert("Preencha todos os campos");
        return;
    };

    // console.log(titulo, rua, numero, cep, estado, cidade);

    let endereco = {
        "id": id,
        "titulo": titulo,
        "rua": rua,
        "numero": numero,
        "cep": cep,
        "estado": estado,
        "cidade": cidade
    };

    let enderecos = getEnderecos();
    if (!enderecos) {
        enderecos = [];
    };

    enderecos.push(endereco);
    setEnderecos(enderecos);
    $('#modalEndereco').modal('hide');
    loadElements();
};

// Função para editar endereço
function editarEndereco() {
    let id = document.getElementById("enderecoId").value;

    let enderecos = getEnderecos();
    let endereco = enderecos.find(endereco => endereco.id == id);

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

async function loadElements() {
    let enderecos = getEnderecos();
    let listaEnderecos = document.getElementById("enderecos");

    if (enderecos === null || enderecos.length === 0) {
        listaEnderecos.innerHTML = `<div class="col-12"><h4 class="text-center">Nenhum endereço encontrado!</h4></div>`;
        return;
    }else{
        listaEnderecos.innerHTML = "";
    }

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
                                ${endereco.cep ? `<p class="card-text my-2"><b>CEP:</b> ${endereco.cep}</p>` : ""}
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
}
// Agora o resto do código para manipular a DOM e exibir os endereços dinamicamente
window.onload = loadElements();
