const params = new URLSearchParams(window.location.search);
const id = params.get('id');

console.log(id)

function showType1() {
    document.getElementById('type-1').style.display = 'block';
    document.getElementById('type-2').style.display = 'none';
    document.getElementById('type-3').style.display = 'none';
}

function showType2() {
    document.getElementById('type-1').style.display = 'none';
    document.getElementById('type-2').style.display = 'block';
    document.getElementById('type-3').style.display = 'none';
}

function showType3() {
    document.getElementById('type-1').style.display = 'none';
    document.getElementById('type-2').style.display = 'none';
    document.getElementById('type-3').style.display = 'block';
}

async function addAlertType1() {
    console.log({ routeId: id, type: 2, datetime: new Date().toISOString() })
    const response = await fetch(`https://idealbus.discloud.app/alertas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routeId: id, type: 1, datetime: new Date().toISOString() })
    });

    if(response.status === 201) {
        alert('Alerta enviado com sucesso!')
    } else {
        console.log(await response.json().message)
        alert('Erro ao enviar alerta!')
    }
}

async function addAlertType2() {
    const response = await fetch(`https://idealbus.discloud.app/alertas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routeId: id, type: 2, datetime: new Date().toISOString() })
    })

    if(response.status === 201) {
        alert('Alerta enviado com sucesso!')
    } else {
        alert('Erro ao enviar alerta!')
    }
}

async function addAlertType3() {
    const response = await fetch(`https://idealbus.discloud.app/alertas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routeId: id, type: 3, datetime: new Date().toISOString() })
    })

    if(response.status === 201) {
        alert('Alerta enviado com sucesso!')
    } else {
        alert('Erro ao enviar alerta!')
    }
}

function sendProfile() {
    return window.location.href = '../user/perfil.html';
}

function sendFavs() {
    return window.location.href = '../user/favoritas.html';
}

function sendMap() {
    return window.location.href = '../mains/map.html';
}