import * as React from 'react';

export interface iActionSheetItem {
    label: string,
    onClick: () => void;
}

interface ActionSheetProps{
    onClose: () => void;
    actions: iActionSheetItem[];
}

const ActionSheet: React.FC<ActionSheetProps> = ({
    onClose,
    actions
}) => {

    return(
        <>
            <div className='fixed inset-0 z-50 place-items-center'>
                <div 
                    className='absolute inset-0 bg-black/40'
                    onClick={onClose}
                />
                <div className='absolute bottom-14 w-3/5 max-w-fit border border-orange-300 bg-white rounded-2xl p-1'>
                    {actions.map((action) => (
                        <button
                            key={action.label}
                            className='w-full text-center py-2 px-2 text-lg hover:bg-orange-300 rounded-lg'
                            onClick={() => {
                                action.onClick();
                                onClose();
                            }}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>

            </div>
        </>
    )
}

export default ActionSheet;
