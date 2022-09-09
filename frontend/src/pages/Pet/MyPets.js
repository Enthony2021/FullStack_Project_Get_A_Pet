import styles from './Dashboard.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RoundedImage from '../../components/layout/RoundedImage'
import api from '../../utils/api'

// Hooks
import useFlashMessage from '../../hooks/useFlashMessage'

const MyPets = () => {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessages } = useFlashMessage()

    useEffect(() => {
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setPets(response.data.pets)
            })
            .catch()
    }, [token])

    const removePet = async (id) => {
        let msgType = 'success'

        const data = await api.delete(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then(res => {
                const updatedpets = pets.filter((pet) => pet._id !== id)
                setPets(updatedpets)

                return res.data
            })
            .catch(err => {
                msgType = 'error'
            })

        setFlashMessages(data.message, msgType)

    }

    const concludeAdoption = async (id) => {
        let msgType = 'success'

        const data = await api.patch(`/pets/conclude/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}` 
            }
        })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessages( data.message, msgType )
    }

    return (
        <section>
            <div className={styles.petlist_header}>
                <h1>Meus Pets</h1>
                <Link to='/pet/add'>Cadastrar Pets</Link>
            </div>

            <div className={styles.petlist_container}>
                {pets.length > 0 && pets.map((pet) => (
                    <div className={styles.petlist_row} key={pet._id}>
                        <RoundedImage
                            src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                            alt={pet.name}
                            width='px75'
                        />

                        <span className='bold'>{pet.name}</span>
                        <div className={styles.actions}>
                            {pet.available ? (
                                <>
                                    {pet.adopter && <button className={styles.conclude_btn} onClick={() => {
                                        concludeAdoption(pet._id) 
                                    }}>
                                        Concluir Adoção
                                    </button>}
                                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                                    <button onClick={() => {removePet(pet._id)}}>Excluir</button>
                                </>
                            ) :
                                (
                                    <p>Pet já Adotado!</p>
                                )}
                        </div>
                    </div>
                ))}
                {pets.length === 0 && <p>Não há Pets cadastrados!</p>}
            </div>
        </section>
    )
}

export default MyPets