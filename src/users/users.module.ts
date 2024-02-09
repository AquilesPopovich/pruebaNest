import { Logger, Module } from '@nestjs/common';
import { UserService } from './user-service/user-service.service';
import { UserController } from './user-controller/user-controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserCarritoService } from 'src/user-carrito/user-carrito-service/user-carrito-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ UserService, Logger],
  controllers: [UserController],
  exports: [UserService]
})
export class UsersModule {}
