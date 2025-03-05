import { NextRequest, NextResponse } from 'next/server';

// Fake database
const lichHenDB: any[] = [];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const lichHen = lichHenDB.find(lh => lh.id === id);
    return lichHen ? NextResponse.json(lichHen) : NextResponse.json({ error: 'Không tìm thấy lịch hẹn' }, { status: 404 });
  }

  return NextResponse.json(lichHenDB);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newLichHen = { id: Date.now().toString(), ...body };
  lichHenDB.push(newLichHen);
  return NextResponse.json(newLichHen, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  const index = lichHenDB.findIndex(lh => lh.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Không tìm thấy lịch hẹn' }, { status: 404 });
  }

  lichHenDB[index] = { ...lichHenDB[index], ...body };
  return NextResponse.json(lichHenDB[index]);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  const index = lichHenDB.findIndex(lh => lh.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Không tìm thấy lịch hẹn' }, { status: 404 });
  }

  const deleted = lichHenDB.splice(index, 1);
  return NextResponse.json(deleted[0]);
}