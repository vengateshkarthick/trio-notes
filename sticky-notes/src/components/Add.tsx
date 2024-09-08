import { useState } from "react";
import { palate } from "../shared/constants";
import PlusIcon from "../icons/Plus";

function AddNotes({ addNew }: { addNew: (color: (typeof palate)[0]) => void }) {
  const [showColors, setShowColors] = useState(false);

  const handleAddNew = (color: (typeof palate)[0]) => {
    setShowColors(false);
    addNew(color);
  };

  const handleShowPalate = (e: any) => {
    setShowColors(!showColors);
    e?.stopPropagation();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      setShowColors(!showColors);
    }
    e.stopPropagation();
  };

  const handleAdd = (color: typeof palate[0]):React.MouseEventHandler<HTMLDivElement> => (e) => {
    handleAddNew(color);
    setShowColors(false);
    e.stopPropagation();
  };

  const buildStyles = () => {
    if (showColors) {
      return {
        border: "0.2rem dashed #663399",
        transform: "translate(50%, 20%) rotate(45deg)",
      };
    }
    return { transform: "translate(50%, 20%) rotate(0deg)", border: "0.2rem solid #663399" };
  };

  return (
    <div className="add-notes">
      <div
        className="color-palate"
        style={{ transform: showColors ? "scale(1)" : "scale(0)"}}
        
      >
        {palate.map((color) => (
          <div onClick={handleAdd(color)} className="palate-box" key={color.id} id={color.id}>
            <p
              className="color-code"
              style={{ backgroundColor: color.colorHeader }}
            >
              &nbsp;
            </p>
            <p className="color-text">{color.colorHeader}</p>
          </div>
        ))}
      </div>

      <button
        className="add-icon"
        onKeyUp={handleKeyPress}
        onClick={handleShowPalate}
        style={buildStyles()}
      >
       <PlusIcon />
      </button>
    </div>
  );
}

export default AddNotes;
