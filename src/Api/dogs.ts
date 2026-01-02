import data from 'Data/dogs.json';
import type { Dog } from 'Models/Dog';

export function getDogFromId(dogId: string): Dog | null {
    var result = data.find((x) => x.id === dogId);
    if(!result) return null;
    return result as Dog;
}
