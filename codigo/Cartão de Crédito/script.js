const form = document.getElementById('cadastracartao');
const listacartoes = document.getElementById('listacartoes');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const num = document.getElementById('num').value;
    const validade = document.getElementById('validade').value;
    const cvc = document.getElementById('cvc').value;

    if (validateCard(num, validade, cvc)) {
        const card = {
            nome: nome,
            num: num,
            validade: validade,
            cvc: cvc
        };

        saveCard(card);
        displayCards();
    } else {
        alert('Dados do cartão incorretos. Por favor, verifique e tente novamente.');
    }
});

function validateCard(num, validade, cvc) {
    const numRegex = /^\d{16}$/;
    const validadeRegex = /^(0[1-9]|1[0-2])\/([2-9][5-9])$/;
    const cvcRegex = /^\d{3}$/;

    return numRegex.test(num) && validadeRegex.test(validade) && cvcRegex.test(cvc);
}

function saveCard(card) {
    let cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards.push(card);
    localStorage.setItem('cards', JSON.stringify(cards));
}

function displayCards() {
    listacartoes.innerHTML = '';
    const cards = JSON.parse(localStorage.getItem('cards')) || [];

    cards.forEach(function(card, index) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <p><strong>Titular:</strong> ${card.nome}</p>
            <p><strong>Número:</strong> ${card.num}</p>
            <p><strong>Validade:</strong> ${card.validade}</p>
            <p><strong>CVC:</strong> ${card.cvc}</p>
            <button onclick="deleteCard(${index})">Excluir</button>
        `;
        listacartoes.appendChild(cardElement);
    });
}

function deleteCard(index) {
    let cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards.splice(index, 1);
    localStorage.setItem('cards', JSON.stringify(cards));
    displayCards();
}

displayCards();
