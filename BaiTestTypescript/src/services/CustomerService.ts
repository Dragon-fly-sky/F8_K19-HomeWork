import { Customer } from "../entities/Customer";
import { generateId } from "../utils/uuid";

export class CustomerService {
    private customers: Customer[] = [];

    public create(
        customer: Omit<Customer, "id">
    ): Customer {

        const newCustomer: Customer = {
            id: generateId(),
            ...customer
        };

        this.customers.push(newCustomer);

        return newCustomer;
    }

    public updateById(
        id: string,
        data: Partial<Customer>
    ): Customer | null {

        const customer = this.customers.find(
            c => c.id === id
        );

        if (!customer) {
            return null;
        }

        Object.assign(customer, data);

        return customer;
    }

    public findById(
        id: string
    ): Customer | null {

        return (
            this.customers.find(
                c => c.id === id
            ) || null
        );
    }

    public getAll(): Customer[] {
        return this.customers;
    }
}