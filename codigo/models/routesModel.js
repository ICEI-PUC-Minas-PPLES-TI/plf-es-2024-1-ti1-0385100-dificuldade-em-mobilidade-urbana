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
    getRoutes: function() {
        getDb();
        return db.routes.map(route => {
            const stops = route.stops
                .filter(stopId => db.stops.some(stop => stop.id === stopId))
                .map(stopId => db.stops.find(stop => stop.id === stopId));

            return {...route, stops};
        });
    },

    getRouteById: function(id) {
        getDb();
        const route = db.routes.find(route => route.id === id);
        if (!route) return null;

        const stops = route.stops
            ? route.stops
                .filter(stopId => db.stops.some(stop => stop.id === stopId))
                .map(stopId => db.stops.find(stop => stop.id === stopId))
            : [];

        return {...route, stops};
    },

    addRoute: function(route) {
        getDb();
        route.id = uuidv4();
        db.routes.push(route);
        saveDB();
    },

    updateRoute: function(id, updatedFields) {
        getDb();
    
        const index = db.routes.findIndex(route => route.id === id);
        if (index === -1) return;
    
        db.routes[index] = {
            ...db.routes[index],
            ...updatedFields
        };
    
        saveDB();
    },

    deleteRoute: function(id) {
        getDb();
        db.routes = db.routes.filter(route => route.id !== id);
        saveDB();
    }
}