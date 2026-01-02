import * as React from "react";

interface PlusIconProps {
    color?: string;
    size?: number;
}

const PlusIcon: React.FC<PlusIconProps> = ({ color, size }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="1.5" y1="13.5" x2="25.5" y2="13.5" stroke={color} strokeWidth="5" strokeLinecap="round"/>
        <line x1="13.5" y1="25.5" x2="13.5" y2="1.5" stroke={color} strokeWidth="5" strokeLinecap="round"/>
        </svg>
    )
}

export default PlusIcon
