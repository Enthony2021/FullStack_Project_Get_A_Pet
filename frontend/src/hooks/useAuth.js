import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'


export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessages } = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    // Registro de Usuário
    const register = async (user) => {

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success'

        try {
            const data = await api.post('/users/register', user).then((res) => {
                return res.data
            })

            await authUser(data)

        } catch (err) {
            msgText = err.response.data.message
            msgType = 'error'
        }

        setFlashMessages(msgText, msgType)
    }

    // Envia token de usuário logado para o LocalStorage
    const authUser = async (data) => {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/')
    }

    // login de usuário
    const login = async (user) => {
        let msgText = 'Login realizado com sucesso!'
        let msgType = 'success'

        try {

            const data = await api.post('/users/login', user).then((res) => {
                return res.data
            })

            await authUser(data)

        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessages(msgText, msgType)
    }


    // Saída de Usuário do sistema
    const logout = () => {
        const msgText = 'Logout realizado com sucesso!'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        setFlashMessages(msgText, msgType)
    }

    return { register, authenticated, logout, login }
}


