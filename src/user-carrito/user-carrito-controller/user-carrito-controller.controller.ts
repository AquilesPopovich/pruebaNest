import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserCarritoService } from '../user-carrito-service/user-carrito-service.service';
import { CreateUserCarritoDto } from '../dto/create-userCarrito.dto';

@Controller('userCarrito')
export class UserCarritoControllerController {
    constructor(private userCarritoService: UserCarritoService){}

    @Post()
    create(@Body() userCarrito: CreateUserCarritoDto){
        return this.userCarritoService.createUserCarrito(userCarrito)
    }

    @Get(':userId')
    getUserCarrito(@Param('userId') userId: string){
        return this.userCarritoService.findByUserId(+userId)
    }

    @Get()
    getAllUserCarrito(){
        return this.userCarritoService.findAll()
    }
    
}
