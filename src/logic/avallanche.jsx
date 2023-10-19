const calculateAvalancheEffect = (originalText, cipherText) => {
    if (originalText.length !== cipherText.length) {
        throw new Error("Kedua teks harus memiliki panjang yang sama");
    }

    let bitChanges = 0;
    const totalBits = originalText.length * 8; // Menghitung total bit dalam teks

    for (let i = 0; i < originalText.length; i++) {
        const originalChar = originalText[i];
        const modifiedChar = cipherText[i];

        for (let j = 0; j < 8; j++) {
            // Membandingkan bit ke-i dari masing-masing karakter
            const originalBit = (originalChar.charCodeAt(0) >> j) & 1;
            const modifiedBit = (modifiedChar.charCodeAt(0) >> j) & 1;

            if (originalBit !== modifiedBit) {
                bitChanges++;
            }
        }
    }

    const avalancheEffect = (bitChanges / totalBits) * 100;
    return avalancheEffect;
}

export default calculateAvalancheEffect;

// const originalText = "HELLO";
// const cipherText = vigenereEncrypt("HELLO", "KEY"); // Misalnya, mengubah "HELLO" menjadi "RIJVS"
// const effect = calculateAvalancheEffect(originalText, cipherText);
// console.log(`Avalanche effect: ${effect.toFixed(2)}%`);
