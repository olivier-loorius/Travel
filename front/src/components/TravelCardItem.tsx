import { useState } from "react";
import { Link } from "react-router-dom";
import { TravelType } from "../types/travel.type";
import Button from "./ui/Button";
import Typography from "./ui/Typography";
import Modal from "./ui/Modal";
import TravelFormAdd from "./TravelFormAdd"; // Assure-toi d'importer le formulaire d'ajout

type TravelCardItemProps = {
  travel: TravelType;
  travelList: TravelType[];
  setTravelList: (travelList: TravelType[]) => void;
};

const TravelCardItem = ({ travel, travelList, setTravelList }: TravelCardItemProps) => {
  const [showForm, setShowForm] = useState<boolean>(false); // Gère l'affichage du formulaire
  const [buttonText, setButtonText] = useState<string>("Ajouter une destination"); // Gère le texte du bouton

  const handleDelete = () => {
    const index = travelList.indexOf(travel);
    travelList.splice(index, 1);
    setTravelList([...travelList]);
  };

  const handleAddClick = () => {
    setShowForm(true); // Affiche le formulaire
    setButtonText("Ajouter une NOUVELLE destination"); // Change le texte du bouton
  };

  return (
    <div className="travel-card shadow-md rounded-md">
      {/* Lien vers la page du voyage */}
      <Link to={`/travels/${travel.id}`}>
        <img src={travel.image} alt={travel.name} className="w-full h-48 object-cover" />
      </Link>

      {/* Contenu de la carte */}
      <div className="content p-4 text-center">
        <Link to={`/travels/${travel.id}`}>
          <Typography level={3} className="text-lg font-bold text-gray-800 mb-2">
            {travel.name}
          </Typography>
        </Link>
        <p>{travel?.description?.substring(0, 100)}...</p> {/* Description coupée */}
      </div>

      {/* Affichage du bouton "Ajouter une destination" ou "Ajouter une NOUVELLE destination" */}
      {!showForm ? (
        <Button onClick={handleAddClick} text={buttonText} />
      ) : null}

      {/* Affichage du formulaire d'ajout de destination seulement si showForm est true */}
      {showForm && (
        <TravelFormAdd
          travelList={travelList} // Passe la liste des voyages
          setTravelList={setTravelList} // Passe la fonction pour mettre à jour la liste des voyages
        />
      )}

      {/* Modal de confirmation pour supprimer le voyage */}
      <Modal>
        <div className="flex flex-col gap-4">
          <p className="text-slate-500">Êtes-vous sûr de vouloir supprimer ce voyage ?</p>
          <Button text="Confirm to delete" variant="danger" onClick={handleDelete} />
        </div>
      </Modal>
    </div>
  );
};

export default TravelCardItem;
