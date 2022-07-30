import { IHobbieDB, IStudentDB, IStudentHobbiesDB, Students } from "../models/Student";
import { BaseDatabase } from "./BaseDatabase";

export class StudentDataBase extends BaseDatabase {
    public static TABLE_STUDENTS = "Labe_Students"
    public static TABLE_HOBBIES = "Labe_Hobbies"
    public static TABLE_STUDENTS_HOBBIES = "Students_Hobbies"
    public static TABLE_CLASSROOMS = "Labe_Classrooms"

    public async getAllStudents() {

        const result = await BaseDatabase
            .connection(StudentDataBase.TABLE_STUDENTS)
            .select()

        return result
    }

    public async getStudentsName(search: string) {

        const result = await BaseDatabase
            .connection(StudentDataBase.TABLE_STUDENTS)
            .select()
            .where("name", "LIKE", `%${search}%`)

        return result
    }

    public async createStudent(student: Students) {
        await BaseDatabase
            .connection(StudentDataBase.TABLE_STUDENTS)
            .insert({
                id: student.getId(),
                name: student.getName(),
                email: student.getEmail(),
                birthdate: student.getBirthdate(),
                classroom_id: student.getClassroomId()
            })
    }

    public async updateStudentClass(id: string, classroom_id: string) {
        const result = await BaseDatabase
            .connection(StudentDataBase.TABLE_STUDENTS)
            .where({ id: id })
            .update({ classroom_id: classroom_id })

        return result
    }

    public async verificationStudent(id: string) {
        const findStudent = await BaseDatabase
            .connection(StudentDataBase.TABLE_STUDENTS)
            .select()
            .where({ id: id })

        return findStudent
    }

    public async verificationStudentEmail(email: string) {
        const findStudent = await BaseDatabase
            .connection(StudentDataBase.TABLE_STUDENTS)
            .select()
            .where({ email: email })

        return findStudent
    }

    public async verificationHobby(hobby: string) {
        const findHobby = await BaseDatabase
            .connection(StudentDataBase.TABLE_HOBBIES)
            .select()
            .where({ title: hobby })

        return findHobby
    }


    public async createHobby(hobby: IHobbieDB) {
        await BaseDatabase
            .connection(StudentDataBase.TABLE_HOBBIES)
            .insert({
                id: hobby.id,
                title: hobby.title
            })
    }

    
    public async getStudentsClassroom(id: string) {
        const [result] = await BaseDatabase
            .connection.raw(`
            SELECT
                ${StudentDataBase.TABLE_STUDENTS}.id,
                ${StudentDataBase.TABLE_STUDENTS}.name,
                ${StudentDataBase.TABLE_STUDENTS}.email
            FROM ${StudentDataBase.TABLE_CLASSROOMS}
            JOIN ${StudentDataBase.TABLE_STUDENTS}
            ON ${StudentDataBase.TABLE_STUDENTS}.classroom_id = ${StudentDataBase.TABLE_CLASSROOMS}.id
            WHERE ${StudentDataBase.TABLE_CLASSROOMS}.id = ${id};`)

        return result
    }

}