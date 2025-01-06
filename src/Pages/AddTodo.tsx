import React, { useState } from 'react'
import { useContextTodo } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTodo: React.FC = () => {
    const { addNote, mode }: any = useContextTodo();
    const [note, setNote] = useState({ title: '', description: '', tag: '' });
    const handleAddTodo = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!note.title || !note.description) {
            toast.error("title and description can not be blank!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        else if (note.title.length < 3 || note.description.length < 5) {
            toast.error("title and decription must be 3 & 5 characters!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        else {
            addNote(note.title, note.description, note.tag);
            setNote({ title: '', description: '', tag: '' });
            toast.success("Note has been added Successfully", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }
    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div className={`${mode === true ? 'bg-[#2c2c2c] text-white' : 'bg-slate-50 text-gray-900'}`}>
            <div className='pt-10 pb-4 flex justify-center items-center'>
                <ToastContainer />
                <form action="" onSubmit={handleAddTodo} className={`flex flex-col md:w-[500px]  ${mode === true ? 'bg-[#212529] text-white' : 'bg-white text-gray-900'} mx-10 p-6 shadow-md rounded`}>
                    <label htmlFor="title">Title</label>
                    <input type="text"
                        value={note.title}
                        onChange={onchange} name='title'
                        className={`px-2 py-2 ${mode === true ? 'bg-[#212529] text-white' : 'bg-white text-gray-900 border-gray-900'} border-[1px]  outline-none rounded my-1`}
                        placeholder='Enter your title' />
                    <label htmlFor="description">Description</label>
                    <input type="text"
                        value={note.description}
                        onChange={onchange} name='description'
                        className={`px-2 py-2 ${mode === true ? 'bg-[#212529] text-white border-white' : 'bg-white text-black border-gray-900'}  border-[1px]  outline-none rounded my-1`}
                        placeholder='Enter your description' />
                    <label htmlFor="tag">Tag</label>
                    <input type="text"
                        value={note.tag}
                        onChange={onchange} name='tag'
                        className={`px-2 py-2 ${mode === true ? 'bg-[#212529] text-white border-white' : 'bg-white text-black border-gray-900'} border-[1px] outline-none rounded my-1`}
                        placeholder='Enter your tag' />
                    <div className='flex items-center justify-center my-2'>
                        <button type='submit'
                            className={`bg-green-600 text-white hover:bg-green-700 px-2 py-1 text-xl font-serif border-[1px] border-green-800 outline-none cursor-pointer rounded`}>
                            Add Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTodo
