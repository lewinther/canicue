import { createPortal } from 'react-dom';
import React from 'react';

const modalRoot = document.getElementById('modal-root');

if (!modalRoot) {
    throw new Error('modal-root not found');
}

interface ModalPortalProps {
    children: React.ReactNode;
}

const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
    return createPortal(children, modalRoot);
};

export default ModalPortal;