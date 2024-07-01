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
    getEnderecos: function() {
        getDb();
        return db.enderecos || null;
    },

    getEnderecoById: function(id) {
        getDb();
        const endereco = db.enderecos.find(endereco => endereco.id === id);
        if (!endereco) return null;
        return endereco;
    },

    addEndereco: function(endereco) {
        getDb();
        endereco.id = uuidv4();
        db.enderecos.push(endereco);
        saveDB();
    },

    updateEndereco: function(id, newEndereco) {
        getDb();
        const index = db.enderecos.findIndex(endereco => endereco.id === id);
        if (index === -1) return;
        db.enderecos[index] = newEndereco;
        saveDB();
    },

    deleteEndereco: function(id) {
        getDb();
        db.enderecos = db.enderecos.filter(endereco => endereco.id !== id);
        saveDB();
    }
}