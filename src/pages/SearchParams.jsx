/* eslint-disable react/react-in-jsx-scope */
import { useState, useContext } from "react";

import Results from "../components/Results";
import AdoptedPetContext from "../contexts/AdoptedPetContext";
import useFetch from "../hooks/useFetch";
import usePet from "../hooks/usePets";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
 
  const [searchParams, setSearchParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const fetchPets = usePet({ searchParams });
  const pets = fetchPets?.data?.pets ?? [];

  // useEffect(() => {}, [SearchParams.animal]);

  const [adoptedPet, ] = useContext(AdoptedPetContext);
  const fetchBreeds = useFetch(
    "breed",
    `http://pets-v2.dev-apis.com/breeds?animal=${searchParams.animal}`
  );
  let breeds = fetchBreeds?.data?.breeds ?? [];

  // you can use  an ESLint plugin called eslint-plugin-react-hooks

  return (
    <div className="search-params">
      <h2>welco</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const animal = formData.get("animal");
          const location = formData.get("location");
          const breed = formData.get("breed");
          setSearchParams({ animal, location, breed });
        }}
      >
      
        {adoptedPet && (
         
          <div className="pet image-container">
            <img src={adoptedPet[1].activeImg} alt={adoptedPet[0].name} />
          </div>
        )}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setSearchParams({
                ...searchParams,
                animal: e.target.value,
                breed: "",
              });
            }}
          >
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed">
            {breeds &&
              breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      {fetchPets.data && <Results pets={pets} />}
    </div>
  );
};

export default SearchParams;
