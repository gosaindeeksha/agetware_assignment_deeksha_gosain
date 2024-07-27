// function to find the minimum loss
function minimizeLoss(years, prices) {
    let minLoss = Infinity; // Initialize minimum loss to a large value
    let buyYear = -1; // Initialize buy year
    let sellYear = -1; // Initialize sell year

    // Iterate through each possible buying year
    for (let i = 0; i < years; i++) {
        // Iterate through the subsequent years for selling
        for (let j = i + 1; j < years; j++) {
            // Calculate the loss
            let loss = prices[i] - prices[j];

            // Update minimum loss and corresponding years if a valid loss is found
            if (loss > 0 && loss < minLoss) {
                minLoss = loss;
                buyYear = i + 1; // Convert to 1-based index
                sellYear = j + 1; // Convert to 1-based index
            }
        }
    }

    // Return the result
    return {
        buyYear,
        sellYear,
        minLoss
    };
}

// Example usage:
const years = 6;
const prices = [30, 19, 10, 2, 1,18];

const result = minimizeLoss(years, prices);
console.log(`Buy in year ${result.buyYear}, Sell in year ${result.sellYear}`);
console.log(`Minimum loss: ${result.minLoss}`);
