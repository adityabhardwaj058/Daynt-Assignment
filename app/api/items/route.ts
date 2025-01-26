import { NextResponse } from "next/server"

const items = [
  { id: 1, name: "John Doe", dateOfBirth: "1990-01-01", age: 33 },
  { id: 2, name: "Jane Smith", dateOfBirth: "1985-05-15", age: 38 },
  // Add more seed data here...
]

export async function GET() {
  return NextResponse.json(items)
}

export async function POST(request: Request) {
  const item = await request.json()
  const newItem = { ...item, id: items.length + 1 }
  items.push(newItem)
  return NextResponse.json(newItem, { status: 201 })
}

