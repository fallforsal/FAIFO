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

interface WelcomeEmailProps {
  name: string;
}

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Chào mừng bạn đến với thế giới gốm thủ công - Chuyện Trong Tay</Preview>
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

          <Text style={{ fontSize: '13px', fontWeight: 300, color: '#2D2926', lineHeight: '1.6', letterSpacing: '0.02em', marginBottom: '24px' }}>
            Chào {name},
          </Text>

          <Text style={{ fontSize: '13px', fontWeight: 300, color: '#2D2926', lineHeight: '1.8', letterSpacing: '0.02em', marginBottom: '24px' }}>
            Cảm ơn bạn đã lựa chọn bước vào thế giới mộc mạc của chúng tôi. Mỗi tác phẩm gốm tại Chuyện Trong Tay không chỉ là một hiện vật, mà là một mảnh ghép từ ký ức, được chế tác vẹn nguyên từ xưởng gốm thủ công Hội An.
          </Text>

          <Text style={{ fontSize: '13px', fontWeight: 300, color: '#2D2926', lineHeight: '1.8', letterSpacing: '0.02em' }}>
            Chúng tôi rất vinh hạnh được đồng hành cùng bạn trên hành trình khám phá những câu chuyện âm thầm được thổi vào đất nung.
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
