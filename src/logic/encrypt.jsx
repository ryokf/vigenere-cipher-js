const encryptProcess = (plainText, key) => {
    if (plainText.length === 0 || key.length === 0) {
        return { encryptedText: '', bitErrorRate: 0 }; // Kembalikan bit error rate awal 0
    }

    plainText = plainText.toUpperCase();
    key = key.toUpperCase();
    let encryptedText = '';
    let bitErrorRate = 0;
    let charErrorRate = 0;

    for (let i = 0, j = 0; i < plainText.length; i++) {
        const plainChar = plainText.charCodeAt(i) - 65; // Mendapatkan nilai ASCII

        if (plainChar >= 0 && plainChar <= 25) {
            const keyChar = key.charCodeAt(j % key.length) - 65; // Agar pengulangan key mengikuti panjang dari key
            const encryptedChar = String.fromCharCode(((plainChar + keyChar) % 26) + 65);

            encryptedText += encryptedChar;

            // Hitung bit error rate
            if (plainText[i] !== encryptedChar) {
                bitErrorRate++;
            }

            // Hitung karakter error rate
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

    return {encryptedText, bitErrorRate, charErrorRate};
}

export default encryptProcess;
