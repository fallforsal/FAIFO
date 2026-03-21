'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { sendWelcomeEmail, sendResetPasswordEmail } from '@/app/actions/email.actions'
import { createClient as createAdminClient } from '@supabase/supabase-js';

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'Đăng nhập thất bại: ' + error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/shop')
}

export async function register(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string | null

  const supabase = createClient()
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: name,
      }
    },
  })

  if (error) {
    // LOG RA ĐÂY ĐỂ XEM TRÊN TERMINAL CỦA VSCODE
    console.log("--------------------------");
    console.error("SUPABASE ERROR DETAIL:", error);
    console.log("--------------------------");
    return { error: error.message };
  }

  // Send the elegant high-end welcome email via Resend
  await sendWelcomeEmail(email, name || 'Bạn');

  // Supabase will send a confirmation email if it is enabled.
  return { success: true, message: 'Đăng ký thành công. Vui lòng kiểm tra email để xác nhận.' }
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function forgotPassword(formData: FormData) {
  const email = formData.get('email') as string
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Dùng Admin Client (Service Role Key) để can thiệp sâu
  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // KEY NÀY PHẢI CÓ TRONG .ENV
  )

  // 1. Tạo Link nhưng KHÔNG gửi mail tự động
  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: 'recovery',
    email: email,

  })

  if (error) return { error: 'Gửi yêu cầu thất bại: ' + error.message }

  // 2. Lấy link và gửi qua Resend
  // Link này sẽ mang theo token_hash và type=recovery, chạy thẳng vào cái TH 2 trong file Callback của ông
  const hashedToken = data.properties.hashed_token;
  const resetLink = `${origin}/auth/callback?token_hash=${hashedToken}&type=recovery&next=/reset-password`;

  // 3. Gửi link "chính chủ" qua Resend
  await sendResetPasswordEmail(email, resetLink)

  return { success: true }
}

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: 'Đổi mật khẩu thất bại: ' + error.message }
  }

  redirect('/login?message=Đổi mật khẩu thành công')
}
