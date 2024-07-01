const fs = require('fs');

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
    getUsers: function() {
        getDb();
        return db.users;
    },

    getUserByEmail: function(email) {
        getDb();
        return db.users.find(user => user.email === email);
    },

    getUserInfo: function(email) {
        getDb();
        const user = db.users.find(user => user.email === email);
        if (!user) return null;
        return { nome: user.nome, email: user.email, layout: user.layout };
    },

    addUser: function(user) {
        getDb();
        db.users.push(user);
        saveDB();
    },

    updateUser: function(email, newUser) {
        getDb();
        const index = db.users.findIndex(user => user.email === email);
        if (index === -1) return;
        db.users[index] = Object.assign(db.users[index], newUser);
        saveDB();
    },

    updateEmail: function(email, newEmail) {
        getDb();
        const index = db.users.findIndex(user => user.email === email);
        if (index === -1) return;
        db.users[index].email = newEmail;
        saveDB();
    },

    updatePassword: function(email, newPassword) {
        getDb();
        const index = db.users.findIndex(user => user.email === email);
        if (index === -1) return;
        db.users[index].senha = newPassword;
        saveDB();
    }
}