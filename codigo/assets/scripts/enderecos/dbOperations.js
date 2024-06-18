// Pegar endereços do localStorage
function getEnderecos() {
    let enderecos = localStorage.getItem('enderecos');
    enderecos = JSON.parse(enderecos) || [];
    return enderecos;
};

// Pegar endereço do localStorage pelo id
function getEnderecoById(id) {
    let enderecos = getEnderecos();
    let feedback = enderecos.find(f => f.id == id);
    return feedback;
};

// Setar endereços no localStorage
function setEnderecos(enderecos) {
    enderecos = JSON.stringify(enderecos);
    localStorage.setItem('enderecos', enderecos);
};


