import { Module } from '@nestjs/common';
import { ProfileControllerController } from './profile-controller/profile-controller.controller';
import { ProfileService } from './profile-service/profile-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]),
UsersModule],
  controllers: [ProfileControllerController],
  providers: [ProfileService]
})
export class ProfileModule {}
