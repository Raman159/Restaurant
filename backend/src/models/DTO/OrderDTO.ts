// backend/src/modules/order/dto/createOrder.dto.ts

import { OrderItemDto } from "./OrderItemDTO";

export class OrderDto {
  tableNumber: string;
  items: OrderItemDto[];
}
