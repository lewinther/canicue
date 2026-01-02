import * as React from "react";

interface MinusIconProps {
    color?: string;
    size?: number;
}

const MinusIcon: React.FC<MinusIconProps> = ({ color, size }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="1.5" y1="13.5" x2="25.5" y2="13.5" stroke={color} strokeWidth="5" strokeLinecap="round"/>
        </svg>
    )
}

export default MinusIcon
