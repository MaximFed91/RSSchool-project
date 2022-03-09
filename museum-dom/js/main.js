document.addEventListener('DOMContentLoaded', () => {

    const btnMenu = document.querySelector('.header__btn'),
        menu = document.querySelector('.header__menu'),
        welcomeMain = document.querySelector('.welcome__main');

    function toggleMenu() {
        btnMenu.classList.toggle('header__btn-active');
        menu.classList.toggle('header__menu-active');
        welcomeMain.classList.toggle('welcome__main--menu');
    };
    btnMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', function (e) {
        const target = e.target,
            itsMenu = target == menu || menu.contains(target),
            itsBtnMenu = target == btnMenu,
            menuIsActive = menu.classList.contains('header__menu-active');
        if (!itsMenu && !itsBtnMenu && menuIsActive) {
            toggleMenu();
        }
        if (target.matches('.header__menu--item-link')) {
            toggleMenu();
        }
    });

    function menuHeight() {
        const welcome = document.querySelector('.welcome');
        if (document.body.clientWidth < 1041) {
            menu.style.height = `${welcome.clientHeight}px`;
        }

    }
    window.addEventListener('resize', () => {
        menuHeight();
    });
    menuHeight();

    mapboxgl.accessToken = 'pk.eyJ1IjoibXhobCIsImEiOiJja3VtaTJteGgxZG0wMnBvNjNzNTJsa2Z2In0.BrgLqqY1Uyl7HyGXUtAvJQ';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mxhl/ckumivuyb3hw417nsrvr74rod',
        center: [2.336047, 48.861134],
        zoom: 15.8
    });
    map.addControl(new mapboxgl.NavigationControl());

    const marker1 = new mapboxgl.Marker({
        color: "#171717"
    }).setLngLat([2.3364, 48.86091]).addTo(map);
    const marker2 = new mapboxgl.Marker({
        color: "#757575"
    }).setLngLat([2.3333, 48.8602]).addTo(map);
    const marker3 = new mapboxgl.Marker({
        color: "#757575"
    }).setLngLat([2.3397, 48.8607]).addTo(map);
    const marker4 = new mapboxgl.Marker({
        color: "#757575"
    }).setLngLat([2.3330, 48.8619]).addTo(map);
    const marker5 = new mapboxgl.Marker({
        color: "#757575"
    }).setLngLat([2.3365, 48.8625]).addTo(map);

    console.log('Выполнены все требования, за исключением пункта: Невозможно проигрывание нескольких YouTube видео одновременно. \n Добавленный функционал: валидация карты оплаты и дополнительные клавиш управления видеоплеером: J, L перемотка на 10 сек вперед/назад, K play/pause, стрелки вправо/влево - управление скоростью, 0-9 перемотка на 0-90%. \n Итого: 160-2 = 158 баллов');

});