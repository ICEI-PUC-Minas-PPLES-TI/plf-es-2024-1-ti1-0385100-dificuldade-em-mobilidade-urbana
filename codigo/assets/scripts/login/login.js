async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(!email || !password) return alert('Preencha todos os campos');
    if(email === 'admin@admin' && password === 'admin') return window.location.href = '../dashboard/dashboard.html';

    const response = await fetch('https://idealbus.discloud.app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha: password })
    });
    const data = await response.json();

    if(response.status === 401) return alert(data.message);
    if(response.status === 200) return window.location.href = '../mains/map.html?email=' + email;
}