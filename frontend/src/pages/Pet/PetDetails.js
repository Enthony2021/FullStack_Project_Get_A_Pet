import styles from './PetDetails.module.css'
import api from '../../utils/api'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// Hooks
import useFlashMessage from '../../hooks/useFlashMessage'

const PetDetails = () => {
    const [pet, setPet] = useState({})
    const { id } = useParams()
    const { setFlashMessages } = useFlashMessage()
    const [token] = useState(JSON.parse(localStorage.getItem('token')) || '')

    useEffect(() => {
        api.get(`/pets/${id}`)
            .then((res) => {
                setPet(res.data.pet)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const schedule = async() => {
        let msgType = 'success'

        const data = await api.patch(`pets/schedule/${pet._id}`, {
            headers: {
                Authorization: `Bearer ${token}}`
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
        <>
            {pet.name && (
                <section className={styles.pet_details_container}>
                    <div className={styles.pet_details_header}>
                        <h1>Conhecendo o Pet: {pet.name}</h1>
                        <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
                    </div>

                    <div className={styles.pet_images}>
                        {pet.images.map((image, index) => (
                            <img
                                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                                alt={pet.name}
                                key={index}
                            />
                        ))}
                    </div>

                    <p>
                        <span className='bold'>Peso: {pet.weight}Kg</span>
                    </p>

                    <p>
                        <span className='bold'>Age: {pet.age}Kg</span>
                    </p>

                    {token ? (
                        <button onClick={schedule}>Solicitar uma visita</button>
                    ) : (
                        <p>Você precisa <Link to='/register'>criar uma conta</Link> para socilitar uma visita.</p>
                    )}
                </section>
            )}
        </>
    )
}

export default PetDetails