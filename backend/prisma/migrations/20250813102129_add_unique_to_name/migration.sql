/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `DashboardStats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DashboardStats_name_key" ON "public"."DashboardStats"("name");
