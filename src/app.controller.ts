import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { EventsService } from "./events/events.service";

@Controller("/api")
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly eventsService: EventsService,
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}
