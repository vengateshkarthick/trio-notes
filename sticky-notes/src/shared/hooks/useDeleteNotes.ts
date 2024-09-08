import { db } from "../appwrite/db";

function useDeleteNotes(noteId: string) {

    const deleteNote = async () => { 
        db["notes"].delete(noteId);
    }

    return deleteNote;

}

export default useDeleteNotes;