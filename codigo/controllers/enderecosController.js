const enderecosModel = require('../models/enderecosModel');

module.exports = {
    getEnderecos: function(req, res) {
        const enderecos = enderecosModel.getEnderecos();
        if (!enderecos) {
            return res.status(404).json({ error: "No addresses found" });
        };
        res.status(200).json(enderecos);
    },

    getEnderecoById: function(req, res) {
        const enderecoId = req.params.id;
        const endereco = enderecosModel.getEnderecoById(enderecoId);
        if (!endereco) {
            return res.status(404).json({ error: "Address not found" });
        };
        res.status(200).json(endereco);
    },

    addEndereco: function(req, res) {
        const { userId, titulo, rua, numero, cep, estado, cidade } = req.body;
        if (!userId || !titulo || !rua || !numero || !estado || !cidade) {
            return res.status(400).json({ message: "Invalid data" });
        };
        const endereco = { userId, titulo, rua, numero, cep: cep || null, estado, cidade};

        enderecosModel.addEndereco(endereco);
        res.status(201).json({ message: "Address created" });
    },

    updateEndereco: function(req, res) {
        const enderecoId = req.params.id;

        let endereco = enderecosModel.getEnderecoById(enderecoId);
        if (!endereco) {
            return res.status(404).json({ error: "Address not found" });
        };

        const { titulo, rua, numero, cep, estado, cidade } = req.body;
        if (!titulo || !rua || !numero || !estado || !cidade) {
            return res.status(400).json({ message: "Invalid data" });
        };

        endereco.titulo = titulo;
        endereco.rua = rua;
        endereco.numero = numero;
        endereco.cep = cep;
        endereco.estado = estado;
        endereco.cidade = cidade;

        enderecosModel.updateEndereco(enderecoId, endereco);
        res.status(200).json({ message: "Address updated" });
    },

    deleteEndereco: function(req, res) {
        const enderecoId = req.params.id;

        let endereco = enderecosModel.getEnderecoById(enderecoId);
        if (!endereco) {
            return res.status(404).json({ error: "Address not found" });
        };

        enderecosModel.deleteEndereco(enderecoId);
        res.status(200).json({ message: "Address deleted" });
    }
}