const NORMAL_CHARACTER = [["«", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩", "០", "ឥ", "ឲ", "delete"], ["tab", "ឆ", "ិ", "េ", "រ", "ត", "យ", "ុ", "ិ", "ោ", "ផ", "ៀ", "ឪ", "ឭ"], ["caps lock", "ា", "ស", "ដ", "ថ", "ង", "ហ", "្", "ក", "ល", "ើ", "់", "enter"], ["shift", "ឋ", "ខ", "ច", "វ", "ប", "ន", "ម", "ឦ", "។", "៊", "shift"], ["Ctrl", "", "", "Alt", "Space", "Alt", "", "", "Ctrl"]];

/* TODO: NEED TO BE REVERIFY */
const SHIFT_CHARACTER = [["»", "!", "ៗ", "\"", "៛", "%", "៍", "័", "៏", "ឰ", "ឳ", "៌", "៎", "delete"], ["tab", "ឈ", "ឺ", "ែ", "ឬ", "ទ", "ួ", "ូ", "ី", "ៅ", "ភ", "ឿ", "ឧ", "ឮ"], ["caps lock", "ាំ", "ៃ", "ឌ", "ធ", "អ", "ះ", "ញ", "គ", "ឡ", "៖", "៉", "enter"], ["shift", "ឍ", "ឃ", "ជ", "េះ", "ព", "ណ", "ំ", "ឱ", "៕", "ឯ", "shift"], ["Ctrl", "", "", "Alt", "Space", "Alt", "", "", "Ctrl"]];
const ALT_CHARACTER = ["", "", "@", "៑", "$", "€", "៙", "៚", "*", "(", ")", "+", "=", "delete", "tab", "ឈ", "ឺ", "ែ", "ឬ", "ទ", "ួ", "ូ", "ី", "ៅ", "ភ", "ឿ", "ឧ", "ឮ", "caps lock", "ាំ", "ៃ", "ឌ", "ធ", "អ", "ះ", "ញ", "គ", "ឡ", "៖", "៉", "enter", "shift", "ឍ", "ឃ", "ជ", "េះ", "ព", "ណ", "ំ", "ឱ", "៕", "ឯ", "shift", "Ctrl", "", "", "Alt", "Space", "Alt", "", "", "Ctrl"];

document.addEventListener("DOMContentLoaded", function () {
    const SPACIAL_KEY = {
        "shift": {
            name: "shift_key",
            handler: onShiftKeyClick
        }
    }

    var isAlt = false;

    const keyboard = document.getElementById("keyboard");
    function changeKey(characters) {
        keyboard.innerHTML = "";
        characters.forEach((row, index) => {
            const rowEle = document.createElement("div");
            rowEle.classList.add("row-" + (index + 1));

            row.forEach(char => {
                const keyEle = document.createElement("div");
                keyEle.classList.add("key");

                const keyLabelEle = document.createElement("p");
                keyLabelEle.classList.add("kh-label");
                keyLabelEle.innerText = char;

                keyEle.appendChild(keyLabelEle);
                if (SPACIAL_KEY[char]) {
                    keyEle.id = SPACIAL_KEY[char].name;
                    keyEle.addEventListener('click', SPACIAL_KEY[char].handler)
                }

                rowEle.appendChild(keyEle);
            })

            keyboard.appendChild(rowEle);
        })
    }

    var isShift = false;
    function onShiftKeyClick() {
        isShift = !isShift;
        console.log(isShift);
        var characters = [];
        if (isShift) {
            characters = SHIFT_CHARACTER;
        }
        else {
            characters = NORMAL_CHARACTER
        }

        changeKey(characters);
    }

    const shiftKey = document.getElementById("shift_key");
    console.log(shiftKey);
    shiftKey.addEventListener("click", function (e) { onShiftKeyClick() });

    changeKey(NORMAL_CHARACTER);
});
