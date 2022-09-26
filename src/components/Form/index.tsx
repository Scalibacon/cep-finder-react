import { Link } from "react-router-dom";
import { HTMLAttributes } from "react";
import styles from './Form.module.scss';

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  validateFields?: () => boolean,
}

const Form = (props: FormProps) => {

  return (
    <form className={`${styles.form}`} {...props}>
      {props.children}
      <span className={styles.buttonContainer}>
        <Link to="/">
          <button
            type="button"
            className={`alternative`}
          >
            Voltar
          </button>
        </Link>

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