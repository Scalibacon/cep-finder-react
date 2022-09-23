import { ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

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
        <header>
          <IoMdClose size={27} onClick={e => onClose(false)}/>
        </header>
        <main>
          {children}
        </main>   
        <footer>
          <button type='button' className={`alternative`} onClick={e => onClose(false)}>Fechar</button>
        </footer>     
      </section>      
    </div>
  )
}

export default Modal;