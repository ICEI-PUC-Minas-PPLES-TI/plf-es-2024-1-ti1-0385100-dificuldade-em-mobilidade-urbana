function trocarTemplate(idTemplate) {
    cliente.template = idTemplate;
    setClientes(clientes);
    alert("Template alterado com sucesso!");
};

async function trocarSenha() {
    let passwordElement = document.getElementById("newPassword");
    novaSenha = passwordElement.value;

    const email = localStorage.getItem('token');
    const response = await fetch(`https://idealbus.discloud.app/getinfo/${email}`, {
        method: 'GET',
    });

    const data = await response.json();

    if(data.email === novoEmail) return alert("O email informado é o mesmo que o atual!");

    const response2 = await fetch(`https://idealbus.discloud.app/edituser/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: novaSenha,
        }),
    });

    const data2 = await response2.json();
    if(data2.status === 200) {
        alert("Senha alterada com sucesso!");
    } else {
        alert("Erro ao alterar a senha!");
    }
};

async function trocarEmail() {
    let emailElement = document.getElementById("newEmail");
    novoEmail = emailElement.value;

    const email = localStorage.getItem('token');
    const response = await fetch(`https://idealbus.discloud.app/getinfo/${email}`, {
        method: 'GET',
    });

    const data = await response.json();

    if(data.email === novoEmail) return alert("O email informado é o mesmo que o atual!");

    const response2 = await fetch(`https://idealbus.discloud.app/edituser/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: novoEmail,
        }),
    });

    const data2 = await response2.json();
    if(data2.status === 200) {
        alert("Email alterado com sucesso!");
    } else {
        alert("Erro ao alterar email!");
    }
};

async function getClientes() {
    const email = localStorage.getItem('token');
    const response = await fetch(`https://idealbus.discloud.app/getinfo/${email}`, {
        method: 'GET',
    });

    const data = await response.json();

    document.getElementById("imgElement").src = data.img_url || "https://pbs.twimg.com/media/EyQ9kUUXIAIDZXr.jpg";
    document.getElementById("emailElement").innerHTML = data.email;
    document.getElementById("nameElements").innerHTML = data.nome;

    favs = JSON.parse(localStorage.getItem(`favorites-${email}`));
    
    const response2 = await fetch(`https://idealbus.discloud.app/rotas`);
    const data2 = await response2.json();

    let routes = data2.filter(route => favs.includes(route.id));

    console.log(routes)

    if (routes.length > 0) {
        document.getElementById("favorites").style.display = "block";
        const favsElement = document.getElementById("favorites-list");
        favsElement.innerHTML = '';
        routes.forEach(route => {
            let favElement = document.createElement("h3");
            favElement.innerHTML = route.name;
            favElement.className = 'favorites-item';
            favsElement.appendChild(favElement);
        });
    }
};

function sendFavs() {
    return window.location.href = '../user/favoritas.html';
}

function sendMap() {
    return window.location.href = '../mains/map.html';
}

function signOut() {
    localStorage.removeItem('token');
    window.location.href = '../login/login.html';
}

getClientes();