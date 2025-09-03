# Flow Commerce Backend

## ⚡ Visão Geral
O **Flow Commerce Backend** é uma plataforma de e-commerce desenvolvida com **Node.js**, **NestJS**, **Prisma** e **RabbitMQ**. O sistema combina processamento **assíncrono de eventos** com **processamento de jobs** para garantir eficiência, escalabilidade e confiabilidade.

Principais características:
- Gestão de pedidos, estoque e pagamentos.
- Comunicação assíncrona usando **RabbitMQ**.
- Workers dedicados para processamento de estoque e pagamento.
- Jobs agendados via **ReportsModule** usando cron para tarefas periódicas.
- Arquitetura modular, fácil de testar e extender.

---

## 🏗 Arquitetura

### Estrutura de Módulos
- **PrismaModule:** conexão com o banco de dados **SQLite** via Prisma.
- **EventsModule:** publica eventos de estoque e pagamento para RabbitMQ.
- **OrdersModule:** gestão de pedidos, criação de pagamentos e emissão de eventos.
- **Workers (StockWorker & PaymentWorker):** consomem eventos de RabbitMQ para atualizar estoque e pagamentos.
- **StockService & PaymentService:** exemplos claros de **Dependency Injection** e boas práticas de organização de código.
- **ReportsModule:** responsável pelo **job agendado (cron)**, para gerar relatórios ou realizar tarefas periódicas.

### Estratégia de Processamento
1. **Assíncrono (RabbitMQ + Workers)**
   - `OrdersService` emite eventos de estoque e pagamento.
   - `StockWorker` e `PaymentWorker` processam os eventos de forma paralela.
   - Permite escalabilidade horizontal (vários workers processando em paralelo).

2. **Job agendado (ReportsModule + Cron)**
   - Tarefas periódicas como geração de relatórios de vendas ou reconciliação de estoque.
   - Implementado com `@nestjs/schedule` e cron expressions.

---

## 🎨 Design Patterns Utilizados

1. **Dependency Injection**
   - Facilita o desacoplamento, testes e manutenção.
   - Ex.: `StockService`, `PaymentService` e `PrismaService` injetados nos services.

2. **Observer / Publisher-Subscriber**
   - Comunicação assíncrona via RabbitMQ.
   - Ex.: `EventsService` publica eventos; Workers consomem e processam.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js >= 20
- Docker & Docker Compose
- Prisma CLI
- RabbitMQ (ou via Docker)

---

### 1️⃣ Rodar localmente sem Docker
```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npx prisma generate

# Rodar migrações SQLite (ou criar DB)
npx prisma migrate dev

# Rodar aplicação
npm run start:dev

# Rodar workers em terminais separados
npm run start:worker:stock
npm run start:worker:payment

## 🐳 Rodando com Docker

Para facilitar o setup e isolamento, todo o backend pode ser executado via Docker. Os workers são containers separados e consomem apenas suas filas específicas.

### 1️⃣ Build das imagens
```bash
# Aplicação principal
docker build -t flowcommerce-app:latest .

# Worker de estoque
docker build -t flowcommerce-stock:latest -f Dockerfile.stock.worker .

# Worker de pagamento
docker build -t flowcommerce-payment:latest -f Dockerfile.payment.worker .

# Rodar containers
docker-compose up -d


### Rodando Testes

npm run test

