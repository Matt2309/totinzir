/*
  Warnings:

  - The primary key for the `Registry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[fiscalCode]` on the table `Registry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Registry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Registry" DROP CONSTRAINT "Registry_fiscalCode_fkey";

-- AlterTable
ALTER TABLE "Registry" DROP CONSTRAINT "Registry_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Registry_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Registry_fiscalCode_key" ON "Registry"("fiscalCode");

-- AddForeignKey
ALTER TABLE "Registry" ADD CONSTRAINT "Registry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
