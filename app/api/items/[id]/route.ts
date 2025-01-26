import { NextResponse } from "next/server"

let items = [
  { id: 1, name: "John Doe", dateOfBirth: "1990-01-01", age: 33 },
  { id: 2, name: "Jane Smith", dateOfBirth: "1985-05-15", age: 38 },
  // Add more seed data here...
]

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const updatedItem = await request.json()
  items = items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
  return NextResponse.json(updatedItem)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  items = items.filter((item) => item.id !== id)
  return new NextResponse(null, { status: 204 })
}

