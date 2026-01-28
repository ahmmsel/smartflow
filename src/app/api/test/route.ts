import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "GET request successful",
    method: "GET",
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({
    message: "POST request successful",
    method: "POST",
    data: body,
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({
    message: "PUT request successful",
    method: "PUT",
    data: body,
  });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({
    message: "DELETE request successful",
    method: "DELETE",
  });
}
