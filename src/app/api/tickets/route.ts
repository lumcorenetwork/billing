import { NextRequest, NextResponse } from "next/server";
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const dbPromise = open({
  filename: './tickets.sqlite',
  driver: sqlite3.Database
});

export async function GET() {
  const db = await dbPromise;
  await db.run(`CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    status TEXT,
    assigned TEXT
  )`);
  const tickets = await db.all('SELECT * FROM tickets');
  return NextResponse.json({ tickets });
}

export async function POST(req: NextRequest) {
  const db = await dbPromise;
  const { title, status, assigned } = await req.json();
  if (!title || !status || !assigned) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const result = await db.run(
    'INSERT INTO tickets (title, status, assigned) VALUES (?, ?, ?)',
    title, status, assigned
  );
  return NextResponse.json({ id: result.lastID, title, status, assigned });
}
