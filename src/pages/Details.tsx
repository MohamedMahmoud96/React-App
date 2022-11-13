import { useParams, useNavigate } from "react-router-dom";

import usePet from "../hooks/usePets";
import Loading from "../components/Loading";
import Carousel from "../components/Carousel";
import Slider from "../components/Slider";
import { useContext, useState } from "react";
import AdoptedPetContext from "../contexts/AdoptedPetContext";
import { Modal } from "../components/Modal";
import React from "react";
import { Pet } from "../types/common";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    throw new Error('no id provided to details');
  }
  const fetchQuery = usePet({ id: id });
 const [,setAdoptedPet] = useContext(AdoptedPetContext);

  const pet = fetchQuery?.data?.pets[0] as Pet;
  const [showImage, setShowIamge] = useState("carousel");
  const [showModal , setShowModal]  = useState(false);
  return (
    <div className="details ">
      <h2>Pet {id} Details Page!</h2>
      <div className="btn-group">
        <button onClick={() => setShowIamge("slider")}>Slider</button>
        <br />
        <button onClick={() => setShowIamge("carousel")}>Carousel</button>
        <br />
      </div>
      {console.log(fetchQuery.isLoading)}
      {fetchQuery.isLoading && (
        <div className="loader-container">
          <Loading />
        </div>
      )}

      {fetchQuery.isError && <span>{(fetchQuery.error as Error).message}</span>}

      {pet && (
        <div>
          {showImage == "slider" ? (
            <Slider images={pet.images} key="images"></Slider>
          ) : (
            <Carousel images={pet.images}></Carousel>
          )}

          <h2>{pet.name}</h2>
          <h2>{pet.animal}</h2>
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <h2>{pet.breed}</h2>
          <p>{pet.description}</p>
        
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </button>
          {showModal && (
            <Modal>
            <div>
              
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons" >
                  <button
                    onClick={() => {
                      setAdoptedPet( [pet, {activeImg:document.getElementById('activeImg').getAttribute('src') }]);
                      
                      navigate('/');
                    }}
                  >
                    Yes
                  </button>

                  <button onClick={() => setShowModal(false)} >No</button>
                </div>
              </div>
            </Modal>
            )}
        </div>
      )}
    </div>
  );
};

export default Details;
