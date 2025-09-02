import { Body, Controller, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDTO } from "./dto/create-order";

@Controller("orders")
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	async createOrder(@Body() data: CreateOrderDTO) {
		return this.ordersService.create(data);
	}
}
