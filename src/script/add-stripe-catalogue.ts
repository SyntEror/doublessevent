// script/add-stripe-catalogue.ts
import { env } from '@/env'
import dotenv from 'dotenv'
import { readFile } from 'fs/promises'
import path, { dirname } from 'path'
import Stripe from 'stripe'
import { fileURLToPath } from 'url'

dotenv.config()

// Polyfill __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const stripe = new Stripe(env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
})

interface Plan {
    id: string
    name: string
    amount: number
    priceId: string
}
interface Addon {
    id: string
    name: string
    amount: number
    priceId: string
}
interface Catalogue {
    deadline: string
    plans: Plan[]
    addon: Addon
}

async function createItem(
    item: Plan | Addon,
    type: 'plan' | 'addon',
): Promise<void> {
    const product = await stripe.products.create(
        {
            name: item.name,
            metadata: { external_id: item.id, type },
        },
        { idempotencyKey: `product_${item.id}` },
    )
    console.log(`✔️ Product ${item.id} → ${product.id}`)

    const price = await stripe.prices.create(
        {
            unit_amount: item.amount,
            currency: 'eur',
            product: product.id,
        },
        { idempotencyKey: `price_${item.id}` },
    )
    console.log(`   → Price ${price.id} (${item.amount / 100} EUR)`)
}

async function main(): Promise<void> {
    const filePath = path.resolve(__dirname, '../data/paymentConfig.json')
    const raw = await readFile(filePath, 'utf-8')
    const { plans, addon }: Catalogue = JSON.parse(raw)

    console.log('🌟 Syncing plans...')
    for (const plan of plans) {
        await createItem(plan, 'plan')
    }

    console.log('🌟 Syncing add-on...')
    await createItem(addon, 'addon')

    console.log('✅ Catalogue sync complete!')
}

main().catch(err => {
    console.error('❌ Error during sync:', err)
    process.exit(1)
})
