import { Test, TestingModule } from "@nestjs/testing";
import { EventsService } from "./events.service";

describe("EventsService", () => {
	let service: EventsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EventsService,
				{
					provide: "STOCK_SERVICE",
					useValue: { send: jest.fn() },
				},
				{
					provide: "PAYMENT_SERVICE",
					useValue: { send: jest.fn() },
				},
			],
		}).compile();

		service = module.get<EventsService>(EventsService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
