import React from "react";
// import { fakeData } from '../shared/fakeData';
import NoteCard from "../components/NoteCard";
import useNotes from "../shared/hooks/useNotes";
import { INotes } from "../shared/type";
import Spinner from "../icons/Spinner";
import useCreateNotes from "../shared/hooks/useCreateNotes";
import { localStorageKeys, palate } from "../shared/constants";
import AddNotes from "../components/Add";
import { fakeData } from "../shared/fakeData";

function NotesPage(props: any) {
  const [notes, setNotes] = React.useState<INotes[]>([]);
  const createNote = useCreateNotes();

  //  const abortSignal = useRef<boolean>(true);

  const fetchNotes = useNotes(setNotes);

  const addNewNote = async (color: (typeof palate)[0]) => {
    let latestPos = localStorage.getItem(localStorageKeys.LATEST_POSITION);
    const currentPos = {x: 110, y: 110}
    if (latestPos !== null) {
     const { x = 100, y = 100 } = JSON.parse(latestPos) || {x: 0, y: 0};
      currentPos.x = +x + 30;
      currentPos.y = +y + 30;
    }
    const newNote = {
      body: "",
      colors: JSON.stringify(color),
      position: JSON.stringify(currentPos),
    };
    setNotes([]);
    const res = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const json = await res.json();
    newNote.body = json.setup ? json.setup + "\n\n" + json?.punchline : " ";
    await createNote(newNote);
    fetchNotes(setNotes);
    localStorage.setItem(localStorageKeys.LATEST_POSITION, JSON.stringify(currentPos));
  };

  if (!notes.length) {
    return (
      <div className="spinner-box">
        <Spinner color="#663399" size="100" />
      </div>
    );
  }

  return (
    <div>
      {notes.map((item) => (
        <NoteCard key={item.$id} note={item} setNotes={setNotes} />
      ))}
      <AddNotes addNew={addNewNote} />
    </div>
  );
}

export default NotesPage;
