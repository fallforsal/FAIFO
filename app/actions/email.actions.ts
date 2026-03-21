'use server'

import { Resend } from 'resend';
import WelcomeEmail from '@/components/emails/WelcomeEmail';
import OrderConfirmationEmail from '@/components/emails/OrderConfirmationEmail';
import ResetPasswordEmail from '@/components/emails/ResetPasswordEmail';
// Ensure you have RESEND_API_KEY in your .env.local
const resend = new Resend(process.env.RESEND_API_KEY);


//const FROM_EMAIL = 'WHYNOT Team <whynott.work@gmail.com>';

const FROM_EMAIL = 'onboarding@resend.dev'; // Remember to verify this domain on Resend

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Chào mừng bạn đến với Chuyện Trong Tay',
      react: WelcomeEmail({ name }),
    });

    if (error) {
      console.error('Lỗi khi gửi Welcome Email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Lỗi ngoại lệ khi gửi Welcome Email:', err);
    return { success: false, error: err };
  }
}

export async function sendOrderConfirmationEmail(email: string, name: string, orderId: string, totalAmount: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Xác nhận đơn hàng #${orderId} - Chuyện Trong Tay`,
      react: OrderConfirmationEmail({ orderId, name, totalAmount }),
    });

    if (error) {
      console.error('Lỗi khi gửi Order Confirmation:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Lỗi ngoại lệ khi gửi Order Confirmation:', err);
    return { success: false, error: err };
  }
}

export async function sendResetPasswordEmail(email: string, resetLink: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Đặt lại mật khẩu - Chuyện Trong Tay',
      react: ResetPasswordEmail({ resetLink }),
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}