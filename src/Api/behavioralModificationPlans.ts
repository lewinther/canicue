import data from 'Data/behavioralModificationPlans.json'
import type { BehaviouralModificationPlan } from 'Models/BehavioralModificationPlan'

export function getClientPlans(clientId: string): BehaviouralModificationPlan[] | null {
    var result = data.filter((x) => x.clientId === clientId)
    if(!result) return null
    return result as BehaviouralModificationPlan[]
}