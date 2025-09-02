/*
  Warnings:

  - You are about to drop the `EventLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EventLog";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EventStatus";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EventType";
PRAGMA foreign_keys=on;
