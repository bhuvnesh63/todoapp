"use client"

import { ITask } from "@/types/type"
import { useState, FormEventHandler } from "react"
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import Modal from "./modal";
import { useRouter } from 'next/navigation';
import { DeleteTodo, EditTodo } from '@/api'

interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter()

  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [openModelDeleted, setOpenModelDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text)


  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // console.log(newTaskValue);
    await EditTodo({
      id: task.id,
      text: taskToEdit,
    })
    setTaskToEdit("")
    setOpenModelEdit(false)
    router.refresh();
  }

  const handleDeleteTask= async(id:string)=>{
    await DeleteTodo(id);
    setOpenModelDeleted(false);
    router.refresh();

  }

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit onClick={() => setOpenModelEdit(true)} cursor='pointer' className="text-blue-500" size={25} />
        <Modal modalOpen={openModelEdit} setModalOpen={setOpenModelEdit}>

          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-large'>EditTask</h3>
            <div className='modal-action'>
              <input value={taskToEdit} onChange={e => setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
              <button type='submit' className='btn'>Submit</button>
            </div>
          </form>
        </Modal>



        <FiTrash2 onClick={()=>setOpenModelDeleted(true)} cursor='pointer' className="text-red-500" size={25} />

        <Modal modalOpen={openModelDeleted} setModalOpen={setOpenModelDeleted}>
<h3 className="text-lg">Are you sure to delete this task</h3>
<div className="modal-action">
<button
onClick={()=>handleDeleteTask(task.id)}
className="btn"
> Yes</button>
</div>
        </Modal>
      </td>
    </tr>
  )
}

export default Task