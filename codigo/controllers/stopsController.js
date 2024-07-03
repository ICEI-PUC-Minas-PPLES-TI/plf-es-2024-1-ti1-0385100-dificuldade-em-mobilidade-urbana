const stopsModel = require('../models/stopsModel');

module.exports = {
    getStops: function(req, res) {
        res.status(200).json(stopsModel.getStops());
    },

    getStopById: function(req, res) {
        const id = req.params.id;
        const stop = stopsModel.getStopById(id);
        if (!stop) return res.status(404).json({message: 'Ponto não encontrado'});

        res.status(200).json(stop);
    },

    addStop: function(req, res) {
        const { endereco, latitude, longitude } = req.body;
        if (!endereco || !latitude || !longitude) return res.status(400).json({message: 'Dados inválidos'});

        stopsModel.addStop({ endereco, latitude, longitude });
        res.status(201).json({message: 'Ponto cadastrado com sucesso'});
    },

    updateStop: function(req, res) {
        const id = req.params.id;
        const { endereco, latitude, longitude } = req.body;
        console.log(req.body)
        if (!endereco || !latitude || !longitude) return res.status(400).json({message: 'Dados inválidos'});

        stopsModel.updateStop(id, { endereco, latitude, longitude, id });
        res.status(200).json({message: 'Ponto atualizado com sucesso'});
    },

    deleteStop: function(req, res) {
        const id = req.params.id;
        stopsModel.deleteStop(id);
        res.status(200).json({message: 'Ponto deletado com sucesso'});
    }
}