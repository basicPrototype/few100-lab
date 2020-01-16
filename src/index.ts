import './styles.css';

// jeff sez get stuff we care about
const billAmount = document.getElementById('billAmount') as HTMLInputElement;
const tipButtons = document.querySelectorAll('.tipButton') as NodeListOf<HTMLDivElement>;


// handle events
billAmount.addEventListener('input', handleTextEntry);

function handleTextEntry() {
    const enteredValue = billAmount.valueAsNumber;
    if (enteredValue < 0) {
        billAmount.classList.add('inputError');
    } else {
        billAmount.classList.remove('inputError');
    }
}

// add click handler to tip buttons
tipButtons.forEach(btn => {
    btn.addEventListener('click', handleTipButtonClick);
});

function handleTipButtonClick() {
    const that = this as HTMLDivElement;
    console.log(that.innerText);
    tipButtons.forEach(btn => {
        if (btn === this) {
            that.removeEventListener('click', handleTipButtonClick);
            that.classList.add('tipClicked');
        } else {
            // https://stackoverflow.com/a/47337711 gave me permission
            btn.addEventListener('click', handleTipButtonClick);
            btn.classList.remove('tipClicked');
        }
    });

}
console.log(tipButtons);
