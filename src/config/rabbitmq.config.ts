import { type ClientProviderOptions, Transport } from "@nestjs/microservices";

export const rabbitMqConfig: ClientProviderOptions = {
	name: "COMMERCE_SERVICE",
	transport: Transport.RMQ,
	options: {
		urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
		queue: "events_queue",
		queueOptions: {
			durable: false,
		},
	},
};
