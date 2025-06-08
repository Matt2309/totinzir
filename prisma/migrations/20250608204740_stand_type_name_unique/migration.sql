/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `StandType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StandType_title_key" ON "StandType"("title");
