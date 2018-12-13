import { Router } from "express";
import passport from "passport";
import { generateHash } from "../utils/hashing";

let router = Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, tok, info) => {
    if (err) {
      return res.sendStatus(500);
    } else if (!tok) {
      return res.status(401).json(info);
    } else {
      return res.status(201).json(tok);
    }
  })(req, res, next);
});

router.get("/generate/:pw", (req, res, next) => {
  generateHash(req.params.pw).then(hash => {
    res.send(hash);
  });
});

export default router;