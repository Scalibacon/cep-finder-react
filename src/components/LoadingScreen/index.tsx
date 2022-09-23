import styles from './LoadingScreen.module.scss';

type LoadingScreenProps = {
  isLoading: boolean;
}

const LoadingScreen = ({
  isLoading
}: LoadingScreenProps) => {
  return (
    <div className={`${styles.background} ${isLoading ? styles.active : ''}`}>
      <div>
        <div className={styles.spinner}></div>
        <p>Carregando...</p>
      </div>      
    </div>
  )
}

export default LoadingScreen;