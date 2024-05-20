import express from 'express';
import CollectPointController from './controllers/CollectPointController.js';
const collectPointController = new CollectPointController();
const router = express.Router();


router.post("/collect_point/create", (req,res) => {
    collectPointController.createCollectPoint(req, res);
});

router.delete("/collect_point/delete/:id", (req, res) => {
    collectPointController.deleteCollectPoint(req, res);
});

router.put("/collect_point/update", (req, res) => {
    collectPointController.updateCollectPoint(req, res);
});

router.get("/collect_point/getall", (req, res) => {
    collectPointController.getAllCollectPoint(req, res);
});

router.post("/collect_point/getbyid", (req, res) => {
    collectPointController.getCollectPointByID(req, res);
});

export default router;