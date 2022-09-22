import Header from "../components/Header";
import styles from '../styles/Home.module.scss';

const Home = () => {
  return (
    <div id="pageWrapper">
      <Header/>
      <main id="pageMain" className={styles.home}>
        <div className={styles.textContainer}>
          <small>O melhor site para buscar endereços... Ou quase isso :)</small>
          <h1>Bem-vindo ao CEP Finder!</h1>
          <p>O aplicativo CEP Finder! permite que você encontre códigos de enderaçamento postais (CEP).</p>
          <p>Se você já tiver o CEP em mãos e gostaria de buscar seu endereço, o CEP Finder! também vai te ajudar.</p>
          <p>Aproveite! 😁</p>
        </div>        
      </main>
    </div>
  )
}

export default Home;