import { IDB } from "../type";
import config from "./config";
import { ID } from "appwrite";
const { databases, collections } = config;
 
const db = {} as {[key: string]: IDB}
 
collections.forEach((collection) => {
    db[collection.name] = {
        create: async (payload, id = ID.unique()) => {
            return await databases.createDocument(
                collection.dbId,
                collection.id,
                id,
                payload
            );
        },
        update: async (id, payload) => {
            return await databases.updateDocument(
                collection.dbId,
                collection.id,
                id,
                payload
            );
        },
        delete: async (id) => {
            return await databases.deleteDocument(
                collection.dbId,
                collection.id,
                id
            );
        },
        get: async (id) => {
            return await databases.getDocument(
                collection.dbId,
                collection.id,
                id
            );
        },
        list: async (queries) => {
            return await databases.listDocuments(
                collection.dbId,
                collection.id,
                queries,
            );
        },
    };
});
 
export { db };