import { useState, useEffect } from "react";
import { BreedListAPIResponse, Animal } from "./APIResponsesTypes";

const localCache: {
  [index: string]: string[];
} = {};

type Status = "loaded" | "loading" | "unloaded";

function useBreedList(animal: Animal) {
  const [breedList, setBreedList] = useState([] as string[]);
  const [status, setStatus] = useState("unloaded" as Status);

  useEffect(() => {
    if (!animal) setBreedList([]);
    else if (localCache[animal]) setBreedList(localCache[animal]);
    else void requestBreedList();

    async function requestBreedList() {
      setBreedList([]); //nechcem byt v medzistave. nechcem aby po starom requeste mi tam ostali vysiet stare zvery
      setStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = (await res.json()) as BreedListAPIResponse;
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status] as [string[], Status];
}
export default useBreedList;
