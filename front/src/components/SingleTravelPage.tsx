import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TravelType } from "../types/travel.type";
import Typography from "./ui/Typography";
import TravelList from "./TravelList";
import Button from "./ui/Button";

const SingleTravelPage = () => {
    const { id } = useParams(); // On récupère l'id du voyage depuis l'URL
    const [travel, setTravel] = useState<TravelType | null>(null); // On initialise 'travel' à null au départ
    const [travelList, setTravelList] = useState<TravelType[]>([]); // Liste des voyages à afficher en dessous
    const [limit, setLimit] = useState<number>(3); // Limite de voyages qu'on va afficher au début
    const [isLoading, setIsLoading] = useState<boolean>(true); // On garde l'état de chargement pour savoir si on a bien chargé les données

    // Ce useEffect est là pour récupérer les données du voyage quand l'id change
    useEffect(() => {
        fetchTravel(); // On appelle la fonction pour récupérer les infos du voyage
    }, [id]);

    // Ce useEffect est pour charger la liste des voyages (en excluant celui qu'on regarde) et mettre à jour la liste quand on change de limite ou d'id
    useEffect(() => {
        fetchTravelList(); // On appelle la fonction pour récupérer la liste des voyages
    }, [id, limit]);

    // Fonction pour récupérer la liste des voyages
    const fetchTravelList = async () => {
        const response = await fetch("/travels.json"); // On récupère les données du fichier JSON
        const data = await response.json(); // On transforme la réponse en JSON

        const filterTravelList = data.filter((travel: TravelType) => travel.id !== Number(id)); // On enlève le voyage actuel de la liste
        const limitTravelList = filterTravelList.slice(0, limit); // On limite le nombre de voyages affichés (selon la variable 'limit')

        setTravelList(limitTravelList); // On met à jour la liste avec les voyages filtrés et limités
    };

    // Fonction pour récupérer un seul voyage (le voyage de l'ID qu'on a dans l'URL)
    const fetchTravel = async () => {
        setIsLoading(true); // On indique qu'on est en train de charger les données
        const response = await fetch("/travels.json"); // Récupération des données
        const data = await response.json(); // Conversion des données en JSON
        const findTravel = data.find((travel: TravelType) => travel.id === Number(id)); // On cherche le voyage qui correspond à l'id

        setTravel(findTravel || null); // Si on trouve le voyage, on le met dans l'état, sinon on met null
        setIsLoading(false); // On indique que le chargement est terminé
    };

    // Si on est en train de charger, on affiche "Loading..."
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Si on n'a pas trouvé le voyage, on affiche un message d'erreur
    if (!travel) {
        return <div>Travel not found</div>;
    }

    return (
        <div className="container mx-auto">
            <Typography level={1}>
                {travel.name} {/* Affichage du nom du voyage */}
            </Typography>

            {travel.image && <img src={travel.image} alt={travel.name} />} {/* Si l'image existe, on l'affiche */}

            <p>{travel.description}</p> {/* Description du voyage */}

            <div className="mt-20 flex items-center flex-col gap-10">
                {/* On affiche la liste des voyages sous forme de cartes */}
                <TravelList 
                    travelList={travelList} 
                    setTravelList={setTravelList}
                />
                {/* Le bouton "Load more" pour charger plus de voyages */}
                <Button 
                    text="Load more" 
                    onClick={() => setLimit(limit + 3)} // Quand on clique, on augmente la limite pour charger plus de voyages
                />
            </div>
        </div>
    );
};

export default SingleTravelPage;
