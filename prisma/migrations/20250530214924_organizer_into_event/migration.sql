-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "organizerId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
