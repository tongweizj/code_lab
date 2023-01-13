-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "genre" VARCHAR(255) NOT NULL,
    "rating" INTEGER NOT NULL,
    "explicit" BOOLEAN NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "extendedPetsData" JSONB,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "op_pond_pi_env" (
    "id" INTEGER NOT NULL,
    "create_at" BIGINT,
    "pond_uuid" VARCHAR(50),
    "ping_packet_loss" REAL,
    "ping_avg_speed" REAL,
    "ping_max_speed" REAL,

    CONSTRAINT "op_pond_pi_env_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_name_unique" ON "movies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_unique" ON "users"("username");
