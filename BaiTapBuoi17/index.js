// BÀI 1: Viết một hàm isEvenNumber(number) nhận vào một số number.
// Nếu số đó chia hết cho 2 (dùng phép chia lấy dư %), trả về true
//Nếu không, trả về false

// Test thử
// console.log(isEvenNumber(10)); // Kết quả mong đợi: true
// console.log(isEvenNumber(7));  // Kết quả mong đợi: false

//Cách 1: Dùng if else
function isEvenNumber(number) {
    if (number % 2 === 0) {
        return true;
    } else {
        return false;
    }
}
console.log(isEvenNumber(10));
console.log(isEvenNumber(7));

//Cách 2: Không dùng if else
function isEvenNumber2(number) {
    return number % 2 === 0;
}
console.log(isEvenNumber2(10));
console.log(isEvenNumber2(7));

//Cách 3: Xét hết các trường hợp
function isEvenNumber3(number) {
    // 1. Kiểm tra kiểu dữ liệu: typeof trả về string mô tả kiểu dữ liệu
    if (typeof number !== 'number') { //nghĩa là nếu biến number không phải kiểu number (chạy khi điều kiện đúng)
        throw new TypeError('Must be a number');
    }

    // 2. Bỏ NaN và Infinity
    if (!Number.isFinite(number)) {//số hợp lệ (không phải Infinity, -Infinity, NaN
        throw new TypeError('must be a finite number');
    }

    // 3. Kiểm tra số nguyên, loại bỏ số thực
    if (!Number.isInteger(number)) {
        return false;
    }

    return number % 2 === 0;
}

console.log(isEvenNumber3(10));
console.log(isEvenNumber3(7));

// Bài 2: Tính tiền điện bậc thang
// Yêu cầu: Viết hàm getElectricityBill(kwh) nhận vào số điện tiêu thụ trong tháng và trả về tổng số tiền cần trả.
// Bậc Số điện tiêu thụ Giá tiền
// 1 0 - 50 kWh 1.678 đ/kWh
// 2 51 - 100 kWh 1.734 đ/kWh
// 3 101 - 200 kWh 2.014 đ/kWh
// 4 201 - 300 kWh 2.536 đ/kWh
// 5 301 - 400 kWh 2.834 đ/kWh
// 6 Trên 400 kWh 2.927 đ/kWh

// Ví dụ
// Nếu dùng 40 kWh: Tiền điện = 40 × 1678
// Nếu dùng 120 kWh
// 50 kWh đầu: 50 × 1678
// 50 kWh tiếp: 50 × 1734
// 20 kWh còn lại: 20 × 2014

// Test thử
// console.log(getElectricityBill(70));
// Mong đợi: (50 * 1678) + (20 * 1734) = 118580
// console.log(getElectricityBill(120));
// Mong đợi: (50 * 1678) + (50 * 1734) + (20 * 2014) = 210880

function getElectricityBill(kwh) {

    let totalAmount = 0;

    if (kwh <= 50) {
        // Bậc 1: 0 - 50 kWh
        totalAmount = kwh * 1678;
    } else if (kwh <= 100) {
        // Bậc 2: 51 - 100 kWh
        totalAmount = (50 * 1678) + (kwh - 50) * 1734;
    } else if (kwh <= 200) {
        // Bậc 3: 101 - 200 kWh
        totalAmount = (50 * 1678) + (50 * 1734) + (kwh - 100) * 2014;
    } else if (kwh <= 300) {
        // Bậc 4: 201 - 300 kWh
        totalAmount = (50 * 1678) + (50 * 1734) + (100 * 2014) + (kwh - 200) * 2536;
    } else if (kwh <= 400) {
        // Bậc 5: 301 - 400 kWh
        totalAmount = (50 * 1678) + (50 * 1734) + (100 * 2014) + (100 * 2536) + (kwh - 300) * 2834;
    } else {
        // Bậc 6: Trên 400 kWh
        totalAmount = (50 * 1678) + (50 * 1734) + (100 * 2014) + (100 * 2536) + (100 * 2834) + (kwh - 400) * 2927;
    }
    return totalAmount;
}

console.log(getElectricityBill(70)); //118580
console.log(getElectricityBill(120));//210880

// Bài 3: Dọn dẹp dữ liệu tên người dùng (String)
//Sử dụng các hàm toLowerCase(), trim(), includes() mà bạn đã học.
//Yêu cầu: Viết hàm cleanName(name, keyword) làm hai việc:
//Dọn dẹp biến name: Xóa khoảng trắng thừa ở hai đầu và chuyển tất cả thành chữ thường.
//Kiểm tra xem tên vừa dọn dẹp có chứa từ khóa keyword (cũng được chuyển về chữ thường) hay không.
//Hàm trả về true nếu có chứa, và false nếu không.

//Test thử
// console.log(cleanName('   NGUYEN Van An   ', 'an')); // Mong đợi: true (vì 'nguyen van an' có chứa 'an')
// console.log(cleanName('   Tran Thi B ', 'hoang'));   // Mong đợi: false

function cleanName(name, keyword) {
    // 1. Làm sạch biến name: Xóa khoảng trắng 2 đầu, chuyển thành chữ thường
    const cleanedName = name.trim().toLowerCase();

    // 2. Chuyển keyword về chữ thường
    const lowerKeyword = keyword.toLowerCase();

    // 3. Kiểm tra tên đã làm sạch có chứa từ khóa hay không
    return cleanedName.includes(lowerKeyword);
}

console.log(cleanName('   NGUYEN Van An   ', 'an')); // Mong đợi: true (vì 'nguyen van an' có chứa 'an')
console.log(cleanName('   Tran Thi B ', 'hoang'));   // Mong đợi: false