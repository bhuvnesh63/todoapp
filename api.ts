import { ITask } from "./types/type";

const baseUrl='http://localhost:3002';


export const getAllTodos= async (): Promise <ITask[]>=>{
    const res= await fetch(`${baseUrl}/tasks`, {cache:'no-store'})

    const todos= await res.json();
    return todos;

}

export const addNewTodo= async (todo: ITask): Promise<ITask> =>{
    const res= await fetch(`${baseUrl}/tasks`, {
        method:"POST",
        headers:{
            'Content-type':"application/json"
        },
        body: JSON.stringify(todo)
    })
    const newTodo= await res.json();
    return newTodo

}

export const EditTodo= async (todo: ITask): Promise<ITask> =>{
    const res= await fetch(`${baseUrl}/tasks/${todo.id}`, {
        method:"PUT",
        headers:{
            'Content-type':"application/json"
        },
        body: JSON.stringify(todo)
    })
    const updatedTodo= await res.json();
    return updatedTodo

}


export const DeleteTodo= async (id: string): Promise<void> =>{
   await fetch(`${baseUrl}/tasks/${id}`, {
        method:"DELETE",
    })

}