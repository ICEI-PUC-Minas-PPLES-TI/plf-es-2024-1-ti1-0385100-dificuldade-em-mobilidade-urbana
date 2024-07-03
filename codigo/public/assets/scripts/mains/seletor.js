document.addEventListener('DOMContentLoaded', async () => {
    const input = document.getElementById('search');
    const suggestionBox = document.getElementById('suggestions');

    let allAddresses = [];

    allAddresses = await fetchAddresses();

    function displaySuggestions(suggestions) {
        suggestionBox.innerHTML = '';
        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.classList.add('suggestion-item');
            div.textContent = suggestion.endereco;

            div.addEventListener('click', () => {
                input.value = suggestion.endereco;
                listRoutes(suggestion.id);
                suggestionBox.innerHTML = '';
            });

            suggestionBox.appendChild(div);
        });
    }

    function filterSuggestions(query) {
        return allAddresses.filter(address => address.endereco.toLowerCase().includes(query.toLowerCase()));
    }

    input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        if (query.length < 3) {
            suggestionBox.innerHTML = '';
            return;
        }

        const suggestions = filterSuggestions(query);
        displaySuggestions(suggestions);
    });
});

async function fetchAddresses() {
    try{
        const response = await fetch(`https://idealbus.discloud.app/paradas`);
        const data = await response.json();
        return data;
    }catch(err) {
        console.error(err);
        return [];
    }
}

function backButton() {
    document.getElementById('selectRoute').style.display = 'none';
    document.getElementById('searchStops').style.display = 'block';
    document.getElementById('search').value = '';
}

async function listRoutes(id) {
    document.getElementById('selectRoute').style.display = 'block';
    document.getElementById('searchStops').style.display = 'none';

    function listRoutesContainingStop(stopId, routes) {
        return routes.filter(route => route.stops.some(stop => stop.id === stopId));
    }

    const response = await fetch(`https://idealbus.discloud.app/rotas`);
    const routesData = await response.json();
    const suggestionBox = document.getElementById('routesBox');
    suggestionBox.innerHTML = '';

    listRoutesContainingStop(id, routesData).forEach(route => {

        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = route.name || "Rota sem nome";

        div.addEventListener('click', () => {
            listRouteAlerts(route.id);
            addMarkers(route.stops);
            addToList(route.id);
        });
        suggestionBox.appendChild(div);
    });
}

async function listRouteAlerts(id) {
    document.getElementById('selectRoute').style.display = 'none';
    document.getElementById('searchStops').style.display = 'block';
    document.getElementById('alertas').style.display = 'none';
    const btn = document.getElementsByClassName('btn-float')[0];
    btn.style.display = 'block';
    document.getElementById('search').value = '';

    const response = await fetch(`https://idealbus.discloud.app/rotas/${id}`);
    const data = await response.json();

    if(data.alerts.length > 0) {
        document.getElementById('alertas').style.display = 'block';
        const alertsBox = document.getElementById('alertas');
        alertsBox.innerHTML = '';
        alertsBox.appendChild(document.createElement('h1')).textContent = 'Alertas de rota';

        data.alerts.forEach(alert => {
            const div = document.createElement('div');
            div.classList.add('alert');
            div.classList.add('warn');
            const alertDateTime = new Date(alert.datetime);
            div.innerHTML = `
                <div class="icon">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAeVJREFUSEuNVgGy6yAIXE5Wc7KkJ4vvZH5BRFCT3850aoxZYHchJQJQ0D5+vd/Qg/6mPBRRCCVgRuSniEt0HyyuZwi7O5L5D5oe1EwTQJ9axld5SED5VELkml4T/o0zDnArTzdAHOAAkJmaEGBQS/A8LpRHgc56eQ2S6JJqrEpH3z5hDaY3CUgFEAp0KwG4J5hB+6uLAC7/FJ8RklljoGUATMdZca7mRkkoF9nndZSYr+aMZrswKH87LfzLgna3H7XK3JzbA4wylE/bYCD+MEBf965JhHJr1kQoZ133oJa4E1lALQsBjHbcGb8LfBHw1Yd5j9n5jgraDtvrrlxnFOFVG3CoG1tezjMY68TJdaqC3k4D416E8003GgoNcDMeVIIliO+DJm6rgDn/qHPSkCgaWcRUF6noawBHxVkzVav9PJ6O0jq2C87rw49PX0GYibFZd/ranvSBUpdR6BBKnXT9ZHRQe8iNgIeWj6y9UWSA1XHylPXEPN97Jpu6pgChk2PGi1EaWu/iv8p7HlybgV9dxACWnAbojtIu3kxZX8ZmWvo+mLWwbH57LYxI8wCdqZTR+fKmtvMPgcMAfaxg08lLiv6MZ9frtwZ4ULeh+7n0NKN8/dMrc0/MMh6mmdfn/vir4jn/B/nH4SR6QDBwAAAAAElFTkSuQmCC"/>
                </div>
                <div class="alertTexts">
                    <h2>${alert.type === 1 ?
                        'Atrasos na rota por engarrafamentos' : alert.type === 2 ?
                        'Acidentes na rota' : 'Rota desviada'
                    }</h2>
                    <p>Horário do alerta: ${alertDateTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                </div>
            `
            alertsBox.appendChild(div);
        
        })
    }

    btn.addEventListener('click', () => {
        return window.location.href = '../alertas/index.html?id=' + id;
    });
}

async function addToList(id) {
    let routeList = JSON.parse(localStorage.getItem('routeList')) || [];

    if(!routeList.includes(id)) {
        routeList.push(id);
        localStorage.setItem('routeList', JSON.stringify(routeList));
    }
}