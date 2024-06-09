import { Schema, Document } from "mongoose";

/**
 * Mongoose Profile Schema
 */
export const Profile = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Mongoose Profile Document
 */
export interface IProfile extends Document {
  /**
   * UUID
   */
  readonly _id: Schema.Types.ObjectId;
  /**
   * Email
   */
  readonly email: string;
  /**
   * Name
   */
  readonly name: string;
  /**
   * Password
   */
  password: string;
  /**
   * Date
   */
  readonly createdAt: Date;
    /**
   * Date
   */
  readonly updatedAt: Date;
}
