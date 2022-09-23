import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from '../styles/FindCepPage.module.scss';

const FindCepPage = () => {
  return (
    <div id="pageWrapper">
      <Header></Header>

      <main id="pageMain" className={styles.findCep}>
        <div className='breadcrumbs'>
          <span><Link to='/'>{"Início >"}</Link></span>
          <span>{"Buscar CEP"}</span>
        </div>

        <form>
          <div>
            <label>Estado</label>
            <select>
              <option>Teste</option>
            </select>
          </div>

          <div>
            <label>Município</label>
            <select>
              <option>Teste</option>
            </select>
          </div>

          <div>
            <label>Logradouro</label>
            <select>
              <option>Teste</option>
            </select>
          </div>

          <span className={styles.buttonContainer}>
            <button type="button" className={styles.back}>Voltar</button>
            <button type="button">Pesquisar</button>
          </span>
        </form>
      </main>
      <Footer/>
    </div>
  )
}

export default FindCepPage;