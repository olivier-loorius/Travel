import { useState } from "react";
import { TravelType } from "../types/travel.type";
import Button from "./ui/Button";
import Input from "./ui/Input";

type TravelFormAddProps = {
  travelList: TravelType[];
  setTravelList: (travelList: TravelType[]) => void;
};

const TravelFormAdd = ({ travelList, setTravelList }: TravelFormAddProps) => {
  const [travelAddData, setTravelAddData] = useState<TravelType>({});
  const [showForm, setShowForm] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Ajouter une destination");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    travelAddData.id = travelList.length + 1;
    setTravelList([...travelList, travelAddData]);
    setShowForm(false); // Ferme le formulaire après soumission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const newTravel = { ...travelAddData, [name]: value };
    setTravelAddData(newTravel);
  };

  const handleAddClick = () => {
    setShowForm(true); // Affiche le formulaire
    setButtonText("Ajouter une NOUVELLE destination"); // Change le texte du bouton
  };

  return (
    <div className="travel-form-add flex justify-center items-center w-full">
      {/* Affichage du bouton si le formulaire n'est pas encore visible */}
      {!showForm && (
        <Button
          text={buttonText}
          onClick={handleAddClick}
          className="mb-6"
        />
      )}

      {/* Affichage du formulaire si showForm est true */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 shadow-md p-8 bg-white rounded-md w-full max-w-2xl"
        >
          <Input type="text" placeholder="Nom" onChange={handleChange} name="name" />
          <Input type="text" placeholder="Ville" onChange={handleChange} name="city" />
          <Input type="text" placeholder="Pays" onChange={handleChange} name="country" />
          <Input type="text" placeholder="Image" onChange={handleChange} name="image" />
          <Input type="text" placeholder="Description" onChange={handleChange} name="description" />
          <Button text="Ajouter la destination" type="submit" />
        </form>
      )}
    </div>
  );
};

export default TravelFormAdd;
