// Tạo mảng ngẫu nhiên
function getRandomArray(size, min, max) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Khởi tạo mảng ban đầu
let A = getRandomArray(8, -10, 10);
let S = [0];

// Hàm vẽ mảng
function renderArrays() {
    const arrayA = document.getElementById("arrayA");
    const arrayS = document.getElementById("arrayS");
    arrayA.innerHTML = '';
    arrayS.innerHTML = '';
    
    A.forEach((num) => {
        let div = document.createElement("div");
        div.classList.add("box");
        div.textContent = num;
        arrayA.appendChild(div);
    });
    
    S.forEach((num) => {
        let div = document.createElement("div");
        div.classList.add("box", "sum-box");
        div.textContent = num;
        arrayS.appendChild(div);
    });
}

// Hàm tính mảng cộng dồn
async function calculatePrefixSum() {
    let explanationBox = document.getElementById("explanation");
    explanationBox.innerHTML = "<h2>Giải thích từng bước</h2>";
    let sum = 0;
    let arrayS = document.getElementById("arrayS");
    
    for (let i = 0; i < A.length; i++) {
        sum += A[i];
        S.push(sum);
        
        let newDiv = document.createElement("div");
        newDiv.classList.add("box", "sum-box");
        newDiv.textContent = sum;
        arrayS.appendChild(newDiv);
        
        explanationBox.innerHTML += `<p>👉 Bước ${i + 1}: Tính S[${i + 1}] = S[${i}] + A[${i}] = ${S[i]} + ${A[i]} = <strong>${sum}</strong></p>`;
        arrayA.children[i].classList.add("highlight");
        newDiv.classList.add("highlight");
        
        await new Promise(res => setTimeout(res, 1000));
        arrayA.children[i].classList.remove("highlight");
        newDiv.classList.remove("highlight");
    }
}

// Hàm reset lại mảng
function resetSimulation() {
    A = getRandomArray(8, -10, 10);
    S = [0];
    document.getElementById("explanation").innerHTML = "";
    renderArrays();
}

// Hàm thêm phần tử vào mảng
function addElementToArray() {
    let inputValue = document.getElementById("newElement").value;
    if (inputValue !== "" && !isNaN(inputValue)) {
        A.push(parseInt(inputValue));
        S = [0];  // Reset mảng cộng dồn khi thay đổi mảng A
        document.getElementById("newElement").value = "";
        renderArrays();
    } else {
        alert("Vui lòng nhập một số hợp lệ!");
    }
}

// Hàm xóa phần tử cuối cùng khỏi mảng
function removeElementFromArray() {
    A.pop();
    S = [0];  // Reset mảng cộng dồn khi thay đổi mảng A
    renderArrays();
}

// Hàm cập nhật mảng sau khi thêm hoặc xóa phần tử
document.getElementById("addElement").addEventListener("click", addElementToArray);
document.getElementById("removeElement").addEventListener("click", removeElementFromArray);

// Gọi hàm renderArrays khi bắt đầu
renderArrays();
