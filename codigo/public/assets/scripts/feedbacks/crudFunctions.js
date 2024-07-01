/*
    Esse código pode ser usado independentemente do uso de localStorage!
    Todas as operações usadas para o localStorage estão em arquivo independente.
*/


// Função para PEDIR a criação de um novo feedback pelo botão de novo feedback
function criarFeedback() {
    let { type, feedbackModal } = getElements();
    
    clearFeedbackModal(); // Limpar o modal de feedback
    type.val('new'); // Setar como novo feedback

    setRoutesToSelect(); // Adicionar rotas ao select de rotas
    feedbackModal.modal('show'); // Exibir o modal de feedback
};

// Função para criar um feedback
createFeedback = function() {
    let { feedbackId, routeId, feedbackComment, successModalFeedbackRoute, successModalFeedbackRating, successModalFeedbackComment, feedbackModal, feedbackSuccessModal } = getElements();

    let id = Math.floor(Math.random() * 99999999);
    feedbackId.val(id);
    console.log(id);

    routeId = routeId.val();
    console.log(routeId);

    if (!routeId) {
        alert('Por favor, informe o ID da rota!');
        return;
    };

    let nota = $('input[name=fb]:checked').val();
    console.log(nota);

    if (!nota) {
        alert('Por favor, dê uma classificação a esta rota!');
        return;
    };

    let comentario = feedbackComment.val();
    console.log(comentario);

    if (!comentario) {
        alert('Por favor, escreva um comentário sobre esta rota!');
        return;
    };

    let timestamp = parseInt(new Date().getTime() / 1000);
    console.log(timestamp);

    addFeedback({ id, routeId, nota, comentario, timestamp }); // localStorage.js
    feedbackModal.modal('hide');

    successModalFeedbackRoute.html(routeId);
    successModalFeedbackRating.html(nota);
    successModalFeedbackComment.html(comentario);

    feedbackSuccessModal.modal('show');
};


// Função para PEDIR a edição de um feedback pelo botão de edição de feedback
function editarFeedback(id) {
    let { feedbackId, type, routeId, feedbackComment, feedbackModal } = getElements();

    clearFeedbackModal(); // Limpar o modal de feedback
    setRoutesToSelect(); // Adicionar rotas ao select de rotas

    let feedback = getFeedbackById(id);
    feedbackId.val(feedback.id); // Preencher o id do feedback

    type.val('edit'); // Seta como feedback existente para edição

    $(`#routeId option[value=${feedback.routeId}]`).prop('selected', true);
    routeId.prop('disabled', true);

    $(`input[name=fb][value=${feedback.nota}]`).prop('checked', true);
    feedbackComment.val(feedback.comentario);

    feedbackModal.modal('show');
};

// Função para editar um feedback
editFeedback = function() {
    let { feedbackId, feedbackComment, successModalFeedbackRoute, successModalFeedbackRating, successModalFeedbackComment, feedbackModal, feedbackSuccessModal } = getElements();

    let id = feedbackId.val();
    console.log(id);

    let nota = $('input[name=fb]:checked').val();
    console.log(nota);

    let comentario = feedbackComment.val();
    console.log(comentario);

    let feedback = getFeedbackById(id);
    console.log(feedback);

    feedback.nota = nota;
    feedback.comentario = comentario;

    updateFeedbackById(id, feedback); // localStorage.js

    feedbackModal.modal('hide');

    successModalFeedbackRoute.html(feedback.routeId);
    successModalFeedbackRating.html(nota);
    successModalFeedbackComment.html(comentario);

    feedbackSuccessModal.modal('show');
};


// Função para deletar um feedback pelo botão de deletar feedback
deletarFeedback = function(id) {
    let feedback = getFeedbackById(id);
    let confirmDelete = confirm(`Deseja deletar o feedback de ID ${feedback.id}?\n\nRota: ${feedback.routeId}\nNota: ${feedback.nota}\nComentário: ${feedback.comentario}`);

    if (confirmDelete) {
        removeFeedback(id); // localStorage.js
        location.reload();
    };
};