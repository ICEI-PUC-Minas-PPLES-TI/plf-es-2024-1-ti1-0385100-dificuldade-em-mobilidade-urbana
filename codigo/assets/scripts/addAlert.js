window.onload = function() {
    // Recupera os alertas do localStorage
    let alertas = localStorage.getItem('alertas');
    alertas = JSON.parse(alertas) || [];

    console.log('Lista de alertas:\n', alertas);
};

// Função para escolher uma string aleatória para simular o pontoId
function randomDados() {
    let pointIds = ["d7f8dd1a-3aec-435a-9464-18d0beb2332d", "d7f8dd1a-3aec-435a-9464-18d0beb2332e"];
    let locations = ["-19.9324871,-43.9361055", "-19.9328563,-43.9363960"];
    let dados = {
        pointId: pointIds[Math.floor(Math.random() * pointIds.length)],
        location: locations[Math.floor(Math.random() * locations.length)]
    };
    return dados;
};

typeMap = {
    "engarrafamento": "Engarrafamento",
    "acidente": "Acidente",
    "incidente_rua": "Incidente na Rua",
    "desvio_rota": "Desvoio de Rota"
};

// Armazenando o alerta no localStorage
$('.btn-alert').click(function(e) {
    e.preventDefault();

    // Recupera os alertas do localStorage
    let alertas = localStorage.getItem('alertas');
    alertas = JSON.parse(alertas) || [];

    // Informações do alerta
    let dados  = randomDados(); // Simula um pontoId e uma localização
    let alertType = $(this).attr("value");
    let pontoId = dados.pointId;
    let location = dados.location;

    let timeString = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    let timestamp = parseInt(new Date().getTime() / 1000);

    console.log(`Enviando alerta: ${alertType}`);

    alertas.push({
        tipo: alertType,
        pontoId: pontoId,
        location: location,
        dateTime: timestamp
    });

    console.log('Lista de alertas:\n', alertas);

    // Envia os alertas para o localStorage
    localStorage.setItem('alertas', JSON.stringify(alertas));

    // Oculta o menu após envio do alerta
    $('#alertMenu').hide();

    let alert_type_span = $('#alert_success_modal').find('#alert_type');
    let alert_location_span = $('#alert_success_modal').find('#alert_location');
    let alert_time_span = $('#alert_success_modal').find('#alert_time');

    alert_type_span.html(typeMap[alertType]);
    alert_location_span.html(location);
    alert_time_span.html(timeString);

    alert('AVISO PARA AVALIADORES DA SPRINT:\n\nVisualize a lista de alertas no console do navegador!');
    $('#alert_success_modal').modal('show');
});