import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Hr,
  Preview,
} from '@react-email/components';
import * as React from 'react';

interface OrderConfirmationEmailProps {
  orderId: string;
  name: string;
  totalAmount: string;
}

export default function OrderConfirmationEmail({ orderId, name, totalAmount }: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Xác nhận đơn hàng #{orderId} - Chuyện Trong Tay</Preview>
      <Body style={{ backgroundColor: '#FDF9F3', fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif' }}>
        <Container style={{ padding: '60px 20px', margin: '0 auto', maxWidth: '600px' }}>
          <Heading style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: '22px',
            fontWeight: 'normal',
            color: '#2D2926',
            textAlign: 'center',
            letterSpacing: '0.1em',
            marginBottom: '48px'
          }}>
            CHUYỆN TRONG TAY
          </Heading>

          <Text style={{ fontSize: '16px', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 'normal', color: '#2D2926', textAlign: 'center', marginBottom: '32px' }}>
            Cảm ơn bạn đã đặt hàng
          </Text>

          <Text style={{ fontSize: '13px', fontWeight: 300, color: '#2D2926', lineHeight: '1.6', letterSpacing: '0.02em', marginBottom: '24px' }}>
            Chào {name},
          </Text>

          <Text style={{ fontSize: '13px', fontWeight: 300, color: '#2D2926', lineHeight: '1.8', letterSpacing: '0.02em', marginBottom: '32px' }}>
            Đơn hàng của bạn đã được xác nhận và đang được nghệ nhân của chúng tôi chuẩn bị cẩn thận. Dưới đây là thông tin tóm tắt:
          </Text>

          <div style={{ padding: '24px', border: '1px solid rgba(45, 41, 38, 0.1)', marginBottom: '32px' }}>
            <Text style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2D2926', opacity: 0.6, marginBottom: '8px' }}>
              Mã Đơn Hàng
            </Text>
            <Text style={{ fontSize: '14px', fontWeight: 400, color: '#2D2926', marginBottom: '24px' }}>
              #{orderId}
            </Text>

            <Text style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2D2926', opacity: 0.6, marginBottom: '8px' }}>
              Tổng Thanh Toán
            </Text>
            <Text style={{ fontSize: '14px', fontWeight: 400, color: '#2D2926' }}>
              {totalAmount}
            </Text>
          </div>

          <Text style={{ fontSize: '13px', fontWeight: 300, color: '#2D2926', lineHeight: '1.8', letterSpacing: '0.02em', textAlign: 'center' }}>
            Chúng tôi sẽ thông báo cho bạn ngay khi kiện hàng được gửi đi.
          </Text>

          <Hr style={{ borderColor: '#2D2926', borderWidth: '1px', opacity: 0.15, margin: '48px 0' }} />

          <Text style={{ fontSize: '11px', fontWeight: 300, color: '#2D2926', textAlign: 'center', opacity: 0.6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Artisan Crafted in Hoi An
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
