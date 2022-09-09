import api from '../../utils/api'
import styles from './AddPet.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Componentes
import PetForm from '../../components/form/PetForm'

// Hooks
import useFlashMessage from '../../hooks/useFlashMessage'

const AddPet = () => {
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessages }  = useFlashMessage()
    const navigate = useNavigate()

    const registerPet = async (pet) => {
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if(key === 'images') {
                for(let i=0; i<pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        let data = await api.post('pets/create', formData, {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data'
        })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            msgType = 'error'
            return error.response.data
        })

        setFlashMessages( data.message , msgType)
        
        if(msgType !== 'error') navigate('/pet/mypets')
        
    }   


    return (
        <section className={styles.addpet_header}>
            <div>
                <h1>Cadastre um Pets</h1>
                <p>Após o cadastro, o Pet ficará disponível para adoção.</p>
            </div>

            <PetForm handleSubmit={registerPet} btnText='Cadastrar Pet'/>

        </section>
    )
}

export default AddPet