import * as React from "react";

interface PlanIconProps {
    fillColor?: string;
    size?: number;
}

const PlanIcon: React.FC<PlanIconProps> = ({fillColor, size}) => (
<svg width={size} height={size} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="
            M9 3
            H33
            A3 3 0 0 1 36 6
            V37
            A3 3 0 0 1 33 40
            H9
            A3 3 0 0 1 6 37
            V6
            A3 3 0 0 1 9 3
            Z
        "
        fill='white'
        stroke={fillColor}
        strokeWidth="2"
    />

    <path d="M12 9 H30" stroke={fillColor} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 17 H30" stroke={fillColor} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 25 H30" stroke={fillColor} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 33 H23" stroke={fillColor} strokeWidth="2" strokeLinecap="round"/>
</svg>

)

export default PlanIcon;