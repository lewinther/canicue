
interface iDog {
    id: string;
    name: string;
    dateOfBirth: string;
}

export class Dog implements iDog{
    id: string;
    name: string;
    dateOfBirth: string;
    isValid(): boolean {
        return this.hasRequiredFields()
    }

    private hasRequiredFields(): boolean {
        return this.name !== undefined
    }

    constructor(
        id: string = crypto.randomUUID(),
        name: string = '',
        dateOfBirth: string = '',
    ) {
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth
    }
}