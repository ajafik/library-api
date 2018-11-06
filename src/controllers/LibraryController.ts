import { Request, Response } from "express";
import { responsesHelper } from "../libs/Responses";
import { Library } from "../models/schemas/Library";

export class LibraryController {
  public getAll(req: Request, res: Response) {
    Library.find()
      .then((data) => {
        res.status(200).send(responsesHelper.output(200, data));
      })
      .catch((error) => {
        res.status(500).send(responsesHelper.error(500, error));
      });
  }

  public getById(req: Request, res: Response) {
    Library.findById(req.params.id)
      .then((resp) => {
        res.status(200).send(responsesHelper.output(200, resp));
      })
      .catch((error) => {
        res.status(500).send(responsesHelper.error(500, error));
      });
  }

  public Add(req: Request, res: Response) {
    const lib = new Library(req.body);
    lib.save()
      .then((response) => {
        res.status(200).send(responsesHelper.success(200, response));
      })
      .catch((error) => {
        res.status(500).send(responsesHelper.error(500, error.errors));
      });
  }
  public deleteById(req: Request, res: Response) {
    Library.findByIdAndDelete(req.params.id)
      .then((response) => {
        res.status(200).send(responsesHelper.success(200, response));
      })
      .catch((error) => {
        res.status(500).send(responsesHelper.error(500, error));
      });
  }
  public updateById(req: Request, res: Response) {
    Library.findByIdAndUpdate(req.params.id, req.body)
      .then((response) => {
        res.status(200).send(responsesHelper.success(200, req.body));
      })
      .catch((error) => {
        res.status(500).send(responsesHelper.error(500, error));
      });
  }
}

export const libraryController = new LibraryController();
