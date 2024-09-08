export const setNewOffset = (card: any, mouseDir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseDir.x;
  const offsetTop = card.offsetTop - mouseDir.y;
  // const maxLeft = window.innerWidth - card.offsetWidth;
  // const maxTop = window.innerHeight - card.offsetHeight;
  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

export const autoGrow = (textAreaRef: any) => {
  const { current } = textAreaRef;
  if (current) {
    current.style.height = "auto";
    current.style.height = `${current.scrollHeight || 0}px`;
  }
};

export const setZIndex = (selectedCard: HTMLDivElement) => {
  selectedCard.style.zIndex = "999";

  Array.from<HTMLDivElement>(document.querySelectorAll(".card")).forEach(
    (card) => {
      if (card !== selectedCard) {
        card.style.userSelect = "none";
        card.style.zIndex = `${+selectedCard.style.zIndex - 1}`;
      }
    }
  );
};


export const jsonParser = (value: any) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}
