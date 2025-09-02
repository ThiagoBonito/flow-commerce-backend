import { type ClientProviderOptions, Transport } from "@nestjs/microservices";

export const rabbitMqConfig: ClientProviderOptions[] = [
	{
		name: "STOCKS_SERVICE",
		transport: Transport.RMQ,
		options: {
			urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
			queue: "stocks_queue",
			queueOptions: {
				durable: true,
			},
			prefetchCount: 10,
		},
	},
	{
		name: "PAYMENTS_SERVICE",
		transport: Transport.RMQ,
		options: {
			urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
			queue: "payments_queue",
			queueOptions: {
				durable: true,
			},
			prefetchCount: 10,
		},
	},
];
