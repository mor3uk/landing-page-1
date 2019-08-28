function validator($form, options, preventDefault, callback) {
    for (let propName in options) {
        if ($form[propName]) {
            $form[propName].addEventListener('focusout', () => {
                validateProp($form, propName, options[propName]);
            });
        }
    }

    $form.addEventListener('submit', (e) => {
        let isValid = true;
        if (preventDefault) {
            e.preventDefault();
        }

        for (let propName in options) {
            if ($form[propName]) {
                if (!validateProp($form, propName, options[propName])) {
                    isValid = false;
                }
            }
        }

        if (!isValid) {
            e.preventDefault();
            return false;
        }

        callback();
        return true;
    });
}

function validateProp($form, propName, prop) {
    // Check options if they are specified
    if (prop.required) {
        if (isEmpty($form[propName], prop.password)) {
            return;
        }
    }
    if (prop.minLength) {
        if (!checkMinLength($form[propName], prop.minLength, prop.password)) {
            return;
        }
    }
    if (prop.maxLength) {
        if (!checkMaxLength($form[propName], prop.maxLength, prop.password)) {
            return;
        }
    }
    if (prop.email) {
        if (!validateEmail($form[propName])) {
            return;
        }
    }
    if (prop.password) {
        if (!validatePassword($form[propName])) {
            return;
        }
    }
    if (prop.matches) {
        if (!validateMatch($form, $form[propName], matches)) {
            return;
        }
    }
    if (prop.number) {
        if (!validateNumber($form[propName])) {
            return;
        }
    }

    return true;
}

// utils

function isEmpty($field, isPassword) {
    let val = isPassword ? $field.value : $field.value.trim();
    if (val === '') {
        setInvalid($field, `${$field.name} is empty`);
        return true;
    }

    setValid($field);
    return false;
}

function checkMinLength($field, minLength, isPassword) {
    let valLength = isPassword ? $field.value.length : $field.value.trim().length;
    if (valLength < minLength) {
        setInvalid($field, `${$field.name} length must be longer then ${minLength}`);
        return false;
    }

    setValid($field);
    return true;
}

function checkMaxLength($field, maxLength, isPassword) {
    let valLength = isPassword ? $field.value.length : $field.value.trim().length;
    if (valLength > maxLength) {
        setInvalid($field, `${$field.name} length must be shorter then ${maxLength}`);
        return false;
    }

    setValid($field);
    return true;
}

function validateEmail($field) {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ($field.value.match(regExp)) {
        setValid($field);
        return true;
    }

    setInvalid($field, 'Email invalid');
    return false;
}

function validatePassword($field, code = 1) {
    let regExp;

    switch (code) {
        case 1:
            // letters
            regExp = /(?=.*[a-zA-Z])/;
            if ($field.value.match(regExp)) {
                setValid($field);
                return true;
            }

            setInvalid($field, 'Password must contain at least one letter');
            return false;
        case 2:
            // letter and numbers
            regExp = /(?=.*\d)(?=.*[a-zA-Z])/;
            if ($field.value.match(regExp)) {
                setValid($field);
                return true;
            }

            setInvalid($field, 'Password must contain at least one letter and one number');
            return false;
        case 3:
            // uppercase, lowercase and number
            regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            if ($field.value.match(regExp)) {
                setValid($field);
                return true;
            }

            setInvalid($field, 'Password must contain at least one uppercase, one lowercase letter and one number');
            return false;
        case 4:
            // uppercase, lowercase, number and special char
            regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
            if ($field.value.match(regExp)) {
                setValid($field);
                return true;
            }

            setInvalid($field, 'Password must contain at least one uppercase, one lowercase letter, one number and one special character')
            return false;

    }
}

function validateMatch($form, $field, matches) {
    matches.forEach((val) => {
        if ($field.value !== $form[val]) {
            setInvalid($field, `${$field.name} does not match ${$form[val].name}`);
            return false;
        }
    });

    setValid($field);
    return true;
}

function validateNumber($field) {
    const regExp = /^\+?\d{11}$/;

    if ($field.value.match(regExp)) {
        setValid($field);
        return true;
    }

    setInvalid($field, 'Number invalid');
    return false;
}

function setValid($field) {
    const $messageElem = $field.nextElementSibling;

    if ($messageElem.classList.contains('message-helper')) {
        $messageElem.textContent = '';
    }
}

function setInvalid($field, message) {
    const $messageElem = $field.nextElementSibling;

    if ($messageElem.classList.contains('message-helper')) {
        $messageElem.textContent = message;
    }
}