/*
  Warnings:

  - You are about to drop the column `zipCode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `revenues` on the `EventHistory` table. All the data in the column will be lost.
  - The primary key for the `Exhibition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `standCode` on the `Exhibition` table. All the data in the column will be lost.
  - You are about to drop the column `subscription` on the `Newsletter` table. All the data in the column will be lost.
  - You are about to drop the column `discountCodeId` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `Stand` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `Stand` table. All the data in the column will be lost.
  - You are about to drop the column `fee` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `newsletterId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethodId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `taxCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `PersonalData` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `PaymentMethod` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fiscalCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revenue` to the `EventHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `standId` to the `Exhibition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signUpDate` to the `Newsletter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commission` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fiscalCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Exhibition" DROP CONSTRAINT "Exhibition_standCode_fkey";

-- DropForeignKey
ALTER TABLE "Newsletter" DROP CONSTRAINT "Newsletter_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_discountCodeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_addressId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_newsletterId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_paymentMethodId_fkey";

-- DropIndex
DROP INDEX "User_taxCode_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "zipCode",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "addressId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EventHistory" DROP COLUMN "revenues",
ADD COLUMN     "revenue" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Exhibition" DROP CONSTRAINT "Exhibition_pkey",
DROP COLUMN "standCode",
ADD COLUMN     "standId" INTEGER NOT NULL,
ADD CONSTRAINT "Exhibition_pkey" PRIMARY KEY ("standId", "eventId");

-- AlterTable
ALTER TABLE "Newsletter" DROP COLUMN "subscription",
ADD COLUMN     "signUpDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "eventId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "discountCodeId",
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "PaymentMethod" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Stand" DROP CONSTRAINT "Stand_pkey",
DROP COLUMN "code",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Stand_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "fee",
ADD COLUMN     "commission" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "addressId",
DROP COLUMN "newsletterId",
DROP COLUMN "paymentMethodId",
DROP COLUMN "taxCode",
ADD COLUMN     "fiscalCode" TEXT NOT NULL;

-- DropTable
DROP TABLE "PersonalData";

-- CreateTable
CREATE TABLE "Registry" (
    "fiscalCode" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "policy" TEXT NOT NULL,

    CONSTRAINT "Registry_pkey" PRIMARY KEY ("fiscalCode")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_userId_key" ON "PaymentMethod"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_fiscalCode_key" ON "User"("fiscalCode");

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registry" ADD CONSTRAINT "Registry_fiscalCode_fkey" FOREIGN KEY ("fiscalCode") REFERENCES "User"("fiscalCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Newsletter" ADD CONSTRAINT "Newsletter_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exhibition" ADD CONSTRAINT "Exhibition_standId_fkey" FOREIGN KEY ("standId") REFERENCES "Stand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
