let container = document.getElementById("steps");
let resultText = document.getElementById("result");

function startRecursion() {
    let number = parseInt(document.getElementById("inputNumber").value);

    // Kiểm tra đầu vào
    if (isNaN(number) || number < 0) {
        alert("Vui lòng nhập một số nguyên dương.");
        return;
    }

    // Reset
    container.innerHTML = "";
    resultText.textContent = "";

    // Bắt đầu gọi hàm
    setTimeout(() => {
        let result = factorialVisual(number);
        setTimeout(() => {
            resultText.textContent = `✨ Giai thừa của ${number} là: ${result}`;
        }, (number + 2) * 1000); 
    }, 300);
}

// Mô phỏng đệ quy với khối hộp
let delay = 0;

function factorialVisual(n) {
    const currentBox = createBox(`📥 Gọi factorial(${n})`, "call");
    container.appendChild(currentBox);

    // Điều kiện dừng
    if (n === 0 || n === 1) {
        delay += 1000;
        setTimeout(() => {
            currentBox.textContent = `✅ factorial(${n}) = 1`;
            currentBox.classList.replace("call", "return");
        }, delay);
        return 1;
    }

    // Đệ quy
    let result = n * factorialVisual(n - 1);

    // Khi trả về
    delay += 500;
    setTimeout(() => {
        currentBox.textContent = `🔁 factorial(${n}) = ${n} * factorial(${n - 1}) = ${result}`;
        currentBox.classList.replace("call", "return");
    }, delay);

    return result;
}

// Tạo khối
function createBox(text, type) {
    const div = document.createElement("div");
    div.className = `rec-box ${type}`;
    div.textContent = text;
    return div;
}
