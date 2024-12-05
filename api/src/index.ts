import express from "express";
import cors from "cors";

const travelList = [
  {
    id: 1,
    name: "Paris",
    city: "Paris",
    country: "France",
    image:
      "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
    description:
      "Paris is known for its iconic landmarks like the Eiffel Tower, art museums like the Louvre, and its romantic atmosphere.",
  },
  {
    id: 2,
    name: "New York City",
    city: "New York",
    country: "USA",
    image:
      "https://www.planetware.com/photos-large/USNY/new-york-city-empire-state-building.jpg",
    description:
      "New York City is famous for its skyline, Central Park, Times Square, and vibrant cultural life.",
  },
  {
    id: 3,
    name: "Tokyo",
    city: "Tokyo",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9reW98ZW58MHx8MHx8fDA%3D",
    description:
      "Tokyo is a bustling metropolis with cutting-edge technology, traditional temples, and an exciting nightlife.",
  },
];

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.get("/", (req, res) => {
  res.send("Health check");
});


app.get("/travels", (req, res) => {
  res.status(200).send(travelList);
});


app.post("/travels", (req, res) => {
  const newTravel = { ...req.body, id: travelList.length + 1 };
  travelList.push(newTravel);
  res.status(201).send(newTravel);
});


app.delete("/travels/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = travelList.findIndex((travel) => travel.id === id);
  if (index !== -1) {
    const deletedTravel = travelList.splice(index, 1);
    res.status(200).send({ message: "Travel deleted", travel: deletedTravel });
  } else {
    res.status(404).send({ message: "Travel not found" });
  }
});


app.get("/travels/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const travel = travelList.find((travel) => travel.id === id);
  if (travel) {
    res.status(200).send(travel);
  } else {
    res.status(404).send({ message: "Travel not found" });
  }
});


app.put("/travels/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = travelList.findIndex((travel) => travel.id === id);
  if (index !== -1) {
    travelList[index] = { ...travelList[index], ...req.body };
    res.status(200).send(travelList[index]);
  } else {
    res.status(404).send({ message: "Travel not found" });
  }
});

// Démarrer le serveur
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
