export class Product {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public stock: number
    ) {
        if (!name.trim()) {
            throw new Error("Product name cannot be empty");
        }

        if (price < 0) {
            throw new Error("Product price must be >= 0");
        }

        if (!Number.isInteger(stock) || stock < 0) {
            throw new Error("Product stock must be an integer >= 0");
        }
    }

    increaseStock(quantity: number): void {
        this.validateQuantity(quantity);
        this.stock += quantity;
    }

    decreaseStock(quantity: number): void {
        this.validateQuantity(quantity);

        if (quantity > this.stock) {
            throw new Error(`Not enough stock for product: ${this.name}`);
        }

        this.stock -= quantity;
    }

    toString(): string {
        return `Product { id: ${this.id}, name: ${this.name}, price: ${this.price}, stock: ${this.stock} }`;
    }

    private validateQuantity(quantity: number): void {
        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error("Quantity must be a positive integer");
        }
    }
}