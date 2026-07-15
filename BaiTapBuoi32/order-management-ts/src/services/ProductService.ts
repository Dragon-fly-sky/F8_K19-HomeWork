import { Product } from "../models/Product";

type ProductUpdateData = {
    name?: string;
    price?: number;
    stock?: number;
};

export class ProductService {
    private products: Product[] = [];

    addProduct(product: Product): void {
        const existedProduct = this.findById(product.id);

        if (existedProduct) {
            throw new Error(`Product with id ${product.id} already exists`);
        }

        this.products.push(product);
    }

    updateProduct(id: number, data: ProductUpdateData): void {
        const product = this.findById(id);

        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }

        if (data.name !== undefined) {
            if (!data.name.trim()) {
                throw new Error("Product name cannot be empty");
            }

            product.name = data.name;
        }

        if (data.price !== undefined) {
            if (data.price < 0) {
                throw new Error("Product price must be >= 0");
            }

            product.price = data.price;
        }

        if (data.stock !== undefined) {
            if (!Number.isInteger(data.stock) || data.stock < 0) {
                throw new Error("Product stock must be an integer >= 0");
            }

            product.stock = data.stock;
        }
    }

    deleteProduct(id: number): boolean {
        const index = this.products.findIndex((product) => product.id === id);

        if (index === -1) {
            return false;
        }

        this.products.splice(index, 1);
        return true;
    }

    findById(id: number): Product | undefined {
        return this.products.find((product) => product.id === id);
    }

    findByName(keyword: string): Product[] {
        const normalizedKeyword = keyword.trim().toLowerCase();

        return this.products.filter((product) =>
            product.name.toLowerCase().includes(normalizedKeyword)
        );
    }

    getAllProducts(): Product[] {
        return [...this.products];
    }

    printProducts(): void {
        if (this.products.length === 0) {
            console.log("No products found");
            return;
        }

        this.products.forEach((product) => {
            console.log(product.toString());
        });
    }
}