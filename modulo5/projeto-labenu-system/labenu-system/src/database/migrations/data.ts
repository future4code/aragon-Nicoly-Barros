import { IClassroomDB, MODULE } from "../../models/Classroom";
import { IHobbieDB, IStudentDB, IStudentHobbiesDB } from "../../models/Student";

export const classrooms: IClassroomDB[] = [
    {
        id: "101",
        name: "Aragon",
        module: MODULE.MODULO_5
    },
    {
        id: "102",
        name: "Barros",
        module: MODULE.NOT_INIT
    },
    {
        id: "103",
        name: "Einstein",
        module: MODULE.MODULO_2
    }
]

export const students: IStudentDB[] = [
    {
        id: "1",
        name: "Nicoly Barros",
        email: "nicoly@gmail.com",
        birthdate: new Date("1999/11/25"),
        classroom_id: "101"
    },
    {
        id: "2",
        name: "Marcos Paulo",
        email: "marcosp@gmail.com",
        birthdate: new Date("1999/01/31"),
        classroom_id: "101"
    },
    {
        id: "3",
        name: "Isabelle Daru",
        email: "isadaru@gmail.com",
        birthdate: new Date("1995/07/07"),
        classroom_id: "101"
    },
    {
        id: "4",
        name: "Marisa Lima",
        email: "mari@gmail.com",
        birthdate: new Date("1996/09/20"),
        classroom_id: "102"
    },
    {
        id: "5",
        name: "Felipe Oliveira",
        email: "felipeoli@gmail.com",
        birthdate: new Date("2001/03/28"),
        classroom_id: "102"
    },
    {
        id: "6",
        name: "Adriana Vilter",
        email: "drivilter@gmail.com",
        birthdate: new Date("1993/06/12"),
        classroom_id: "102"
    },
    {
        id: "7",
        name: "Maia Martins",
        email: "maaia@gmail.com",
        birthdate: new Date("1998/10/09"),
        classroom_id: "103"
    },
    {
        id: "8",
        name: "Gabriel Heleno",
        email: "gaheleno@gmail.com",
        birthdate: new Date("2002/12/02"),
        classroom_id: "103"
    },
    {
        id: "9",
        name: "Vitor Nunes",
        email: "vitttor@gmail.com",
        birthdate: new Date("1999/04/17"),
        classroom_id: "103"
    },
    {
        id: "10",
        name: "Eduarda Da Silva",
        email: "duda@gmail.com",
        birthdate: new Date("1996/08/14"),
        classroom_id: null
    }
]


export const hobbies: IHobbieDB[] = [
    {
        id: "01",
        title: "Leitura"
    },
    {
        id: "02",
        title: "Andar de patins"
    },
    {
        id: "03",
        title: "Academia"
    },
    {
        id: "04",
        title: "Andar de skate"
    }
]

export const studentsHobbies: IStudentHobbiesDB[] = [
    {
        student_id: "1",
        hobby_id: "02"
    },
    {
        student_id: "1",
        hobby_id: "03"
    },
    {
        student_id: "3",
        hobby_id: "01"
    }
]