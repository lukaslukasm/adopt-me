import Pet from "./Pet";
import { PetType } from "./APIResponsesTypes";
import { FunctionComponent } from "react";

const Results: FunctionComponent<{ pets: PetType[] }> = ({ pets }) => {
  return (
    <div>
      <h2 style={{ marginLeft: "8px" }}>RESULTS:</h2>
      {!pets.length ? (
        <h1>No pets found.</h1>
      ) : (
        pets.map((p) => (
          <Pet
            key={p.id}
            name={p.name}
            animal={p.animal}
            breed={p.breed}
            images={p.images}
            location={`${p.city}, ${p.state}`}
            id={p.id}
          />
        ))
      )}
    </div>
  );
};
export default Results;
