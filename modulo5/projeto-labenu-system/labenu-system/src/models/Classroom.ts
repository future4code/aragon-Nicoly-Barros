export enum MODULE {
    NOT_INIT = "0",
    MODULO_1 = "1",
    MODULO_2 = "2",
    MODULO_3 = "3",
    MODULO_4 = "4",
    MODULO_5 = "5",
    MODULO_6 = "6",
}

export interface IClassroomDB {
    id: string,
    name: string,
    module: MODULE
}

export class Classroom {
    constructor(
        private id: string,
        private name: string,
        private module: MODULE
    ){}

    public getId(){
        return this.id
    }

    public getName(){
        return this.name
    }


    public getModule(){
        return this.module
    }

    public setId(newId: string){
        this.id = newId
    }

    public setName(newName: string){
        this.name = newName
    }

    public setModule(newModule: MODULE){
        this.module = newModule
    }
}