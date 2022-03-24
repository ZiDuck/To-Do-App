/*
  Warnings:

  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `TaskDetail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `collectionId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deadline` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- DropForeignKey
ALTER TABLE "TaskDetail" DROP CONSTRAINT "TaskDetail_taskDetailId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "userId",
ADD COLUMN     "collectionId" INTEGER NOT NULL,
ADD COLUMN     "deadline" TIMESTAMP NOT NULL,
ADD COLUMN     "description" VARCHAR(200) NOT NULL,
ADD COLUMN     "state" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "TaskDetail";

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "nameCollection" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
