// Botão de novo feedback clicado
$('#addFeedbackBtn').click(function(e) {
    e.preventDefault();

    // Seta como novo feedback
    $('#type').val('new');

    // Limpa o modal de feedback
    $('#feedbackId').val('');
    $('#routeId').val('');
    $('#routeId').prop('disabled', false);
    $('input[name=fb]:last-of-type').prop('checked', true);
    $('#feedbackComment').val('');

    // Exibe o modal de feedback
    setRoutesToSelect();
    $('#feedbackModal').modal('show');
});

// Botão de enviar feedback (novo/editado) clicado
$('#sendFeedbackBtn').click(function(e) {
    e.preventDefault();

    let type = $('#type').val();
    console.log(type);

    if (type === 'new') {
        newFeedbackFunc();
    } else {
        editFeedbackFunc();
    };
});


// Função para criar um feedback
newFeedbackFunc = function() {
    let id = Math.floor(Math.random() * 99999999);
    $('#feedbackId').val(id);
    console.log(id);

    // let routeId = Math.floor(Math.random() * 9999);
    // $('#routeId').val(routeId);
    let routeId = $('#routeId').val();
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

    let comentario = $('#feedbackComment').val();
    console.log(comentario);

    if (!comentario) {
        alert('Por favor, escreva um comentário sobre esta rota!');
        return;
    };

    let timestamp = parseInt(new Date().getTime() / 1000);
    console.log(timestamp);

    let feedbacks = localStorage.getItem('feedbacks');
    feedbacks = JSON.parse(feedbacks) || [];

    feedbacks.push({
        id,
        routeId,
        nota,
        comentario,
        timestamp
    });

    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    $('#feedbackModal').modal('hide');

    $('#success_modal_feedback_route').html(routeId);
    $('#success_modal_feedback_rating').html(nota);
    $('#success_modal_feedback_comment').html(comentario);

    $('#feedback_success_modal').modal('show');
};


// Função para editar um feedback
editFeedbackFunc = function() {
    let id = $('#feedbackId').val();
    id = parseInt(id);
    console.log(id);

    let nota = $('input[name=fb]:checked').val();
    console.log(nota);

    let comentario = $('#feedbackComment').val();
    console.log(comentario);

    let feedbacks = localStorage.getItem('feedbacks');
    feedbacks = JSON.parse(feedbacks) || [];
    console.log(feedbacks);

    let feedback = feedbacks.find(f => f.id === id);
    console.log(feedback);

    feedback.nota = nota;
    feedback.comentario = comentario;

    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    $('#feedbackModal').modal('hide');

    $('#success_modal_feedback_route').html(feedback.routeId);
    $('#success_modal_feedback_rating').html(nota);
    $('#success_modal_feedback_comment').html(comentario);

    $('#feedback_success_modal').modal('show');
};


// Recarregar a página após fechar o modal de sucesso, atualizando os feedbacks
$('#feedback_success_modal').on('hidden.bs.modal', function () {
    location.reload();
});

// Função para pedir a edição de um feedback
editarFeedback = function(id) {
    let feedbacks = localStorage.getItem('feedbacks');
    feedbacks = JSON.parse(feedbacks) || [];

    let feedback = feedbacks.find(f => f.id === id);

    // Seta como feedback existente para edição
    $('#type').val('edit');

    // Preencher o id do feedback
    $('#feedbackId').val(`${feedback.id}`);

    // Selecionar a rota do feedback por seu id
    setRoutesToSelect();
    $(`#routeId option[value=${feedback.routeId}]`).prop('selected', true);
    // Setar como desabilitado para não ser possível alterar a rota
    $('#routeId').prop('disabled', true);

    // Preencher a quantidade de estrelas de acordo com a nota do feedback
    $(`input[name=fb][value=${feedback.nota}]`).prop('checked', true);

    // Preencher o comentário do feedback
    $('#feedbackComment').val(feedback.comentario);

    // Exibe o modal de feedback
    $('#feedbackModal').modal('show');
};


// Função para deletar um feedback
deletarFeedback = function(id) {
    let feedbacks = localStorage.getItem('feedbacks');
    feedbacks = JSON.parse(feedbacks) || [];

    let feedback = feedbacks.find(f => f.id === id);

    let confirmDelete = confirm(`Deseja deletar o feedback de ID ${feedback.id}?\n\nRota: ${feedback.routeId}\nNota: ${feedback.nota}\nComentário: ${feedback.comentario}`);

    if (confirmDelete) {
        feedbacks = feedbacks.filter(f => f.id !== id);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        location.reload();
    };
};


// Adicionar rotas ao select de rotas quando o modal de feedback é aberto
function setRoutesToSelect() {
    // Simulando uma lista de rotas
    let routes = [
        {"id": 123, "desc": "Rota 1"},
        {"id": 456, "desc": "Rota 2"},
        {"id": 789, "desc": "Rota 3"},
        {"id": 1011, "desc": "Rota 4"},
        {"id": 1213, "desc": "Rota 5"}
    ];
    routes = routes.sort((a, b) => a.id - b.id);

    let routesSelect = $('#routeId');
    defaultOption = '<option value="" selected>Selecione uma rota</option>';
    routesSelect.html(defaultOption);

    routes.forEach(function(route) {
        let id = route.id;
        let desc = route.desc;

        let option = `<option value="${id}">${desc} - ${id}</option>`;
        routesSelect.append(option);
    });
};


// Recupera os feedbacks do localStorage
let feedbacks = localStorage.getItem('feedbacks');
feedbacks = JSON.parse(feedbacks) || [];
feedbacks.sort((a, b) => a.timestamp - b.timestamp);

if (feedbacks.length === 0) {
    $('#feedbacks').html('<div class="col-12"><h4 class="text-center">Nenhum feedback encontrado!</h4></div>');
};

// Exibe os feedbacks na página
let feedbacksDiv = $('#feedbacks');
feedbacks.forEach(function(feedback) {
    let id = feedback.id;
    let routeId = feedback.routeId;
    let nota = feedback.nota;
    let comentario = feedback.comentario;
    let timestamp = feedback.timestamp;

    let timeString = new Date(timestamp * 1000).toLocaleString();

    let feedbackDiv = `
        <div class="col-12 col-sm-6 col-md-4 mb-4">
            <div class="card h-100 feedback-card">
                <div class="card-body">
                    <div class="row justify-content-end">
                        <div class="col-sm-8 col-12">
                            <p class="card-text my-2"><b>ID da Rota:</b><br><span class="route-color">${routeId}</span></p>
                            <p class="card-text my-2"><b>Nota:</b> <span class="nota-color">${nota}</span></p>
                            <p class="card-text my-2"><b>Comentário:</b> ${comentario}</p>
                        </div>
                        <div class="col-sm-2 mt-sm-0 col-auto mt-3">
                            <button class="btn ib-btn-warning btn-sm card-edit-btn" onclick="editarFeedback(${id})"><i class="fa fa-pen-to-square"></i></button>
                        </div>
                        <div class="col-sm-2 mt-sm-0 col-auto mt-3">
                            <button class="btn ib-btn-danger btn-sm card-delete-btn" onclick="deletarFeedback(${id})"><i class="fa fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <small class="text-muted">
                        <ul class="m-0">
                            <li>Feedback ID: ${id}</li>
                            <li>Enviado em: ${timeString}</li>
                        </ul>
                    </small>
                </div>
            </div>
        </div>
    `;
    feedbacksDiv.append(feedbackDiv);
});