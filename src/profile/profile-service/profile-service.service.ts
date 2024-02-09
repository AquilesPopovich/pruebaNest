import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UserService } from 'src/users/user-service/user-service.service';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        private userService: UserService,
    ){}

    async createProfile(userId: number, profileDto: CreateProfileDto): Promise<Profile> {
        let userFound;
        try {
            userFound = await this.userService.getUser(userId);
            if (!userFound) {
                throw new HttpException('Usuario no existente', HttpStatus.CONFLICT);
            }

            const newProfile = this.profileRepository.create(profileDto);
            const savedProfile = await this.profileRepository.save(newProfile);
            console.log(userFound);
            userFound.profile = savedProfile;
            await this.userService.saveUser(userFound);

            return savedProfile;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    
}
