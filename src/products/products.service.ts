import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProducts } from './dto/create-products.dto';
import { UpdateProducts } from './dto/update-products.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productService: Repository<Product>
    ){}

    async createProduct(product: CreateProducts){
        const newProduct = this.productService.create(product)
        return this.productService.save(newProduct)
    }

    async getAllProduct(){
        return this.productService.find()
    }

    async getOneProduct(id: number){
        return this.productService.findOne({where: {id}})
    }

    async deletedProduct(id: number){
        return this.productService.delete({id})
    }

    async updateProduct(id: number, updateProduct: UpdateProducts){
        return this.productService.update({id}, updateProduct)
    }
}
