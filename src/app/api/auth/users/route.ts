import { NextRequest, NextResponse } from "next/server";
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const dbPromise = open({
  filename: './users.sqlite',
  driver: sqlite3.Database
});

export async function GET() {
  const db = await dbPromise;
  await db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);
  const users = await db.all('SELECT id, username FROM users');
  return NextResponse.json({ users });
}
