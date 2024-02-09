import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from '../user-service/user-service.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserName } from '../dto/update-user.dto';


@Controller('users')
export class UserController {
    constructor(private userService: UserService, private readonly logger: Logger){}
    @Post()
    Create(@Body() newUser: CreateUserDto){
        return this.userService.createUser(newUser)
    }

    @Get()
    findAll(){
        return this.userService.getAllUsers()
    }

    @Get(':id')
    findUser(@Param('id') id: string){
        return this.userService.getUser(+id)
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.userService.deleteUser(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, update:UpdateUserName){
        return this.userService.updateUser(+id, update)
    }

    @Get('search')
    async getByUsername(@Query('username') username: string) {
        try {
      this.logger.log(`Incoming username: ${username}`);
    
      // Asegúrate de que username no sea undefined o null
      if (!username || typeof username !== 'string') {
        this.logger.error('Invalid username provided');
        throw new BadRequestException('Invalid username provided');
      }
    
      
        // Log antes de la consulta
        this.logger.log('Before querying database');
    
        const user = await this.userService.getUserByUsername(username);
    
        // Log después de la consulta
        this.logger.log('After querying database');
    
        return user;
      } catch (error) {
        // Log de errores
        this.logger.error(`Error: ${error.message}`, error.stack);
        throw error;
      }
    }
    
    
}
