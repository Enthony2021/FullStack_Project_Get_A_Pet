import styles from './Home.module.css'
import api from '../utils/api'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Home = () => {
  const [pets, setPets] = useState([])

  useEffect(() => {
    api.get('/pets')
      .then((res) => {
        setPets(res.data.pets)
      })
  }, [])


  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1>Adote um pet</h1>
        <p>Veja os detalhes de cada um e conheça seus tutores</p>
      </div>

      <div className={styles.pet_container} >
        {pets.length > 0 && (
          pets.map((pet, key) => (
            <div key={key} className={styles.pet_card}>
              <div
                style={{ backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})` }}
                className={styles.pet_card_image}>

              </div>
              <h3>{pet.name}</h3>
              <p>
                <span className='bold'>Peso: {pet.weight}Kg</span>
              </p>
              {pet.available ? (
                <Link to={`pets/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p className={styles.adopted_text}>Adotado</p>
              )

              }
            </div>
          ))
        )}
        {pets.length === 0 && (
          <p>Não há pets cadastrados ou disponíveis no momento!</p>
        )}
      </div>
    </section>

  )
}

export default Home







