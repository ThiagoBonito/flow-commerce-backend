import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { ItemDTO } from "src/orders/dto/create-order";

@Injectable()
export class StockService {
	constructor(private readonly prisma: PrismaService) {}

	async update(item: ItemDTO) {
		try {
			await this.prisma.product.update({
				where: {
					id: item.productId,
				},
				data: {
					stock: {
						decrement: item.quantity,
					},
				},
			});
		} catch (error) {
			throw new Error(error);
		}
	}
}
