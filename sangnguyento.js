function startSimulation() {
    const n = parseInt(document.getElementById('n-value').value);
    if (isNaN(n) || n < 2) {
        alert('Vui lòng nhập số n lớn hơn 2!');
        return;
    }

    document.getElementById('status-text').textContent = "Bắt đầu mô phỏng...";
    document.getElementById('array').innerHTML = "";
    document.getElementById('pseudocode').textContent = "";

    let sieve = Array(n + 1).fill(true);
    sieve[0] = sieve[1] = false;

    let pseudoSteps = [
        "1. Tạo mảng đánh dấu từ 2 đến n, mặc định là nguyên tố.",
        "2. Bắt đầu với số 2, đánh dấu các bội số của nó là không nguyên tố.",
        "3. Tiếp tục với số kế tiếp chưa bị loại bỏ.",
        "4. Lặp lại đến căn bậc hai của n.",
        "5. Các số còn lại là số nguyên tố."
    ];

    displayPseudocode(pseudoSteps, () => displayNumbers(n, sieve));
}

function displayPseudocode(steps, callback) {
    let index = 0;
    let pseudoContainer = document.getElementById('pseudocode');

    let interval = setInterval(() => {
        if (index < steps.length) {
            pseudoContainer.textContent += steps[index] + "\n";
            index++;
        } else {
            clearInterval(interval);
            callback();
        }
    }, 1000);
}

function displayNumbers(n, sieve) {
    const arrayContainer = document.getElementById('array');

    for (let i = 2; i <= n; i++) {
        let box = document.createElement('div');
        box.classList.add('array-box');
        box.textContent = i;
        arrayContainer.appendChild(box);
    }

    document.getElementById('status-text').textContent = "Bắt đầu loại bỏ số không nguyên tố...";
    startSieve(n, sieve);
}

function startSieve(n, sieve) {
    let current = 2;
    let arrayBoxes = document.querySelectorAll('.array-box');

    let interval = setInterval(() => {
        if (current * current > n) {
            clearInterval(interval);

            // Sau khi hoàn thành, tô màu xanh tất cả số nguyên tố chưa được xử lý
            for (let i = 2; i <= n; i++) {
                if (sieve[i]) {
                    arrayBoxes[i - 2].classList.add('prime');
                }
            }

            document.getElementById('status-text').textContent = "Hoàn thành!";
            return;
        }

        if (sieve[current]) {
            for (let multiple = current * current; multiple <= n; multiple += current) {
                if (sieve[multiple]) {
                    sieve[multiple] = false;
                    arrayBoxes[multiple - 2].classList.add('non-prime');
                }
            }
        }

        current++;
    }, 1000);
}
