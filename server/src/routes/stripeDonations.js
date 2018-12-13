import { Router } from 'express';
import { charge } from '../utils/stripeCharge';

let router = Router();

router.post('/', (req, res) => {
  let tokenId = req.body.token.id;
  let amount = req.body.token.amount;

  charge(tokenId, amount)
    .then(success => {
      res.status(200).json({ message: 'Sucessful Transaction' });
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

export default router;