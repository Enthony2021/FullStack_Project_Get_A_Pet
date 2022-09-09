const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')

// Helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const { pathToFileURL } = require('url')

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body

        // Validations
        if(!name) {
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }

        if(!email) {
            res.status(422).json({message: 'O email é obrigatório'})
            return
        }

        if(!phone) {
            res.status(422).json({message: 'O número de telefone é obrigatório'})
            return
        }

        if(!password) {
            res.status(422).json({message: 'A senha é obrigatória'})
            return
        }

        if(!confirmpassword) {
            res.status(422).json({message: 'A confirmação de senha é obrigatória'})
            return
        }

        if(password !== confirmpassword) {
            res.status(422).json({message: 'Senha e confirmação de senha não conferem!'})
            return
        }


        // Check if user exists
        const userExists = await User.findOne({email: email})

        if(userExists) {
            res.status(422).json({message: 'E-mail, já cadastrado! Por favor utilize outro e-mail'})
            return
        }


        // create a password
        const salt = await bcrypt.genSalt(12)  // Adiciona 12 caracteres a mais na senha criptografada
        const passwordHash = await bcrypt.hash(password, salt)

        // create a user
        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passwordHash
        })

        try {

            const newUser = await user.save()
            
            await createUserToken(newUser, req, res)

        } catch (err) {
            res.status(500).json({message: err})
        }
    } 



    static async login(req, res) {

        const { email, password } = req.body

        // Validations
        if(!email) {
            res.status(422).json({message: 'O email é obrigatório'})
            return
        }

        if(!password) {
            res.status(422).json({message: 'A senha é obrigatória'})
            return
        }

        // Check if user exists
        const user = await User.findOne({email: email})

        if(!user) {
            res.status(422).json({message: 'Não há usuário cadastrado com esse e-mail!'})
            return
        }

        // Check if password math with DB password
        const checkPassword = await bcrypt.compare(password, user.password)
        
        if(!checkPassword) {
            res.status(422).json({message: 'Senha Inválida!'})
            return
        }

        await createUserToken(user, req, res)
    }


    static async checkUser(req, res) {

        let currentUser

        if(req.headers.authorization) {
            const token = getToken(req) 
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined
            
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }


    static async getUserById(req, res) {

        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if(!user) {
            res.status(422).json({message: 'Usuário não encontrado!'})
            return
        }

        res.status(200).json({ user })
    }


    static async editUser(req, res) {
        const id = req.params.id

        // Check if user exists
        const token = getToken(req)
        const user = await getUserByToken(token)
        
        const { name, email, phone, password, confirmpassword } = req.body

        if(req.file) {
            user.image = req.file.filename
        }
        // Validations 

         // Validations
         if(!name) {
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }

        if(!email) {
            res.status(422).json({message: 'O email é obrigatório'})
            return
        }


        // Check if email has alredy taken
        const userExists = await User.findOne({email: email})

        if(user.email !== email && userExists) {
            return res.status(422).json({message: 'Por favor, utilize outro email!'})
        }
        
        user.name = name
        user.email = email

        if(!phone) {
            res.status(422).json({message: 'O número de telefone é obrigatório'})
            return
        }

        user.phone = phone

        if(password !== confirmpassword) {
            
            return res.status(422).json({message: 'As senhas não conferem!'})

        } else if (password === confirmpassword && password != null) {
            // Creating password
            const salt = await bcrypt.genSalt(12)  // Adiciona 12 caracteres a mais na senha criptografada
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        try {
            
            // return user updated data
            const updatedUser = await User.findOneAndUpdate({_id: user.id}, {$set: user}, {new: true})
            
            res.status(200).json({message: 'Usuário Atualizado com sucesso!'})
        } catch (err) {
            return res.status(500).json({ message: err })
        }

        
    }
}