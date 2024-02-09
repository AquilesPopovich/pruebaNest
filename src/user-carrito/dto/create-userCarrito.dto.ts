import { Product } from "src/products/product.entity";
import { User } from "src/users/user.entity";

export class CreateUserCarritoDto{
    user: User
    product: Product[]
    userId: number
    productId: number[]
}