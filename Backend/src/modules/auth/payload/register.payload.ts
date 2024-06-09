import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
} from "class-validator";

/**
 * Register Payload Class
 */
export class RegisterPayload {
  /**
   * Email field
   */
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Name field
   */
  @ApiProperty({
    required: true,
  })
  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  name: string;

  /**
   * Password field
   */
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
           { message: 'Password must contain at least 1 letter, 1 number, and 1 special character' })
  password: string;
}
