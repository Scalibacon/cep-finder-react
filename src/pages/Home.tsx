import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from '../styles/Home.module.scss';

const Home = () => {
  return (
    <div id="pageWrapper">
      <Header/>
      <main id="pageMain" className={styles.home}>
        <div className={styles.textContainer}>
          <small>O melhor site para buscar endereços... Ou quase isso :)</small>
          <h1>Bem-vindo ao CEPanda!</h1>
          <p>O aplicativo CEPanda! permite que você encontre códigos de enderaçamento postais (CEP).</p>
          <p>Se você já tiver o CEP em mãos e gostaria de buscar seu endereço, o CEPanda! também vai te ajudar.</p>
          <p>Aproveite! 😁</p>
        </div>      

        <div className={styles.buttonContainer}>
          <Link to='/cep'>
            <button>Buscar Endereço</button>
          </Link>
          <Link to='/address'>
          <button>Buscar CEP</button>
          </Link>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default Home;