const calculateEntropy = (encryptedText) => {
    const charCount = {};

    for (const element of encryptedText) {
        const char = element;
        if (charCount[char]) {
            charCount[char] += 1;
        } else {
            charCount[char] = 1;
        }
    }

    // console.log(charCount);

    const totalChars = encryptedText.length;
    const entropy = [...Object.values(charCount)].reduce((result, count) => {
        const probability = count / totalChars;
        return result - probability * Math.log2(probability);
    }, 0);

    return entropy;
}

export default calculateEntropy;
