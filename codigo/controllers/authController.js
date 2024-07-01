const userModel = require('../models/userModel');

module.exports = {
    login: function(req, res) {
        res.status(200).send({message: 'Login efetuado com sucesso'});
    },

    getInfo: function(req, res) {
        const email = req.params.email;
        try {
            const user = userModel.getUserInfo(email);
            if (!user) {
                return res.status(404).json({message: 'Usuário não encontrado'});
            };

            res.status(200).json(user);
        } catch(err) {
            console.log(err);
            res.status(500).json({message: 'Erro ao buscar usuário'});
        };
    }
}