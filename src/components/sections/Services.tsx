import services from '@/data/services.json'
import Image from 'next/image'

const Services = () => {
    return (
        <section className="py-16" id="services">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="mb-12 text-center text-3xl font-bold text-secondary md:text-6xl">
                    🎉 Nos Services
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="transform overflow-hidden rounded-lg bg-secondary shadow-lg transition duration-300 hover:scale-105"
                        >
                            <Image
                                src={service.image}
                                alt={service.title}
                                className="h-60 w-full object-center"
                                width={500}
                                height={300}
                            />
                            <div className="p-6">
                                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                                    {service.title}
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    {service.description}
                                </p>
                                {service.price && (
                                    <p className="text-lg font-medium text-indigo-600">
                                        {service.price}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
