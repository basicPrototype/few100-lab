import './styles.css';

// jeff sez get stuff we care about
const billAmount = document.getElementById('billAmount') as HTMLInputElement;

// handle events
billAmount.addEventListener('input', handleTextEntry);

function handleTextEntry() {
    const enteredValue = billAmount.valueAsNumber;
    if ( enteredValue < 0 ) {
        billAmount.classList.add('inputError');
    } else {
        billAmount.classList.remove('inputError');
    }
}
