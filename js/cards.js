/**
 * freeze the script for timeout ms
 * @param {timeout} timeout 
 */
const sleep = async function (timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

// change tabs

const $catalogTabs  = document.querySelectorAll('.catalog__nav-item');
const $catalogLists = document.querySelectorAll('.catalog__list');

for (let i = 0; i < $catalogTabs.length; i++) {
    $catalogTabs[i].addEventListener('click', async () => {
        for (let j = 0; j < $catalogTabs.length; j++) {
            $catalogTabs[j].classList.remove('catalog__nav-item_active');
        }
        $catalogTabs[i].classList.add('catalog__nav-item_active');

        for (let j = 0; j < $catalogTabs.length; j++) {
            await fadeOut($catalogLists[j], 30);
        }

        await fadeIn($catalogLists[i], 30, 'flex');
    });
}

// change card content

const $moreBtns  = document.querySelectorAll('.catalog-item__link_more');
const $backBtns  = document.querySelectorAll('.catalog-item__link_back');
const $contents  = document.querySelectorAll('.catalog-item__content');
const $charLists = document.querySelectorAll('.catalog-item__chars');

for (let i = 0; i < $moreBtns.length; i++) {
    $moreBtns[i].addEventListener('click', async (e) => {
        e.preventDefault();

        $contents[i].classList.remove('catalog-item__content_active');
        $charLists[i].classList.add('catalog-item__chars_active');

        let $chars = $charLists[i].querySelectorAll('.catalog-item__char');    
        for (let j = 0; j < $chars.length; j++) {
            await sleep(70);
            $chars[j].classList.add('catalog-item__char_active');
        }


    });
}

for (let i = 0; i < $backBtns.length; i++) {
    $backBtns[i].addEventListener('click', (e) => {
        e.preventDefault();

        $charLists[i].classList.remove('catalog-item__chars_active');
        $contents[i].classList.add('catalog-item__content_active');

        let $chars = $charLists[i].querySelectorAll('.catalog-item__char');    
        for (let j = 0; j < $chars.length; j++) {
            $chars[j].classList.remove('catalog-item__char_active');
        }
    });
}