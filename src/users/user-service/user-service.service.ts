import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserName } from '../dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userService: Repository<User>
    ){}

    async createUser(user: CreateUserDto){
        const userFound = await this.userService.findOne({where: {username: user.username}})
        if(userFound) return new HttpException('user ya existente', HttpStatus.CONFLICT)

        const newUser = await this.userService.create(user)
        return this.userService.save(newUser)
    }

    async getAllUsers(){
        const allUsers = await this.userService.find()
        console.log(allUsers)
        return allUsers
    }

    async getUser(id: number){
        const userFound = await this.userService.findOne({where: {id} , relations: ['profile'] })
        if(!userFound) return new HttpException('user no encontrado', HttpStatus.CONFLICT)
        return userFound
    }

    async deleteUser(id: number){
        const userDeleted = await this.userService.delete({id})
        if(userDeleted.affected === 0) return new HttpException('producto no encontrado', HttpStatus.CONFLICT)
        return userDeleted
    }

    async updateUser(id: number, update: UpdateUserName){
        return await this.userService.update({id}, update)
    }

    async saveUser(user: User): Promise<User> {
        return await this.userService.save(user);
    }

    async getUserByUsername(username: string) {
        try {
          console.log('Username:', username);
      
          // Asegúrate de que username no sea undefined o null
          if (!username || typeof username !== 'string') {
            throw new BadRequestException('Nombre de usuario no válido');
          }
      
          // Realiza la consulta al repositorio utilizando el método find con condiciones
          const users = await this.userService.find({ where: { username }, take: 1 });
      
          if (users.length === 0) {
            throw new NotFoundException('Usuario no encontrado');
          }
      
          // Devuelve el primer usuario encontrado (ya que se limita a 1)
          return users[0];
        } catch (error) {
          console.error('Error en getUserByUsername:', error);
          throw new InternalServerErrorException('Error interno del servidor');
        }
      }
      
      
      
      
      

}
