const cardNumber = document.getElementById("card_number");
const numberInp = document.getElementById("number");

const cardName = document.getElementsByClassName("card_name")[0];
const nameInp = document.getElementById ("name");

const cardMonth=document.getElementsByClassName("card_month")[0];
const monthInp=document.getElementById("month");

const cardYear=document.getElementsByClassName("card_year")[0];
const yearInp=document.getElementById("year");

const cardCvc=document.getElementsByClassName ("card_security_code")[0];
const cvcInp=document.getElementById("cvc");

const submit = document.getElementById ("Submit");
const completed = document.getElementsByClassName ("complete_state")[0];
const form = document.querySelector("form");

function setCardNumber(e) {
    cardNumber.innerText=format(e.target.value);
}
function setCardName(e) {
    cardName.innerText = e.target.value;
}
function setCardMonth(e) {
    cardMonth.innerText = e.target.value;
}
function setCardYear(e) {
    cardYear.innerText = e.target.value;
}
function setCvc(e) {
    cardCvc.innerText = e.target.value;
}

function format(s) {
    return s.toString().replace(/\d{4}(?=.)/g,"$&")
}

function handleSubmit(e) {
    e.preventDefault();

    let isValid = true;

    if(!nameInp.value){
        nameInp.classList.add("error");
        nameInp.parentElement.classList.add("error_message");
        isValid = false;
    } else {
        nameInp.classList.remove ("error")
        nameInp.parentElement.classList.remove("error_message");
    }
    if(!numberInp.value){
        numberInp.classList.add("error");
        numberInp.parentElement.classList.add("error_message");
        isValid = false;
    } else {
        numberInp.classList.remove ("error")
        numberInp.parentElement.classList.remove("error_message");
    }
    if(!monthInp.value){
        monthInp.classList.add("error");
        monthInp.parentElement.classList.add("error_message");
        isValid = false;
    } else {
        monthInp.classList.remove ("error");
       monthInp.parentElement.classList.remove("error_message");
    }
    if(!yearInp.value){
        yearInp.classList.add("error");
        yearInp.parentElement.classList.add("error_message");
        isValid = false;
    } else {
        yearInp.classList.remove ("error");
        yearInp.parentElement.classList.remove("error_message");
    }
    if(!cvcInp.value){
        cvcInp.classList.add("error");
        cvcInp.parentElement.classList.add("error_message");
        isValid = false;
    } else {
        cvcInp.classList.remove ("error");
        cvcInp.parentElement.classList.remove("error_message");
    }
    if (isValid) {
        form.classList.add("hidden");
        completed.classList.remove("hidden");
    }
}

numberInp.addEventListener("keyup",setCardNumber);
nameInp.addEventListener("keyup",setCardName);
monthInp.addEventListener("keyup",setCardMonth);
yearInp.addEventListener("keyup",setCardYear);
cvcInp.addEventListener("keyup",setCvc);

form.addEventListener("submit", handleSubmit);

/* submit.addEventListener("click",handleSubmit); */