import { Customer } from "../models/Customer";
import { Order, OrderStatus } from "../models/Order";
import { OrderItem } from "../models/OrderItem";
import { ProductService } from "./ProductService";

export class OrderService {
    private orders: Order[] = [];
    private nextOrderId = 1;

    constructor(private productService: ProductService) {}

    createOrder(customer: Customer): Order {
        const order = new Order(this.nextOrderId, customer);

        this.orders.push(order);
        this.nextOrderId++;

        return order;
    }

    addProduct(orderId: number, productId: number, quantity: number): void {
        const order = this.getOrderOrThrow(orderId);

        if (order.status !== OrderStatus.NEW) {
            throw new Error("Cannot add product to an order that is not NEW");
        }

        const product = this.productService.findById(productId);

        if (!product) {
            throw new Error(`Product with id ${productId} not found`);
        }

        product.decreaseStock(quantity);

        const orderItem = new OrderItem(product, quantity);
        order.addItem(orderItem);
    }

    removeProduct(orderId: number, productId: number): void {
        const order = this.getOrderOrThrow(orderId);

        if (order.status !== OrderStatus.NEW) {
            throw new Error("Cannot remove product from an order that is not NEW");
        }

        const removedItem = order.removeItem(productId);

        if (!removedItem) {
            throw new Error(`Product with id ${productId} does not exist in order`);
        }

        removedItem.product.increaseStock(removedItem.quantity);
    }

    checkout(orderId: number): void {
        const order = this.getOrderOrThrow(orderId);

        if (order.status !== OrderStatus.NEW) {
            throw new Error("Only NEW orders can be checked out");
        }

        if (order.items.length === 0) {
            throw new Error("Cannot checkout an empty order");
        }

        order.status = OrderStatus.PAID;
        order.printInvoice();
    }

    cancelOrder(orderId: number): void {
        const order = this.getOrderOrThrow(orderId);

        if (order.status === OrderStatus.CANCELLED) {
            throw new Error("Order is already cancelled");
        }

        if (order.status === OrderStatus.PAID) {
            throw new Error("Paid order cannot be cancelled in this simple system");
        }

        order.items.forEach((item) => {
            item.product.increaseStock(item.quantity);
        });

        order.status = OrderStatus.CANCELLED;
    }

    findOrder(orderId: number): Order | undefined {
        return this.orders.find((order) => order.id === orderId);
    }

    getOrders(): Order[] {
        return [...this.orders];
    }

    printOrders(): void {
        if (this.orders.length === 0) {
            console.log("No orders found");
            return;
        }

        this.orders.forEach((order) => {
            console.log(
                `Order { id: ${order.id}, customer: ${order.customer.name}, total: ${order.calculateTotal()}, status: ${order.status}, createdAt: ${order.createdAt.toLocaleString()} }`
            );
        });
    }

    private getOrderOrThrow(orderId: number): Order {
        const order = this.findOrder(orderId);

        if (!order) {
            throw new Error(`Order with id ${orderId} not found`);
        }

        return order;
    }
}