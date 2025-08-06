import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let body;
    try {
        body = await req.json();
    } catch (err) {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // Nếu body không có messages (là gửi từ client sai), trả lỗi luôn
    if (!body || !body.messages) {
        return NextResponse.json({ error: "Missing messages in request body" }, { status: 400 });
    }

    // Lấy biến môi trường từ .env
    const apiKey = process.env.AZURE_OPENAI_API_KEY!;
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME!;
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION!;

    // Tạo URL endpoint đúng chuẩn Azure
    const url = `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

    // Gửi request sang Azure OpenAI
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
        },
        body: JSON.stringify(body),
    });

    // Trả kết quả response về client
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
