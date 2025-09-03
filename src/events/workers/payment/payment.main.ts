// src/events/workers/stock.main.ts
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { PaymentWorkerModule } from "./payment-worker.module";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		PaymentWorkerModule,
		{
			transport: Transport.RMQ,
			options: {
				urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
				queue: "payment_queue",
				queueOptions: { durable: true },
			},
		},
	);

	await app.listen();
}

bootstrap();
