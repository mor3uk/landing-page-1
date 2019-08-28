/**
 * Functions are not to be used with elements which have their own opacity property
 * for it is used by functions.
 */

/**
 * Hides specified element in timeout ms
 * @param {string / object} element - element selector or element itself
 * @param {number} timeout - ms
 */
const fadeOut = async (element, timeout = 100) => {
    return new Promise((resolve) => {
        let opacity = 1;
        let $elementDOM;

        if (typeof element == 'string') {
            $elementDOM = document.querySelector(element);
        } else {
            $elementDOM = element;
        }

        if (!$elementDOM
            || getComputedStyle($elementDOM).getPropertyValue('display') == 'none') {
            resolve();
            
            return;
        }

        let timer = setInterval(() => {
            opacity -= 0.01;

            if (opacity <= 0.1) {
                clearInterval(timer);
                $elementDOM.style.display = "none";
                resolve();
            }

            $elementDOM.style.opacity = opacity;
        }, timeout / 100);
    });
};

/**
 * Shows specified element in timeout ms, changes display to specified or block (default)
 * @param {string / object} element - element selector or element itself
 * @param {number} timeout - ms 
 * @param {string} elDisplay - new display property, block (default)
 */
const fadeIn = async (element, timeout = 100, elDisplay = 'block') => {
    return new Promise((resolve) => {
        let opacity = 0;
        let $elementDOM;

        if (typeof element == 'string') {
            $elementDOM = document.querySelector(element);
        } else {
            $elementDOM = element;
        }

        if (!($elementDOM
            && getComputedStyle($elementDOM).getPropertyValue('display') == 'none')) {
            resolve();

            return;
        }

        $elementDOM.style.opacity = opacity;
        $elementDOM.style.display = elDisplay;

        let timer = setInterval(function () {
            opacity += 0.01;

            if (opacity >= 1) {
                clearInterval(timer);
                resolve();
            }

            $elementDOM.style.opacity = opacity;
        }, timeout / 100);
    });
};