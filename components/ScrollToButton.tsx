'use client'

type Props = {
    target: string
    className?: string
    children: React.ReactNode
}

export function ScrollToButton({ target, className, children }: Props) {
    return (
        <a
            href={`#${target}`}
            onClick={(e) => {
                e.preventDefault()
                document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={className}
        >
            {children}
        </a>
    )
}
