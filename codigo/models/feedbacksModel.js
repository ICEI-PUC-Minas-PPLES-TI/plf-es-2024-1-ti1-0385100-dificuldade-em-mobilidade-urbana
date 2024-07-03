const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let db = {};

function getDb() {
    try {
        const data = fs.readFileSync('./db.json');
        db = JSON.parse(data);
    } catch(err) {
        console.log(err);
    };
};

function saveDB() {
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
};

module.exports = {
    getFeedbacks: function() {
        getDb();
        return db.feedbacks || null;
    },

    getFeedbackById: function(id) {
        getDb();
        const feedback = db.feedbacks.find(feedback => feedback.id === id);
        if (!feedback) return null;
        return feedback;
    },

    addFeedback: function(feedback) {
        getDb();
        feedback.id = uuidv4();
        db.feedbacks.push(feedback);
        saveDB();
    },

    updateFeedback: function(id, newFeedback) {
        getDb();
        const index = db.feedbacks.findIndex(feedback => feedback.id === id);
        if (index === -1) return;
        db.feedbacks[index] = newFeedback;
        saveDB();
    },

    deleteFeedback: function(id) {
        getDb();
        db.feedbacks = db.feedbacks.filter(feedback => feedback.id !== id);
        saveDB();
    }
}