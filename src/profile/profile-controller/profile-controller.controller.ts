import { Body, Controller, Param, Post } from '@nestjs/common';
import { ProfileService } from '../profile-service/profile-service.service';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Controller('profile')
export class ProfileControllerController {
    constructor(private profileServices: ProfileService){}

    @Post(':userId')
    createProfile(@Param('userId') userId: string, @Body() profileDto: CreateProfileDto){
        return this.profileServices.createProfile(+userId, profileDto)
    }

}
