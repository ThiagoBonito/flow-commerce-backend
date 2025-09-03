import { Test, TestingModule } from "@nestjs/testing";
import { OrdersService } from "./orders.service";
import { PrismaService } from "prisma/prisma.service";
import { EventsService } from "src/events/events.service";
import { CreateOrderDTO } from "./dto/create-order";
import * as validators from "./domain/validators/check-stock";

describe("OrdersService", () => {
	let service: OrdersService;
	let prisma: PrismaService;
	let eventsService: EventsService;

	const mockPrisma = {
		product: { findMany: jest.fn() },
		$transaction: jest.fn(),
	};

	const mockEvents = {
		emitStockEvent: jest.fn(),
		emitPaymentEvent: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrdersService,
				{ provide: PrismaService, useValue: mockPrisma },
				{ provide: EventsService, useValue: mockEvents },
			],
		}).compile();

		service = module.get<OrdersService>(OrdersService);
		prisma = module.get<PrismaService>(PrismaService);
		eventsService = module.get<EventsService>(EventsService);

		jest.spyOn(validators, "checkStock").mockImplementation(() => {});
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("create should call getAllProducts, checkStock, $transaction and events", async () => {
		const dto: CreateOrderDTO = {
			userId: 1,
			payment: 1,
			orderItems: [{ productId: 1, quantity: 2 }],
		};

		const products = [{ id: 1, price: 100 }];
		(prisma.product.findMany as jest.Mock).mockResolvedValue(products);
		(prisma.$transaction as jest.Mock).mockImplementation(async (fn) =>
			fn({
				order: {
					create: jest
						.fn()
						.mockResolvedValue({ id: 1, orderItems: dto.orderItems }),
				},
				payment: { create: jest.fn().mockResolvedValue({ orderId: 1 }) },
			}),
		);

		await service.create(dto);

		expect(prisma.product.findMany).toHaveBeenCalled();
		expect(validators.checkStock).toHaveBeenCalledWith(
			dto.orderItems,
			products,
		);
		expect(prisma.$transaction).toHaveBeenCalled();
		expect(eventsService.emitStockEvent).toHaveBeenCalled();
		expect(eventsService.emitPaymentEvent).toHaveBeenCalled();
	});
});
