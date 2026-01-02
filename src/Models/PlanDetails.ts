export interface PlanDetails {
    name:string;
    description:string;
    goal: string | undefined;
    theory: string | undefined;
    isValid: () => boolean;
}

export class PlanDetailsModel implements PlanDetails {
    name: string;
    description: string;
    goal: string | undefined;
    theory: string | undefined;
    isValid() : boolean {
        return this.hasName() && this.hasDescription()
    }

    private hasName(): boolean {
        return this.name
            && this.name.trim() !== ''
            ? true : false
    }

    private hasDescription(): boolean {
        return this.description
            && this.description.trim() !== ''
            ? true : false
    }

    constructor(
        name: string = "",
        description: string = "",
        goal: string|undefined = undefined,
        theory: string|undefined = undefined,
    ) {
        this.name = name;
        this.description = description;
        this.goal = goal;
        this.theory = theory;
    }
}