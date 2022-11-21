'use strict'
const form = document.forms["form"];

// Bill(Cuenta)
const billInput = form.bill;

let billValue = 0; 
let peopleValue = 1;
let porcentaje = 0;
let tiptotal = 0;
let lastActive;



billInput.addEventListener("keyup", () => {
    billValue = parseFloat(billInput.value) ||0;
    // console.log(billValue);

    tipTotal()
    totalBill()
    habilitarButton()
});

// Porcentaje(Del botón)
const buttons = [...document.querySelectorAll(".buttons")];

buttons.forEach(button => {
    button.addEventListener("click", () =>{
        event.preventDefault()
        porcentaje = parseFloat(button.value);

        tipTotal()
        totalBill()
        habilitarButton()
    })
});

// Botón presionado/Active
buttons.forEach((btn, index, arr) => {
    btn.addEventListener("click", () => {
        lastActive = arr.find(btn => btn.classList[4] === "active");

        if(lastActive) {
            lastActive.classList.remove("active");
        }

        btn.classList.add("active")
    })
})

// Número de personas
const peopleInput =form.numberOfPeople;


peopleInput.addEventListener("keyup", () => {

    peopleValue = parseFloat(peopleInput.value) || 1;
    // console.log(peopleValue);

    tipTotal()
    totalBill()
    habilitarButton()
});

// BOTÓN RESET
const buttonReset = document.getElementById("reset");

function habilitarButton () {
    let val = 0;
    
    if (billValue !== 0) {
        val ++;
    }
    
    if (peopleValue !== 1){
        val++;
    }
    
    if (porcentaje !== 0) {
        val++;
    }
    
    if (val !== 0) {
        buttonReset.disabled = false;
    } else {
        buttonReset.disabled = true;
    }

}

buttonReset.addEventListener("click", () => {
    billValue = 0; 
    peopleValue = 1;
    porcentaje = 0;
    tiptotal = 0;
    
    buttons.forEach((btn, index, arr) => {
        btn.classList.remove("active")
    })

    habilitarButton ()
});

// FUNCIONES TIP AMOUNT/PERSON
function tipTotal (cuenta=billValue, porc=porcentaje) {
    
    tiptotal = cuenta * porc;

    tipPerson(tiptotal)
}

function tipPerson (tiptotal, people=peopleValue) {
    
    let tipperson= (tiptotal / people).toFixed(2);
    showTip(tipperson)
}

const tipInput = document.getElementById("tipAmount");

function showTip (tipperson) {

    tipInput.value="$"+tipperson;
}

// FUNCIONES TOTAL/PERSON
function totalBill (subtotal=billValue, propina=tiptotal) {

    let totalbill = subtotal + propina;
    totalPerson(totalbill)
    
}

function totalPerson (total, numberpeople=peopleValue) {

    let totalperson = (total / numberpeople).toFixed(2)
    showTotal(totalperson)
}

const totalInput = document.getElementById("totalAmount");

function showTotal(totalperson) {

    if (totalperson===0) {
        totalInput.value= "$0.00"
    }
    totalInput.value= "$"+totalperson;
}