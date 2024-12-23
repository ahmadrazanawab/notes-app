import React, {useEffect, useState } from 'react'
import { useContextTodo } from '../context/ContextProvider';
import { Todo } from '../Todo';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import Model from './Model';
const Todos: React.FC = () => {
    const { notes, editNote, getallNotes }: any = useContextTodo();
    const [showModal, setShowModal] = useState(false);
    const [eid, setId] = useState(0);
    const [etitle, setEtitle] = useState("");
    const [edescription, setEdescription] = useState("");
    const [etag, setEtag] = useState("");
    
    useEffect(() => {
        getallNotes();
    }, []);
    
    const showModalBtn = () => {
        setShowModal(true)
    }

    const onClosed = (e:React.SyntheticEvent) => {
        e.preventDefault();
        setShowModal(false);
    }

    const UpdateNote = (currentNote:Todo) => {
        setId(currentNote._id);
        setEtitle(currentNote.title);
        setEdescription(currentNote.description);
        setEtag(currentNote.tag);
    }

    const hadleClickUpdate = (e:React.SyntheticEvent) => {
        e.preventDefault();
        editNote(eid, etitle, edescription, etag);
        setShowModal(false)
    }

  return (
      <div className='bg-slate-50'>
          <AddTodo/>
          <Model isVisible={showModal} onClose={() => setShowModal(false)} >
          <div className="mb-4 px-6 text-left">
                  <h3 className="mb-4 text-xl font-medium text-gray-900">Edit Note</h3>
                  <form action="" className="space-y-6">
                      <div>
                          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-600">Title</label>
                          <input type="text" value={etitle} onChange={(e)=>setEtitle(e.target.value)} name="etitle" id="etitle" className="bg-gray-300 border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  />
                      </div>
                      <div>
                          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-600">Description</label>
                          <input type="text" value={edescription} onChange={(e)=>setEdescription(e.target.value)} name="edescription"  id="edescription" className="bg-gray-300 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  />
                      </div>
                      <div>
                          <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-600">Tag</label>
                          <input type="text" value={etag} onChange={(e)=>setEtag(e.target.value)} name="etag" id="etag" className="bg-gray-300 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  />
                      </div>
                      <div onClick={onClosed}>
                          <button  className="mx-1 bg-cyan-600 text-slate-50 font-bold px-2 py-1 rounded-md shadow-md hover:scale-95">Cancel Todo</button>
                          <button type="submit" onClick={hadleClickUpdate} className="mx-1 bg-cyan-600 text-slate-50 font-bold px-2 py-1 rounded-md shadow-md hover:scale-95">Save Todo</button>
                      </div>
                      
                  </form>
              </div>
          </Model>
        <div className='flex py-5 items-center justify-center flex-wrap'>
              {
                notes && notes.map((note:Todo) => {
                      return <div key={note._id} className='bg-white mx-2 my-2 shadow-md p-6 rounded'>
                          <TodoItem note={note} UpdateNote={UpdateNote} showModalBtn={showModalBtn}/>
                      </div>
                  })
              }
       </div>
    </div>
  )
}

export default Todos
