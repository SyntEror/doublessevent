import Image from 'next/image'

const Quisommenous = () => {
    return (
        <section className="py-16" id="quisommenous">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="mb-12 text-center text-3xl font-bold text-secondary md:text-6xl">
                    🤔 Qui sommes-nous ? 🤔
                </h2>
                <div className="flex gap-16">
                    <Image
                        src="/logo.jpg"
                        alt="DoubleSS Logo"
                        width={3320}
                        height={1000}
                        className="w-14 md:w-96"
                    />
                    <div className="flex items-center text-start md:text-4xl md:leading-normal">
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
