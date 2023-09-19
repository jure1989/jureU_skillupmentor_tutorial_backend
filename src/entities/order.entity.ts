import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from './base.entity'
import { OrderItem } from './order-item.entity'

@Entity()
export class Order extends Base {
  @Column()
  @Exclude()
  first_name: string

  @Column()
  @Exclude()
  last_name: string

  @IsNotEmpty()
  @Column()
  email: string

  @OneToMany(() => OrderItem, (orederItem) => orederItem.order)
  order_items: OrderItem[]

  @Expose()
  get name(): string {
    return `${this.first_name} ${this.last_name}`
  }

  @Expose() // total number of items inside order entity:
  get total(): number {
    return this.order_items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  }
}
