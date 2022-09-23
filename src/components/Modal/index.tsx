import { ReactNode } from 'react';
import styles from './Modal.module.scss';

type ModalProps = {
  children?: ReactNode,
  isVisible: boolean,
  onClose: (a: boolean) => void
}

const Modal = ({
  children,
  isVisible,
  onClose
}: ModalProps) => {

  return (
    <div 
      className={`${styles.background} ${isVisible ? styles.visible : ''}`}
      onClick={ e => onClose(false)}
    >
      <section className={styles.wrapper} onClick={ e => e.stopPropagation() }>
        <header></header>
        <main>
          {children}
        </main>   
        <footer></footer>     
      </section>      
    </div>
  )
}

export default Modal;