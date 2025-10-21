-- DropIndex
DROP INDEX "Host_email_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN "image" TEXT;

-- CreateIndex
CREATE INDEX "Booking_propertyId_idx" ON "Booking"("propertyId");

-- CreateIndex
CREATE INDEX "Booking_userId_idx" ON "Booking"("userId");

-- CreateIndex
CREATE INDEX "Property_hostId_idx" ON "Property"("hostId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE INDEX "Review_propertyId_idx" ON "Review"("propertyId");
