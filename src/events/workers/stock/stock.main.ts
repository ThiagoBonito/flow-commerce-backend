import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { StockWorkerModule } from "./stock-worker.module";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		StockWorkerModule,
		{
			transport: Transport.RMQ,
			options: {
				urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
				queue: "stock_queue",
				queueOptions: { durable: true },
			},
		},
	);

	await app.listen();
}

bootstrap();
