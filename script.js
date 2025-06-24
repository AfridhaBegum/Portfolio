let menuicon=document.querySelector('#menu-icon');
let navbar=document.querySelector('.navbar');

menuicon.onclick=()=>{
    menuicon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

let sections=document.querySelectorAll('section');
let navlinks=document.querySelectorAll('header nav a');

let lastScrollY = window.scrollY;

window.onscroll = () => {
    let currentScrollY = window.scrollY;
    let scrollingDown = currentScrollY > lastScrollY;

    document.querySelectorAll('section').forEach(sec => {
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        let inView = currentScrollY >= offset && currentScrollY < offset + height;

        if (inView) {
            // Highlight nav link
            document.querySelectorAll('header nav a').forEach(link => {
                link.classList.remove('active');
                if (document.querySelector(`header nav a[href*="${id}"]`)) {
                    document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
                }
            });

            // Trigger animation only when scrolling down
            if (scrollingDown && !sec.classList.contains('show-animate')) {
                sec.classList.add('show-animate');
            }
        }
    });

    // Sticky header
    document.querySelector('header').classList.toggle('sticky', currentScrollY > 100);

    // Auto-close navbar on scroll
    document.querySelector('#menu-icon').classList.remove('bx-x');
    document.querySelector('.navbar').classList.remove('active');

    // Footer animation at bottom
    const footer = document.querySelector('footer');
    footer.classList.toggle(
        'show-animate',
        window.innerHeight + currentScrollY >= document.body.scrollHeight
    );

    lastScrollY = currentScrollY;
};
