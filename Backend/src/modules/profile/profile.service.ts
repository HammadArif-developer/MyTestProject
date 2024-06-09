import * as crypto from "crypto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  Injectable,
  NotAcceptableException,
} from "@nestjs/common";
import { IProfile } from "./profile.model";
import { RegisterPayload } from "modules/auth/payload/register.payload";

/**
 * Models a typical response for a crud operation
 */
export interface IGenericMessageBody {
  /**
   * Status message to return
   */
  message: string;
}

/**
 * Profile Service
 */
@Injectable()
export class ProfileService {
  /**
   * Constructor
   * @param {Model<IProfile>} profileModel
   */
  constructor(
    @InjectModel("Profile") private readonly profileModel: Model<IProfile>,
  ) {}

  /**
   * Fetches a profile from database by UUID
   * @param {string} id
   * @returns {Promise<IProfile>} queried profile data
   */
  get(id: string): Promise<IProfile> {
    return this.profileModel.findById(id).select('-password').exec();
  }

  /**
   * Fetches a profile from database by email
   * @param {string} email
   * @returns {Promise<IProfile>} queried profile data
   */
  getByEmail(email: string): Promise<IProfile> {
    return this.profileModel.findOne({ email }).select('-password').exec();
  }

  /**
   * Fetches a profile by their email and hashed password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<IProfile>} queried profile data
   */
  getByEmailAndPass(email: string, password: string): Promise<IProfile> {
    return this.profileModel
      .findOne({
        email,
        password: crypto.createHmac("sha256", password).digest("hex"),
      })
      .exec();
  }

  /**
   * Create a profile with RegisterPayload fields
   * @param {RegisterPayload} payload profile payload
   * @returns {Promise<IProfile>} created profile data
   */
  async create(payload: RegisterPayload): Promise<IProfile> {
    const user = await this.getByEmail(payload.email);
    if (user) {
      throw new NotAcceptableException(
        "The account with the provided email currently exists. Please choose another one.",
      );
    }
    // this will auto assign the admin role to each created user
    const createdProfile = new this.profileModel({
      ...payload,
      password: crypto.createHmac("sha256", payload.password).digest("hex")
    });

    return createdProfile.save();
  }
}
