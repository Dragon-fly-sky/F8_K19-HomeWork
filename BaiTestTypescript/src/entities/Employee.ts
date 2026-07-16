export class Employee {
    public id: string;
    public name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    public receiveNoti(message: string): void {
        console.log(
            `${this.id} - ${this.name} received notification: ${message}`
        );
    }
}