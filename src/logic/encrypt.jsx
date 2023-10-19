const encryptProcess = (plainText, key) => {
    if (plainText.length === 0 || key.length === 0) {
        return { encryptedText: '', bitErrorRate: 0 }; // Kembalikan bit error rate awal 0
    }

    plainText = plainText.toUpperCase();
    key = key.replace(/\s/g, '').toUpperCase(); // Menghapus spasi dari kunci
    let encryptedText = '';
    let bitErrorRate = 0;
    let charErrorRate = 0;

    for (let i = 0, j = 0; i < plainText.length; i++) {
        const plainChar = plainText.charCodeAt(i);

        if (isLetter(plainText[i])) {
            const keyChar = key.charCodeAt(j % key.length) - 65;
            const encryptedChar = String.fromCharCode(((plainChar - 65 + keyChar) % 26) + 65);

            encryptedText += encryptedChar;

            if (plainText[i] !== encryptedChar) {
                bitErrorRate++;
            }

            if (plainText[i] !== encryptedChar) {
                charErrorRate++;
            }

            j++;
        } else if (isDigit(plainText[i])) {
            const keyChar = key.charCodeAt(j % key.length) - 65;
            const encryptedChar = String.fromCharCode(((plainChar - 48 + keyChar) % 10) + 48);

            encryptedText += encryptedChar;

            if (plainText[i] !== encryptedChar) {
                bitErrorRate++;
            }

            if (plainText[i] !== encryptedChar) {
                charErrorRate++;
            }

            j++;
        } else {
            encryptedText += plainText.charAt(i);
        }
    }

    // Hitung persentase bit error rate
    bitErrorRate = (bitErrorRate / plainText.length) * 100;
    charErrorRate = (charErrorRate / plainText.length) * 100;

    // console.log(`Bit Error Rate: ${bitErrorRate.toPrecision(3)}%`);
    // console.log(`Char Error Rate: ${charErrorRate.toPrecision(3)}%`);

    return { encryptedText, bitErrorRate, charErrorRate };
}

function isLetter(c) {
    return c.match(/[a-zA-Z]/);
}

function isDigit(c) {
    return c.match(/[0-9]/);
}

export default encryptProcess;
