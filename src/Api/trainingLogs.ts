import data from 'Data/trainingLogs.json'
import type { TrainingLog } from 'Models/TrainingLog';

export function getUsertLogs(clientId: string): TrainingLog[] | null {
    var result = data.filter((x) => x.clientId ===clientId)
    if(!result) return null
    return result as TrainingLog[]
}
