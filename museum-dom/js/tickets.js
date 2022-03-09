const form = document.querySelector('.form-overlay'),
    tickets = document.querySelector('.tickets'),
    date = document.querySelector('.form__date'),
    time = document.querySelector('.form__time'),
    type = document.querySelector('.form__type'),
    inputsRadio = document.querySelectorAll('input[name="ticket"]'),
    inputBasic = document.querySelector('.basic'),
    inputSenior = document.querySelector('.senior'),
    inputBasicForm = document.querySelector('.basic-form'),
    inputSeniorForm = document.querySelector('.senior-form'),
    totalTicket = document.querySelector('.tickets__total'),
    basicNum = document.querySelector('.basic-num'),
    basicLabel = document.querySelector('.basic-label'),
    basicTot = document.querySelector('.basic-tot'),
    basicCount = document.querySelector('.basic-count'),
    seniorNum = document.querySelector('.senior-num'),
    seniorLabel = document.querySelector('.senior-label'),
    seniorTot = document.querySelector('.senior-tot'),
    seniorCount = document.querySelector('.senior-count'),
    totalForm = document.querySelector('.total-form'),
    formText1 = document.querySelector('.form__text1'),
    formText2 = document.querySelector('.form__text2'),
    formText3 = document.querySelector('.form__text3'),
    today = new Date(),
    weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let total, totBasic, totSenior;

function getRadio() {
    return document.querySelector('input[name="ticket"]:checked').value;
}

function updateTicket() {
    totBasic = getRadio() * inputBasic.value;
    totSenior = inputSenior.value * getRadio() / 2;
    total = totSenior + totBasic;
    totalTicket.textContent = `Total €${total}`;
    type.value = getRadio();
    sessionStorage.setItem('inputBasic', inputBasic.value);
    sessionStorage.setItem('inputSenior', inputSenior.value);
    sessionStorage.setItem('radio', getRadio());
    inputBasicForm.value = inputBasic.value;
    inputSeniorForm.value = inputSenior.value;
}

function updateTicketFirst() {
    if (sessionStorage.length > 0) {
        inputBasic.value = sessionStorage.getItem('inputBasic');
        inputSenior.value = sessionStorage.getItem('inputSenior');
        inputsRadio.forEach(radio => {
            if (radio.value == sessionStorage.getItem('radio')) {
                radio.checked = true;
            }
        });
        updateTicket();
    } else {
        updateTicket();
    }
}

function updateLabelForm() {
    formText3.textContent = type.selectedOptions[0].text;
    basicLabel.textContent = `Basic (${type.value} €)`;
    seniorLabel.textContent = `Senior (${type.value / 2} €)`;
    basicCount.textContent = `Basic 18+ (${type.value} €)`;
    seniorCount.textContent = `Senior 65+ (${type.value / 2} €)`;
}

function updateForm() {
    totBasic = inputBasicForm.value * type.value;
    totSenior = inputSeniorForm.value * type.value / 2;
    total = totSenior + totBasic;
    basicNum.textContent = `${inputBasicForm.value}`;
    seniorNum.textContent = `${inputSeniorForm.value}`;
    basicTot.textContent = `${totBasic} €`;
    seniorTot.textContent = `${totSenior} €`;
    inputBasic.value = inputBasicForm.value;
    inputSenior.value = inputSeniorForm.value;
    totalForm.textContent = `${total} €`;
    inputsRadio.forEach(radio => {
        if (radio.value == type.value) {
            radio.checked = true;
        }
    });
    updateTicket();
}
document.querySelector('.form__name').addEventListener('input',(e)=>{
    e.target.required = true;
});
document.querySelector('.form__email').addEventListener('input',(e)=>{
    e.target.required = true;
});
document.querySelector('.form__phone').addEventListener('input',(e)=>{
    e.target.required = true;
});
document.querySelector('.form__card--number').addEventListener('input',(e)=>{
    e.target.required = true;
});
document.querySelector('.form__card--name').addEventListener('input',(e)=>{
    e.target.required = true;
});
document.querySelector('.form__card--cvc').addEventListener('input',(e)=>{
    e.target.required = true;
});
inputsRadio.forEach(radio => {
    radio.addEventListener('change', e => {
        updateTicket();
    });
});
date.addEventListener('input', (e) => {
    e.target.classList.add('form__date--clear');
    const checkDate = new Date(date.value);
    formText1.textContent = `${weekDay[checkDate.getDay()]}, ${month[checkDate.getMonth()]} ${checkDate.getDate()}`;
});
time.addEventListener('input', (e) => {
    e.target.classList.add('form__time--clear');
    formText2.textContent = time.value;
});
type.addEventListener('input', () => {
    updateForm();
    updateLabelForm();
});


tickets.addEventListener('click', (e) => {
    const tar = e.target;
    if (tar && (tar.matches('.form-overlay') || tar.matches('.form__close'))) {
        e.preventDefault();
        form.classList.remove('form__active');
    }
    if (tar && tar.matches('.tickets__btn')) {
        form.classList.add('form__active');
        date.min = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        updateForm();
        updateLabelForm();
    }
    if (tar && tar.matches('.form__submit')) {
        const circle = document.createElement('span');
        circle.classList.add('circle');
        tar.appendChild(circle);
        setTimeout(() => circle.remove(), 500);
    }
    if (tar && tar.matches('.min')) {
        e.preventDefault();
        const input = tar.parentElement.querySelector('input');
        if (input.value > 0) {
            input.value--;
            updateTicket();
        }
    }
    if (tar && tar.matches('.pl')) {
        e.preventDefault();
        const input = tar.parentElement.querySelector('input');
        if (input.value < 20) {
            input.value++;
            updateTicket();
        }
    }
    if (tar && tar.matches('.min-form')) {
        e.preventDefault();
        const input = tar.parentElement.querySelector('input');
        if (input.value > 0) {
            input.value--;
            updateForm();
        }
    }
    if (tar && tar.matches('.pl-form')) {
        e.preventDefault();
        const input = tar.parentElement.querySelector('input');
        if (input.value < 20) {
            input.value++;
            updateForm();
        }
    }
});


updateTicketFirst();