
export type AnyUserRole = 'Behaviorist' | 'Client'
export type AnyUser = Behaviorist | Client

export interface iUser {
    id: string;
    role: string; 
    name: string;
    email: string; 
}

export function ToUser(user : any): AnyUser | undefined {
    if(!user){
        console.error('ToUser called with invalid data: ', user)
        return undefined;
    }
    if (user.role === 'Behaviorist') {
        return ToBehaviorist(user);
    } 
    else if (user.role === 'Client') {
        return ToClient(user)
    } 
    return undefined;
}

export interface iBehaviorist extends iUser {
    clientIds: string[];
}

export interface iClient extends iUser {
    behavioristId: string;
    lastName: string;
    phoneNr: number;
    dogIds: string[];
    isValid(): boolean;
}


export class Behaviorist implements iBehaviorist {
    id: string;
    role: string;
    name: string;
    email: string; 
    clientIds: string[]

    constructor(
        id: string = crypto.randomUUID(),
        name: string = '', 
        email: string = '',
        clientIds: string[] = []
    ){
        this.id = id;
        this.role = 'Behaviorist';
        this.name = name;
        this.email = email;
        this.clientIds = clientIds
    }
}

export function ToBehaviorist(user:any) {
    if(user.role !== 'Behaviorist') 
        throw new Error("user not in expected role"); 

    return new Behaviorist(
        user.id,
        user.name,
        user.email,
        user.clientIds
    );
}

export class Client implements iClient {
    id: string;
    role: string;
    name: string;
    lastName: string;
    phoneNr: number;
    email: string;
    behavioristId: string;
    dogIds: string[];  
    isValid(): boolean {
        return this.hasRequiredFields()
    }
    setBehavioristId(value: string) : Client {
        this.behavioristId = value;
        return this
    }
    setDogIds(value: string) : Client {
        this.dogIds.push(value);
        return this;
    }

    private hasRequiredFields(): boolean {
        return this.name !== undefined
        && this.lastName !== undefined
        && this.email !== undefined
    }

    constructor(
        id: string = crypto.randomUUID(),
        name: string = '', 
        lastName: string = '',
        email: string = '',
        phoneNr: number = 0,
        behavioristId: string = '',
        dogIds: string[] = [],
    ){
        this.id = id;
        this.role = 'Client';
        this.name = name;
        this.lastName = lastName; 
        this.phoneNr = phoneNr;
        this.email = email;
        this.behavioristId = behavioristId
        this.dogIds = dogIds;
    }
}

export function ToClient(user: any) {
    if(user.role !== 'Client')
        throw new Error("user not in expected role"); 

    return new Client(
        user.id,
        user.name, 
        user.email,
        user.behavioristId,
        user.dogIds
    );
}

