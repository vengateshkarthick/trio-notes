import { Client, Databases } from "appwrite";
import { ICollection } from "../type";


const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const databases = new Databases(client);

const collections:ICollection[] = [
    {
        name: "notes",
        id: import.meta.env.VITE_COLLECTION_NOTES_ID,
        dbId: import.meta.env.VITE_DATABASE_ID
    },
];
 

export default { databases, client, collections};
