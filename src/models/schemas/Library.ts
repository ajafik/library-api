import * as Joi from "joi";
import * as Joigoose from "joigoose";
import { Document, Model, model, Schema} from "mongoose";
import * as Mongoose from "mongoose";
import {ILibrary} from "../ILibrary";
const joigoose = Joigoose(Mongoose);

export interface ILibraryModel extends ILibrary, Document {}

const joiLibrarySchema = Joi.object({
    address: Joi.string().required(),
    email: Joi.string().email().min(3).max(100).lowercase().required(),
    library_name: Joi.string().min(3).max(100).required(),
    phoneNo: Joi.string().min(5).max(15).required(),
});

const LibrarySchema = new Mongoose.Schema(joigoose.convert(joiLibrarySchema));

LibrarySchema.pre("save", function(next) {
    const now = new Date();
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });

export const Library: Model<ILibraryModel> = model<ILibraryModel>("Library", LibrarySchema);
