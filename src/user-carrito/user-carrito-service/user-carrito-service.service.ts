import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCarrito } from '../userCarrito.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserCarritoDto } from '../dto/create-userCarrito.dto';
import { UserService } from 'src/users/user-service/user-service.service';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';

@Injectable()
export class UserCarritoService {
    constructor(
        @InjectRepository(UserCarrito) private userCarritoService: Repository<UserCarrito>,
        private userService: UserService,
        private productService: ProductsService,
    ) {}

    async createUserCarrito(userCarritoDto: CreateUserCarritoDto) {
        const userId = userCarritoDto.userId || userCarritoDto.user.id;
        const userFound = await this.userService.getUser(userId);

        if (!(userFound instanceof User)) {
            throw new Error("Usuario no encontrado");
        }

        const productIds = Array.isArray(userCarritoDto.productId) ? userCarritoDto.productId : [userCarritoDto.productId];
        const productsFound = await Promise.all(productIds.map(async (productId) =>
            await this.productService.getOneProduct(productId)
        ));

        if (productsFound.some(product => !(product instanceof Product))) {
            throw new Error("Al menos uno de los productos no fue encontrado");
        }

        const userCarritoPartial: DeepPartial<UserCarrito> = {
            user: userFound,
            products: productsFound,
        };

        const createdUserCarrito = await this.userCarritoService.create(userCarritoPartial);
        await this.userCarritoService.save(createdUserCarrito);

        return createdUserCarrito;
    }

    async findByUserId(userId: number) {
        return await this.userCarritoService.find({ relations: ['user', 'products'], where: { user: { id: userId } } });
    }

    async findAll() {
        return await this.userCarritoService.find({ relations: ['user', 'products'] });
    }
}
