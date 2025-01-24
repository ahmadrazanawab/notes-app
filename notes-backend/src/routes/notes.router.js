import express from "express";
const notes = express.Router();
import { fetchUser } from '../middleware/fetchUser.js';
import {
    fetchAllNotes,
    AddNote,
    UpdateNote,
    DeleteNote
} from '../Controller/Notes.Controller.js';

notes.route('/fetchallnotes').get(fetchUser, fetchAllNotes)
notes.route('/addnote').post(fetchUser, AddNote)
notes.route('/updatenote/:id').put(fetchUser, UpdateNote)
notes.route('/deletenote/:id').delete(fetchUser, DeleteNote);

export { notes };