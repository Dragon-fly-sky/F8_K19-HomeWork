import { CustomerService } from "../services/CustomerService";
import { EmployeeService } from "../services/EmployeeService";
import { ProjectService } from "../services/ProjectService";

export const runTests = (): void => {
    console.log("TEST START");

    const customerService =
        new CustomerService();

    const employeeService =
        new EmployeeService();

    const projectService =
        new ProjectService(
            employeeService
        );

    console.log("\nTEST 1");

    const customer =
        customerService.create({
            name: "OpenAI",
            tax: "123456789",
            address: "Ha Noi"
        });

    console.log(customer);

    console.log("\nTEST 2");

    const updatedCustomer =
        customerService.updateById(
            customer.id,
            {
                address: "Ho Chi Minh"
            }
        );

    console.log(updatedCustomer);

    console.log("\nTEST 3");

    const employee1 =
        employeeService.create({
            name: "Nguyen Van A"
        });

    const employee2 =
        employeeService.create({
            name: "Tran Van B"
        });

    console.log(employee1.id);
    console.log(employee2.id);

    console.log(
        employee1.id !== employee2.id
    );

    console.log("\nTEST 4");

    console.log(employeeService.findById(employee1.id));

    console.log(employeeService.findById("invalid-id"));

    console.log("\nTEST 5");

    const project =
        projectService.create({
            customerId: customer.id,
            employeeId: employee1.id
        });

    console.log(project);

    console.log("\nTEST 6");

    const updatedProject =
        projectService.updateById(
            project.id,
            {
                employeeId:
                employee2.id
            }
        );

    console.log(updatedProject);

    console.log("\nTEST 7");

    projectService.updateById(
        project.id,
        {
            customerId:
            customer.id
        }
    );

    console.log("Không có notification mới.");

    console.log("\nTEST 8");

    console.log(
        customerService.updateById(
            "invalid",
            {
                address: "ABC"
            }
        )
    );

    console.log(
        employeeService.updateById(
            "invalid",
            {
                name: "XYZ"
            }
        )
    );

    console.log(
        projectService.updateById(
            "invalid",
            {
                customerId:
                customer.id
            }
        )
    );

    console.log("\nTEST 9");

    const project2 =
        projectService.create({
            customerId:
            customer.id,
            employeeId:
                "not-found"
        });

    console.log(project2);

    console.log("Không phát sinh lỗi.");

    console.log(
        "\nTEST END"
    );
};