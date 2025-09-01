import { Controller, Get, Inject } from "@nestjs/common";
import { EventsService } from "./events.service";
import { ClientProxy } from "@nestjs/microservices";

@Controller("/api/events")
export class EventsController {
	constructor(
		private readonly eventsService: EventsService,
		@Inject("COMMERCE_SERVICE") private readonly client: ClientProxy,
	) {}

	@Get()
	emitEvent() {
		return this.client.emit("test_event", { msg: "Hello World" });
	}
}
