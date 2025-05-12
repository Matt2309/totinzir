-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "initDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Evento_id_key" ON "Evento"("id");
