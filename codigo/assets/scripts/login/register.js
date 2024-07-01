async function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if(!name || !email || !password || !confirmPassword) return alert('Preencha todos os campos');
    if(password !== confirmPassword) return alert('Senhas não conferem');

    const response = await fetch('https://idealbus.discloud.app/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: name, email: email, senha: password, layout: 1 })
    })
    const data = await response.json();

    if(response.status === 400) return alert(data.message);
    if(response.status === 200) {
        alert('Usuário cadastrado com sucesso');
        localStorage.setItem('token', data.token);
        window.location.href = '../dashboard/dashboard.html';
    }
}