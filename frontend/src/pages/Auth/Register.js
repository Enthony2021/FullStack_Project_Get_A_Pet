import { useContext, useState } from "react"
import Input from "../../components/form/Input"
import styles from '../../components/form/Form.module.css'
import { Link } from "react-router-dom"

// Context
import { Context } from "../../context/UseContext"

const Register = () => {
  const [user, setUser] = useState('')
  const { register } = useContext(Context)

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Enviar usuário para o banco
    register(user)
  }

  return (
    <section className={styles.form_container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text='Nome'
          type='text'
          name='name'
          placeholder='Digite o seu nome'
          handleOnChange={handleChange}
        />

        <Input
          text='Telefone'
          type='text'
          name='phone'
          placeholder='Digite o seu telefone'
          handleOnChange={handleChange}
        />

        <Input
          text='E-mail'
          type='email'
          name='email'
          placeholder='Digite o seu e-mail'
          handleOnChange={handleChange}
        />

        <Input
          text='Senha'
          type='password'
          name='password'
          placeholder='Digite a sua senha'
          handleOnChange={handleChange}
        />

        <Input
          text='Confirmação de senha'
          type='password'
          name='confirmpassword'
          placeholder='Digite a senha novamente'
          handleOnChange={handleChange}
        />

        <input type="submit" value="Cadastrar" />
      </form>

      <p>Já tem conta? <Link to='/login'>Clique aqui!</Link></p>
    </section>
  )
}

export default Register