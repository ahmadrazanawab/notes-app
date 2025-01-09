import React from 'react'
import { Todo } from '../Todo';
import { MdEditCalendar } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContextTodo } from '../context/ContextProvider';


interface TodoItemProps {
    note: Todo;
    UpdateNote: (todo: Todo) => void;
    showModalBtn: () => void;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
    const { deleteNote, mode}: any = useContextTodo();
    const { note, UpdateNote, showModalBtn } = props;
    return (
        <>
            <div className={`max-w-[450px] ${mode === true?'text-white' :'text-gray-900'}`}>
                <div className='flex justify-end sm:mx-2'>
                    <MdEditCalendar className={`sm:mx-1 cursor-pointer`} onClick={() => { showModalBtn(), UpdateNote(note) }} size={25} />
                    <RiDeleteBin6Line className={`mx-1 cursor-pointer`} onClick={() => { deleteNote(note._id) }} size={25} />
                </div>
                <div className={`flex justify-center shadow-sm  mt-2 mb-3 ${mode === true ? 'bg-gray-700':'bg-slate-300'} rounded items-center`}>
                    <h4 className={`text-xl  font-serif   my-1  sm:mx-2 mx-1`}>{note.title}</h4>
                </div>
                <p className={`text-sm  mx-1 border-[1px] ${mode === true ?'bg-black':'bg-slate-100'}  px-2 py-1 rounded `}>{note.description}</p>
                <div className='flex justify-between'>
                    <h5 className={`text-sm font-bold my-1 mx-2`}>{note.tag}</h5>
                    <h5 className={`text-sm font-bold  ${mode === true ?'text-gray-500':'text-slate-400'} my-1`}>{note.createdAt ? new Date(note.createdAt).toString().split(' GMT')[0] : 'invalid date'}</h5>
                </div>
            </div>
        </>
    )
}

export default TodoItem
