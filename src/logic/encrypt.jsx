const encryptProcess = (plainText, key) => {
    if(plainText.length === 0 || key.length === 0) {
        return '';
    }

    plainText = plainText.toUpperCase();
    key = key.toUpperCase();
    let encryptedText = '';

    for (let i = 0, j = 0; i < plainText.length; i++) {
        const plainChar = plainText.charCodeAt(i) - 65; // mendapatkan nilai ASCII
        if (plainChar >= 0 && plainChar <= 25) {
            const keyChar = key.charCodeAt(j % key.length) - 65; // agar pengulangan key mengkuti panjang dari key
            const encryptedChar = String.fromCharCode(((plainChar + keyChar) % 26) + 65);
            encryptedText += encryptedChar;
            j++;
        } else {
            encryptedText += plainText.charAt(i);
        }
    }

    return encryptedText;
}

export default encryptProcess