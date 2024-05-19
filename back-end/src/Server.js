import express from "express";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import router from "./Routes.js";
import cors from "cors";
import serviceAccount from "./serviceAccount.json" assert { type: "json" };

class Server
{
    #router;
    #bodyParser;
    #app;
    #admin;
    #database;

    constructor()
    {
        this.#router = router;
        this.#bodyParser = bodyParser;
        this.#app = express();
        this.#admin = admin;
        this.#database = false;
    }

    async __init__()
    {
        this.#app.use(cors());
        this.#app.use(this.#bodyParser.json());
        this.#app.use(this.#router);
        this.#app.listen(3030, () => {
            console.log("Server started successfully! 🚀");
        })
    }
}
export default Server;
