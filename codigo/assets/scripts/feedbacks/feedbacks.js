function getElements() {
    return {
        // Elementos do modal de feedback
        feedbackId: $('#feedbackId'),
        type: $('#type'),
        routeId: $('#routeId'),
        feedbackComment: $('#feedbackComment'),
        sendFeedbackBtn: $('#sendFeedbackBtn'),
        // Elementos do modal de sucesso
        successModalFeedbackRoute: $('#success_modal_feedback_route'),
        successModalFeedbackRating: $('#success_modal_feedback_rating'),
        successModalFeedbackComment: $('#success_modal_feedback_comment'),
        // Elementos gerais
        feedbacks: $('#feedbacks'),
        feedbackModal: $('#feedbackModal'),
        feedbackSuccessModal: $('#feedback_success_modal')
    };
};

// Função para limpar o modal de feedback
function clearFeedbackModal() {
    let { feedbackId, type, routeId, feedbackComment } = getElements();

    feedbackId.val('');
    type.val('new');
    routeId.val('');
    routeId.prop('disabled', false);
    $('input[name=fb]:last-of-type').prop('checked', true);
    feedbackComment.val('');
};

// Adicionar rotas ao select de rotas
function setRoutesToSelect() {
    let { routeId } = getElements();

    // Simulando uma lista de rotas
    let routes = [
        {"id": 123, "desc": "Rota 1"},
        {"id": 456, "desc": "Rota 2"},
        {"id": 789, "desc": "Rota 3"},
        {"id": 1011, "desc": "Rota 4"},
        {"id": 1213, "desc": "Rota 5"}
    ];
    routes = routes.sort((a, b) => a.id - b.id);

    defaultOption = '<option value="" selected>Selecione uma rota</option>';
    routeId.html(defaultOption);

    routes.forEach(function(route) {
        let id = route.id;
        let desc = route.desc;

        let option = `<option value="${id}">${desc} - ${id}</option>`;
        routeId.append(option);
    });
};


// Botão de enviar feedback (novo/editado) clicado
$('#sendFeedbackBtn').click(function(e) {
    e.preventDefault();
    let { type } = getElements();

    type = type.val();
    console.log(type);

    if (type === 'new') {
        createFeedback(); // crudFunctions.js
    } else {
        editFeedback(); // crudFunctions.js
    };
});



let elements = getElements();

// Recarregar a página após fechar o modal de sucesso, atualizando os feedbacks
elements.feedbackSuccessModal.on('hidden.bs.modal', function () {
    location.reload();
});


// E agora temos o carregamento dos feedbacks na página
let feedbacks = getFeedbacks(); // localStorage.js
feedbacks.sort((a, b) => a.timestamp - b.timestamp);

let feedbacksDiv = elements.feedbacks;

if (feedbacks.length === 0) {
    feedbacksDiv.html('<div class="col-12"><h4 class="text-center">Nenhum feedback encontrado!</h4></div>');
};

// Exibe os feedbacks na página
feedbacks.forEach(function(feedback) {
    let timeString = new Date(feedback.timestamp * 1000).toLocaleString();

    let feedbackDiv = `
        <div class="col-12 col-sm-6 col-md-4 mb-4">
            <div class="card h-100 feedback-card">
                <div class="card-body">
                    <div class="row justify-content-end">
                        <div class="col-sm-8 col-12">
                            <p class="card-text my-2"><b>ID da Rota:</b><br><span class="route-color">${feedback.routeId}</span></p>
                            <p class="card-text my-2"><b>Nota:</b> <span class="nota-color">${feedback.nota}</span></p>
                            <p class="card-text my-2"><b>Comentário:</b> ${feedback.comentario}</p>
                        </div>
                        <div class="col-sm-2 mt-sm-0 col-auto mt-3">
                            <button class="btn ib-btn-warning btn-sm card-edit-btn" onclick="editarFeedback(${feedback.id})"><i class="fa fa-pen-to-square"></i></button>
                        </div>
                        <div class="col-sm-2 mt-sm-0 col-auto mt-3">
                            <button class="btn ib-btn-danger btn-sm card-delete-btn" onclick="deletarFeedback(${feedback.id})"><i class="fa fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <small class="text-muted">
                        <ul class="m-0">
                            <li>Feedback ID: ${feedback.id}</li>
                            <li>Enviado em: ${timeString}</li>
                        </ul>
                    </small>
                </div>
            </div>
        </div>
    `;
    feedbacksDiv.append(feedbackDiv);
});