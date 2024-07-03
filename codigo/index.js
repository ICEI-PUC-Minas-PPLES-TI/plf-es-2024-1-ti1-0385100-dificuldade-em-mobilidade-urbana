const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const authMiddleware = require('./middlewares/authMiddleware');

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const routeController = require('./controllers/routesController');
const stopsController = require('./controllers/stopsController');
const alertController = require('./controllers/alertsController');
const feedbackController = require('./controllers/feedbacksController');
const enderecoController = require('./controllers/enderecosController');

const app = express();
const PORT = 8080;
app.use(cors());

app.use(bodyParser.json());
app.post('/register', userController.registerUser);
app.post('/login', authMiddleware.authenticateUser, authController.login);
app.get('/getinfo/:email', authController.getInfo);
app.put('/edituser/:id', userController.editUser);
app.put('/changeEmail/:id', userController.editEmail);
app.put('/changePassword/:id', userController.editPassword);

app.get('/rotas', routeController.getRoutes);
app.get('/rotas/:id', routeController.getRouteById);
app.post('/rotas', routeController.addRoute);
app.put('/rotas/:id', routeController.updateRoute);
app.delete('/rotas/:id', routeController.deleteRoute);

app.get('/paradas', stopsController.getStops);
app.get('/paradas/:id', stopsController.getStopById);
app.post('/paradas', stopsController.addStop);
app.put('/paradas/:id', stopsController.updateStop);
app.delete('/paradas/:id', stopsController.deleteStop);

app.get('/alertas', alertController.getAlerts);
app.get('/alertas/:id', alertController.getAlertById);
app.post('/alertas', alertController.addAlert);
app.put('/alertas/:id/:newStatus', alertController.toggleAlertStatus);
app.delete('/alertas/:id', alertController.deleteAlert);

app.get('/feedbacks', feedbackController.getFeedbacks);
app.get('/feedbacks/:id', feedbackController.getFeedbackById);
app.post('/feedbacks', feedbackController.addFeedback);
app.put('/feedbacks/:id', feedbackController.updateFeedback);
app.delete('/feedbacks/:id', feedbackController.deleteFeedback);

app.get('/enderecos', enderecoController.getEnderecos);
app.get('/enderecos/:id', enderecoController.getEnderecoById);
app.post('/enderecos', enderecoController.addEndereco);
app.put('/enderecos/:id', enderecoController.updateEndereco);
app.delete('/enderecos/:id', enderecoController.deleteEndereco);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});