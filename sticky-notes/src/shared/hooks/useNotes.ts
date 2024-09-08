import { useEffect } from "react";
import { db } from "../appwrite/db";
import { fakeData } from "../fakeData";
import { localStorageKeys } from "../constants";

const fetchNotes = async (
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void
) => {
  try {
    const response = await db["notes"].list();
    if (response.total) {
      localStorage.removeItem(localStorageKeys.IS_NOTES_EMPTY)
      onSuccess?.(response?.documents);
    }
    else {
      onSuccess?.(fakeData)
      localStorage.setItem(localStorageKeys.IS_NOTES_EMPTY, "true")
    }
  } catch (error) {
    onError?.(error);
  }

};


function useNotes(
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void
) {

  useEffect(() => {
    if (onSuccess) {
      fetchNotes(onSuccess);
    }
  }, [onError, onSuccess]);
  

  return fetchNotes;
}

export default useNotes;
