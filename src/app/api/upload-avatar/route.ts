import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';

export async function POST(req: NextRequest) {
    const data = await req.formData();
    const file = data.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'assets');
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, 'avatar-memoji.png');
    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true });
}
