import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class UserController {
    public signup = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const { nickname, email, password } = req.body

            if (!nickname || !email || !password) {
                errorCode = 422
                throw new Error("Erro: Parâmetros ausentes.")
            }

            if (nickname.length < 3) {
                errorCode = 422
                throw new Error("Erro: Parâmetro 'nickname' deve possuir ao menos 3 caracteres.")
            }

            if (!email.includes("@")) {
                errorCode = 422
                throw new Error("Erro: Parâmetro 'email' inválido.")
            }

            if (password.length < 6) {
                errorCode = 422
                throw new Error("Erro: Parâmetro 'password' deve possuir ao menos 6 caracteres.")
            }

            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const user = new User(
                id,
                nickname,
                email,
                password
            )

            const userDatabase = new UserDatabase()
            await userDatabase.createUser(user)

            const payload: ITokenPayload = {
                id: user.getId()
            }

            const authenticator = new Authenticator()
            const token = authenticator.generateToken(payload)

            res.status(201).send({
                message: "Usuário(a) cadastro(a) com sucesso",
                token
            })
        } catch (error) {
            if (
                typeof error.message === "string"
                && error.message.includes("Duplicate entry")
            ) {
                return res.status(409).send({ message: "Erro: Email já cadastrado." })
            }
            res.status(errorCode).send({ message: error.message })
        }
    }

    public login = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const { email, password } = req.body

            if (!email || !password) {
                errorCode = 422
                throw new Error("Erro: Parâmetros ausentes.")
            }

            if (typeof email !== "string" || typeof password !== "string") {
                errorCode = 422
                throw new Error("Erro: Parâmetros devem ser do tipo string.")
            }

            if (!email.includes("@")) {
                errorCode = 422
                throw new Error("Erro: Parâmetro 'email' inválido.")
            }

            if (password.length < 6) {
                errorCode = 422
                throw new Error("Erro: Parâmetro 'password' deve possuir ao menos 6 caracteres.")
            }

            const userDatabase = new UserDatabase()
            const userDB = await userDatabase.findByEmail(email)

            if (!userDB) {
                errorCode = 404
                throw new Error("Erro: Email não encontrado/cadastrado.")
            }

            const user = new User(
                userDB.id,
                userDB.nickname,
                userDB.email,
                userDB.password
            )

            if (user.getPassword() !== password) {
                errorCode = 422
                throw new Error("Erro: Senha inválida.")
            }

            const payload: ITokenPayload = {
                id: user.getId()
            }

            const authenticator = new Authenticator()
            const token = authenticator.generateToken(payload)

            res.status(200).send({
                message: "Login realizado com sucesso!",
                token
            })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public getAllUsers = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const search = req.query.search as string

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 422
                throw new Error("Erro: Token ausente ou inválido.")
            }

            const userDatabase = new UserDatabase()
            const usersDB = await userDatabase.getAllUsers()

            const userByName = await userDatabase.getUserByName(search)

            if (search) {

                const result = {
                    id: userByName.id,
                    nickname: userByName.nickname,
                    email: userByName.email,
                }

                res.status(200).send({ users: result })
            }

            const users = usersDB.map((user) => {
                const result = {
                    id: user.id,
                    nickname: user.nickname,
                    email: user.email,
                }

                return result
            })

            res.status(200).send({ users })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public editInformation = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const {nickname, email, password} = req.body

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 422
                throw new Error("Erro: Token ausente ou inválido.")
            }

            if(!nickname && !email && !password){
                errorCode = 422
                throw new Error("Erro: Necessário informar um dos parâmetros.")
            }

            if (nickname.length < 3) {
                errorCode = 422
                throw new Error("Erro: Parâmetro 'nickname' deve possuir ao menos 3 caracteres.")
            }

            if (!email.includes("@")) {
                errorCode = 422
                throw new Error("Erro: Parâmetro 'email' inválido.")
            }

            if (password.length < 6) {
                errorCode = 422
                throw new Error("Erro: Parâmetro 'password' deve possuir ao menos 6 caracteres.")
            }

            const userDatabase = new UserDatabase()
            const userDB = await userDatabase.findByEmail(email)

            if (userDB) {
                errorCode = 409
                throw new Error("Erro: Email já cadastrado.")
            }

            await userDatabase.editInformation(payload.id, nickname, email, password)

            res.status(200).send({message: "Dados alterado com sucesso!"})

        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const id = req.params.id

            if(token){
                errorCode = 422
                throw new Error("Erro: Usuário logado, sair da conta.")
            }

            const userDatabase = new UserDatabase()
            await userDatabase.deleteUser(id)

            res.status(200).send({message: "Usuário(a) deletado(a) com sucesso!"})
            
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }
}