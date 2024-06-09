import {
  BadRequestException,
  Controller,
  Get,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProfileService } from "./profile.service";
import { IProfile } from "./profile.model";

/**
 * Profile Controller
 */
@ApiBearerAuth()
@ApiTags("profile")
@Controller("api/profile")
export class ProfileController {
  /**
   * Constructor
   * @param profileService
   */
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Retrieves a particular profile
   * @param email the profile given email to fetch
   * @returns {Promise<IProfile>} queried profile data
   */
  @Get("")
  @UseGuards(AuthGuard("jwt"))
  @ApiResponse({ status: 200, description: "Fetch Profile Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Profile Request Failed" })
  async getProfile(@Req() req): Promise<IProfile> {
    const profile = await this.profileService.getByEmail(req?.user?.email);
    if (!profile) {
      throw new BadRequestException(
        "The profile with that email could not be found.",
      );
    }
    return profile;
  }
}
