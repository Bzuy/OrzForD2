document.addEventListener("DOMContentLoaded", () => {
    const arrayContainer = document.getElementById("array");
    const searchBtn = document.getElementById("startSearch");
    const resetBtn = document.getElementById("resetArray");
    const explanationBox = document.getElementById("explanation");
    const searchInput = document.getElementById("searchValue");

    let initialArray = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72];
    let array = [...initialArray];

    function renderArray(highlightIndex = -1) {
        arrayContainer.innerHTML = "";
        array.forEach((num, index) => {
            let div = document.createElement("div");
            div.classList.add("array-box");
            div.textContent = num;
            div.setAttribute("data-index", index);
            if (index === highlightIndex) {
                div.style.backgroundColor = "#f97316"; // Màu cam nếu mới thêm
            }
            arrayContainer.appendChild(div);
        });
    }

    async function binarySearchAnimation(target) {
        let left = 0, right = array.length - 1;
        let bars = document.querySelectorAll(".array-box");

        explanationBox.innerHTML += `<p>Khởi tạo biến: left = ${left}, right = ${right}</p>`;
        await delay(1500);

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            bars[mid].style.backgroundColor = "yellow";
            explanationBox.innerHTML += `<p>Tính mid = (${left} + ${right}) / 2 = ${mid}</p>`;
            await delay(2000);

            if (array[mid] == target) {
                explanationBox.innerHTML += `<p>🎯 Tìm thấy ${target} tại vị trí ${mid}!</p>`;
                bars[mid].style.backgroundColor = "green";
                return;
            }

            if (array[mid] < target) {
                explanationBox.innerHTML += `<p>${target} > ${array[mid]} ⇒ loại bỏ nửa bên trái</p>`;
                left = mid + 1;
            } else {
                explanationBox.innerHTML += `<p>${target} < ${array[mid]} ⇒ loại bỏ nửa bên phải</p>`;
                right = mid - 1;
            }

            for (let i = 0; i < bars.length; i++) {
                if (i < left || i > right) {
                    bars[i].style.opacity = 0.2;
                    bars[i].style.backgroundColor = "gray";
                } else {
                    bars[i].style.opacity = 1;
                }
            }

            await delay(1500);
        }

        explanationBox.innerHTML += `<p>❌ Không tìm thấy ${target} trong mảng</p>`;
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Thêm số vào mảng
    window.addValue = () => {
        const input = document.getElementById("newValue");
        const val = parseInt(input.value);
        if (!isNaN(val)) {
            array.push(val);
            array.sort((a, b) => a - b);
            const newIndex = array.indexOf(val);
            renderArray(newIndex); // Highlight số vừa thêm
            input.value = "";
        } else {
            alert("Vui lòng nhập số hợp lệ để thêm.");
        }
    };

    // Xoá số khỏi mảng
    window.removeValue = () => {
        const input = document.getElementById("removeValue");
        const val = parseInt(input.value);
        if (!isNaN(val)) {
            const originalLength = array.length;
            array = array.filter(x => x !== val);
            if (array.length === originalLength) {
                alert("⚠️ Không tìm thấy số cần xoá.");
            }
            renderArray();
            input.value = "";
        } else {
            alert("Vui lòng nhập số hợp lệ để xoá.");
        }
    };

    // Nút tìm kiếm
    searchBtn.addEventListener("click", () => {
        explanationBox.innerHTML = "";
        let target = parseInt(searchInput.value);
        if (!isNaN(target)) {
            binarySearchAnimation(target);
        } else {
            alert("Vui lòng nhập số hợp lệ!");
        }
    });

    // Nút reset mảng
    resetBtn.addEventListener("click", () => {
        explanationBox.innerHTML = "";
        array = [...initialArray];
        renderArray();
    });

    // Hiển thị mảng ban đầu
    renderArray();
});
