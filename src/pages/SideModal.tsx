import React from 'react';
import styles from './style/SideModal.module.css';

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SideModal: React.FC<SideModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>❌</button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default SideModal;
