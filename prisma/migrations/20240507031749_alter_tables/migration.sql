-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "active" DROP NOT NULL,
ALTER COLUMN "active" SET DEFAULT false,
ALTER COLUMN "deleted" DROP NOT NULL;

-- AlterTable
ALTER TABLE "routers" ALTER COLUMN "active" DROP NOT NULL,
ALTER COLUMN "active" SET DEFAULT false,
ALTER COLUMN "deleted" DROP NOT NULL;
