-- CreateTable
CREATE TABLE "public"."DashboardStats" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "current_value" INTEGER NOT NULL,
    "previous_value" INTEGER NOT NULL,

    CONSTRAINT "DashboardStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sales_chart" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "current_value" DOUBLE PRECISION NOT NULL,
    "previous_value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "sales_chart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
