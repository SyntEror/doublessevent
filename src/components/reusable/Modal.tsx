import { useEffect } from 'react'

const Modal = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = originalStyle
        }
    }, [])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 sm:items-center">
            <div className="mt-6 max-h-[90vh] w-[90%] max-w-full overflow-y-auto rounded-2xl bg-white p-0 shadow-lg sm:mt-0 sm:w-auto sm:max-w-lg sm:p-6 md:w-full">
                {children}
            </div>
        </div>
    )
}

export default Modal
