// rule modals
$buttons = document.querySelectorAll('button');
$overlay = document.querySelector('.overlay');
$modals = document.querySelectorAll('.modal');
$exits = document.querySelectorAll('.modal__exit');

/**
 * Closes all modals
 */
const exitModals = async () => {
    for (let i = 0; i < $modals.length; i++) {
        fadeOut($modals[i]);
    }

    await fadeOut($overlay, 30);
};

for (let i = 0; i < $buttons.length; i++) {
    if ($buttons[i].getAttribute('data-modal')) {
        $buttons[i].addEventListener('click', async () => {
            const selectorName = $buttons[i].getAttribute('data-modal');

            if (selectorName == '#order') {
                document.querySelector(selectorName).querySelector('.modal__descr')
                    .textContent = $buttons[i].parentNode.parentNode
                        .querySelector('.catalog-item__subtitle').textContent;
            }

            fadeIn($overlay, 30);
            await fadeIn(selectorName, 30);
        });
    }
}

// $overlay.addEventListener('click', exitModals);

for (let i = 0; i < $exits.length; i++) {
    $exits[i].addEventListener('click', exitModals);
}