import { useNavigate } from "react-router-dom";
import { HTMLAttributes } from "react";
import styles from './Form.module.scss';

interface FormProps extends HTMLAttributes<HTMLFormElement>{
  validateFields?: () => boolean,
}

const Form = (props: FormProps) => {
  const navigate = useNavigate();

  return (
    <form className={`${styles.form}`} {...props}>
      { props.children }
      <span className={styles.buttonContainer}>
            <button
              type="button"
              className={`alternative`}
              onClick={e => navigate(-1)}
            >
              Voltar
            </button>
            <button
              type="submit"
              disabled={props.validateFields && !props.validateFields()}
            >
              Pesquisar
            </button>
          </span>
    </form>
  )
}

export default Form;