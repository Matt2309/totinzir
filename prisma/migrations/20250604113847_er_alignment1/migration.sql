/*
  Warnings:

  - You are about to drop the column `sponsorId` on the `DiscountCode` table. All the data in the column will be lost.
  - You are about to drop the column `commission` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Operation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discountPerc` to the `DiscountCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commission` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DiscountCode" DROP CONSTRAINT "DiscountCode_sponsorId_fkey";

-- DropForeignKey
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_addressId_fkey";

-- AlterTable
ALTER TABLE "DiscountCode" DROP COLUMN "sponsorId",
ADD COLUMN     "discountPerc" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "commission" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "eventId" INTEGER;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "commission";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "addressId";

-- DropTable
DROP TABLE "Operation";

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_orderId_key" ON "Transaction"("orderId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
