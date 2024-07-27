function combineLists(list1, list2) {
    // Step 1: Merge the two lists
    let mergedList = [...list1, ...list2];
    
    // Step 2: Sort by left position
    mergedList.sort((a, b) => a.positions[0] - b.positions[0]);
    
    // Function to check if two elements should be merged
    function shouldMerge(el1, el2) {
        const [left1, right1] = el1.positions;
        const [left2, right2] = el2.positions;
        const middle2 = (left2 + right2) / 2;
        return middle2 >= left1 && middle2 <= right1;
    }
    
    // Function to merge two elements
    function mergeElements(el1, el2) {
        return {
            positions: el1.positions,
            values: [...el1.values, ...el2.values]
        };
    }

    // Step 3: Combine overlapping elements
    let resultList = [];
    
    for (let i = 0; i < mergedList.length; i++) {
        let current = mergedList[i];
        while (i + 1 < mergedList.length && shouldMerge(current, mergedList[i + 1])) {
            current = mergeElements(current, mergedList[i + 1]);
            i++;
        }
        resultList.push(current);
    }
    
    return resultList;
}

// Example usage:
const list1 = [
    { positions: [0, 10], values: [1, 2] },
    { positions: [15, 25], values: [3] }
];

const list2 = [
    { positions: [5, 20], values: [4, 5] },
    { positions: [30, 40], values: [6] }
];

console.log(combineLists(list1, list2));
