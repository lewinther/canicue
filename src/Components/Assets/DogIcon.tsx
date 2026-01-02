import * as React from 'react';

interface DogIconProps {
    color?: string;
    size?: number;
}

const DogIcon: React.FC<DogIconProps> = ({
    color,
    size
}) => (
    <svg width={size} height={size} viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse strokeWidth="2" cx="11.9607" cy="11.3493" rx="1.34831" ry="1.31507" fill={color}/>
        <ellipse strokeWidth="2" cx="19.0393" cy="11.3493" rx="1.34831" ry="1.31507" fill={color}/>
        <path strokeWidth="2" d="M24 9C24 16.449 23.5 24.5 15.5 24.5C7.5 24.5 7 16.449 7 9" stroke={color}/>
        <path strokeWidth="2" d="M30.5 11.0124C30.5 16.0671 29.1872 16.9628 27.2857 16.9628C25.0714 16.9628 24 13.0547 24 8" stroke={color}/>
        <path strokeWidth="2" d="M7 8C7 13.0547 6.20099 16.9174 3.89285 16.9628C2 17 0.5 16.0671 0.5 11.0124" stroke={color}/>
        <path strokeWidth="2" d="M30.5 11.0124C30.5 4.22066 23.7843 0.5 15.5 0.5C7.21573 0.5 0.5 4.22066 0.5 11.0124" stroke={color}/>
        <path strokeWidth="2" d="M15.5 16C15.9544 16 16.3469 16.1384 16.6143 16.3389C16.8815 16.5393 17 16.7785 17 17C17 17.2215 16.8815 17.4607 16.6143 17.6611C16.3469 17.8616 15.9544 18 15.5 18C15.0456 18 14.6531 17.8616 14.3857 17.6611C14.1185 17.4607 14 17.2215 14 17C14 16.7785 14.1185 16.5393 14.3857 16.3389C14.6531 16.1384 15.0456 16 15.5 16Z" stroke={color}/>
        <path strokeWidth="2" d="M15.5 24.5V17.5" stroke={color}/>
    </svg>
)

export default DogIcon;