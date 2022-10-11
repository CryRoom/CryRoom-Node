CREATE DATABASE cryroom;

CREATE TABLE "message" (
  "id" SERIAL PRIMARY KEY,
  "name" CHAR(15),
  "msg" TEXT,
  "sign" CHAR(64),
  "date" TIMESTAMPTZ NULL DEFAULT clock_timestamp()
);
