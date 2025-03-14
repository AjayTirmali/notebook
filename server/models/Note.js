import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
});

export default mongoose.model('Note', NoteSchema);
