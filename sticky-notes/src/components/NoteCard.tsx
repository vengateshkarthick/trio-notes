import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
} from "react";
import SaveIcon from "../icons/Save";
import { autoGrow, jsonParser, setNewOffset, setZIndex } from "../shared/utlis";
import DeleteNotes from "./DeleteNotes";
import useUpdateNotes from "../shared/hooks/useUpdateNotes";
import useDeleteNotes from "../shared/hooks/useDeleteNotes";
import Toast from "./Toast";
import { INotes } from "../shared/type";
import useNotes from "../shared/hooks/useNotes";
import { localStorageKeys } from "../shared/constants";

function NoteCard({
  note,
  setNotes,
}: {
  note: INotes;
  setNotes: (note: INotes[]) => void;
}) {
  const [showToast, setShowToast] = React.useState(false);
  const keyUpTimer = React.useRef<number | null>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const body = jsonParser(note.body);
  const [position, setPosition] = React.useState(jsonParser(note.position));
  const colors = jsonParser(note.colors);

  const mouseStartPos = { x: 0, y: 0 };
  const [showSaved, setSaved] = React.useState({
    saved: false,
    isSaving: false,
  });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const showSavedIcon = () => {
    setSaved(() => ({ isSaving: false, saved: true }));

    setTimeout(() => {
      setSaved(() => ({ isSaving: false, saved: false }));
    }, 3000);
  };

  const updateNotes = useUpdateNotes(note.$id.toString());

  const deleteNotes = useDeleteNotes(note.$id.toString());

  const fetchNotes = useNotes();

  const isNotesBucketEmpty = !!localStorage.getItem(localStorageKeys.IS_NOTES_EMPTY)
  
  console.log({ isNotesBucketEmpty });
  const handleUpdateNotes = async (
    field: string,
    value: { x: number; y: number } | string
  ) => {
    if (!isNotesBucketEmpty) {
      await updateNotes(field, value);
      showSavedIcon();
    }
    isNotesBucketEmpty && console.warn("Unauthorized operation as the notes bucket is empty")
    
  };

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  const mouseMove = (event: MouseEvent) => {
    const mouseDir = {
      x: mouseStartPos.x - event.clientX,
      y: mouseStartPos.y - event.clientY,
    };

    mouseStartPos.x = event.clientX;
    mouseStartPos.y = event.clientY;

    if (cardRef.current) {
      const newPosition = setNewOffset(cardRef.current, mouseDir);
      setPosition(newPosition);
    }
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    handleUpdateNotes("position", newPosition);
  };

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    if ((event.target as HTMLDivElement).className === "card-header") {
      mouseStartPos.x = event.clientX;
      mouseStartPos.y = event.clientY;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
      setZIndex(cardRef.current as HTMLDivElement);
    }
  };

  const onStopTyping: KeyboardEventHandler<HTMLTextAreaElement> = () => {
    if (keyUpTimer.current) {
      setSaved(() => ({ isSaving: false, saved: false }));
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      setSaved(() => ({ isSaving: true, saved: false }));
      if (!isNotesBucketEmpty) {
        handleUpdateNotes("body", textAreaRef.current?.value as string);
      }
      isNotesBucketEmpty && console.warn("Unauthorized operation as the notes bucket is empty")

    }, 2000);
  };

  const handleDelete = async () => {
  if (!isNotesBucketEmpty) {
    await deleteNotes();

    setShowToast(true);
    setTimeout(() => {
     setShowToast(false);
     fetchNotes(setNotes)
 
    }, 2500);
  }
  

  };

  return (
    <>
    <div
      onMouseDown={onMouseDown}
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <header
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <DeleteNotes disabled={isNotesBucketEmpty} handleDelete={handleDelete} />

        {showSaved.isSaving && (
          <div className="card-saving icon">Saving...</div>
        )}

        {showSaved.saved && (
          <div className="card-saving">
            <SaveIcon />
          </div>
        )}
      </header>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          onKeyUp={onStopTyping}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => autoGrow(textAreaRef)}
          onFocus={() => setZIndex(cardRef.current as HTMLDivElement)}
        ></textarea>
      </div>
    </div>
    <Toast show={showToast} />
    </>
  );
}

export default NoteCard;
