import { UserCarrito } from "src/user-carrito/userCarrito.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAd: Date;

    @Column()
    vendedorId: number;

    @OneToMany(() => User, user => user.publicaciones)
    vendedor: User;

    @ManyToMany(type => UserCarrito, userCarrito => userCarrito.products)
    userCarrito: UserCarrito[];
}
