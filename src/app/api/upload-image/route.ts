import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
    const data = await req.formData();

    const file = data.get('file') as File;
    const filename = data.get('filename') as string;

    if (!file || !filename) {
        return NextResponse.json({ error: 'Missing file or filename.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'assets');
    await mkdir(uploadDir, { recursive: true });

    const safeFilename = filename.replace(/[^a-z0-9_.-]/gi, '_');
    const filePath = path.join(uploadDir, safeFilename);

    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, path: `/assets/${safeFilename}` });
}
