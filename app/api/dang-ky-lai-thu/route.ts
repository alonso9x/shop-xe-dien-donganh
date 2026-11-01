import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, model, note } = body;

    // Validate dữ liệu cơ bản
    if (!name || !phone) {
      return NextResponse.json({ success: false, message: 'Vui lòng nhập đầy đủ họ tên và số điện thoại!' }, { status: 400 });
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json({ success: false, message: 'Thiếu cấu hình Telegram Bot ở server!' }, { status: 500 });
    }

    // Soạn nội dung tin nhắn gửi về nhóm Telegram (Markdown formatting)
    const message = `
🚨 *CÓ KHÁCH ĐĂNG KÝ LÁI THỬ MỚI!* 🚨
---------------------------------------
👤 *Họ tên:* ${name}
📞 *Số điện thoại:* ${phone}
🛵 *Dòng xe quan tâm:* ${model || 'Chưa xác định'}
📝 *Ghi chú:* ${note || 'Không có'}
🏢 *Hệ thống:* Xe Điện Đông Anh
    `.trim();

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const data = await telegramResponse.json();

    if (!data.ok) {
      throw new Error(data.description || 'Lỗi gửi tin nhắn tới Telegram');
    }

    return NextResponse.json({ success: true, message: 'Đăng ký thành công!' });
  } catch (error: any) {
    console.error('Lỗi API đăng ký lái thử:', error);
    return NextResponse.json({ success: false, message: error.message || 'Lỗi hệ thống!' }, { status: 500 });
  }
}