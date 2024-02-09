import { Module } from '@nestjs/common';
import { UserCarritoControllerController } from './user-carrito-controller/user-carrito-controller.controller';
import { UserCarritoService} from './user-carrito-service/user-carrito-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCarrito } from './userCarrito.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserCarrito]),
  UsersModule,
  ProductsModule
],
  controllers: [UserCarritoControllerController],
  providers: [UserCarritoService],
  exports: [UserCarritoService]
})
export class UserCarritoModule {}
