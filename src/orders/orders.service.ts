import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateOrderDTO } from "./dto/create-order";
import { checkStock } from "./domain/validators/check-stock";
import { OrderStatusEnum } from "./domain/enums/order-status.enum";
import { PaymentStatusEnum } from "./domain/enums/payment-status.enum";
import { PaymentMethodEnum } from "./domain/enums/payment-method.enum";

@Injectable()
export class OrdersService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateOrderDTO) {
		try {
			const products = await this.getAllProducts();
			checkStock(data.orderItems, products);

			const orderItemsWithPrice = data.orderItems.map((item) => ({
				productId: item.productId,
				quantity: item.quantity,
				price: products.find((p) => p.id === item.productId)?.price || 0,
			}));

			const totalPriceOrder = orderItemsWithPrice.reduce(
				(acc, item) => acc + item.quantity * item.price,
				0,
			);

			const order = await this.prisma.order.create({
				data: {
					userId: data.userId,
					total: totalPriceOrder,
					statusId: OrderStatusEnum.PENDING,
					orderItems: {
						create: orderItemsWithPrice,
					},
				},
				include: { orderItems: true },
			});

			await this.prisma.payment.create({
				data: {
					orderId: order.id,
					amount: totalPriceOrder,
					methodId: data.payment as PaymentMethodEnum,
					statusId: PaymentStatusEnum.PENDING,
				},
			});
			//TODO: Stock update with RabbitMQ
		} catch (error) {
			throw new Error(error);
		}
	}

	async getAllProducts() {
		try {
			return await this.prisma.product.findMany();
		} catch (error) {
			throw new Error(error);
		}
	}
}
