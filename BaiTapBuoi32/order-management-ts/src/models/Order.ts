import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";

export enum OrderStatus {
    NEW = "NEW",
    PAID = "PAID",
    CANCELLED = "CANCELLED",
}

export class Order {
    public items: OrderItem[] = [];
    public createdAt: Date;
    public status: OrderStatus;

    constructor(public id: number, public customer: Customer) {
        this.createdAt = new Date();
        this.status = OrderStatus.NEW;
    }

    addItem(item: OrderItem): void {
        this.ensureOrderCanBeModified();

        const existedItem = this.items.find(
            (currentItem) => currentItem.product.id === item.product.id
        );

        if (existedItem) {
            existedItem.quantity += item.quantity;
            return;
        }

        this.items.push(item);
    }

    removeItem(productId: number): OrderItem | undefined {
        this.ensureOrderCanBeModified();

        const index = this.items.findIndex(
            (item) => item.product.id === productId
        );

        if (index === -1) {
            return undefined;
        }

        const removedItems = this.items.splice(index, 1);
        return removedItems[0];
    }

    calculateTotal(): number {
        return this.items.reduce((total, item) => total + item.getTotal(), 0);
    }

    printInvoice(): void {
        console.log("====================================");
        console.log(`Invoice ID: ${this.id}`);
        console.log(`Customer: ${this.customer.name}`);
        console.log(`Phone: ${this.customer.phone}`);
        console.log(`Address: ${this.customer.address}`);
        console.log(`Created At: ${this.createdAt.toLocaleString()}`);
        console.log(`Status: ${this.status}`);
        console.log("------------------------------------");

        if (this.items.length === 0) {
            console.log("No items in this order");
        } else {
            this.items.forEach((item, index) => {
                console.log(
                    `${index + 1}. ${item.product.name} | Qty: ${item.quantity} | Price: ${item.price} | Total: ${item.getTotal()}`
                );
            });
        }

        console.log("------------------------------------");
        console.log(`Grand Total: ${this.calculateTotal()}`);
        console.log("====================================");
    }

    private ensureOrderCanBeModified(): void {
        if (this.status !== OrderStatus.NEW) {
            throw new Error("Only NEW orders can be modified");
        }
    }
}