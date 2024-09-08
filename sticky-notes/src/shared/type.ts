import { Models } from "appwrite";

export interface INotes {
    $id: number;
    body: string;
    colors: string;
    position: string;
}

export interface ICollection {
    name: string;
    id: any;
    dbId: any;
}

export interface IDB  {
    create: (payload: any, id?: string) => Promise<any>;
    update: (id: string, payload: any) => Promise<any>;
    delete: (id: string) => Promise<any>;
    get: (id: string) => Promise<Models.Document>;
    list: (queries?: string[]) => Promise<Models.DocumentList<Models.Document>>
}