import './styles.css';
import { parsePercent } from './util';

// jeff sez get stuff we care about
const enteredBillAmount = document.getElementById('billAmount') as HTMLInputElement;

const tipButtons = document.querySelectorAll('.tipButton') as NodeListOf<HTMLDivElement>;
const tipAmountSpan = document.getElementById('tipAmount') as HTMLSpanElement;

const listBillAmount = document.getElementById('listBillAmount') as HTMLSpanElement;
const listTipPercent = document.getElementById('listTipPercent') as HTMLSpanElement;
const listTipAmount = document.getElementById('listTipAmount') as HTMLSpanElement;
const listTotalBill = document.getElementById('listTotalBill') as HTMLSpanElement;

const chkRememberTip = document.getElementById('chkRememberTip') as HTMLInputElement;

let currentTipValue = 0;
const localStorageCheckbox = 'rememberTip';
const localStorageTipValue = 'tipValue';

// handle events
enteredBillAmount.addEventListener('input', handleTextEntry);

let billAmountValid = false;
let tipAmountSelected = false;

function handleTextEntry() {
    const enteredValue = enteredBillAmount.valueAsNumber;

    // handle input error
    if (enteredValue < 0) {
        enteredBillAmount.classList.add('inputError');
    } else {
        enteredBillAmount.classList.remove('inputError');
    }

    if (enteredValue > 0) {
        billAmountValid = true;
    } else {
        billAmountValid = false;
    }

    updateListValues();

}

// add click handler to tip buttons
tipButtons.forEach(btn => {
    btn.addEventListener('click', handleTipButtonClick);
});

function handleTipButtonClick() {
    tipAmountSelected = true;
    const that = this as HTMLDivElement;
    console.log(that.innerText);
    tipButtons.forEach(btn => {
        if (btn === this) {
            btn.setAttribute('disabled', 'disabled');
            currentTipValue = parsePercent(that.innerText);
            tipAmountSpan.innerText = that.innerText;

            if (chkRememberTip.checked) {
                localStorage.setItem(localStorageTipValue, that.innerText);
            }
        } else {
            btn.removeAttribute('disabled');
        }
    });
    updateListValues();

}


// handle all the list updating
function updateListBillAmount(amt: number) {
    console.log('updating bill amount');
    listBillAmount.innerText = amt.toFixed(2);
}

function updateListTipPercent(displayPercent: string) {
    console.log('updating tip percent');
    // this is hokey but i'm too lazy to fix it
    // tip percent (as a string) was stashed in the label below the tip buttons when we figured it out.
    // just grabbing from there
    listTipPercent.innerText = displayPercent;
}

function updateListTipAmount(amt: number) {
    listTipAmount.innerText = amt.toFixed(2);
}

function updateListTotalBill(amt: number) {
    listTotalBill.innerText = amt.toFixed(2);
}

function clearListValues() {
    console.log('clearing list values');
    listBillAmount.innerText = '';
    listTipPercent.innerText = '';
    listTipAmount.innerText = '';
    listTotalBill.innerText = '';
}

function updateListValues() {
    if (billAmountValid && tipAmountSelected) {

        // math
        const enteredBillValue = enteredBillAmount.valueAsNumber;
        const tipString = tipAmountSpan.innerText; // since we figuered it out before
        const tipPercent = currentTipValue;
        const tipAmount = enteredBillValue * tipPercent;
        const totalAmount = enteredBillValue + tipAmount;

        // formatting
        updateListBillAmount(enteredBillValue);
        updateListTipPercent(tipString);
        updateListTipAmount(tipAmount);
        updateListTotalBill(totalAmount);
    } else {
        clearListValues();
    }

}

chkRememberTip.addEventListener('click', handleCheckboxRememberTip);

function handleCheckboxRememberTip() {
    const that = this as HTMLInputElement;
    if (that.checked) {
        localStorage.setItem(localStorageCheckbox, 'checked');
        if (currentTipValue > 0) {
            localStorage.setItem(localStorageTipValue, tipAmountSpan.innerText);
        }
    } else {
        localStorage.removeItem(localStorageCheckbox);
        localStorage.removeItem(localStorageTipValue);
    }
}
window.addEventListener('load', pageLoadStuff);

function pageLoadStuff() {
    if (localStorage.getItem(localStorageCheckbox)) {
        chkRememberTip.checked = true;
        tipButtons.forEach(btn => {
            if (btn.innerText === localStorage.getItem(localStorageTipValue)) {
                btn.click();
            }
        });
    }
}
