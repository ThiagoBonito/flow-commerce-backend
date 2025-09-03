import { Test, TestingModule } from "@nestjs/testing";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { CreateOrderDTO } from "./dto/create-order";

describe("OrdersController", () => {
	let controller: OrdersController;
	let _service: OrdersService;

	const mockService = {
		create: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OrdersController],
			providers: [{ provide: OrdersService, useValue: mockService }],
		}).compile();

		controller = module.get<OrdersController>(OrdersController);
		_service = module.get<OrdersService>(OrdersService);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	it("createOrder should call service.create with correct DTO", async () => {
		const dto: CreateOrderDTO = {
			userId: 1,
			payment: 1,
			orderItems: [{ productId: 1, quantity: 2 }],
		};
		mockService.create.mockResolvedValue({ orderId: 1 });

		const result = await controller.createOrder(dto);

		expect(result).toEqual({ orderId: 1 });
		expect(mockService.create).toHaveBeenCalledWith(dto);
	});
});
