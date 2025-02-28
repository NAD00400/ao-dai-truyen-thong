/*
  Warnings:

  - Made the column `firebaseId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firebaseId" SET NOT NULL;
