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
  const user = await db.get('SELECT * FROM users WHERE username = ?', username);
  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  // For demo: return a fake token
  return NextResponse.json({ message: 'Login successful', token: 'demo-token', user: { id: user.id, username: user.username } });
}
