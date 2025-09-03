import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Roles
	const roles = ["Admin", "Customer"];
	for (const name of roles) {
		await prisma.role.upsert({
			where: { name },
			update: {},
			create: { name },
		});
	}

	// Order Status
	const orderStatuses = ["Pending", "Paid", "Shipped"];
	for (const name of orderStatuses) {
		await prisma.orderStatus.upsert({
			where: { name },
			update: {},
			create: { name },
		});
	}

	// Payment Methods
	const paymentMethods = ["Credit Card", "Pix"];
	for (const name of paymentMethods) {
		await prisma.paymentMethod.upsert({
			where: { name },
			update: {},
			create: { name },
		});
	}

	// Payment Status
	const paymentStatuses = ["Pending", "Confirmed", "Failed"];
	for (const name of paymentStatuses) {
		await prisma.paymentStatus.upsert({
			where: { name },
			update: {},
			create: { name },
		});
	}

	// Products
	const products = [
		{ name: "Iphone", description: "Iphone 16", price: 6000, stock: 10 },
		{
			name: "Notebook",
			description: "Notebook i7 16GB RAM",
			price: 5000,
			stock: 5,
		},
		{
			name: "Headphones",
			description: "Fones Bluetooth JBL",
			price: 300,
			stock: 20,
		},
		{
			name: "Keyboard",
			description: "Teclado mecânico",
			price: 250,
			stock: 100,
		},
	];

	for (const product of products) {
		await prisma.product.upsert({
			where: { name: product.name },
			update: {},
			create: product,
		});
	}

	console.log("✅ Seed rodado com sucesso");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
