const decryptProcess = (encryptedText, key) => {
    if(encryptedText.length === 0 || key.length === 0) {
        return '';
    }

    encryptedText = encryptedText.toUpperCase();
    key = key.toUpperCase();
    let decryptedText = '';

    for (let i = 0, j = 0; i < encryptedText.length; i++) {
        const encryptedChar = encryptedText.charCodeAt(i);
        if (encryptedChar >= 65 && encryptedChar <= 90) {
            const keyChar = key.charCodeAt(j % key.length) - 65;
            const decryptedChar = String.fromCharCode(((encryptedChar - 65 - keyChar + 26) % 26) + 65);
            decryptedText += decryptedChar;
            j++;
        } else {
            decryptedText += encryptedText.charAt(i);
        }
    }

    return decryptedText;
}

export default decryptProcess