let CurrentTotal = 0;
let buffer = "0";
let PreviousOperator;

const screen = document.querySelector('.type-area');

function buttonClick(value){
    if(isNaN(value)) {
        handleSymbol (value);
    }
    else{
        handleNumber(value);
    }
    screen.innerText = buffer
}

function handleSymbol (symbol) {
    switch (symbol){
        case 'AC':
            buffer = '0';
            CurrentTotal = 0;
            break;
        case '=':
            if(PreviousOperator === null) {
                return
            }
            flushOperation (parseInt(buffer));
            PreviousOperator = null;
            buffer = CurrentTotal;
            CurrentTotal = 0;
            break;
        case '←':
            if(buffer.length ===1){
                buffer = '0';
            }else{
                buffer= buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if(CurrentTotal === 0 ){
        CurrentTotal = intBuffer;
    }else{
        flushOperation (intBuffer);
    }
    PreviousOperator = symbol;
    buffer = '0';
}

function flushOperation (intBuffer){
    if(PreviousOperator === '+' ) {
        CurrentTotal += intBuffer;
    }else if(PreviousOperator === '−') {
        CurrentTotal -= intBuffer;
    }else if(PreviousOperator === '×'){
        CurrentTotal *= intBuffer
    }else if(PreviousOperator === '÷' ) {
        CurrentTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();