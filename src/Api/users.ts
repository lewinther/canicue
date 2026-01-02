import data from 'Data/users.json';
import { Behaviorist, Client, ToUser } from 'Models/User';

export function login (email: string): Behaviorist | Client | undefined {
    var result = data.find((x) => x.email === email);
    return ToUser(result);
}

export function getBehavioristsClients(id: string): Client[] | null {
    var clients = data.filter((x) => x.behavioristId === id)
    if(!clients.length) return null;
    return clients as Client[]
}


