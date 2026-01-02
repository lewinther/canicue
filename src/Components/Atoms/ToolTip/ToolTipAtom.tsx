import ModalPortal from 'Components/Portals/ModalPortal';
import * as React from 'react';

interface ToolTipAtomProps {
    show: boolean;
    message: string;
    targetRef: React.RefObject<HTMLElement | null>;    
    onClose: () => void;
}

const ToolTipAtom:  React.FC<ToolTipAtomProps> = ({
    show,
    message,
    targetRef,
    onClose,
}) => {
    const duration = 1500;
    const [coords, setCoords] = React.useState({ top: 0, left: 0 });
    React.useEffect(() => {
        if (!show || !targetRef.current) return;

        const rect = targetRef.current.getBoundingClientRect();
            setCoords({
            top: rect.top + window.scrollY - 30, // 30px above button
            left: rect.left + window.scrollX + rect.width / 2,
        });

        const timer = setTimeout(() => {
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [show, duration, onClose, targetRef]);

    if (!show) return null;
    return (
        <ModalPortal>
            <div
                className={`
                    absolute z-50 pointer-events-none
                    rounded-md bg-teal-300 px-2 py-1 text-xs/tight text-black
                    whitespace-nowrap max-w-none
                    animate-fade-out
                `}
                style={{
                    top: coords.top,
                    left: coords.left,
                    transform: "translateX(-50%)",
                    animationDuration: `${duration}ms`,
                }}
            >
                {message}
            </div>
        </ModalPortal>
    );
}

export default ToolTipAtom;