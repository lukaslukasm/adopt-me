import { useState, useEffect, useContext } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";
import ThemeContext from "./ThemeContext";
import { Animal, PetType, PetAPIResponse } from "./APIResponsesTypes";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

function SearchParams() {
  const [location] = useState("");
  const [animal, setAnimal] = useState("" as Animal);
  const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
  const [pets, setPets] = useState([] as PetType[]);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    void requestPets();
  }, []); // eslint-disable-line

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = (await res.json()) as PetAPIResponse;
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void requestPets(); //toto pracuje bez params, preto ze je vytvorena v scope vsetkych params, ktore potrebuje
        }}
      >
        <h2 className="search-form-header">SEARCH FORM</h2>
        <label htmlFor="location">
          Location:
          <div className="">
            <input type="text" id="location" placeholder="Location" />
          </div>
        </label>
        <label htmlFor="breed">
          Breed:
          <div className="">
            <select
              name="breed"
              id="breed"
              value={breed}
              onChange={(e) => {
                setBreed(e.target.value);
              }}
              onBlur={(e) => {
                setBreed(e.target.value);
              }}
            >
              <option />
              {breeds.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
        <label htmlFor="animal">
          Animal:
          <div className="">
            <select
              name="animal"
              id="animal"
              value={animal}
              onChange={(e) => {
                setAnimal(e.target.value as Animal);
                setBreed("");
              }}
              onBlur={(e) => {
                setAnimal(e.target.value as Animal);
                setBreed("");
              }}
            >
              <option />
              {ANIMALS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label htmlFor="Theme">
          Theme:
          <div className="">
            <select
              name="theme"
              id="theme"
              onChange={(e) => setTheme(e.target.value)}
              onBlur={(e) => setTheme(e.target.value)}
            >
              <option value="black">Black</option>
              <option value="red">Red</option>
              <option value="green">green</option>
              <option value="blue">blue</option>
            </select>
          </div>
        </label>
      </form>
      <div className="results">
        <Results pets={pets} />
      </div>
    </div>
  );
}
export default SearchParams;
