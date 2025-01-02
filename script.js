let inputNumber = document.getElementById("inputBox");
let calcButtons = document.querySelectorAll("button");
let expression = ""; // Renamed for clarity
let buttonsArray = Array.from(calcButtons);

// Function to evaluate the expression
function evaluateExpression() {
    try {
        // Sync expression with inputBox value
        expression = inputNumber.value;

        // Evaluate the expression
        expression = eval(expression) ?? "";
        inputNumber.value = expression;
    } catch (err) {
        inputNumber.value = "Error"; // Display error message
        expression = ""; // Clear expression
    }
}

// Event listener for button clicks
buttonsArray.forEach((button) => {
    button.addEventListener("click", (e) => {
        const buttonValue = e.target.innerHTML;

        if (buttonValue === "=") {
            evaluateExpression();
        } else if (buttonValue === "AC") {
            expression = ""; // Clear all input
            inputNumber.value = expression;
        } else if (buttonValue === "DEL") {
            // Remove the last character
            expression = expression.slice(0, -1);
            inputNumber.value = expression;
        } else {
            // Append the pressed button's value to the expression
            expression += buttonValue;
            inputNumber.value = expression;
        }
    });
});

// Event listener for keyboard input
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        evaluateExpression(); // Trigger equality on Enter key
    } else if (/[\d+\-*/.]/.test(e.key)) {
        // Allow numbers and operators from the keyboard
        expression += e.key;
        inputNumber.value = expression;
    } else if (e.key === "Backspace") {
        // Handle backspace for deletion
        expression = expression.slice(0, -1);
        inputNumber.value = expression;
    }
});
