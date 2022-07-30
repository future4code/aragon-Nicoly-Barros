import { Request, Response } from "express"
import { ClassroomDatabase } from "../database/ClassroomDatabase"
import { StudentDataBase } from "../database/StudentDatabase"
import { IHobbieDB, Students } from "../models/Student"

export class StudentController {


  public async getAllStudents(req: Request, res: Response) {
    let errorCode = 400
    try {
      const search = req.query.search as string

      if (search) {
        const studentDatabase = new StudentDataBase()
        const result = await studentDatabase.getStudentsName(search)

        if (result.length === 0) {
          errorCode = 404
          throw new Error("Nenhum estudante encontrado com essa busca.");
        }

        res.status(200).send({
          students: result
        })

      } else {

        const studentDatabase = new StudentDataBase()
        const result = await studentDatabase.getAllStudents()

        res.status(200).send({
          students: result
        })
      }

    } catch (error) {
      res.status(errorCode).send({ message: error.message })
    }
  }


  public async createStudent(req: Request, res: Response) {
    let errorCode = 400
    try {
      const { name, email, birthdate, classroom_id, hobby } = req.body

      const studentDatabase = new StudentDataBase()

      if (!name || !email || !birthdate || !hobby) {
        errorCode = 422
        throw new Error("Erro: Parâmetros ausentes.");
      }

      if (typeof name !== "string" || typeof email !== "string" || typeof hobby !== "string") {
        errorCode = 422
        throw new Error("Erro: Parâmetros com tipo inválidos, devem ser string.");
      }

      const findStudent = await studentDatabase.verificationStudentEmail(email)

      if (findStudent[0]) {
        errorCode = 409
        throw new Error("Erro: Email já cadastrado.");
      }

      const findHobby = await studentDatabase.verificationHobby(hobby)

      if (!findHobby[0]) {

        const newHobby: IHobbieDB = {
          id: Date.now().toString(),
          title: hobby
        }

        await studentDatabase.createHobby(newHobby)

        const student = new Students(
          Date.now().toString(),
          name,
          email,
          birthdate,
          classroom_id,
          hobby
        )

        await studentDatabase.createStudent(student)

        res.status(201).send({
          message: "Aluno(a) cadastrado(a) com sucesso!",
          student: student
        })

      } else {

        const student = new Students(
          Date.now().toString(),
          name,
          email,
          birthdate,
          classroom_id,
          hobby
        )

        await studentDatabase.createStudent(student)

        res.status(201).send({
          message: "Aluno(a) cadastrado(a) com sucesso!",
          student: student
        })
      }

    } catch (error) {
      res.status(errorCode).send({ message: error.message })
    }
  }


  public async changeStudentClass(req: Request, res: Response) {
    let errorCode = 400
    try {
      const id = req.params.id as string
      const classroom_id = req.body.classroom_id as string

      if(!id || !classroom_id){
        errorCode = 422
        throw new Error("Erro: Parâmetros ausentes.")
      }

      if(typeof classroom_id !== "string" || typeof id !== "string"){
        errorCode = 422
        throw new Error("Erro: Parâmetros com tipo inválidos, devem ser string.")
      }

      const classroomDataBase = new ClassroomDatabase()
      const findClass = await classroomDataBase.verificationClass(classroom_id)

      if (!findClass[0]) {
        errorCode = 404
        throw new Error("Erro: Turma não encontrada/disponível.");
      }

      const studentDataBase = new StudentDataBase()
      const findStudent = await studentDataBase.verificationStudent(id)

      if (!findStudent[0]) {
        errorCode = 404
        throw new Error("Erro: Estudante não encontrado(a).");
      }

      await studentDataBase.updateStudentClass(id, classroom_id)

      res.status(200).send({
        mensagem: "Alterado turma de estudante com sucesso!"
      })

    } catch (error) {
      res.status(errorCode).send({ message: error.message })
    }
  }


  public async getStudentsClass(req: Request, res: Response) {
    let errorCode = 400

    try {
      const id = req.params.id as string

      if(!id){
        errorCode = 422
        throw new Error("Erro: Parâmetros ausentes.")
      }

      const classroomDataBase = new ClassroomDatabase()
      const findClass = await classroomDataBase.verificationClass(id)

      if (!findClass[0]) {
        errorCode = 404
        throw new Error("Erro: Turma não encontrada/disponível.");
      }

      const studentDataBase = new StudentDataBase()
      const result = await studentDataBase.getStudentsClassroom(id)

      res.status(200).send({ students: result })
    } catch (error) {
      res.status(errorCode).send({ message: error.message })
    }
  }
}