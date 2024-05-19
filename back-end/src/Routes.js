import express from 'express';
import CollectPointController from './controllers/CollectPointController.js';
const collectPointController = new CollectPointController();
const router = express.Router();


router.post("/collect_point/create", (req,res) => {
    collectPointController.createCollectPoint(req, res);
});

router.delete("/collect_point/delete", (req, res) => {
    collectPointController.deleteCollectPoint(req, res);
});

router.put("/collect_point/update", (req, res) => {
    collectPointController.updateCollectPoint(req, res);
});

export default router;