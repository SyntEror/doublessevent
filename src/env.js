import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = (() => {
    try {
        return createEnv({
            server: {
                NODE_ENV: z
                    .enum(['development', 'test', 'production'])
                    .default('development'),
                STRIPE_WEBHOOK_SECRET: z.string(),
                STRIPE_SECRET_KEY: z.string(),
                SMTP_HOST: z.string(),
                SMTP_PORT: z.coerce.number().default(587),
                SMTP_USER: z.string(),
                SMTP_PASSWORD: z.string(),
                SMTP_FROM_ADDRESS: z.string().email(),
                SMTP_FROM_NAME: z.string(),
                INTERNAL_EMAIL: z.string(),
            },
            client: {
                NEXT_PUBLIC_BASE_URL: z.string(),
                NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
            },
            runtimeEnv: {
                NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
                STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
                STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
                SMTP_HOST: process.env.SMTP_HOST,
                SMTP_PORT: process.env.SMTP_PORT,
                SMTP_USER: process.env.SMTP_USER,
                SMTP_PASSWORD: process.env.SMTP_PASSWORD,
                SMTP_FROM_ADDRESS: process.env.SMTP_FROM_ADDRESS,
                SMTP_FROM_NAME: process.env.SMTP_FROM_NAME,
                INTERNAL_EMAIL: process.env.INTERNAL_EMAIL,
                NODE_ENV: process.env.NODE_ENV,
                NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
                    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
            },
            emptyStringAsUndefined: true,
            skipValidation: !!process.env.SKIP_ENV_VALIDATION,
        })
    } catch (err) {
        console.error('❌ ENV VALIDATION FAILED:', err)
        throw err
    }
})()
