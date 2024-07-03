const userModel = require('../models/userModel');

module.exports = {
    registerUser: function(req, res) {
        const { nome, email, senha, layout } = req.body;
        if(!nome || !email || !senha || !layout) return res.status(400).json({message: 'Dados inválidos'});
        if(userModel.getUserByEmail(email)) return res.status(400).json({message: 'Usuário já cadastrado'});

        userModel.addUser({ nome, email, senha, layout });
        res.status(201).json({message: 'Usuário cadastrado com sucesso'});
    },

    editUser: function(req, res) {
        const { nome, senha, layout, imagem } = req.body;
        if(!nome || !senha || !layout || !imagem) return res.status(400).json({message: 'Dados inválidos'});

        userModel.updateUser(req.params.id, { nome, senha, layout, imagem });
        res.status(200).json({message: 'Usuário atualizado com sucesso'});
    },

    editEmail: function(req, res) {
        const { email } = req.body;
        if(!email) return res.status(400).json({message: 'Dados inválidos'});

        userModel.updateEmail(req.params.id, email);
        res.status(200).json({message: 'Email atualizado com sucesso'});
    },

    editPassword: function(req, res) {
        const { senha } = req.body;
        if(!senha) return res.status(400).json({message: 'Dados inválidos'});

        userModel.updatePassword(req.params.id, senha);
        res.status(200).json({message: 'Senha atualizada com sucesso'});
    }
}