const routesModel = require('../models/routesModel');

module.exports = {
    getRoutes: function(req, res) {
        const routes = routesModel.getRoutes();
        if (!routes) {
            return res.status(404).json({ error: 'No routes found' });
        };

        res.status(200).json(routes);
    },

    getRouteById: function(req, res) {
        const route = routesModel.getRouteById(req.params.id);
        if (!route) return res.status(404).json({ error: 'Route not found' });

        res.json(route);
    },

    addRoute: function(req, res) {
        const { name, stops } = req.body;
        if (!name || !stops) return res.status(400).json({ error: 'Invalid data' });

        routesModel.addRoute({ name, stops, alerts: [] });
        res.status(201).json({ message: 'Route created' });
    },

    updateRoute: function(req, res) {
        const id = req.params.id;

        const { name, stops } = req.body;
        if (!name || !stops) return res.status(400).json({ error: 'Invalid data' });

        let route = routesModel.getRouteById(id);
        route.name = name;
        route.stops = stops;

        routesModel.updateRoute(req.params.id, route);

        res.status(200).json({ message: 'Route updated' });
    },

    deleteRoute: function(req, res) {
        routesModel.deleteRoute(req.params.id);
        res.status(200).json({ message: 'Route deleted' });
    }
}