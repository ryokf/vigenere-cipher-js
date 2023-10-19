function calculateEntropy(encryptedText) {
    const charCount = new Map();

    // Menghitung frekuensi kemunculan karakter
    for (let i = 0; i < encryptedText.length; i++) {
        const char = encryptedText[i];
        if (charCount.has(char)) {
            charCount.set(char, charCount.get(char) + 1);
        } else {
            charCount.set(char, 1);
        }
    }

    // Menghitung probabilitas masing-masing karakter
    const totalChars = encryptedText.length;
    const entropy = [...charCount.values()].reduce((result, count) => {
        const probability = count / totalChars;
        return result - probability * Math.log2(probability);
    }, 0);

    return entropy;
}

export default calculateEntropy;
