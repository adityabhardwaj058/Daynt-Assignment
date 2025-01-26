import { NextResponse } from "next/server";

let items = [
  { id: 1, name: "Aditya Bhardwaj", dateOfBirth: "2001-01-04", age: 24 },
  { id: 2, name: "Neha Sharma", dateOfBirth: "1998-05-22", age: 27 },
  { id: 3, name: "Rahul Gupta", dateOfBirth: "1990-03-15", age: 35 },
  { id: 4, name: "Priya Verma", dateOfBirth: "1995-07-10", age: 29 },
  { id: 5, name: "Anjali Mehta", dateOfBirth: "1987-12-25", age: 37 },
  { id: 6, name: "Karan Malhotra", dateOfBirth: "2000-06-08", age: 24 },
  { id: 7, name: "Sneha Patil", dateOfBirth: "1992-11-30", age: 32 },
  { id: 8, name: "Vikram Desai", dateOfBirth: "1985-09-18", age: 39 },
  { id: 9, name: "Aarti Kulkarni", dateOfBirth: "1997-04-05", age: 27 },
  { id: 10, name: "Rohit Iyer", dateOfBirth: "1999-08-14", age: 25 },
  { id: 11, name: "Meera Joshi", dateOfBirth: "2002-02-20", age: 23 },
  { id: 12, name: "Siddharth Chandra", dateOfBirth: "1996-10-12", age: 28 },
  { id: 13, name: "Ritika Sen", dateOfBirth: "2003-03-03", age: 21 },
  { id: 14, name: "Aakash Reddy", dateOfBirth: "1994-01-19", age: 31 },
  { id: 15, name: "Pooja Nair", dateOfBirth: "1991-06-25", age: 33 },
  { id: 16, name: "Arjun Pillai", dateOfBirth: "1989-12-03", age: 35 },
  { id: 17, name: "Ishita Ghosh", dateOfBirth: "1998-09-07", age: 27 },
  { id: 18, name: "Tushar Saxena", dateOfBirth: "2000-11-01", age: 24 },
  { id: 19, name: "Maya Das", dateOfBirth: "1993-07-30", age: 31 },
  { id: 20, name: "Nikhil Bansal", dateOfBirth: "1997-02-11", age: 28 },
];

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number.parseInt(params.id);
  const updatedItem = await request.json();
  items = items.map((item) =>
    item.id === id ? { ...item, ...updatedItem } : item
  );
  return NextResponse.json(updatedItem);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number.parseInt(params.id);
  items = items.filter((item) => item.id !== id);
  return new NextResponse(null, { status: 204 });
}
