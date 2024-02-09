import { Product } from "src/products/product.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserCarrito {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAd: Date;

    @ManyToOne(type => User, user => user.userCarrito)
    user: User;

    @ManyToMany(type => Product)
    @JoinTable()
    products: Product[];
}
