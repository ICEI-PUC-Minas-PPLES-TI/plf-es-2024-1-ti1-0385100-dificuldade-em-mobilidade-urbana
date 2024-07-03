const feedbacksModel = require('../models/feedbacksModel');

module.exports = {
    getFeedbacks: function(req, res) {
        const feedbacks = feedbacksModel.getFeedbacks();
        if (!feedbacks) {
            return res.status(404).json({ error: "No feedbacks found" });
        };
        res.status(200).json(feedbacks);
    },

    getFeedbackById: function(req, res) {
        const feedbackId = req.params.id;
        const feedback = feedbacksModel.getFeedbackById(feedbackId);
        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        };
        res.status(200).json(feedback);
    },

    addFeedback: function(req, res) {
        const { routeId, userId, datetime, nota, comentario } = req.body;
        if (!routeId || !userId || !datetime || !nota || !comentario) {
            return res.status(400).json({ message: "Invalid data" });
        };
        const feedback = { routeId, userId, datetime, nota, comentario };

        feedbacksModel.addFeedback(feedback);
        res.status(201).json({ message: "Feedback created" });
    },

    updateFeedback: function(req, res) {
        const feedbackId = req.params.id;

        let feedback = feedbacksModel.getFeedbackById(feedbackId);
        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        };

        const { nota, comentario } = req.body;
        if (!nota || !comentario) {
            return res.status(400).json({ message: "Invalid data" });
        };

        feedback.nota = nota;
        feedback.comentario = comentario;

        feedbacksModel.updateFeedback(feedbackId, feedback);
        res.status(200).json({ message: "Feedback updated" });
    },

    deleteFeedback: function(req, res) {
        const feedbackId = req.params.id;

        let feedback = feedbacksModel.getFeedbackById(feedbackId);
        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        };

        feedbacksModel.deleteFeedback(feedbackId);
        res.status(200).json({ message: "Feedback deleted" });
    }
}