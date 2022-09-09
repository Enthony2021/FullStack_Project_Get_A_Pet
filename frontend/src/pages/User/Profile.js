import formStyles from '../../components/form/Form.module.css'
import styles from './Profile.module.css'
import api from '../../utils/api'
import { useState, useEffect } from 'react'
import Input from '../../components/form/Input'
import useFlashMessage from '../../hooks/useFlashMessage'
import RoundedImage from '../../components/layout/RoundedImage'

const Profile = () => {
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessages } = useFlashMessage()


    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(res => {
            setUser(res.data)
        })

    }, [token])

    const onFileChange = (e) => {

        setPreview(e.target.files[0])
        setUser({ ...user, [e.target.name]: e.target.files[0] })
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let msgType = 'success'

        const formData = new FormData()
        await Object.keys(user).forEach((key) => {
            formData.append(key, user[key])
        })

        let data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(async (res) => {
            return res.data
        }).catch((err) => {
            console.log(err)
            msgType = 'error'
            return err.response.data
        })
        
        setFlashMessages(data.message, msgType)
    }

    return (
        <section>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
                {(user.image || preview) && ( <RoundedImage 
                    src={
                        preview ? 
                        URL.createObjectURL(preview) 
                        : `${process.env.REACT_APP_API}images/users/${user.image}`} alt={user.name}
                    /> )}
            </div>

            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                <Input
                    text='Imagem'
                    type='file'
                    name='image'
                    handleOnChange={onFileChange}
                />

                <Input
                    text='E-mail'
                    type='email'
                    name='email'
                    placeholder='Altere o seu email'
                    handleOnChange={handleChange}
                    value={user.email || ''}
                />

                <Input
                    text='Nome'
                    type='text'
                    name='name'
                    placeholder='Altere o seu nome'
                    handleOnChange={handleChange}
                    value={user.name || ''}
                />

                <Input
                    text='Telefone'
                    type='text'
                    name='phone'
                    placeholder='Altere o seu telefone pra contato'
                    handleOnChange={handleChange}
                    value={user.phone || ''}
                />

                <Input
                    text='Senha'
                    type='password'
                    name='password'
                    placeholder='Altere a sua senha'
                    handleOnChange={handleChange}
                />

                <Input
                    text='Comfirme sua senha'
                    type='password'
                    name='confirmpassword'
                    placeholder='Confirme a sua senha'
                    handleOnChange={handleChange}
                />

                <input type="submit" value="Salvar alterações" />
            </form>

        </section>
    )
}

export default Profile