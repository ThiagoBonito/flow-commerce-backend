import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { PaymentStatusEnum } from "src/orders/domain/enums/payment-status.enum";
import { ItemDTO } from "src/orders/dto/create-order";
@Injectable()
export class EventsService {
	constructor(
		@Inject("STOCK_SERVICE") private readonly stockClient: ClientProxy,
		@Inject("PAYMENT_SERVICE") private readonly paymentClient: ClientProxy,
	) {}

	emitStockEvent(items: ItemDTO[]) {
		return this.stockClient.send("stock_queue", items);
	}

	emitPaymentEvent(event: { orderId: number; status: PaymentStatusEnum }) {
		return this.paymentClient.send("payment_queue", {
			orderId: event.orderId,
			status: event.status,
		});
	}
}
