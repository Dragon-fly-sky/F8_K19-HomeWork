import { Employee } from "../entities/Employee";
import { generateId } from "../utils/uuid";

export class EmployeeService {
    private employees: Employee[] = [];

    public create(
        employee: Omit<Employee, "id" | "receiveNoti">
    ): Employee {

        const newEmployee = new Employee(
            generateId(),
            employee.name
        );

        this.employees.push(newEmployee);

        return newEmployee;
    }

    public findById(
        id: string
    ): Employee | null {

        return (
            this.employees.find(
                e => e.id === id
            ) || null
        );
    }

    public updateById(
        id: string,
        data: Partial<Employee>
    ): Employee | null {

        const employee = this.findById(id);

        if (!employee) {
            return null;
        }

        Object.assign(employee, data);

        return employee;
    }

    public getAll(): Employee[] {
        return this.employees;
    }
}