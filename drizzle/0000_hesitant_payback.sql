CREATE TABLE IF NOT EXISTS "cases" (
	"id" serial PRIMARY KEY NOT NULL,
	"vin" varchar(17) NOT NULL,
	"name" varchar(50) NOT NULL,
	"surname" varchar(50) NOT NULL
);
