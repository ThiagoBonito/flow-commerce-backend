import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { PaymentStatusEnum } from "src/orders/domain/enums/payment-status.enum";

@Injectable()
export class PaymentService {
	constructor(private readonly prisma: PrismaService) {}

	async update(orderId: number, status: PaymentStatusEnum) {
		try {
			await this.prisma.payment.update({
				where: {
					orderId,
				},
				data: {
					statusId: status,
				},
			});
		} catch (error) {
			throw new Error(error);
		}
	}
}
