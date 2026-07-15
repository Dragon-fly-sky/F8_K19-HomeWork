import { Product } from "./Product";

export class OrderItem {
    public price: number;

    constructor(public product: Product, public quantity: number) {
        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error("Order item quantity must be a positive integer");
        }

        // Lưu giá sản phẩm tại thời điểm đặt hàng
        this.price = product.price;
    }

    getTotal(): number {
        return this.price * this.quantity;
    }
}