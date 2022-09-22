import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <main>
        <span className={styles.logo}>CEP Finder!</span>

        <nav>
          <a href="/cep">Buscar Endereço</a>
          <a href="/address">Buscar CEP</a>
        </nav>
      </main>
    </header>
  )
}

export default Header;