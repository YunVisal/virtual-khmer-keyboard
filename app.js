const DESKTOP_CHARACTER = {
    NORMAL_CHARACTER: [["«", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩", "០", "ឥ", "ឲ", "delete"], ["tab", "ឆ", "ិ", "េ", "រ", "ត", "យ", "ុ", "ិ", "ោ", "ផ", "ៀ", "ឪ", "ឮ"], ["caps lock", "ា", "ស", "ដ", "ថ", "ង", "ហ", "្", "ក", "ល", "ើ", "់", "enter"], ["shift", "ឋ", "ខ", "ច", "វ", "ប", "ន", "ម", "ឦ", "។", "៊", "shift"], ["Ctrl", "", "", "Alt", "Space", "Alt", "", "", "Ctrl"]],
    SHIFT_CHARACTER: [["»", "!", "ៗ", "\"", "៛", "%", "៍", "័", "៏", "(", ")", "៌", "=", "delete"], ["tab", "ឈ", "ឺ", "ែ", "ឬ", "ទ", "ួ", "ូ", "ី", "ៅ", "ភ", "ឿ", "ឧ", "ឭ"], ["caps lock", "ាំ", "ៃ", "ឌ", "ធ", "អ", "ះ", "ញ", "គ", "ឡ", "ោះ", "៉", "enter"], ["shift", "ឍ", "ឃ", "ជ", "េះ", "ព", "ណ", "ំ", "ុះ", "៕", "?", "shift"], ["Ctrl", "", "", "Alt", "Space", "Alt", "", "", "Ctrl"]],
    ALT_CHARACTER: [["", "", "@", "៑", "$", "€", "៙", "៚", "*", "{", "}", "x", "៎", "delete"], ["tab", "", "", "ឯ", "ឫ", "", "", "", "ឦ", "ឱ", "ឰ", "ឩ", "ឳ", "\\"], ["caps lock", "", "", "", "", "", "", "", "", "", "៖", "◌ៈ", "enter"], ["shift", "", "", "", "", "", "", "", ",", ".", "/", "shift"], ["Ctrl", "", "", "Alt", "Space", "Alt", "", "", "Ctrl"]],
}

const MOBILE_CHARACTER = {
    NORMAL_CHARACTER: [["១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩", "០", "ឥ", "ឲ"], ["ឆ", "ិ", "េ", "រ", "ត", "យ", "ុ", "ិ", "ោ", "ផ", "ៀ", "ឪ"], ["ា", "ស", "ដ", "ថ", "ង", "ហ", "្", "ក", "ល", "ើ", "់", "ឮ"], ["⇧", "ឋ", "ខ", "ច", "វ", "ប", "ន", "ម", "ឦ", "។", "៊", "⌫"], ["", "", "Space", "", "⏎"]],
    SHIFT_CHARACTER: [["!", "ៗ", "\"", "៛", "%", "៍", "័", "៏", "(", ")", "៌", "៎"], ["ឈ", "ឺ", "ែ", "ឬ", "ទ", "ួ", "ូ", "ី", "ៅ", "ភ", "ឿ", "ឧ"], ["ាំ", "ៃ", "ឌ", "ធ", "អ", "ះ", "ញ", "គ", "ឡ", "ោះ", "៉", "ឯ"], ["⇧", "ឍ", "ឃ", "ជ", "េះ", "ព", "ណ", "ំ", "ុះ", "៕", "?", "⌫"], ["", "", "Space", "", "⏎"]],
    ALT_CHARACTER: [["", "", "@", "៑", "$", "€", "៙", "៚", "*", "{", "}", "x", "៎", "delete"], ["tab", "", "", "ឯ", "ឫ", "", "", "", "ឦ", "ឱ", "ឰ", "ឩ", "ឳ", "\\"], ["caps lock", "", "", "", "", "", "", "", "", "", "៖", "◌ៈ", "enter"], ["shift", "", "", "", "", "", "", "", ",", ".", "/", "shift"], ["Ctrl", "", "", "Alt", "Space", "Alt", "", "", "Ctrl"]],
}

var charset = {};

document.addEventListener("DOMContentLoaded", function () {
    const SPACIAL_KEY = {
        "shift": {
            domId: "shift_key",
            handler: onShiftKeyClick
        },
        "⇧": {
            domId: "shift_key",
            handler: onShiftKeyClick
        },
        "Alt": {
            domId: "alt_key",
            handler: onAltKeyClick
        },
        "delete": {
            domId: "del_key",
            handler: onDeleteKeyClick
        },
        "⌫": {
            domId: "del_key",
            handler: onDeleteKeyClick
        },
        "tab": {
            domId: "tab_key",
            handler: onTabKeyClick
        },
        "caps lock": {
            domId: "cap_lock_key",
            handler: function () { console.log("caps lock") }
        },
        "enter": {
            domId: "enter_key",
            handler: onEnterKeyClick
        },
        "⏎": {
            domId: "enter_key",
            handler: onEnterKeyClick
        },
        "Ctrl": {
            domId: "ctrl_key",
            handler: function () { console.log("Ctrl") }
        },
        "Space": {
            domId: "space_key",
            handler: onSpaceKeyClick
        }
    }

    const LARGE_CHAR = { "ាំ": {}, "ោះ": {}, "េះ": {}, "ុះ": {} }

    var inputString = "";
    const textInput = document.getElementById("textInput");
    textInput.value = inputString;

    var keyboard = document.getElementById("desktop-keyboard");
    console.log(window.getComputedStyle(keyboard).display === "grid")
    const isDesktop = window.getComputedStyle(keyboard).display == "grid";
    if (!isDesktop) {
        keyboard = document.getElementById("mobile-keyboard");
        charset = MOBILE_CHARACTER;
    }
    else {
        charset = DESKTOP_CHARACTER;
    }

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
                if (LARGE_CHAR[char] && !isDesktop) {
                    keyLabelEle.style.fontSize = "12px";
                }
                keyLabelEle.innerText = char;

                keyEle.appendChild(keyLabelEle);
                if (SPACIAL_KEY[char]) {
                    keyEle.id = SPACIAL_KEY[char].domId;
                    keyEle.addEventListener('click', SPACIAL_KEY[char].handler)
                }
                else {
                    keyEle.addEventListener('click', function (e) { onInputKeyClick(char) })
                }

                rowEle.appendChild(keyEle);
            })

            keyboard.appendChild(rowEle);
        })
    }

    function onInputKeyClick(char) {
        inputString += char;
        textInput.value = inputString;
    }

    function onTabKeyClick() {
        onInputKeyClick("\t")
    }

    function onEnterKeyClick() {
        onInputKeyClick("\n")
    }

    function onSpaceKeyClick() {
        onInputKeyClick(" ")
    }

    function onDeleteKeyClick() {
        inputString = inputString.substring(0, inputString.length - 1);
        textInput.value = inputString;
    }

    var isShift = false;
    function onShiftKeyClick() {
        isShift = !isShift;
        var characters = [];
        if (isShift) {
            characters = charset.SHIFT_CHARACTER;
        }
        else {
            characters = charset.NORMAL_CHARACTER
        }

        changeKey(characters);
    }

    var isAlt = false;
    function onAltKeyClick() {
        isAlt = !isAlt;
        var characters = [];
        if (isAlt) {
            characters = charset.ALT_CHARACTER;
        }
        else {
            characters = charset.NORMAL_CHARACTER
        }

        changeKey(characters);
    }

    const shiftKey = document.getElementById("shift_key");
    shiftKey.addEventListener("click", function (e) { onShiftKeyClick() });

    const altKey = document.getElementById("alt_key");
    altKey.addEventListener("click", function (e) { onAltKeyClick() });

    changeKey(charset.NORMAL_CHARACTER);
});
