'use client'
import { useRef, useState } from 'react'

type Params = {
    initialIsPlaying?: boolean
}

const useVideo = ({ initialIsPlaying = true }: Params) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(initialIsPlaying)
    const handlePlayPause = async () => {
        const video = videoRef.current

        if (isPlaying) video?.pause()
        else await video?.play()

        setIsPlaying(!isPlaying)
    }

    const handlePlay = () => {
        const video = videoRef.current
        void video?.play()
        setIsPlaying(true)
    }

    const handlePause = () => {
        const video = videoRef.current
        video?.pause()
        setIsPlaying(false)
    }

    return { videoRef, handlePlayPause, isPlaying, handlePlay, handlePause }
}

export default useVideo
