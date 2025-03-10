document.getElementById("palindromeBtn").addEventListener("click", () => {
    const inputField = document.getElementById("palindromeInput");
    const str = inputField.value.trim();
    const isPal = str.toLowerCase() === str.toLowerCase().split("").reverse().join("");
    inputField.style.backgroundColor = isPal ? "green" : "red";
});

function caesarCipher(str, shift) {
    return str.split("").map(char => {
        let code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
        else if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        else {
            return char;
        }
    }).join("");
}


document.getElementById("encryptBtn").addEventListener("click", () => {
    const text = document.getElementById("cipherText").value;
    const shift = parseInt(document.getElementById("cipherNumber").value);
    const encrypted = caesarCipher(text, shift);
    document.getElementById("cipherResult").innerText = encrypted;
});


document.getElementById("decryptBtn").addEventListener("click", () => {
    const text = document.getElementById("cipherText").value;
    const shift = parseInt(document.getElementById("cipherNumber").value);

    const decrypted = caesarCipher(text, (26 - shift) % 26);
    document.getElementById("cipherResult").innerText = decrypted;
});