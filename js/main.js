// Scroll

const $scrollUp = document.querySelector('.up');

window.addEventListener('scroll', () => {
    if (window.scrollY > 1166) {
        fadeIn($scrollUp, 100, 'flex');
    } else {
        fadeOut($scrollUp, 100);
    }
});

$scrollUp.addEventListener('click', () => {
    smoothScroll($scrollUp.getAttribute('href'));
});

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}


function elmYPosition(eSelector) {
    let elm = document.querySelector(eSelector);
    let y = elm.offsetTop;
    let node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}


function smoothScroll(eSelector) {
    let startY = currentYPosition();
    let stopY = elmYPosition(eSelector);
    let distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    let speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    let step = Math.round(distance / 25);
    let leapY = stopY > startY ? startY + step : startY - step;
    let timer = 0;
    if (stopY > startY) {
        for (let i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for (let i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}

// Validate forms

const $forms = document.querySelectorAll('.form');

for (let i = 0; i < $forms.length; i++) {
    validator($forms[i], {
        Name: {
            required: true,
            minLength: 2,
            maxLength: 50
        },
        Phone: {
            required: true,
            number: true
        },
        Email: {
            required: true,
            email: true
        }
    }, true, function () {
        const http = new XMLHttpRequest();
        http.open('post', 'mailer/smart.php');
        http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        const body = {
            name: $forms[i].Name.value,
            phone: $forms[i].Phone.value,
            email: $forms[i].Email.value
        };

        http.send(`clientData=${JSON.stringify(body)}`);

        http.onloadend = () => {
            const $modals = document.querySelectorAll('.modal');

            for (let i = 0; i < $modals.length; i++) {
                fadeOut($modals[i], 100);
            }

            fadeIn(document.querySelector('.overlay'));
            fadeIn(document.querySelector('#thanks'));
        }
    });
}