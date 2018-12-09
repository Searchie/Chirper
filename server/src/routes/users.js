import { Router } from 'express';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';

let router = Router();

router.get('/me', tokenMiddleware, isLoggedIn, (req, res) => {
    console.log(req.user);
    res.json(req.user);
});

export default router;