-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "organizerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
