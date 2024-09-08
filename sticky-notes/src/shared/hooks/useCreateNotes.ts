import { db } from "../appwrite/db";
import { INotes } from "../type";

function useCreateNotes() {
    const createNote = async (prop: Omit<INotes, "$id">) => {
        try {
          await db.notes.create(prop);
        } catch (error) {
          console.error(error);
        }
    };

    return createNote;
}

export default useCreateNotes;