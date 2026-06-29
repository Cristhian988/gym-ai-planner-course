/*
  Warnings:

  - Changed the type of `goal` on the `user_profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `experience` on the `user_profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('cut', 'bulk', 'recomp', 'strength', 'endurance');

-- CreateEnum
CREATE TYPE "Experience" AS ENUM ('beginner', 'intermediate', 'advanced');

-- AlterTable
ALTER TABLE "user_profile" DROP COLUMN "goal",
ADD COLUMN     "goal" "Goal" NOT NULL,
DROP COLUMN "experience",
ADD COLUMN     "experience" "Experience" NOT NULL;

-- CreateTable
CREATE TABLE "training_plans" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "plan_json" JSONB NOT NULL,
    "plan_text" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "training_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_training_plans_user_id" ON "training_plans"("user_id");
