import { Customer } from "../models/Customer";

type CustomerUpdateData = {
    name?: string;
    phone?: string;
    address?: string;
};

export class CustomerService {
    private customers: Customer[] = [];

    addCustomer(customer: Customer): void {
        const existedCustomer = this.findById(customer.id);

        if (existedCustomer) {
            throw new Error(`Customer with id ${customer.id} already exists`);
        }

        const existedPhone = this.findByPhone(customer.phone);

        if (existedPhone) {
            throw new Error(`Customer with phone ${customer.phone} already exists`);
        }

        this.customers.push(customer);
    }

    updateCustomer(id: number, data: CustomerUpdateData): void {
        const customer = this.findById(id);

        if (!customer) {
            throw new Error(`Customer with id ${id} not found`);
        }

        if (data.name !== undefined) {
            if (!data.name.trim()) {
                throw new Error("Customer name cannot be empty");
            }

            customer.name = data.name;
        }

        if (data.phone !== undefined) {
            if (!data.phone.trim()) {
                throw new Error("Customer phone cannot be empty");
            }

            const existedPhone = this.customers.find(
                (item) => item.phone === data.phone && item.id !== id
            );

            if (existedPhone) {
                throw new Error(`Customer with phone ${data.phone} already exists`);
            }

            customer.updatePhone(data.phone);
        }

        if (data.address !== undefined) {
            customer.updateAddress(data.address);
        }
    }

    deleteCustomer(id: number): boolean {
        const index = this.customers.findIndex((customer) => customer.id === id);

        if (index === -1) {
            return false;
        }

        this.customers.splice(index, 1);
        return true;
    }

    findById(id: number): Customer | undefined {
        return this.customers.find((customer) => customer.id === id);
    }

    findByPhone(phone: string): Customer | undefined {
        return this.customers.find((customer) => customer.phone === phone);
    }

    getAllCustomers(): Customer[] {
        return [...this.customers];
    }

    printCustomers(): void {
        if (this.customers.length === 0) {
            console.log("No customers found");
            return;
        }

        this.customers.forEach((customer) => {
            console.log(customer.toString());
        });
    }
}