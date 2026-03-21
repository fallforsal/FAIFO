import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { type EmailOtpType } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)

  // 1. Lấy các tham số từ URL
  const code = searchParams.get('code') // Cho Đăng ký
  const token_hash = searchParams.get('token_hash') // Cho Reset mật khẩu
  const type = searchParams.get('type') as EmailOtpType | null // Kiểu xác thực (recovery, signup...)
  const next = searchParams.get('next') ?? '/'

  const supabase = createClient()

  // TRƯỜNG HỢP 1: Xác thực qua PKCE Code (Thường dùng cho Đăng ký)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // TRƯỜNG HỢP 2: Xác thực qua Token Hash (Dùng cho Quên mật khẩu ông đang làm)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      // Xác thực xong, cho phép user vào trang /reset-password với quyền "đã login"
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Nếu cả 2 đều hỏng, về Login báo lỗi cho user biết
  console.error("Xác thực Callback thất bại")
  return NextResponse.redirect(`${origin}/login?error=Lỗi xác thực, liên kết có thể đã hết hạn.`)
}