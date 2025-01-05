import { Notes } from "../Models/notes.model.js";
import { asyncHandler } from "../Utility/AsyncHandler.js";

// Get all Notes using the GET method. Login required. 
const fetchAllNotes = asyncHandler(async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes);
});


// Add  Note using the POST method. Login required.
const AddNote = asyncHandler(async (req, res) => {
    const { title, description, tag } = req.body;
    if (!(title && description && tag)) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }
    if (title.length < 3 || description.length < 5) {
        return res.status(400).json({ success: false, message: "title and description must be at least 3 and 5 characters!" });
    }
    const note = new Notes({
        title, description, tag, user: req.user.id
    })
    const saveNote = await note.save()
    res.status(201).json({ success: true, message: "Note has been created Successfully", saveNote });
});


// Update Note using the PUT method. Login required.
const UpdateNote = asyncHandler(async (req, res) => {
    const { title, description, tag } = req.body;

    //create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };


    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    if (!req.user || !req.user.id) {
        return res.status(400).send("Invalid user request");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.status(200).json({ success: true, message: "Note has been updated successfully", note })
});

// Delete Note using the DELETE method. Login required.
const DeleteNote = asyncHandler(async (req, res) => {

    // Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Note has been deleted", note });
})

export {
    fetchAllNotes,
    AddNote,
    UpdateNote,
    DeleteNote
}