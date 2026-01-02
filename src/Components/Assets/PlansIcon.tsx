import * as React from "react";

interface PlansIconProps {
    fillColor?: string;
    strokeColor?: string;
    size?: number;
}

const PlansIcon: React.FC<PlansIconProps> = ({
    fillColor,
    strokeColor = 'white', 
    size
}) => (
    <svg width={size} height={size} viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6 3
                H30
                A3 3 0 0 1 33 6
                V37
                A3 3 0 0 1 30 40
                H6
                A3 3 0 0 1 3 37
                V6
                A3 3 0 0 1 6 3
                Z
            "
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="2"
        />

        <path d="M9 9 H27" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M9 17 H27" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M9 25 H27" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M9 33 H20" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round"/>

        <path
            d="M18 16
                H42
                A3 3 0 0 1 45 19
                V50
                A3 3 0 0 1 42 53
                H18
                A3 3 0 0 1 15 50
                V19
                A3 3 0 0 1 18 16
                Z
            "
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="2.25"
        />

        <path d="M21 22 H39" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M21 30 H39" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M21 38 H39" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M21 46 H33" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>

)

export default PlansIcon;