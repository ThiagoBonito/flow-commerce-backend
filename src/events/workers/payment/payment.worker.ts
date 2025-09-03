import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { PaymentStatusEnum } from "src/orders/domain/enums/payment-status.enum";
import { PaymentService } from "src/payment/payment.service";

@Controller()
export class PaymentWorker {
	constructor(private readonly paymentService: PaymentService) {}

	@EventPattern("payment_queue")
	async handlePayment(
		@Payload() data: { orderId: number; status: PaymentStatusEnum },
		@Ctx() context: RmqContext,
	) {
		console.log("[PaymentWorker] Evento recebido:", data);
		try {
			await this.paymentService.update(data.orderId, data.status);

			const channel = context.getChannelRef();
			const originalMsg = context.getMessage();
			channel.ack(originalMsg);
		} catch (error) {
			throw new Error(error);
		}
	}
}
