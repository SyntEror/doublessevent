import Image from 'next/image'

const Quisommenous = () => {
    return (
        <section className="py-16" id="quisommenous">
            <div className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 md:gap-8 lg:px-8">
                <h2 className="mb-12 text-center text-2xl font-bold text-secondary md:text-6xl">
                    🤔 Qui sommes-nous ? 🤔
                </h2>
                <div className="flex flex-col gap-16 md:flex-row">
                    <Image
                        src="/logo.jpg"
                        alt="DoubleSS Logo"
                        width={3320}
                        height={1000}
                        className="w-full md:w-96"
                    />
                    <div className="flex items-center text-center text-2xl md:text-start md:text-4xl md:leading-normal">
                        DoubleSS event est une entreprise spécialisée dans
                        l&#39;organisation d&#39;événements uniques et
                        mémorables. Notre équipe passionnée engage à transformer
                        vos idées en réalité, en créant des expériences sur
                        mesure qui laissent une empreinte indélébile.
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Quisommenous
