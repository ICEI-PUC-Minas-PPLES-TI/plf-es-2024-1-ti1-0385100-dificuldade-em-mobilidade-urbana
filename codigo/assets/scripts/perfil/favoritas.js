async function getData() {
    const favs = JSON.parse(localStorage.getItem('routeList'));
    const email = localStorage.getItem('token');
    const response = await fetch(`https://idealbus.discloud.app/rotas`);
    const data = await response.json();

    const routes = data.filter(route => route.id.includes(favs));

    if(routes.length === 0) {
        const container = document.getElementsByClassName('container')[0];
        container.className = 'noRoutes';
        const p = document.createElement('h1');
        p.innerHTML = 'Nenhuma rota recente encontrada! 😕';
        return container.appendChild(p);
    }

    renderRoutes();

    function saveFavorites(favorites) {
        localStorage.setItem(`favorites-${email}`, JSON.stringify(favorites));
    }

    function loadFavorites() {
        const storedFavorites = localStorage.getItem(`favorites-${email}`);
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    }

    function updateFavorites(button, isFavorite) {
        if(isFavorite) {
            button.classList.add('favorite');
        } else {
            button.classList.remove('favorite');
        }
    }

    function renderRoutes() {
        const routesList = document.getElementsByClassName('routesList')[0];
        routesList.innerHTML = '';

        const favorites = loadFavorites();

        routes.forEach(route => {
            console.log('sla')
            const card = document.createElement('div');
            card.className = 'card';

            const routeName = document.createElement('h2');
            routeName.innerHTML = route.name;
            routeName.className = 'routeName';

            const favoriteButton = document.createElement('button');
            favoriteButton.className = 'favoriteButton';
            favoriteButton.innerHTML = `<i class='bx bxs-heart'></i>`

            const isFavorite = favorites.includes(route.id);
            updateFavorites(favoriteButton, isFavorite);

            favoriteButton.addEventListener('click', () => {
                const currentFavorites = loadFavorites();
                if(currentFavorites.includes(route.id)) {
                    const newFavorites = currentFavorites.filter(favorite => favorite !== route.id);
                    saveFavorites(newFavorites);
                    updateFavorites(favoriteButton, false);
                } else {
                    currentFavorites.push(route.id);
                    saveFavorites(currentFavorites);
                    updateFavorites(favoriteButton, true);
                }
            });

            card.appendChild(routeName);
            card.appendChild(favoriteButton);
            routesList.appendChild(card);
        })
    }
}
getData()


function sendProfile() {
    return window.location.href = '../user/perfil.html';
}

function sendMap() {
    return window.location.href = '../mains/map.html';
}