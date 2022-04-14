/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Enrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[authUserId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_studentId_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "authUserId" TEXT;

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Enrollment";

-- DropTable
DROP TABLE "Student";

-- CreateIndex
CREATE UNIQUE INDEX "Customer_authUserId_key" ON "Customer"("authUserId");
