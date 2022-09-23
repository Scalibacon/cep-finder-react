import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from '../styles/FindCepPage.module.scss';
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Modal from "../components/Modal";

type TypeState = {
  id: number,
  sigla: string,
  nome: string
}

type TypeCity = {
  id: number,
  nome: string,
}

type TypeAddress = {
  cep: string,
  uf: string,
  bairro: string,
  localidade: string,
  logradouro: string,
  complemento?: string
}

const FindCepPage = () => {
  const [stateList, setStateList] = useState<TypeState[]>([]);
  const [cityList, setCityList] = useState<TypeCity[]>([]);

  const [selectedState, setSelectedState] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();
  const [street, setStreet] = useState('');
  const [address, setAddress] = useState<TypeAddress[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const fetchStates = async () => {
    const response = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");
    const states: TypeState[] = response.data;

    setStateList(states);
  }

  const fetchCities = useCallback(async () => {
    if (!selectedState) return;

    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`);
    const cities: TypeCity[] = response.data;

    setCityList(cities);
  }, [selectedState]);

  const searchCep = async () => {
    const response = await axios.get(`https://viacep.com.br/ws/${selectedState}/${selectedCity}/${street}/json/`);
    const fetchedAdress: TypeAddress[] = response.data;

    setAddress(fetchedAdress);

    if(response.status !== 200){
      // show error toast
      return;
    }

    setModalOpen(true);
  }

  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  }

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  }

  const validateFields = () => {
    if (!selectedState || !selectedCity || (!street || street.length < 3)) {
      return false
    }
    return true;
  }

  useEffect(() => {
    fetchCities();
  }, [selectedState, fetchCities]);

  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <div id="pageWrapper">
      <Header></Header>

      <Modal isVisible={modalOpen} onClose={setModalOpen}>
        <div className={styles.modalBody}>
          <h3>Resultados da Busca</h3>
          <section className={styles.modalContent}>
            { (address.length <= 0) && 
              <p>Nenhum registro encontrado!</p>
            }
            {address.map((address) => (
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
                  <b>Código Sei Lá: </b>
                  {address.cep}
                </p>
              </div>
            ))}
          </section>
        </div>
      </Modal>

      <main id="pageMain" className={styles.findCep}>
        <div className='breadcrumbs'>
          <span><Link to='/'>{"Início >"}</Link></span>
          <span>{"Buscar CEP"}</span>
        </div>

        <form>
          <div>
            <label>Estado</label>
            <select
              value={selectedState}
              onChange={handleStateChange}
              defaultValue=''
            >
              <option value=''>Selecione...</option>
              {stateList.map(state => (
                <option key={state.id} value={state.sigla}>{state.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Município</label>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              disabled={!selectedState}
              defaultValue=''
            >
              <option value=''>Selecione...</option>
              {cityList.map(city => (
                <option key={city.id} value={city.nome}>{city.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Logradouro</label>
            <input
              type="text"
              onChange={e => setStreet(e.target.value)}
              disabled={!selectedCity} />
          </div>

          <span className={styles.buttonContainer}>
            <button
              type="button"
              className={`alternative`}
              onClick={e => navigate(-1)}
            >
              Voltar
            </button>
            <button
              type="button"
              disabled={!validateFields()}
              onClick={searchCep}
            >
              Pesquisar
            </button>
          </span>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default FindCepPage;