import { Router } from "express";
import chirpStore from "../chirpstore";

let router = Router();

router.get("/:id?", (req, res) => {
  let id = req.params.id;

  if (id) {
    res.json(chirpStore.GetChirp(id));
  } else {
    res.json(chirpStore.GetChirps());
  }
});

router.post("/", (req, res) => {
  let current = chirpStore.CreateChirp(req.body);
  res.status(200).json({ id: current });
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  let chirpText = req.body;

  chirpStore.UpdateChirp(id, chirpText);
  res.sendStatus(200);
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;

  if (id == "undefined") {
    res.sendStatus(400).json({ Error: `Cannot delete id ${id}` });
  } else {
    chirpStore.DeleteChirp(id);
    res.sendStatus(200);
  }
});

export default router;
