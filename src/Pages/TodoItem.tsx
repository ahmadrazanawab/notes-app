import React from 'react'
import { Todo } from '../Todo';
import { MdEditCalendar } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContextTodo } from '../context/ContextProvider';

interface TodoItemProps {
    note: Todo;
    UpdateNote: (todo: Todo) => void;
    showModalBtn: ()=>void;
}

  
const TodoItem: React.FC<TodoItemProps> = (props) => {
    const { deleteNote }: any = useContextTodo();
    const {note,UpdateNote,showModalBtn } = props;
  return (
    <div className='w-full mx-2'>
          <div className='flex justify-between items-center'>
              <h4 className='text-xl font-serif text-gray-900 my-1  sm:mx-2 mx-1'>{note.title}</h4>
              <span className='flex justify-between sm:mx-2'>
                  <MdEditCalendar className='sm:mx-1 cursor-pointer ' onClick={() => {showModalBtn(), UpdateNote(note) }} size={25} />
                  <RiDeleteBin6Line className='mx-1 cursor-pointer' onClick={() => { deleteNote(note._id) }} size={25} /></span>
          </div>
          <p className='text-sm my-1 mx-2'>{note.description}</p>
          <h5 className='text-sm font-bold my-1 mx-2'>{note.tag}</h5>
    </div>
  )
}

export default TodoItem
