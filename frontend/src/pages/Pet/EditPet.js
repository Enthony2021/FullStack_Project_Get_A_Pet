import api from '../../utils/api'
import { useState, useEffect } from 'react'
import styles from './AddPet.module.css'
import PetForm from '../../components/form/PetForm'
import { useParams } from 'react-router-dom'

// Hooks
import useFlashMessage from '../../hooks/useFlashMessage'

const EditPet = () => {
    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()
    const { setFlashMessages } = useFlashMessage()

    useEffect(() => {
        api.get(`pets/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`,
        })
            .then((res) => {
                setPet(res.data.pet)
            })

    }, [token, id])

    const updatePet = async (pet) => {
        let msgType = 'success'
        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.patch(`pets/${pet._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })
        setFlashMessages(data.message, msgType)
    }

    return (
        <section>
            <div className={styles.editpet_header}>
                <h1>Editando o Pet: {pet.name}</h1>
                <p>Depois da edição os dados serão atualizados no sistema!</p>
            </div>

            {pet.name && (
                <PetForm
                    handleSubmit={updatePet}
                    btnText='Atualizar'
                    petData={pet}
                />
            )}
        </section>
    )
}

export default EditPet