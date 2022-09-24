import axios from "axios";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import Modal from "../components/Modal";
import styles from '../styles/FindAddressPage.module.scss';
import TypeAddress from "../types/TypeAddress";

const FindAddressPage = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<TypeAddress>();
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    searchAddress();
  }

  const validateFields = () => {
    // regex only digits and - with digits after it
    if (!cep || cep.match(/(?<=^| )\d+(-\d+)?(?=$| )/) === null) {
      return false
    }

    return true;
  }

  const searchAddress = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error();
      }

      const fetchedAdress: TypeAddress = response.data;

      setAddress(fetchedAdress);
      setModalOpen(true);
    } catch(error){
      if(error instanceof Error) console.log('Error trying to fetch address:', error.message);
      // show toast
    } finally {
      setIsLoading(false);
    }    
  }

  return (
    <div id="pageWrapper">
      <Header />
      <LoadingScreen isLoading={isLoading} />

      <Modal isVisible={modalOpen} onClose={setModalOpen}>
        <div className={styles.modalBody}>
          <h3>Resultados da Busca</h3>
          <section className={styles.modalContent}>
            {!address &&
              <p>Nenhum registro encontrado!</p>
            }

            {address &&
              <div className={styles.infoBox}>
                <p>
                  <b>CEP: </b>
                  {address.cep}
                </p>
                <p>
                  <b>Logradouro: </b>
                  {address.logradouro}
                </p>
                <p>
                  <b>Complemento: </b>
                  {address.complemento ?? '-'}
                </p>
                <p>
                  <b>Município: </b>
                  {address.localidade}
                </p>
                <p>
                  <b>Bairro: </b>
                  {address.bairro}
                </p>
              </div>
            }
          </section>
        </div>
      </Modal>

      <main id="pageMain" className={styles.findAddress}>
        <div className='breadcrumbs'>
          <span><Link to='/'>{"Início >"}</Link></span>
          <span>{"Buscar Endereço"}</span>
        </div>

        <Form
          onSubmit={handleFormSubmit}
          validateFields={validateFields}
        >
          <div>
            <label>CEP</label>
            <input
              type="text"
              value={cep}
              onChange={e => setCep(e.target.value)}
            />
          </div>
        </Form>
      </main>
      <Footer />
    </div>
  )
}

export default FindAddressPage;