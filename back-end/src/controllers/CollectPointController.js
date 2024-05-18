import admin from "firebase-admin";
import serviceAccount from "../serviceAccount.json" assert { type: "json" };

class CollectPointController
{
    #admin
    #database
    constructor()
    {
        this.#admin = admin;
        const start = this.#admin.initializeApp({
            credential: this.#admin.credential.cert(serviceAccount),
        });
        this.#database = start.firestore();
    }

    async createCollectPoint(req, res)
    {
        const {name, description, collect_user, work_hours} = req.body;

        if(!name || !description || !work_hours || !collect_user)
        {
            return res.status(422).json({
                "message": "To complete the registration, fill in the fields (name, description, work_hours, collect_user)!",
                "status": 422
            });
        }

        if(name.lenght < 10 || description.lenght < 10 || work_hours.lenght < 10 || collect_user.lenght < 10)
        {
            return res.status(422).json({
                "message": "The minimum length of all fields is 10 characters!",
                "status": 422
            });
        }

        let data = {
            name,
            description,
            work_hours,
            collect_user
        };

        try
        {
            let id_collect_point = 0;
            const response = await this.#database.collection("collect_point").add(data).then((resp) => {
                id_collect_point = resp.id
            });

            return res.status(202).json({
                "message": "Collection point successfully added!",
                "id": id_collect_point,
                "status": 202
            });

        }
        catch(err)
        {
            return res.status(500).json({
                "message": "Unable to enter collection point!",
                "error": err,
                "status": 500
            });
        }
    }

   

}

export default CollectPointController;