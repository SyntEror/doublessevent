import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    /**
     * Specify your server-side environment variables schema here.
     */
    server: {
        NODE_ENV: z
            .enum(['development', 'test', 'production'])
            .default('development'),
    },

    /**
     * Specify your client-side environment variables schema here.
     * Prefix with `NEXT_PUBLIC_` to expose to the client.
     */
    client: {
        NEXT_PUBLIC_BASE_URL: z.string(),
    },

    /**
     * Destructure environment variables manually for Next.js edge runtimes.
     */
    runtimeEnv: {
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },

    /**
     * Skip env validation if SKIP_ENV_VALIDATION is set (useful for Docker builds).
     */
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,

    /**
     * Treat empty strings as undefined to enforce required variables.
     */
    emptyStringAsUndefined: true,
})
