import { Project } from "../entities/Project";
import { EmployeeService } from "./EmployeeService";
import { generateId } from "../utils/uuid";

export class ProjectService {
    private projects: Project[] = [];

    constructor(
        private employeeService: EmployeeService
    ) {}

    public create(
        project: Omit<Project, "id">
    ): Project {

        const newProject: Project = {
            id: generateId(),
            ...project
        };

        this.projects.push(newProject);

        const employee =
            this.employeeService.findById(
                project.employeeId
            );

        if (employee) {
            employee.receiveNoti(
                "Bạn vừa được gán vào dự án mới."
            );
        }

        return newProject;
    }

    public updateById(
        id: string,
        data: Partial<Project>
    ): Project | null {

        const project = this.projects.find(
            p => p.id === id
        );

        if (!project) {
            return null;
        }

        const oldEmployeeId =
            project.employeeId;

        Object.assign(project, data);

        if (
            data.employeeId &&
            data.employeeId !== oldEmployeeId
        ) {

            const employee =
                this.employeeService.findById(
                    data.employeeId
                );

            if (employee) {
                employee.receiveNoti(
                    "Bạn đã được chuyển giao phụ trách dự án này."
                );
            }
        }

        return project;
    }

    public findById(
        id: string
    ): Project | null {

        return (
            this.projects.find(
                p => p.id === id
            ) || null
        );
    }

    public getAll(): Project[] {
        return this.projects;
    }
}