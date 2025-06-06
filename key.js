const keyComboInput = document.getElementById("key");
const keyIndexInput = document.getElementById("indexnum");
const colorInputField = document.getElementById("color");
const displayInputs = document.querySelectorAll(".displaykey");
const form = document.querySelector("form");

const shortcuts = {};

function isValidCssColor(color) {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
}

keyComboInput.addEventListener("keydown", (e) => {
    e.preventDefault();
    let keys = [];
    if (e.ctrlKey) keys.push("Ctrl");
    if (e.shiftKey) keys.push("Shift");  
    if (
        e.key !== "Control" &&
        e.key !== "Shift" &&        
        e.key !== "Meta"
    ) {
        keys.push(e.key.length === 1 ? e.key.toUpperCase() : e.key);
    } else if (keys.length === 0) {
        keys.push(e.key); // allow single modifier keys like "Shift"
    }

    keyComboInput.value = keys.join("+");
});

//Store key combo but do not apply yet
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const combo = keyComboInput.value.trim();
    const index = parseInt(keyIndexInput.value);
    const colorInput = colorInputField.value.trim();

    if (
        !combo || isNaN(index) || index < 1 || index > 3 || !colorInput || !isNaN(colorInput) || !isValidCssColor(colorInput)
    ) {
        alert("Please enter a valid key combination, a number from 1 to 3, and a valid color.");
        return;
    }
    // Store the shortcut
    shortcuts[combo] = { index, color: colorInput };

    // Show combo in container2
    displayInputs[index - 1].value = combo;
    keyComboInput.value = "";
    keyIndexInput.value = "";
    colorInputField.value = "";
});

// Apply styles when key combo is pressed
document.addEventListener("keydown", (e) => {
    let keys = [];
    if (e.ctrlKey) keys.push("Ctrl");
    if (e.shiftKey) keys.push("Shift");

    if (
        e.key !== "Control" &&
        e.key !== "Shift" &&        
        e.key !== "Meta"
    ) {
        keys.push(e.key.length===1 ? e.key.toUpperCase() : e.key);
    } else if (keys.length === 0) {
        keys.push(e.key);
    }

    const pressedCombo = keys.join("+");

    if (shortcuts[pressedCombo]) {
        const { index, color }= shortcuts[pressedCombo];
        switch (index) {
            case 1:
                document.body.style.backgroundColor = color;
                break;
            case 2:
    document.querySelectorAll("*").forEach(el => {
        el.style.color = color;
    });
    break;

            case 3:
                document.querySelector(".container").style.backgroundColor = color;
                document.querySelector(".container2").style.backgroundColor = color;
                break;
        }
    }
});
