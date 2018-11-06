import * as express from "express";
import { libraryController } from "../controllers/LibraryController";

class LibraryRoutes {
    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get("/library", (req: express.Request, res: express.Response) =>
            libraryController.getAll(req, res),
        );

        this.router.get(
            "/library/:id",
            (req: express.Request, res: express.Response) =>
                libraryController.getById(req, res),
        );

        this.router.post(
            "/library/",
            (req: express.Request, res: express.Response) =>
                libraryController.Add(req, res),
        );

        this.router.delete(
            "/library/:id",
            (req: express.Request, res: express.Response) =>
                libraryController.deleteById(req, res),
        );

        this.router.put(
            "/library/:id",
            (req: express.Request, res: express.Response) =>
                libraryController.updateById(req, res),
        );

    }
}

export const libraryRoutes = new LibraryRoutes().router;
