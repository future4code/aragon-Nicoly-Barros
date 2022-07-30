import { Request, Response } from "express"
import { ClassroomDatabase } from "../database/ClassroomDatabase"
import { Classroom } from "../models/Classroom"

export class ClassroomController {


  public async getAllClassrooms(req: Request, res: Response) {
    let errorCode = 400
    try {
      const search = req.query.search as string
      const classroomDatabase = new ClassroomDatabase()

      if (search) {

        const result = await classroomDatabase.getClassroomName(search)

        if (result.length === 0) {
          errorCode = 404
          throw new Error("Nenhuma turma encontrada com essa busca.");
        }

        res.status(200).send({
          classrooms: result
        })

      } else {
        const result = await classroomDatabase.getAllClassrooms()

        res.status(200).send({
          classrooms: result
        })
      }

    } catch (error) {
      res.status(errorCode).send({ message: error.message })
    }
  }



  public async createClassroom(req: Request, res: Response) {
    let errorCode = 400
    try {
      const { name, module } = req.body 
      const classroomDatabase = new ClassroomDatabase()

      if(!name || !module){
        errorCode = 422
        throw new Error("Erro: Parâmetros ausentes.");
      }

      if(typeof name !== "string" ){
        errorCode = 422
        throw new Error("Erro: Parâmetros com tipo inválidos, devem ser string.")
      }

      if(typeof module === "number" ){
        errorCode = 422
        throw new Error("Erro: Parâmetros com tipo inválidos, devem ser string.")
      }

      const findClassName = await classroomDatabase.verificationClassName(name)

      if(findClassName[0]){
        errorCode = 409
        throw new Error("Erro: Já existe turma cadastrada com esse nome.")
      }

      const classroom = new Classroom(
        Date.now().toString(),
        name,
        module
      )

      await classroomDatabase.createClassroom(classroom)

      res.status(201).send({
        message: "Turma criada com sucesso!",
        classroom: classroom
      })

    } catch (error) {
      res.status(errorCode).send({ message: error.message })
    }
  }


  public async getAtiveClasses(req: Request, res: Response) {
    let errorCode = 400
    try {
      const classroomDatabase = new ClassroomDatabase()
      const list = await classroomDatabase.getAllClassrooms()

      const result = list.filter((item) => {
        return item.module !== "0"
      })

      if(result.length === 0){
        errorCode = 404
        throw new Error("Nenhuma turma ativa.");
      }

      res.status(200).send({ classroomsActives: result })

    } catch (error) {
      res.status(errorCode).send({ message: error.message })
    }
  }


  public async changeClassroomModule(req: Request, res: Response) {
    let errorCode = 400
    try {
      const id = req.params.id as string
      const module = req.body.module as string

      if(!id || !module){
        errorCode = 422
        throw new Error("Erro: Parâmetros ausentes.");
      }

      if(typeof id !== "string" || typeof module !== "string"){
        errorCode = 422
        throw new Error("Erro: Parâmetros com tipo inválidos, devem ser string.")
      }

      const classroomDataBase = new ClassroomDatabase()
      const findClass = await classroomDataBase.verificationClass(id)

      if(!findClass[0]){
        errorCode = 404
        throw new Error("Erro: Turma não encontrada.");
      }
      
      await classroomDataBase.updateClassroomModule(id, module)

      res.status(200).send({
        mensagem: "Módulo alterado com sucesso!"
      })
      
    } catch (error) {
      res.status(errorCode).send({ message: error.message })
    }
  }

}