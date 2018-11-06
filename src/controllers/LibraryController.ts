import { Request, Response } from "express";
import { rabbitMQ } from "../libs/RabbitMQ";
import { responsesHelper } from "../libs/Responses";
import { Library } from "../models/schemas/Library";
const QUEUE_NAME = "library_data_operations";

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
    lib
      .save()
      .then((response) => {

        const queueData = {
          data: response,
          meta: {
            key: response._id,
            module: "library",
            operation: "add",
          },
        };

        rabbitMQ
          .rabbit_send(QUEUE_NAME, JSON.stringify(queueData))
          .then((rabbitStatus) => {
            res.status(201).send(responsesHelper.success(201, response));
          })
          .catch((rabbitError) => {
            res
              .status(200)
              .send(
                responsesHelper.error(
                  200,
                  `Success Saving to Source of TRUTH. RabbitMQ Error => ${rabbitError}`,
                ),
              );
          });
      })
      .catch((error) => {
        res.status(500).send(responsesHelper.error(500, error.errors));
      });
  }
  public deleteById(req: Request, res: Response) {
    Library.findByIdAndDelete(req.params.id)
      .then((response) => {

        const id = req.params.id;
        const queueData = {
          data: response,
          meta: {
            key: id,
            module: "library",
            operation: "delete",
          },
        };

        rabbitMQ
          .rabbit_send(QUEUE_NAME, JSON.stringify(queueData))
          .then((rabbitStatus) => {
            res.status(200).send(responsesHelper.success(200, response));
          })
          .catch((rabbitError) => {
            res
              .status(200)
              .send(
                responsesHelper.error(
                  200,
                  `Success Deleting from Source of TRUTH. RabbitMQ Error => ${rabbitError}`,
                ),
              );
          });

      })
      .catch((error) => {
        res.status(500).send(responsesHelper.error(500, error));
      });
  }
  public updateById(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;

    const queueData = {
      data,
      meta: {
        key: id,
        module: "library",
        operation: "update",
      },
    };

    Library.findByIdAndUpdate(id, data)
      .then((response) => {
        rabbitMQ
          .rabbit_send(QUEUE_NAME, JSON.stringify(queueData))
          .then((rabbitStatus) => {
            res.status(200).send(responsesHelper.success(200, req.body));
          })
          .catch((rabbitError) => {
            res
              .status(200)
              .send(
                responsesHelper.error(
                  200,
                  `Success Updating Source of TRUTH. RabbitMQ Error => ${rabbitError}`,
                ),
              );
          });
      })
      .catch((error) => {
        res.status(500).send(responsesHelper.error(500, error));
      });
  }
}

export const libraryController = new LibraryController();
