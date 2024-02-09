import { Product } from "src/products/product.entity";
import { Profile } from "src/profile/profile.entity";
import { UserCarrito } from "src/user-carrito/userCarrito.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAd: Date;

    @OneToOne(()=>Profile)
    @JoinColumn()
    profile: Profile

    @ManyToOne(() => Product, product => product.vendedor)
    publicaciones: Product[];

    @OneToMany(() => UserCarrito, userCarrito => userCarrito.user)
    userCarrito: UserCarrito[];
}
