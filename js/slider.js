const slider = tns({
    container: '.slider__inner',
    slideBy: 'page',
    autoplay: true,
    autoplayTimeout: 4000,
    nav: true,
    navPosition: 'bottom',
    speed: 800,
    controls: false,
});

document.querySelector('.next').addEventListener('click', () => {
    slider.goTo('next');
});

document.querySelector('.prev').addEventListener('click', () => {
    slider.goTo('prev');
});