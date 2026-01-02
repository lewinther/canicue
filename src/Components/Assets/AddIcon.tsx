import * as React from "react";

interface AddIconProps {
    color?: string;
    size?: number;
}

const AddIcon: React.FC<AddIconProps> = ({ color = "#fff", size = 32 }) => (
    <svg width={size} height={size} fill="none" viewBox="0 0 32 32">
        {/* Hexagon with rounded corners */}
        <path
            d="M16 4
                A2 2 0 0 1 18 5.15
                L25.8 9.85
                A2 2 0 0 1 26.8 12.15
                L26.8 19.85
                A2 2 0 0 1 25.8 22.15
                L18 26.85
                A2 2 0 0 1 16 28
                A2 2 0 0 1 14 26.85
                L6.2 22.15
                A2 2 0 0 1 5.2 19.85
                L5.2 12.15
                A2 2 0 0 1 6.2 9.85
                L14 5.15
                A2 2 0 0 1 16 4
                Z"
            fill="url(#a)"
        />
        <path stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" d="M16 10v12M10 16h12" />
        <defs>
            <linearGradient id="a" x1="16" x2="16" y1="0" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFB88C" />
                <stop offset="2" stopColor="#FF6B9D" />
            </linearGradient>
        </defs>
    </svg>
);

export default AddIcon;
