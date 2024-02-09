import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { CreateProducts } from '../dto/create-products.dto';
import { UpdateProducts } from '../dto/update-products.dto';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService){}

    @Post()
    createdProduct(@Body() newProduct: CreateProducts){
        return this.productService.createProduct(newProduct)
    }

    @Get()
    getProducts(){
        return this.productService.getAllProduct()
    }

    @Get(':id')
    getProduct(@Param('id') id: string){
        return this.productService.getOneProduct(+id)
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string){
        return this.productService.deletedProduct(+id)
    }

    @Patch(':id')
    updateProduct(@Param('id') id:string, updateProduct: UpdateProducts){
        return this.productService.updateProduct(+id, updateProduct)
    }
}
