import { Controller, Get } from "@nestjs/common";
@Controller()
export class AppController {
	@Get("/ping")
	testIsRunning(): string {
		return "Service is running!";
	}
}
