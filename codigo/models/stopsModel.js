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
    getStops: function() {
        getDb();
        return db.stops;
    },

    getStopById: function(id) {
        getDb();
        return db.stops.find(stop => stop.id === id);
    },

    addStop: function(stop) {
        getDb();
        stop.id = uuidv4();
        db.stops.push(stop);
        saveDB();
    },

    updateStop: function(id, newStop) {
        getDb();
        const index = db.stops.findIndex(stop => stop.id === id);
        if (index === -1) return;
        db.stops[index] = newStop;
        saveDB();
    },

    deleteStop: function(id) {
        getDb();
        db.stops = db.stops.filter(stop => stop.id !== id);
        saveDB();
    }
}