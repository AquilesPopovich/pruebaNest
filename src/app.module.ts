import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { UserCarritoModule } from './user-carrito/user-carrito.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      password: 'mailo1',
      port: 3306,
      username: 'root',
      database: 'crudnestnext',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      connectTimeout: 30000,
      logging: true
    }),
    UsersModule,
    ProductsModule,
    UserCarritoModule,
    ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
