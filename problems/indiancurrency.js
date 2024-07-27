function toIndianCurrencyFormat(number) {
    // Convert the number to a string and split it into integer and decimal parts
    const [integerPart, decimalPart] = number.toString().split('.');

    // Function to format the integer part according to the Indian numbering system
    function formatIntegerPart(num) {
        // Remove leading zeros
        num = num.replace(/^0+/, '');

        // Handle the first part (last 3 digits)
        let result = num.slice(-3);
        let remaining = num.slice(0, -3);

        // Add commas every 2 digits in the remaining part
        while (remaining.length > 0) {
            result = remaining.slice(-2) + ',' + result;
            remaining = remaining.slice(0, -2);
        }

        // Remove trailing comma if present
        if (result.startsWith(',')) {
            result = result.slice(1);
        }

        return result;
    }

    // Format both integer and decimal parts
    const formattedIntegerPart = formatIntegerPart(integerPart);
    const formattedDecimalPart = decimalPart ? `.${decimalPart}` : '';

    return formattedIntegerPart + formattedDecimalPart;
}

// Example usage:
console.log(toIndianCurrencyFormat(189393923056.7891)); // Output: 1,23,456.7891
console.log(toIndianCurrencyFormat(1000000));    // Output: 10,00,000
console.log(toIndianCurrencyFormat(123456789));  // Output: 12,34,56,789
console.log(toIndianCurrencyFormat(1234.56));    // Output: 1,234.56
