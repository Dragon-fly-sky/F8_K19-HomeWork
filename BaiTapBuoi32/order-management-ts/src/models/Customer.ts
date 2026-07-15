export class Customer {
    constructor(
        public id: number,
        public name: string,
        public phone: string,
        public address: string
    ) {
        if (!name.trim()) {
            throw new Error("Customer name cannot be empty");
        }

        if (!phone.trim()) {
            throw new Error("Customer phone cannot be empty");
        }

        if (!address.trim()) {
            throw new Error("Customer address cannot be empty");
        }
    }

    updatePhone(phone: string): void {
        if (!phone.trim()) {
            throw new Error("Customer phone cannot be empty");
        }

        this.phone = phone;
    }

    updateAddress(address: string): void {
        if (!address.trim()) {
            throw new Error("Customer address cannot be empty");
        }

        this.address = address;
    }

    toString(): string {
        return `Customer { id: ${this.id}, name: ${this.name}, phone: ${this.phone}, address: ${this.address} }`;
    }
}