import { Request, Response } from "express";

export class LibraryRoutes {
    public routes(app): void {

        app.route("/library")
            .get((req: Request, res: Response) => {
                res.status(200).send({ description: "This gets all the Libraries" });
            });

        app.route("/library/:id")
            .get((req: Request, res: Response) => {
                const id = req.params.id;
                res.status(200).send({ description: "This gets the Library with ID => " + id });
            });
    }
}
