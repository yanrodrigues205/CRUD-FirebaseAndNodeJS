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

    async deleteCollectPoint(req, res)
    {
        const id  = req.params.id;
        if(!id || id.length != 20)
        {
            return res.status(422).json({
                message: "This operation requires the id, it is worth mentioning that it had 20 characters!",
                status: 422
            });
        }


        try
        {
            const doc = this.#database.collection("collect_point").doc(id);

            const getDoc = await doc.get();

            if(getDoc.exists)
            {
                const deleteDoc = await doc.delete();

                if(!deleteDoc)
                {
                    return res.status(422).json({
                        message: "Unable to delete collection point!",
                        status: 422
                    });
                }

                return res.status(202).json({
                    message: "Collection point was successfully deleted!",
                    status: 202
                });

            }
            else
            {
                return res.status(422).json({
                    message: "This identification(id) does not exist within the database!",
                    status: 422
                });
            }


        }
        catch(err)
        {
            console.error(err);
        }


    }

    async updateCollectPoint(req, res)
    {
        const { id, name, description, work_hours, collect_user } = req.body;
        if(!id)
        {
            return res.status(422).json({
                "message": "Add the id you want to change and the respective fields to change. (id, name, description, work_hours, collect_user)!",
                "status": 422
            });
        }

        let data = {
            id,
            name,
            description,
            work_hours,
            collect_user,
            work_hours
        }


        const filterData = {};
        for(const [key, value] of Object.entries(data))
        {
            if(value !== null && value !== undefined)
            {
                filterData[key] = value;
            }
        }

        try
        {
            const doc = await this.#database.collection("collect_point").doc(id);

            const getDoc = await doc.get();

            if(!getDoc.exists)
            {
                return res.status(422).json({
                    message: "This identification(id) does not exist within the database!",
                    status: 422
                });
            }

            const update = await doc.update(filterData);

            if(!update)
            {
                return res.status(500).json({
                    message: "It was not possible to change the collection point!",
                    status: 500
                });
            }

            return res.status(202).json({
                message: "Collection point has been changed successfully!",
                status: 202
            })
        }
        catch(err)
        {
            console.error(err);
        }
    }
   
    async getAllCollectPoint(req, res)
    {
        try
        {
            const doc = await this.#database.collection("collect_point").get();

            const collect_points = [];

            doc.forEach(collect_point => {
                collect_points.push({ id: collect_point.id, ...collect_point.data()});
            });

            return res.status(202).json(collect_points);
        }
        catch(err)
        {
            console.error(err);
        }
    }

}

export default CollectPointController;