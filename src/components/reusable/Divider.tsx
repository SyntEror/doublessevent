type Props = {
    background?: string
    height?: string
    className?: string
}

const Divider = ({
    background = '',
    height = 'h-[0.5px]',
    className,
}: Props) => {
    return (
        <div
            className={`${className} flex w-full items-center justify-center ${height} flex-shrink-0 ${background}`}
        />
    )
}

export default Divider
