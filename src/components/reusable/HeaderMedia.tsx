'use client'
import { useWindowSize } from '@/hooks/useWindowSize'
import Image from 'next/image'
import { type FC } from 'react'
import { Parallax } from 'react-scroll-parallax'

export const HeaderMedia: FC = () => {
    const { isMobile } = useWindowSize()
    // const { videoRef, isPlaying, handlePlayPause } = useVideo({})
    // const isPlayOrPause = isPlaying ? 'pause' : 'play'

    const HandleDesktopParallax = isMobile ? 'div' : Parallax
    return (
        <div className="relative h-screen w-full overflow-hidden shadow">
            <HandleDesktopParallax speed={-120}>
                {/*{asset[0]!.desktop?.content_type?.toLowerCase() === 'mp4' && (*/}
                {/*    <video*/}
                {/*        ref={videoRef}*/}
                {/*        width="full"*/}
                {/*        height="full"*/}
                {/*        autoPlay*/}
                {/*        muted*/}
                {/*        loop*/}
                {/*        playsInline*/}
                {/*        className="h-screen w-full object-cover"*/}
                {/*    >*/}
                {/*        <source*/}
                {/*            src={*/}
                {/*                isMobile*/}
                {/*                    ? asset[0]!.mobile?.filename*/}
                {/*                    : asset[0]!.desktop?.filename*/}
                {/*            }*/}
                {/*            type="video/mp4"*/}
                {/*        />*/}
                {/*    </video>*/}
                {/*)}*/}
                {/*{asset[0]!.desktop?.content_type?.toLowerCase() != 'mp4' && (*/}
                <Image
                    className="h-screen w-full object-cover"
                    src={'/assets/event.jpg'}
                    width={1920}
                    height={1080}
                    alt="background"
                    fetchPriority="high"
                    priority
                />

                <div
                    className="absolute inset-0"
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.15)',
                    }}
                />
                <div
                    className={`mx absolute ${
                        true
                            ? 'bottom-0 top-0 md:px-32'
                            : 'left-2 top-1/2 pt-10 md:px-28'
                    } z-20 flex flex-col items-center justify-center px-6 text-left`}
                >
                    <h1 className="max-w-xs px-4 text-3xl leading-10 text-zinc-100 sm:max-w-6xl md:px-0 md:text-8xl md:leading-[85px]">
                        Double SS events
                    </h1>
                </div>

                <div className="absolute bottom-2 left-2 z-20 px-8 uppercase text-zinc-100 sm:bottom-7 sm:left-7 sm:text-xl md:px-28">
                    <div className="flex flex-row font-['Mona-Sans']">
                        <span className="mr-1 leading-7 text-red-600">|</span>
                        L’art de sublimer vos événements
                    </div>
                </div>

                {/*{asset[0]!.desktop?.content_type?.toLowerCase() === 'mp4' && (*/}
                {/*    <div className="absolute bottom-2 right-2 z-20 cursor-pointer sm:bottom-7 sm:right-7">*/}
                {/*        <Image*/}
                {/*            onClick={handlePlayPause}*/}
                {/*            src={`/assets/icons/media/${isPlayOrPause}.png`}*/}
                {/*            alt={isPlayOrPause}*/}
                {/*            width={isMobile ? 30 : 45}*/}
                {/*            height={isMobile ? 30 : 45}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*)}*/}
            </HandleDesktopParallax>
        </div>
    )
}
