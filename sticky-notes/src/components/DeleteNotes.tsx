import TrashIcon from "../icons/Trash";

function DeleteNotes({
  handleDelete,
  disabled = false,
}: {
  disabled: boolean;
  handleDelete: () => void;
}) {
  return (
    <button disabled={disabled} style={{ all: "unset", cursor: disabled ? "not-allowed" : "pointer" }} onClick={handleDelete}>
      <TrashIcon />
    </button>
  );
}

export default DeleteNotes;
