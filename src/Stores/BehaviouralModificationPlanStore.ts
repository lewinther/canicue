import {create} from 'zustand';
import { BehaviouralModificationPlanModel, type BehaviouralModificationPlan } from '../Models/BehavioralModificationPlan';
import type { PlanDetails } from '../Models/PlanDetails';
import type { Intervention } from '../Models/Intervention';

export interface BehaviouralModificationPlanStore {
    initialized: boolean;
    plan: BehaviouralModificationPlan | undefined;
    setBehavioristId: (value: string) => void;
    setClientId: (value: string) => void;
    setDogId: (value: string) => void;
    setDetails: ( value: PlanDetails) => void;
    addIntervention: ( value: Intervention ) => void;
    updateIntervention: ( value: Intervention ) => void;
    resetPlan: () => void;
}

export const useBehaviouralModificationPlanStore = create<BehaviouralModificationPlanStore>((set) => ({
    initialized: false,
    plan: undefined,
    setBehavioristId: (value: string) => set((state) => ({plan: state.plan?.setBehavioristId(value)})),
    setClientId: (value: string) => set((state) => ({plan: state.plan?.setClientId(value)})),
    setDogId: (value: string) => set((state) => ({plan: state.plan?.setDogId(value)})),
    setDetails:(value: PlanDetails) => set((state) => ({plan: state.plan?.setDetails(value)})),
    addIntervention:(value:Intervention) => set((state) => ({plan: state.plan?.addIntervention(value)})),
    updateIntervention:(value:Intervention) => set((state) => ({plan: state.plan?.updateIntervention(value)})),
    resetPlan: () => set(() => ({
        initialized: true,
        plan: new BehaviouralModificationPlanModel()}))
}));
