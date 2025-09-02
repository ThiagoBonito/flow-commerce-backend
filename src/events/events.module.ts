import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { rabbitMqConfig } from "src/config/rabbitmq.config";
import { EventsService } from "./events.service";

@Module({
	imports: [ClientsModule.register(rabbitMqConfig)],
	providers: [EventsService],
	exports: [EventsService],
})
export class EventsModule {}
