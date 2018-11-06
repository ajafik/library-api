import { Document, Model, model, Schema} from "mongoose";
import {ILibrary} from "../ILibrary";

export interface ILibraryModel extends ILibrary, Document {}

export let LibrarySchema: Schema = new Schema({
    address: String,
    createdAt: Date,
    email: String,
    library_name: String,
    phoneNo: String,
  });

LibrarySchema.pre("save", function(next) {
    const now = new Date();
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });

export const Library: Model<ILibraryModel> = model<ILibraryModel>("Library", LibrarySchema);
