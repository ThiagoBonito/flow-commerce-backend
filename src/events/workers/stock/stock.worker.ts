import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { ItemDTO } from "src/orders/dto/create-order";
import { StockService } from "src/stock/stock.service";

@Controller()
export class StockWorker {
	constructor(private readonly stockService: StockService) {}

	@EventPattern("stock_queue")
	async handleStockUpdate(
		@Payload()
		items: ItemDTO[],
		@Ctx() context: RmqContext,
	) {
		console.log("[StockWorker] Evento recebido:", items);
		try {
			await Promise.all(items.map((item) => this.stockService.update(item)));

			const channel = context.getChannelRef();
			const originalMsg = context.getMessage();
			channel.ack(originalMsg);
		} catch (error) {
			throw new Error(error);
		}
	}
}
