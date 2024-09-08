import { db } from "../appwrite/db";

function useUpdateNotes(noteId: string) {
    const updateData = async (key: string, value: string | {x: number, y: number}) => {
        const payload = { [key]: JSON.stringify(value) };
        try {
          await db.notes.update(noteId, payload);
        } catch (error) {
          console.error(error);
        }
    };

    return updateData;
}

export default useUpdateNotes;