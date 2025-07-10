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
                <div className="mt-20 flex flex-col justify-between gap-y-4 md:flex-row">
                    <h3 className="mt-16 text-center text-2xl font-bold text-secondary md:text-6xl">
                        Notre Localisation
                    </h3>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11886.69429022256!2d12.462724511987394!3d41.856852405324354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13258a8900f8d777%3A0x41aa5030fbe34f3c!2sV.le%20Leonardo%20da%20Vinci%2C%203%2C%2000145%20Roma%20RM%2C%20Italy!5e0!3m2!1sen!2stn!4v1752166496357!5m2!1sen!2stn"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    )
}

export default Quisommenous
