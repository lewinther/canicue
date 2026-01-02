


export type NavItem = {
    label: string
    to?: string
    onClick?: () => void
    icon?: React.ReactNode
    isActive?: () => boolean
}