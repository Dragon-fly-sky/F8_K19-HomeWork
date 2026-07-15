import { Product } from "./models/Product";
import { Customer } from "./models/Customer";
import { ProductService } from "./services/ProductService";
import { CustomerService } from "./services/CustomerService";
import { OrderService } from "./services/OrderService";

const productService = new ProductService();
const customerService = new CustomerService();
const orderService = new OrderService(productService);

// Add products

const product1 = new Product(1, "iPhone 15", 2000, 10);
const product2 = new Product(2, "Samsung S24", 1800, 5);
const product3 = new Product(3, "MacBook Pro", 3000, 3);

productService.addProduct(product1);
productService.addProduct(product2);
productService.addProduct(product3);

console.log("PRODUCT LIST ");
productService.printProducts();

// Add customers

const customer1 = new Customer(
    1,
    "Nguyen Van A",
    "0987654321",
    "Ha Noi"
);

const customer2 = new Customer(
    2,
    "Tran Thi B",
    "0912345678",
    "Ho Chi Minh"
);

customerService.addCustomer(customer1);
customerService.addCustomer(customer2);

console.log("\n CUSTOMER LIST");
customerService.printCustomers();

// Create order

const order = orderService.createOrder(customer1);

orderService.addProduct(order.id, 1, 2);
orderService.addProduct(order.id, 2, 1);

console.log("\n ORDER BEFORE CHECKOUT");
order.printInvoice();

console.log("\n CHECKOUT");
orderService.checkout(order.id);

// Product stock after checkout

console.log("\n PRODUCT LIST AFTER CHECKOUT");
productService.printProducts();

console.log("\n ORDER LIST");
orderService.printOrders();