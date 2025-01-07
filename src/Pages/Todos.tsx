import React, { useEffect, useState } from 'react'
import { useContextTodo } from '../context/ContextProvider';
import 'react-toastify/dist/ReactToastify.css';
import { Todo } from '../Todo';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import Model from './Model';
import { useNavigate } from 'react-router-dom';

const Todos: React.FC = () => {
    const { notes, editNote, fetchUser, fetchallnotes, mode }: any = useContextTodo();
    const [showModal, setShowModal] = useState(false);
    const [eid, setId] = useState(0);
    const [etitle, setEtitle] = useState("");
    const [edescription, setEdescription] = useState("");
    const [etag, setEtag] = useState("");

    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchallnotes();
            fetchUser();
            // fetchUsers();
        }
        else {
            navigate('/login');
        }

    }, []);

    const showModalBtn = () => {
        setShowModal(true)
    }

    const onClosed = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setShowModal(false);
    }

    const UpdateNote = (currentNote: Todo) => {
        setId(currentNote._id);
        setEtitle(currentNote.title);
        setEdescription(currentNote.description);
        setEtag(currentNote.tag);
    }

    const hadleClickUpdate = (e: React.SyntheticEvent) => {
        e.preventDefault();
        editNote(eid, etitle, edescription, etag);
        setShowModal(false)
    }

    return (
        <div className={`${mode === true ? 'bg-[#2c2c2c] text-white' : 'bg-slate-50 text-black'}`}>
            <AddTodo />

            <Model isVisible={showModal} onClose={() => setShowModal(false)} >
                <div className={`mb-4 px-6 text-left ${mode === true ? 'text-white' : 'text-gray-900'}`}>
                    <h3 className={`mb-4 text-xl font-medium`}>Edit Note</h3>
                    <form action="" className={`space-y-6 ${!mode === true ? 'text-gray-900' : 'text-white'}`}>
                        <div>
                            <label htmlFor="title" className={`block mb-2 text-sm font-medium`}>Title</label>
                            <input type="text"
                                value={etitle}
                                onChange={(e) => setEtitle(e.target.value)}
                                name="etitle" id="etitle"
                                className={`${mode === true ? 'bg-[#212529] border-[2px] border-white text-white focus:ring-green-700 focus:border-blue-500' : 'bg-gray-300 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'}  outline-none  text-sm rounded-lg  block w-full p-2.5`} />
                        </div>
                        <div>
                            <label htmlFor="description" className={`block mb-2 text-sm font-medium `}>Description</label>
                            <textarea
                                value={edescription}
                                name='description' id='description'
                                onChange={(e)=>{setEdescription(e.target.value)}}
                                className={`${mode === true ? 'bg-[#212529] border-[2px] border-white text-white focus:ring-green-700 focus:border-blue-500' : 'bg-gray-300 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'} outline-none  text-sm rounded-lg  block w-full p-2.5`} 
                                placeholder='Enter your description'
                                cols={30} rows={3}>
                            </textarea>
                        </div>

                        <div>
                            <label htmlFor="tag" className={`block mb-2 text-sm font-medium `}>Tag</label>
                            <input type="text"
                                value={etag}
                                onChange={(e) => setEtag(e.target.value)}
                                name="etag" id="etag"
                                className={`${mode === true ? 'bg-[#212529] border-[2px] border-white text-white focus:ring-green-700 focus:border-blue-500' : 'bg-gray-300 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'} outline-none text-sm rounded-lg  block w-full p-2.5`} />
                        </div>
                        <div onClick={onClosed}>
                            <button className={`mx-1 bg-cyan-600 text-slate-50 font-bold px-2 py-1 rounded-md shadow-md hover:scale-95`}>Cancel Todo</button>
                            <button type="submit"
                                onClick={hadleClickUpdate}
                                className={`mx-1 bg-cyan-600 text-slate-50 font-bold px-2 py-1 rounded-md shadow-md hover:scale-95`}>
                                Save Todo
                            </button>
                        </div>

                    </form>
                </div>
            </Model>
            <div className='flex py-5 mx-3 items-center sm:justify-between justify-center  flex-wrap'>
                {
                    notes.length === 0 ? <h4 className='md:text-2xl  font-serif'>Opps! No Create new One</h4> : notes && notes.map((note: Todo) => {
                        return <div key={note._id} className={`${mode === true ? 'bg-[#212529] text-white' : 'bg-white text-gray-900'} mx-2 my-2 shadow-md p-6 rounded`}>
                            <TodoItem note={note} UpdateNote={UpdateNote} showModalBtn={showModalBtn} />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Todos
