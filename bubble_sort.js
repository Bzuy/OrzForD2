document.addEventListener("DOMContentLoaded", () => {
    const instructionsBox = document.getElementById("instructions");
    const startTutorialBtn = document.getElementById("startTutorial");
    const visualizationSection = document.querySelector(".visualization");

    // Ẩn phần mô phỏng ban đầu
    visualizationSection.style.display = "none";

    startTutorialBtn.addEventListener("click", () => {
        instructionsBox.style.display = "none"; // Ẩn hướng dẫn
        visualizationSection.style.display = "block"; // Hiển thị phần mô phỏng
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const arrayContainer = document.getElementById("array-container");
    const generateBtn = document.getElementById("generateArray");
    const sortBtn = document.getElementById("sortArray");
    const codeDisplay = document.getElementById("code-display");
    const explanationBox = document.getElementById("explanation");
    
    let array = [];
    
    const codeLines = [
        "for (let i = 1; i <= array.length; i ++) {",
        "   for (let j = 1; j <= array.length - i; j++) {",
        "       if (array[j] > array[j + 1]) swap(array[j], array[j + 1]);",
        "   }",
        "}" 
    ];
    
    function displayCode() {
        codeDisplay.innerHTML = "";
        codeLines.forEach((line, index) => {
            const codeLine = document.createElement("pre");
            codeLine.textContent = line;
            codeLine.setAttribute("data-line", index);
            codeDisplay.appendChild(codeLine);
        });
    }
    
    function highlightCodeLine(index) {
        document.querySelectorAll("#code-display pre").forEach(line => {
            line.style.backgroundColor = "";
        });
        document.querySelector(`#code-display pre[data-line='${index}']`).style.backgroundColor = "yellow";
    }
    
    function generateArray() {
        array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
        displayArray();
    }
    
    function displayArray() {
        arrayContainer.innerHTML = "";
        array.forEach((value, index) => {
            const bar = document.createElement("div");
            bar.classList.add("array-bar");
            bar.style.height = `${value * 3}px`;
            bar.textContent = value;
            bar.setAttribute("data-index", index);
            arrayContainer.appendChild(bar);
        });
    }
    
    async function swapBars(bar1, bar2) {
        return new Promise(resolve => {
            const tempTransform = bar1.style.transform;
            bar1.style.transform = bar2.style.transform;
            bar2.style.transform = tempTransform;
            
            setTimeout(() => {
                arrayContainer.insertBefore(bar2, bar1);
                resolve();
            }, 500);
        });
    }
    
    async function bubbleSort() {
        let bars = document.querySelectorAll(".array-bar");
        for (let i = 0; i < array.length - 1; i++) {
            highlightCodeLine(0); // Line 1: Outer loop
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            for (let j = 0; j < array.length - i - 1; j++) {
                highlightCodeLine(1); // Line 2: Inner loop
                bars[j].style.backgroundColor = "red";
                bars[j + 1].style.backgroundColor = "red";
                explanationBox.innerText = `So sánh ${array[j]} và ${array[j + 1]}`;
                await new Promise(resolve => setTimeout(resolve, 1000));
    
                if (array[j] > array[j + 1]) {
                    highlightCodeLine(2); // Line 3: Swap condition
                    explanationBox.innerText = `Hoán đổi ${array[j]} và ${array[j + 1]}`;
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    await swapBars(bars[j], bars[j + 1]);
                    bars = document.querySelectorAll(".array-bar");
                } else {
                    explanationBox.innerText = `${array[j]} đã đúng vị trí so với ${array[j + 1]}`;
                }
                
                bars[j].style.backgroundColor = "#0073e6";
                bars[j + 1].style.backgroundColor = "#0073e6";
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        explanationBox.innerText = "Mảng đã được sắp xếp xong!";
    }
    
    generateBtn.addEventListener("click", generateArray);
    sortBtn.addEventListener("click", bubbleSort);
    
    displayCode();
    generateArray();
});