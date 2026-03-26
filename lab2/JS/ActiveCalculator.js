const usdExchangeRate = 79.06;
const MAX_DIGITS = 12;

document.addEventListener('DOMContentLoaded', () => {
    let a = '';
    let b = '';
    let selectedOperation = null;
    let memoryRegister = 0;
    let ifError = false;

    const outputElement = document.getElementById('result');
    const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');

    function displayNumber(value) {
        const outputElement = document.getElementById('result');

        if (ifError) {
            outputElement.textContent = "Error";
            outputElement.style.fontSize = "1.75rem";
            return;
        }

        const valToDisplay = value === '' ? '0' : value;
        outputElement.textContent = valToDisplay;

        adjustFontSize(valToDisplay);
    }

    digitButtons.forEach(button => {
        button.addEventListener('click', () => {
            const val = button.textContent === '000' ? '000' : button.textContent;
            if (!selectedOperation) {
                if (a === '0' && val !== '.') a = '';
                a += val;
                displayNumber(a);
            } else {
                if (b === '0' && val !== '.') b = '';
                b += val;
                displayNumber(b);
            }
        });
    });

    document.getElementById('btn_op_backspace').addEventListener('click', () => {
        if (!selectedOperation) {
            a = a.slice(0, -1);
            displayNumber(a);
        } else {
            b = b.slice(0, -1);
            displayNumber(b);
        }
    });

    const applyUnary = (func) => {
        if (!selectedOperation) {
            a = func(parseFloat(a || 0)).toString();
            displayNumber(a);
        } else {
            b = func(parseFloat(b || 0)).toString();
            displayNumber(b);
        }
    };

    document.getElementById('btn_op_sign').addEventListener('click', () => applyUnary(x => x * -1));
    document.getElementById('btn_op_sqrt').addEventListener('click', () => applyUnary(x => Math.sqrt(x)));
    document.getElementById('btn_op_x2').addEventListener('click', () => applyUnary(x => x * x));
    document.getElementById('btn_op_factorial').addEventListener('click', () => applyUnary(n => {
        if (n < 0) return 0;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    }));
    document.getElementById('btn_custom').addEventListener('click', () => applyUnary(x => x / usdExchangeRate));


    document.getElementById('btn_mem_plus').addEventListener('click', () => {
        memoryRegister += parseFloat(outputElement.textContent);
    });
    document.getElementById('btn_mem_minus').addEventListener('click', () => {
        memoryRegister -= parseFloat(outputElement.textContent);
    });
    document.getElementById('btn_mem_recall').addEventListener('click', () =>{
            displayNumber(memoryRegister.toString());
    });

    document.getElementById('btn_op_equal').addEventListener('click', () => {
        if (!a || !selectedOperation) return;
        if (!b && selectedOperation !== '%') return;
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        let res = 0;
        switch(selectedOperation) {
            case '+': res = numA + numB; break;
            case '-': res = numA - numB; break;
            case 'x': res = numA * numB; break;
            case '/': res = numB !== 0 ? numA / numB : "Error"; break;
            case '%': if (b === '') {
                    res = numA / 100;
                } else {
                    res = numA * (numB / 100);
                }
                break;
        }
        if (res !== "Error") {
            a = res.toString();
        } else {
            a = '';
            ifError = true;
        }
        b = '';
        selectedOperation = null;
        displayNumber(a);
    });

    ['btn_op_plus', 'btn_op_minus', 'btn_op_mult', 'btn_op_div', 'btn_percent'].forEach(id => {
        document.getElementById(id).addEventListener('click', () => {
            selectedOperation = document.getElementById(id).textContent;

            if (selectedOperation === '%') {
                    displayNumber(a + '%');
                }
        });
    });

    document.getElementById('btn_op_clear').addEventListener('click', () => {
        a = ''; b = ''; selectedOperation = null; ifError = false;
        displayNumber('0');
    });

    function adjustFontSize(value) {
    const outputElement = document.getElementById('result');
    const length = value.length;

    if (length <= 9) {
        outputElement.style.fontSize = "1.75rem";
    } else if (length > 9 && length <= 12) {
        outputElement.style.fontSize = "1.4rem";
    } else if (length > 12 && length <= 27) {
        outputElement.style.fontSize = "1.1rem";
    } else if (length > 27) {
        outputElement.style.fontSize = "1.75rem";
        outputElement.textContent = "Error";
        return;
    }
}
});
