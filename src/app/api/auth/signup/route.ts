import { NextRequest, NextResponse } from "next/server";
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const dbPromise = open({
  filename: './users.sqlite',
  driver: sqlite3.Database
});

export async function POST(req: NextRequest) {
  const db = await dbPromise;
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  await db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);
  try {
    await db.run('INSERT INTO users (username, password) VALUES (?, ?)', username, password);
    return NextResponse.json({ message: 'User created' });
  } catch (e) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }
}
