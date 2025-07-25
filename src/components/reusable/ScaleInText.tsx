'use client'
import { motion } from 'framer-motion'

const ScaleInText = ({ text = 'Think Different' }: { text?: string }) => {
    return (
        <div className="leading-snug">
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        delay: i * 0.1,
                        type: 'spring',
                        stiffness: 150,
                        damping: 10,
                    }}
                    className="inline-block"
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </div>
    )
}

// const ScaleInView = () => {
//     return (
//         <div className="flex flex-col items-center justify-center p-4 font-sans">
//             <ScaleInText text="Simplicity is the ultimate sophistication." />
//         </div>
//     )
// }

export default ScaleInText
