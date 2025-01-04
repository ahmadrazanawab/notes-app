import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Todo, credentialsProps, getUserProps } from '../Todo';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface childrenProps {
    children: ReactNode;
}


interface ContextTodos {
    notes: Todo[];
    setNotes: (todos: Todo[]) => void;
    addNote: (title: string, descriptin: string, tag: string) => void;
    deleteNote: (id: number) => void;
    editNote: (id: number, title: string, descriptin: string, tag: string) => void;
    getallNotes: () => void;
    fetchUser: () => void;
    user: getUserProps[];
    setUser: (user: getUserProps[]) => void;
    credentials: credentialsProps[],
    setCredentials: (credentials: credentialsProps[]) => void;
    email: string,
    setEmail: (email: string) => void;
}

const ContextApi = createContext<ContextTodos | null>(null);

const ContextProvider: React.FC<childrenProps> = ({ children }) => {
    const host = "https://notes-app-qa3n.onrender.com";
    // const host = "http://localhost:4002";
    const [notes, setNotes] = useState<Todo[]>([]);
    const [credentials, setCredentials] = useState<credentialsProps[]>([]);
    const [email, setEmail] = useState<string>('');
    const [user, setUser] = useState<getUserProps[]>([]);

    // fetch user 
    const fetchUser = async () => {
        const response = await fetch(`${host}/api/user/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token') || ""
            },
        })
        const json = await response.json();
        setUser(json);
    }


    // get all todo
    const getallNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token') || ""
            },
        })
        const json = await response.json();
        setNotes(json);
    }
    // add todo

    const addNote = async (title: string, description: string, tag: string) => {

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token') || ""
            },
            body: JSON.stringify({ title, description, tag })
        })
        const note = await response.json();
        setNotes((prevTodo) => [...prevTodo, note]);
    }


    // delete todo
    const deleteNote = async (id: number) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token') || ""
            },
        })

        await response.json();
        if (response.ok) {
            toast.success("Note has been deleted Successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        else {
            toast.error("Note did not delete. Please try again.");
        }
        const todoDelete = notes.filter((note) => note._id !== id);
        setNotes(todoDelete);
    }

    // update todo
    const editNote = async (id: number, title: string, description: string, tag: string) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token') || ""
            },
            body: JSON.stringify({ title, description, tag })
        })
        await response.json();
        if (response.ok) {
            toast.success("Note has been updated Successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        else {
            toast.error("Note did not update. Please try again.");
        }
        setNotes(notes.map(note => (note._id === id ? { ...note, title, description, tag } : note)));
    }

    return (
        <ContextApi.Provider value={{ credentials, setCredentials, notes, setNotes, addNote, deleteNote, editNote, getallNotes, fetchUser, user, setUser, email, setEmail }}>
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
