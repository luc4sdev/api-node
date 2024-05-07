-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_router_id_fkey";

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "router_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_router_id_fkey" FOREIGN KEY ("router_id") REFERENCES "routers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
