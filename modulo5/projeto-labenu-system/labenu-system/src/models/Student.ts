export interface IStudentDB {
    id: string,
    name: string,
    email: string,
    birthdate: Date,
    classroom_id: string | null
}

export interface IHobbieDB {
    id: string,
    title: string
}

export interface IStudentHobbiesDB {
    student_id: string,
    hobby_id: string
}

export class Students {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private birthdate: Date,
        private classroom_id: string | null,
        private hobby: string
    ){}

    public getId(){
        return this.id
    }

    public getName(){
        return this.name
    }

    public getEmail(){
        return this.email
    }

    public getBirthdate(){
        return this.birthdate
    }

    public getClassroomId(){
        return this.classroom_id
    }

    public getHobby(){
        return this.hobby
    }

    public setId(newId: string){
        this.id = newId
    }

    public setName(newName: string){
        this.name = newName
    }

    public setEmail(newEmail: string){
        this.email = newEmail
    }

    public setBirthdate(newBirthdate: Date){
        this.birthdate = newBirthdate
    }

    public setClassroom(newClassroom: string | null){
        this.classroom_id = newClassroom
    }

}