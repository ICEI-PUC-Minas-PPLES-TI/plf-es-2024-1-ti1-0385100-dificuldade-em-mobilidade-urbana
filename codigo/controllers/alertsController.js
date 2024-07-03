const { v4: uuidv4 } = require('uuid');
const routesModel = require('../models/routesModel');

module.exports = {
    getAlerts: function(req, res) {
        const routes = routesModel.getRoutes();
        if (!routes) {
            return res.status(404).json({ error: "No alerts found" });
        };

        const alerts = routes.map(route => route.alerts).flat();
        if (alerts.length === 0) {
            return res.status(404).json({ error: "No alerts found" });
        };

        res.status(200).json(alerts);
    },

    getAlertById: function(req, res) {
        const alertId = req.params.id;

        const routes = routesModel.getRoutes();
        if (!routes) {
            return res.status(404).json({ error: "No alerts found" });
        };

        const alerta = routes.map(route => route.alerts).flat().find(alerta => alerta.id === alertId);
        if (!alerta) {
            return res.status(404).json({ error: "Alert not found" });
        };

        res.status(200).json(alerta);
    },

    addAlert: function(req, res) {
        const id = uuidv4();
    
        const { routeId, type, datetime } = req.body;
        if (!routeId || !type || !datetime) {
            return res.status(400).json({ message: "Invalid data" });
        }
    
        const newAlert = { id, type, datetime, accepted: false };
    
        const routes = routesModel.getRoutes();
        if (!routes) {
            return res.status(404).json({ error: "No routes found" });
        }

        const routeToUpdate = routes.find(route => route.id === routeId);
        if (!routeToUpdate) {
            return res.status(404).json({ error: "Route not found" });
        }
    
        routeToUpdate.alerts.push(newAlert);
        routesModel.updateRoute(routeId, { alerts: routeToUpdate.alerts });
        res.status(201).json({ message: "Alert created" });
    },

    toggleAlertStatus: function(req, res) {
        const { id, newStatus } = req.params;

        const routes = routesModel.getRoutes();
        if (!routes) {
            return res.status(404).json({ error: "No alerts found" });
        };

        let alertFound = false;
        let routeWithAlert = routes.find(route => {
            const alerta = route.alerts.find(alerta => alerta.id === id);
            if (alerta) {
                alerta.accepted = newStatus == "accept" ? true : false;
                alertFound = true;
                return true;
            };
            return false;
        });

        if (!alertFound) {
            return res.status(404).json({ error: "Alert not found" });
        };

        routesModel.updateRoute(routeWithAlert.id, routeWithAlert);
        res.status(200).json({ message: "Alert status toggled" });
    },

    deleteAlert: function(req, res) {
        const id = req.params.id;

        const routes = routesModel.getRoutes();
        if (!routes) {
            return res.status(404).json({ error: "No alerts found" });
        };

        let alertFound = false;
        let routeWithAlert = routes.find(route => {
            const alertIndex = route.alerts.findIndex(alerta => alerta.id === id);
            if (alertIndex !== -1) {
                route.alerts.splice(alertIndex, 1);
                alertFound = true;
                return true;
            };
            return false;
        });

        if (!alertFound) {
            return res.status(404).json({ error: "Alert not found" });
        };

        routesModel.updateRoute(routeWithAlert.id, routeWithAlert);
        res.status(200).json({ message: "Alert deleted" });
    }
}