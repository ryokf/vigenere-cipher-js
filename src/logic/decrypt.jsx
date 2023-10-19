const decryptProcess = (encryptedText, key) => {
    if (encryptedText.length === 0 || key.length === 0) {
        return { decryptedText: '', bitErrorRate: 0, charErrorRate: 0 };
    }

    key = key.replace(/\s/g, '').toUpperCase();
    let decryptedText = '';
    let bitErrorRate = 0;
    let charErrorRate = 0;

    for (let i = 0, j = 0; i < encryptedText.length; i++) {
        const encryptedChar = encryptedText.charCodeAt(i);

        if (isLetter(encryptedText[i])) {
            const keyChar = key.charCodeAt(j % key.length) - 65;
            const decryptedChar = String.fromCharCode(((encryptedChar - 65 - keyChar + 26) % 26) + 65);

            decryptedText += decryptedChar;

            if (encryptedText[i] !== decryptedChar) {
                bitErrorRate++;
            }

            if (encryptedText[i] !== decryptedChar) {
                charErrorRate++;
            }

            j++;
        } else if (isDigit(encryptedText[i])) {
            const keyChar = key.charCodeAt(j % key.length) - 65;
            const decryptedChar = String.fromCharCode(((encryptedChar - 48 - keyChar + 10) % 10) + 48);

            decryptedText += decryptedChar;

            if (encryptedText[i] !== decryptedChar) {
                bitErrorRate++;
            }

            if (encryptedText[i] !== decryptedChar) {
                charErrorRate++;
            }

            j++;
        } else {
            decryptedText += encryptedText.charAt(i);
        }
    }

    // bitErrorRate = (bitErrorRate / encryptedText.length) * 100;
    // charErrorRate = (charErrorRate / encryptedText.length) * 100;

    return decryptedText;
}

function isLetter(c) {
    return c.match(/[a-zA-Z]/);
}

function isDigit(c) {
    return c.match(/[0-9]/);
}

export default decryptProcess;
