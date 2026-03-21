import {
    Html, Head, Body, Container, Text, Heading, Link, Preview, Section
} from '@react-email/components';
import * as React from 'react';

interface ResetPasswordEmailProps {
    resetLink: string;
}

export default function ResetPasswordEmail({ resetLink }: ResetPasswordEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Đặt lại mật khẩu cho tài khoản Chuyện Trong Tay của bạn</Preview>
            <Body style={{ backgroundColor: '#FDF9F3', margin: '0 auto', fontFamily: 'serif' }}>
                <Container style={{ padding: '60px 20px', maxWidth: '600px' }}>
                    <Heading style={{ color: '#2D2926', fontSize: '24px', fontWeight: 'normal', textAlign: 'center', letterSpacing: '0.1em', marginBottom: '40px' }}>
                        CHUYỆN TRONG TAY
                    </Heading>

                    <Section style={{ backgroundColor: '#ffffff', padding: '40px', border: '1px solid #2D2926/10' }}>
                        <Text style={{ color: '#2D2926', fontSize: '15px', lineHeight: '1.6' }}>
                            Chào bạn,
                        </Text>
                        <Text style={{ color: '#2D2926', fontSize: '15px', lineHeight: '1.6' }}>
                            Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Nếu đây không phải là bạn, hãy an tâm bỏ qua thư này.
                        </Text>
                        <Text style={{ color: '#2D2926', fontSize: '15px', lineHeight: '1.6', marginBottom: '30px' }}>
                            Để tạo mật khẩu mới, vui lòng nhấn vào liên kết bên dưới:
                        </Text>

                        <div style={{ textAlign: 'center' }}>
                            <Link
                                href={resetLink}
                                style={{
                                    backgroundColor: '#2D2926',
                                    color: '#FDF9F3',
                                    padding: '12px 30px',
                                    textDecoration: 'none',
                                    fontSize: '12px',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase' as const,
                                }}
                            >
                                Đặt lại mật khẩu
                            </Link>
                        </div>
                    </Section>

                    <Text style={{ color: '#2D2926/50', fontSize: '11px', textAlign: 'center', marginTop: '40px', letterSpacing: '0.05em' }}>
                        © 2026 FAIFO. MANG CÂU CHUYỆN THỔI VÀO ĐẤT NUNG.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}