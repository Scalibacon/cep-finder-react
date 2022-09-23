import styles from './Header.module.scss';
import Logo from '../../assets/images/cepanda.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <main>
        <Link to="/">
          <span className={styles.logo}>
            <img src={Logo} alt="Logo do Pandinha" />
            <p>CEPanda!</p>
          </span>
        </Link>
        <nav>
          <Link to="/address">Buscar Endereço</Link>
          <Link to="/cep">Buscar CEP</Link>
        </nav>
      </main>
    </header>
  )
}

export default Header;