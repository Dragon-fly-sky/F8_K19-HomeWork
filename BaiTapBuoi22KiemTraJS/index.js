const employees = [
    { id: 1, name: "Alice", age: 23, status: "working" },
    { id: 3, name: "Bob", age: 25, status: "working" },
    { id: 6, name: "John", age: 27, status: "working" },
    { id: 8, name: "David", age: 23, status: "quit_job" },
    { id: 10, name: "Eve", age: 20, status: "working" },
];

const products = [
    { id: 1, name: "Phone", price: 1200 },
    { id: 2, name: "Laptop", price: 3000 },
    { id: 3, name: "Tab", price: 2000 },
    { id: 4, name: "PC", price: 800 },
    { id: 5, name: "Monitor", price: 1500 },
];

const orders = [
    { id: 1, employeeId: 1, productId: 4, quantity: 1 },
    { id: 2, employeeId: 3, productId: 2, quantity: 4 },
    { id: 3, employeeId: 1, productId: 5, quantity: 3 },
    { id: 4, employeeId: 6, productId: 1, quantity: 2 },
    { id: 5, employeeId: 3, productId: 5, quantity: 3 },
    { id: 6, employeeId: 8, productId: 1, quantity: 1 },
    { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];

/*
Yêu cầu viết các HÀM
+ lam dung 80%
    + comment code: bang tieng anh (neu co comment)
    + ten bien: tuan thu quy tac
+ tối ưu 20%
    + toc do
    + code (ham dung chung thi viet chung)

Bai 1: Lay ra ds nhan vien dang lam viec
Bai 2: Lay ra nhan vien lon tuoi nhat
Bai 3: Lay ra san phan gia re nhat
Bai 4: Tìm ra sản phẩm bán chạy nhất ( bán nhiều nhất về mặt số lượng )
Bai 5: Tim ra san phan doanh thu cao nhat ( nhiều tiền nhất )
Bai 6: Tim ra nhan vien ban nhieu hang nhat
Bai 7: Tim ra nhan vien co doanh thu cao nhat
Bai 8: Tim ra san pham ban co doanh thu nhat cua moi nhan vien
Bai 9:
Gia su nhan vien se nhan duoc hoa hong la 3%
-> tim hoa hong cho moi nhan vien
Bai 10:Sap xep nhan vien theo thu tu giam dan theo doanh thu
*/

// Commission rate is 3%.
const COMMISSION_RATE = 0.03;

/*
 Create a Map from an array using each item's id as the key.
*/
const createMapById = (items) => {
    return new Map(items.map((item) => [item.id, item]));
};

/**
 Check if a value is a valid number.
 This function prevents invalid calculations with:
 - undefined
 - null
 - NaN
 - Infinity
 - string values like "100"
 Number.isFinite(value) only returns true for real finite numbers.
 */
const isValidNumber = (value) => {
    return typeof value === "number" && Number.isFinite(value);
};

/*
 Increase a numeric value inside a Map.
 If the key already exists:
 - Add the new value to the old value.
 If the key does not exist:
 - Start from 0, then add the new value.
 */
const increaseValueInMap = (map, key, value) => {
    map.set(key, (map.get(key) || 0) + value);
};

/*
 Return one item that has the maximum value.
 getValue is a callback function used to decide which value should be compared.
 If the input array is empty, return null.
 */
const getMaxBy = (items, getValue) => {
    if (!items.length) return null;

    return items.reduce((maxItem, currentItem) => {
        return getValue(currentItem) > getValue(maxItem) ? currentItem : maxItem;
    });
};

/*
 Return one item that has the minimum value.
 getValue is a callback function used to decide which value should be compared.
 If the input array is empty, return null.
 */
const getMinBy = (items, getValue) => {
    if (!items.length) return null;

    return items.reduce((minItem, currentItem) => {
        return getValue(currentItem) < getValue(minItem) ? currentItem : minItem;
    });
};

/*
 Return all items that have the maximum value.
 This function is used instead of getMaxBy when there can be a tie.
 */
const getAllMaxBy = (items, getValue) => {
    if (!items.length) return [];

    const maxValue = Math.max(...items.map(getValue));

    return items.filter((item) => getValue(item) === maxValue);
};

/*
 Validate an order before using it in calculations.
 A valid order must satisfy:
 - employeeId exists in the employee list.
 - productId exists in the product list.
 - quantity must be a valid number.
 - quantity must be greater than 0.
 - product price must be a valid number.
 - product price must be greater than or equal to 0.
 */
const isValidOrder = (order, employeeMap, productMap) => {
    const employee = employeeMap.get(order.employeeId);
    const product = productMap.get(order.productId);

    if (!employee) return false;
    if (!product) return false;
    if (!isValidNumber(order.quantity) || order.quantity <= 0) return false;
    if (!isValidNumber(product.price) || product.price < 0) return false;

    return true;
};

/*
 Build all reusable sales report data in one pass through orders.
 This is the main optimization in the program.
 Instead of calculating:
 - product sales quantity in one function,
 - product revenue in another function,
 - employee quantity in another function,
 - employee revenue in another function,
 - employee the best product in another function,
 Calculate all of them together in a single loop.
 This avoids repeated loops and repeated Map creation.
*/
const buildSalesReport = (
    employees,
    products,
    orders,
    onlyWorkingEmployees = false
) => {
    // Create lookup maps once.
    // These maps are reused throughout the function.
    const employeeMap = createMapById(employees);
    const productMap = createMapById(products);

    // Store valid orders after validation.
    const validOrders = [];

    // productId => total quantity sold
    const productQuantityMap = new Map();

    // productId => total revenue
    const productRevenueMap = new Map();

    // employeeId => total quantity sold by employee
    const employeeQuantityMap = new Map();

    // employeeId => total revenue generated by employee
    const employeeRevenueMap = new Map();

    // employeeId => Map(productId => revenue generated by that product)
    //
    // This nested Map is used for Bai 8:
    // Find the highest revenue product of each employee.
    const employeeProductRevenueMap = new Map();

    orders.forEach((order) => {
        // Skip invalid orders immediately.
        // Invalid orders should not affect any exercise result.
        if (!isValidOrder(order, employeeMap, productMap)) return;

        const employee = employeeMap.get(order.employeeId);

        // If onlyWorkingEmployees is true, ignore orders from employees who quit.
        if (onlyWorkingEmployees && employee.status !== "working") return;

        const product = productMap.get(order.productId);

        // Revenue of one order = product price * quantity.
        const revenue = product.price * order.quantity;

        // Save the order because it passed all validation rules.
        validOrders.push(order);

        // Update product-level statistics.
        increaseValueInMap(productQuantityMap, order.productId, order.quantity);
        increaseValueInMap(productRevenueMap, order.productId, revenue);

        // Update employee-level statistics.
        increaseValueInMap(employeeQuantityMap, order.employeeId, order.quantity);
        increaseValueInMap(employeeRevenueMap, order.employeeId, revenue);

        // If this employee does not have a product revenue map yet,
        // create a new Map for that employee.
        if (!employeeProductRevenueMap.has(order.employeeId)) {
            employeeProductRevenueMap.set(order.employeeId, new Map());
        }

        // Update revenue of this product for this employee.
        increaseValueInMap(
            employeeProductRevenueMap.get(order.employeeId),
            order.productId,
            revenue
        );
    });

    // Convert productQuantityMap into an array that is easier to read and use.
    const productSales = [...productQuantityMap.entries()].map(
        ([productId, totalQuantity]) => ({
            product: productMap.get(productId),
            totalQuantity,
        })
    );

    // Convert productRevenueMap into an array that is easier to read and use.
    const productRevenues = [...productRevenueMap.entries()].map(
        ([productId, totalRevenue]) => ({
            product: productMap.get(productId),
            totalRevenue,
        })
    );

    // Convert employee maps into employee summary objects.
    const employeeSummaries = [...employeeRevenueMap.entries()].map(
        ([employeeId, totalRevenue]) => {
            const totalQuantity = employeeQuantityMap.get(employeeId) || 0;

            return {
                employee: employeeMap.get(employeeId),
                totalQuantity,
                totalRevenue,
                commission: totalRevenue * COMMISSION_RATE,
            };
        }
    );

    // Build the best product result for each employee.
    const employeeBestProducts = [...employeeProductRevenueMap.entries()].map(
        ([employeeId, productRevenueMap]) => {
            const productRevenuesOfEmployee = [...productRevenueMap.entries()].map(
                ([productId, totalRevenue]) => ({
                    product: productMap.get(productId),
                    totalRevenue,
                })
            );
            return {
                employee: employeeMap.get(employeeId),
                // Use getAllMaxBy to support tie cases.
                // If an employee has two products with the same highest revenue, both products will be returned.
                bestProducts: getAllMaxBy(
                    productRevenuesOfEmployee,
                    (item) => item.totalRevenue
                ),
            };
        }
    );

    return {validOrders, productSales, productRevenues, employeeSummaries, employeeBestProducts,};
};

// Bai 1: Get all employees who are still working.
const getWorkingEmployees = (employees) => {
    return employees.filter((employee) => employee.status === "working");
};

// Bai 2: Get the oldest employee.
const getOldestEmployee = (employees) => {
    return getMaxBy(employees, (employee) => employee.age);
};

// Bai 3: Get the cheapest product.
const getCheapestProduct = (products) => {
    return getMinBy(products, (product) => product.price);
};

// Bai 4: Get the best-selling product by quantity.
const getBestSellingProductsByQuantity = (productSales) => {
    return getAllMaxBy(productSales, (item) => item.totalQuantity);
};

// Bai 5: Get the product with the highest revenue.
const getHighestRevenueProducts = (productRevenues) => {
    return getAllMaxBy(productRevenues, (item) => item.totalRevenue);
};

// Bai 6: Get the employee who sold the most items by quantity.
const getTopEmployeesByQuantity = (employeeSummaries) => {
    return getAllMaxBy(employeeSummaries, (item) => item.totalQuantity);
};

// Bai 7: Get the employee who generated the highest revenue.
const getTopEmployeesByRevenue = (employeeSummaries) => {
    return getAllMaxBy(employeeSummaries, (item) => item.totalRevenue);
};

// Bai 8: Get the highest revenue product of each employee.
const getHighestRevenueProductsOfEachEmployee = (employeeBestProducts) => {
    return employeeBestProducts;
};

// Bai 9: Calculate commission for each employee.
const getCommissionsOfEachEmployee = (employeeSummaries) => {
    return employeeSummaries.map((item) => ({
        employee: item.employee,
        totalRevenue: item.totalRevenue,
        commission: item.commission,
    }));
};

// Bai 10: Sort employees by revenue in descending order.
const sortEmployeesByRevenueDesc = (employeeSummaries) => {
    return [...employeeSummaries].sort((a, b) => b.totalRevenue - a.totalRevenue);
};

/*
Run all exercises.
buildSalesReport() is called only once.
All exercises from Bai 4 to Bai 10 reuse the precomputed data.
*/
const runEmployeeSalesAnalysis = () => {
    const {productSales, productRevenues, employeeSummaries, employeeBestProducts,
    } = buildSalesReport(employees, products, orders);

    console.log("Bai 1:", getWorkingEmployees(employees));
    console.log("Bai 2:", getOldestEmployee(employees));
    console.log("Bai 3:", getCheapestProduct(products));
    console.log("Bai 4:", getBestSellingProductsByQuantity(productSales));
    console.log("Bai 5:", getHighestRevenueProducts(productRevenues));
    console.log("Bai 6:", getTopEmployeesByQuantity(employeeSummaries));
    console.log("Bai 7:", getTopEmployeesByRevenue(employeeSummaries));
    console.log("Bai 8:", getHighestRevenueProductsOfEachEmployee(employeeBestProducts));
    console.log("Bai 9:", getCommissionsOfEachEmployee(employeeSummaries));
    console.log("Bai 10:", sortEmployeesByRevenueDesc(employeeSummaries));
};

runEmployeeSalesAnalysis();