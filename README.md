# trio-notes


---

# Sticky Notes App

A lightweight sticky notes web application built with **Vite** for blazing-fast development, **React** for the frontend, and **Appwrite** for backend services. This app offers a fun and productive way to organize your thoughts with interactive sticky notes, complemented by a sprinkle of humor using the **Joke API**.

## Features

- **Create, Update, and Delete Sticky Notes**  
  Users can create multiple sticky notes, each with three unique color codes for better organization.
  
- **Sticky Note Persistence**  
  Positions of sticky notes are saved and retained even after refreshing the page, offering a seamless experience across sessions.

- **Repositioning with Mouse Events**  
  Drag and drop sticky notes to organize them as you like. The app saves the latest position using native mouse events.

- **Smooth Animations**  
  Enjoy smooth and intuitive animations using native CSS for core interactions and movements.

- **Reusable Custom Hooks**  
  The app employs reusable hooks for creating, fetching, and updating notes, ensuring clean and maintainable code.

- **Fun Element**  
  This app consumes the **Official Joke API** to display random jokes, adding a fun twist to your experience.

## API Data Interface

The API data used to manage sticky notes follows this interface:

```typescript
interface StickyNote {
  $id: number;
  body: string;
  colors: {
    id: string;
    colorHeader: string;
    colorBody: string;
    colorText: string;
  };
  position: string;
}

const stickyNotes: StickyNote[] = [
  {
    $id: 1,
    body: "First sticky note",
    colors: {
      id: "color-purple",
      colorHeader: "#FED0FD",
      colorBody: "#FEE5FD",
      colorText: "#18181A",
    },
    position: "top-left",
  },
  // more sticky notes...
];
```

## Updating Current Position

To manage the dragging and positioning of sticky notes, the following logic is used:

```typescript
let mouseStartPos = { x: 0, y: 0 };

const updatePosition = (event: MouseEvent) => {
  const mouseDir = {
    x: mouseStartPos.x - event.clientX,
    y: mouseStartPos.y - event.clientY,
  };

  mouseStartPos.x = event.clientX;
  mouseStartPos.y = event.clientY;

  // Apply the new position to the sticky note
  stickyNote.style.left = `${stickyNote.offsetLeft - mouseDir.x}px`;
  stickyNote.style.top = `${stickyNote.offsetTop - mouseDir.y}px`;
};
```

This ensures that when a sticky note is dragged, its position is updated in real time based on the mouse movements.

## Technologies Used

- **Frontend:** React, TypeScript, ES6
- **Backend:** Appwrite
- **Styling:** Native CSS and Animations
- **Build Tool:** Vite
- **API Integration:** Official Joke API (`https://official-joke-api.appspot.com/random_joke`)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sticky-notes-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd sticky-notes
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. Set up Appwrite for backend services by following the official [Appwrite documentation](https://appwrite.io/docs).

5. Run the development server:
   ```bash
   yarn run dev
   ```

## Usage

- **Create Note:** Click on the "Add Note" button to create a new sticky note. You can choose from three different colors.
- **Drag and Drop:** Move notes around the screen. Their positions are automatically saved and retained.
- **Update/Delete Notes:** You can easily edit or remove notes as needed.
- **Have Fun:** A random joke from the Official Joke API will be fetched each time you create a new note!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README should now provide better insight into your app, with useful code snippets and clear instructions for usage.
