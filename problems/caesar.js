function caesarCipher(message, shift, encode = true) {
    // Normalize the shift to be within the range of 0-25
    shift = shift % 26;
    
    // Helper function to shift a character
    function shiftChar(char, shift) {
        const code = char.charCodeAt(0);

        // Check if character is a letter
        if (code >= 65 && code <= 90) {
            // Uppercase letters
            return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
        } else if (code >= 97 && code <= 122) {
            // Lowercase letters
            return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
        } else {
            // Non-alphabetic characters remain unchanged
            return char;
        }
    }
    
    // Adjust shift for decoding
    if (!encode) {
        shift = -shift;
    }
    
    // Apply the shift to each character in the message
    return message.split('').map(char => shiftChar(char, shift)).join('');
}

// Example usage:
const encodedMessage = caesarCipher("Hello, World!", 3); // Encoding with a shift of 3
console.log("Encoded:", encodedMessage);

const decodedMessage = caesarCipher(encodedMessage, 3, false); // Decoding with a shift of 3
console.log("Decoded:", decodedMessage);
