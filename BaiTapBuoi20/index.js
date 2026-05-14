/*
* Bài 1: Tìm số lớn thứ hai trong mảng

Mô tả: Cho một mảng các số nguyên chưa được sắp xếp. Hãy viết một hàm tìm và trả về giá trị lớn thứ hai trong mảng đó.

Yêu cầu: * Không sử dụng thuật toán sắp xếp (không dùng sort() hay quickSort) để giữ độ phức tạp là O(n)

Chỉ sử dụng một vòng lặp (for hoặc for...of).

const numbers = [9, 8, 3, 5, 6, 2, 7, 9];
// Expected result: 8
*/

//Use for...of loop:

const numbers = [9, 8, 3, 5, 6, 2, 7, 9];

function findSecondLargest(arr) {
    // Check if the array has at least 2 elements
    if (arr.length < 2) {
        return null;
    }

    // Initialize default values
    let largest = -Infinity;
    let secondLargest = -Infinity;

    // Use only one loop
    for (const number of arr) {

        // If the current number is greater than the largest
        if (number > largest) {
            secondLargest = largest;
            largest = number;
        }

        // If the current number is:
        // - smaller than the largest
        // - greater than secondLargest
        // This avoids duplicate largest values
        else if (number > secondLargest && number < largest) {
            secondLargest = number;
        }
    }

    // If there is no second largest number
    if (secondLargest === -Infinity) {
        return null;
    }

    return secondLargest;
}

console.log(findSecondLargest(numbers)); // 8

//Use for loop:

function findSecondLargest(arr) {
    let largest = -Infinity;
    let secondLargest = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        const number = arr[i];

        if (number > largest) {
            secondLargest = largest;
            largest = number;
        } else if (number > secondLargest && number < largest) {
            secondLargest = number;
        }
    }

    return secondLargest === -Infinity ? null : secondLargest;
}

console.log(findSecondLargest(numbers)); // 8

// Handle all edge cases:
// - empty array
// - array with 1 element
// - all duplicate numbers
// - negative numbers
// - NaN values
// - non-number values

function findSecondLargest(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Input must be an array');
    }

    if (arr.length < 2) {
        return null;
    }

    let largest = -Infinity;
    let secondLargest = -Infinity;

    for (const number of arr) {

        // Validate number
        if (typeof number !== 'number' || Number.isNaN(number)) {
            throw new TypeError('Array must contain only valid numbers');
        }

        // Update largest and secondLargest
        if (number > largest) {
            secondLargest = largest;
            largest = number;
        }

        // Update secondLargest only if:
        // - number is smaller than largest
        // - number is greater than current secondLargest
        else if (number < largest && number > secondLargest) {
            secondLargest = number;
        }
    }

    // Return null if no second largest value exists
    return secondLargest === -Infinity ? null : secondLargest;
}

console.log(findSecondLargest(numbers)); // 8

/*
Bài 2: Gộp mảng, xử lý dữ liệu và sắp xếp

Mô tả: Bạn được cung cấp hai mảng chứa ID của các học viên tham gia hai khóa học khác nhau. Một học viên có thể tham gia cả hai khóa.

Yêu cầu:

1. Sử dụng cú pháp Spread Operator (...) để gộp hai mảng lại thành một mảng duy nhất.

2. Dùng Object/Map để lọc ra các ID bị trùng lặp (mỗi ID chỉ xuất hiện 1 lần trong mảng cuối cùng).

3. Sử dụng thuật toán Quick Sort (tự viết lại dựa trên kiến thức đã học) để sắp xếp mảng ID cuối cùng theo thứ tự tăng dần.

const classA = [15, 2, 8, 10];
const classB = [8, 11, 2, 5, 9];

// Step 1 & 2: [15, 2, 8, 10, 11, 5, 9]
// Step 3: Quick Sort -> [2, 5, 8, 9, 10, 11, 15]
*/

const classA = [15, 2, 8, 10];
const classB = [8, 11, 2, 5, 9];

// Step 1: Merge two arrays using Spread Operator
const mergedArray = [...classA, ...classB];

// Step 2: Remove duplicate IDs using Object
function removeDuplicates(arr) {
    const uniqueMap = {};
    const result = [];

    for (const id of arr) {

        // If the ID does not exist yet
        if (!uniqueMap[id]) {
            uniqueMap[id] = true;
            result.push(id);
        }
    }

    return result;
}

// Step 3: Quick Sort (ascending order)
function quickSort(arr) {

    // Base case
    if (arr.length <= 1) {
        return arr;
    }

    // Choose pivot
    const pivot = arr[arr.length - 1];

    const left = [];
    const right = [];

    // Partition
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // Recursive sorting
    return [...quickSort(left),pivot,...quickSort(right)];
}

// Remove duplicates
const uniqueArray = removeDuplicates(mergedArray);

// Sort array
const sortedArray = quickSort(uniqueArray);

console.log(sortedArray);

// Result:
// [2, 5, 8, 9, 10, 11, 15]