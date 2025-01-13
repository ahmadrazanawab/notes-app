import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Todo, credentialsProps, getUserProps } from '../Todo';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface childrenProps {
    children: ReactNode;
}


interface ContextTodos {
    notes: Todo[];
    setNotes: (todos: Todo[]) => void;
    addNote: (title: string, descriptin: string, tag: string) => void;
    deleteNote: (id: number) => void;
    editNote: (id: number, title: string, descriptin: string, tag: string) => void;
    fetchallnotes: () => void;
    fetchUser: () => void;
    user: getUserProps[];
    setUser: (user: getUserProps[]) => void;
    credentials: credentialsProps[],
    setCredentials: (credentials: credentialsProps[]) => void;
    email: string,
    setEmail: (email: string) => void;
    // theme dark mode and light mode
    mode: boolean;
    setMode: (mode: boolean) => void;
    // Loading 
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const ContextApi = createContext<ContextTodos | null>(null);

const ContextProvider: React.FC<childrenProps> = ({ children }) => {
    const host = "https://notes-app-qa3n.onrender.com";
    // const host = "http://localhost:4002";
    const [notes, setNotes] = useState<Todo[]>([]);
    const [credentials, setCredentials] = useState<credentialsProps[]>([]);
    const [email, setEmail] = useState<string>('');
    const [user, setUser] = useState<getUserProps[]>([]);
    const [mode, setMode] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
       try {
         const response = await axios.post(`${host}/api/user/getuser`,{}, {
             headers: {
                 "auth-token": localStorage.getItem('token')
             }
         })
         setUser(response.data);
       } catch (error) {
        toast.error("User not found.");
       }
    }

    // get All notes
    const fetchallnotes = async () => {
        try {
            const response = await axios.get(`${host}/api/notes/fetchallnotes`, {
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
            })
            setNotes(response.data);
        } catch (error) {
            toast.error("Note did not fetch all notes.");
        }
    }

    const addNote = async (title: string, description: string, tag: string) => {
        try {
            const response = await axios.post(`${host}/api/notes/addnote`, { title: title, description: description, tag: tag }, {
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
            })
            let note = response.data.saveNote;
            setNotes([...notes, note]);
        } catch (error) {
            toast.error("Note did not add. Please try again.");
        }
    }

    // Delete Note 
    const deleteNote = async (id: number) => {
        try {
            const response = await axios.delete(`${host}/api/notes/deletenote/${id}`, {
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
            });
            if (response.data.success === true) {
                toast.success("Note has been deleted Successfully", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            const todoDelete = notes.filter((note) => note._id !== id);
            setNotes(todoDelete);
        } catch (error) {
            toast.error("Note did not delete. Please try again.");
        }
    }

    // Edit Note
    const editNote = async (id: number, title: string, description: string, tag: string) => {
        try {
            const response = await axios.put(`${host}/api/notes/updatenote/${id}`,
                { title: title, description: description, tag: tag }, {
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            });
            if (response.data.success === true) {
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
            setNotes(notes.map(note => (note._id === id ? { ...note, title, description, tag } : note)));
        } catch (error) {
            toast.error("Note did not update. Please try again.");
        }
    }

    return (
        <ContextApi.Provider value={{
            credentials, setCredentials,
            notes, setNotes, addNote,
            deleteNote, editNote, fetchallnotes,
            fetchUser, user, setUser,
            email, setEmail, mode, setMode,loading, setLoading,
        }}>
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
