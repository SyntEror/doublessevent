type PlanId = 'standard' | 'vip'

interface Plan {
    id: PlanId
    amount: number
}

interface Addon {
    amount: number
}

export interface PaymentConfig {
    plans: Plan[]
    addon: Addon
    deadline: string // ISO date string
}
