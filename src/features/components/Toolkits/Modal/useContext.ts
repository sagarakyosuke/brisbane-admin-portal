import { createContext, useContext } from 'react';

import type { ReactNode } from 'react';

export interface ModalOptions {
  title: string;
  description?: string;
  content?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onConfirm?: () => void;
}

export interface ModalContextType {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider.');
  }

  return context;
};
