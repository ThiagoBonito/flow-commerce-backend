import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class ReportsService {
	constructor(private readonly prisma: PrismaService) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async generateDailyReport() {
		try {
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			const tomorrow = new Date(today);
			tomorrow.setDate(today.getDate() + 1);

			const orders = await this.prisma.order.findMany({
				where: {
					createdAt: {
						gte: today,
						lt: tomorrow,
					},
				},
				include: {
					orderItems: true,
					payment: true,
				},
			});

			console.log(
				`Relatório diário gerado: ${orders.length} pedidos encontrados.`,
			);
			console.log("Pedidos de hoje:", orders);
		} catch (error) {
			console.log("Erro ao gerar relatório diário", error);
		}
	}
}
