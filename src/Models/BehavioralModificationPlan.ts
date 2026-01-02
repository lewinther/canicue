import type { Intervention } from "./Intervention";
import { PlanDetailsModel, type PlanDetails } from "./PlanDetails";

export interface BehaviouralModificationPlan {
    behavioristId: string,
    clientId: string,
    dogId: string, 
    createdAt: number,
    id: string;
    details: PlanDetails;
    interventions: Intervention[];
    setBehavioristId: ( value: string ) => BehaviouralModificationPlan;
    setClientId: ( value: string ) => BehaviouralModificationPlan;
    setDogId: ( value: string ) => BehaviouralModificationPlan;
    setDetails: ( value: PlanDetails ) => BehaviouralModificationPlan;
    addIntervention: ( value: Intervention ) => BehaviouralModificationPlan;
    updateIntervention: ( value: Intervention ) => BehaviouralModificationPlan;
    isValid(): boolean
}

export class BehaviouralModificationPlanModel implements BehaviouralModificationPlan {
    behavioristId: string;
    clientId: string;
    dogId: string; 
    id: string;
    createdAt: number;
    details: PlanDetails;
    interventions: Intervention[];
    setBehavioristId(value: string) : BehaviouralModificationPlan{
        this.behavioristId = value;
        return this;
    };
    setClientId(value: string) : BehaviouralModificationPlan{
        this.clientId = value;
        return this;
    };
    setDogId(value: string) : BehaviouralModificationPlan{
        this.dogId = value;
        return this;
    };
    setDetails(value: PlanDetails) : BehaviouralModificationPlan {
        this.details = value;
        return this;
    };    
    isValid(): boolean {
        return this.hasDetails() && this.hasInterventions()
    }
    addIntervention(value: Intervention) : BehaviouralModificationPlan {
        this.interventions.push(value);
        return this;
    } 
    updateIntervention(value: Intervention): BehaviouralModificationPlan {
        this.interventions = UpdateInterventionPosition(this.interventions, value)
        return this;
    }
    private hasDetails(): boolean {
        return this.details.isValid(); 
    }
    private hasInterventions(): boolean {
        return this.interventions.length !== 0;
    }

    constructor(
        behavioristId: string = '',
        clientId: string = '',
        dogId: string = '', 
        createdAt: number = Math.floor(Date.now() / 1000),
        id: string = crypto.randomUUID(),
        details: PlanDetails = new PlanDetailsModel(),
        interventions: Intervention[] = [],
    ) {
        this.behavioristId = behavioristId;
        this.clientId = clientId;
        this.dogId = dogId;
        this.createdAt = createdAt;
        this.id = id;
        this.details = details;
        this.interventions = interventions;
    }
}

function UpdateInterventionPosition(interventions:Intervention[], value:Intervention) : Intervention[] {
    return interventions.map((item) => (item.id === value.id ? value : item))
}