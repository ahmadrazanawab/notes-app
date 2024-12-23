import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Todo } from '../Todo';

interface childrenProps {
    children: ReactNode;
}

interface ContextTodos{
    notes: Todo[];
    setNotes: (todos: Todo[]) => void;
    addNote: (title: string, descriptin: string, tag: string) => void;
    deleteNote: (id: number) => void;
    editNote: (id: number, title: string, descriptin: string, tag: string) => void;
    getallNotes: () => void;
}

const ContextApi = createContext<ContextTodos | null>(null);

const ContextProvider: React.FC<childrenProps> = ({ children }) => {
    const host = import.meta.env.VITE_API_URL;
    const [notes, setNotes] = useState<Todo[]>([]);

    // get all todo
    const getallNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token') || ""
            },
        })
        const json = await response.json();
        setNotes(json);
        console.log(json);
    }
    // add todo

    const addNote = async(title:string,description:string,tag:string) => {
        
        const response = await fetch(`${host}/api/notes/addnote`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token') || ""
            },
            body:JSON.stringify({title,description,tag})
        })
        const note = await response.json();
        setNotes((prevTodo) => [...prevTodo, note]);
        // setTodos([...todos, todo]);

        console.log(note);
    }


    // delete todo
    const deleteNote = async(id: number) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token') || ""
            },
        })

        const json = await response.json()
        console.log(json);
        const todoDelete = notes.filter((note) => note._id !== id);
        setNotes(todoDelete);
        console.log(todoDelete);
    }

    // update todo
    const editNote = async(id: number, title: string, description: string, tag: string) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token') || ""
            },
            body:JSON.stringify({title,description,tag})
        })
        const json = await response.json();
        console.log(json);
        setNotes(notes.map(note => (note._id === id ? { ...note, title, description, tag } : note)));
        console.log("clicked the btn update id :=" + id);
    }

  return (
    <ContextApi.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getallNotes}}>
      {children}
    </ContextApi.Provider>
  )
}
export const useContextTodo = () => {
    const context = useContext(ContextApi);
    if (!context) {
        return new Error("context use within a provider");
    }
    return context;
}


export default ContextProvider
