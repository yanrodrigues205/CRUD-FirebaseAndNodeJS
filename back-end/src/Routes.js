import express from 'express';
import CollectPointController from './controllers/CollectPointController.js';
const router = express.Router();


router.post("/collect_point/create", (req,res) => {
    collectPointController.createCollectPoint(req, res);
});

export default router;