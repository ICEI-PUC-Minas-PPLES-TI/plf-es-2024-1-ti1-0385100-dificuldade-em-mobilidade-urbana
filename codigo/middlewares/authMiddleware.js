const userModel = require('../models/userModel');

module.exports = {
    authenticateUser: function(req, res, next) {
        const { email, senha } = req.body;
        const user = userModel.getUserByEmail(email);

        if (!user || user.senha !== senha) {
            return res.status(401).json({message: 'Usuário ou senha inválidos'});
        };
        next();
    }
}