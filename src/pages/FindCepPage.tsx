import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from '../styles/FindCepPage.module.scss';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import Modal from "../components/Modal";
import LoadingScreen from "../components/LoadingScreen";
import Form from "../components/Form";
import TypeAddress from "../types/TypeAddress";

type TypeState = {
  id: number,
  sigla: string,
  nome: string
}

type TypeCity = {
  id: number,
  nome: string,
}

const FindCepPage = () => {
  const [stateList, setStateList] = useState<TypeState[]>([]);
  const [cityList, setCityList] = useState<TypeCity[]>([]);

  const [selectedState, setSelectedState] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();
  const [street, setStreet] = useState('');
  const [address, setAddress] = useState<TypeAddress[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStates = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");
      setIsLoading(false);

      const states: TypeState[] = response.data;

      setStateList(states);
    } catch (error) {
      if (error instanceof Error) console.log('Error trying to fetch states:', error.message);
      // show toast
    } finally {
      setIsLoading(false);
    }
  }

  const fetchCities = useCallback(async () => {
    try {
      if (!selectedState) return;

      setIsLoading(true);
      const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`);
      setIsLoading(false);
      const cities: TypeCity[] = response.data;

      setCityList(cities);
    } catch (error) {
      if (error instanceof Error) console.log('Error trying to fetch cities:', error.message);
      // show toast
    } finally {
      setIsLoading(false);
    }
  }, [selectedState]);

  const searchCep = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://viacep.com.br/ws/${selectedState}/${selectedCity}/${street}/json/`);
      setIsLoading(false);

      if (response.status !== 200) {
        console.log('error ' + response.status);
        // show error toast
        return;
      }

      const fetchedAdress: TypeAddress[] = response.data;

      setAddress(fetchedAdress);
      setModalOpen(true);
    } catch (error) {
      if (error instanceof Error) console.log('Error trying to fetch CEP:', error.message);
      // show toast
    } finally {
      setIsLoading(false);
    }
  }

  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  }

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    searchCep();
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
      <Header />
      <LoadingScreen isLoading={isLoading} />

      <Modal isVisible={modalOpen} onClose={setModalOpen}>
        <div className={styles.modalBody}>
          <h3>Resultados da Busca</h3>
          <section className={styles.modalContent}>
            {(address.length <= 0) &&
              <p>Nenhum registro encontrado!</p>
            }
            {address.map((address) => (
              <div className={styles.infoBox} key={address.cep}>
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
            ))}
          </section>
        </div>
      </Modal>

      <main id="pageMain" className={styles.findCep}>
        <div className='breadcrumbs'>
          <span><Link to='/'>{"Início >"}</Link></span>
          <span>{"Buscar CEP"}</span>
        </div>

        <Form
          onSubmit={handleFormSubmit}
          validateFields={validateFields}
        >
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
        </Form>
      </main>
      <Footer />
    </div>
  )
}

export default FindCepPage;