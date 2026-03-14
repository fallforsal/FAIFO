-- ============================================================
-- Chuyện Trong Tay — Supabase Schema
-- Run this script in the Supabase SQL Editor.
-- ============================================================

-- 0. Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Enum for NFC chip status
CREATE TYPE chip_status AS ENUM ('AVAILABLE', 'WISH_LOCKED', 'DIARY_LOCKED');

-- 2. Products table
CREATE TABLE products (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        TEXT        NOT NULL,
    description TEXT,
    model_3d_url TEXT,
    story_text  TEXT,
    video_url   TEXT,
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- 3. NFC chips table
CREATE TABLE nfc_chips (
    id          TEXT        PRIMARY KEY,
    product_id  UUID        NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    status      chip_status NOT NULL DEFAULT 'AVAILABLE',
    owner_id    UUID
);

-- 4. Interactions table
CREATE TABLE interactions (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    nfc_chip_id TEXT        NOT NULL REFERENCES nfc_chips(id) ON DELETE CASCADE,
    content     TEXT        NOT NULL,
    media_url   TEXT,
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- 5. Indexes for common lookups
CREATE INDEX idx_nfc_chips_product_id  ON nfc_chips(product_id);
CREATE INDEX idx_interactions_chip_id  ON interactions(nfc_chip_id);
CREATE INDEX idx_interactions_created  ON interactions(created_at);

-- ============================================================
-- Mock data for testing
-- ============================================================

-- 5a. One product
INSERT INTO products (id, name, description, model_3d_url, story_text, video_url)
VALUES (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Bình gốm Faifo',
    'Chiếc bình gốm thủ công được tạo nên bởi nghệ nhân ở làng gốm Thanh Hà, Hội An. Chất liệu đất sét truyền thống, nung thủ công — không có hai chiếc giống nhau.',
    '/model/faifo-pottery.glb',
    'Mỗi đường nét là một quyết định của đôi bàn tay — không có máy móc, không có khuôn mẫu. Chúng tôi không chỉ làm gốm. Chúng tôi lưu giữ ký ức. Mỗi chiếc gốm mang theo hơi thở của đất, của lửa, và của người đã nặn nên nó.',
    NULL
);

-- 5b. One NFC chip linked to the product above
INSERT INTO nfc_chips (id, product_id, status, owner_id)
VALUES (
    'TEST-CHIP-123',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'AVAILABLE',
    NULL
);

-- 5c. One interaction linked to the chip
INSERT INTO interactions (nfc_chip_id, content, media_url)
VALUES (
    'TEST-CHIP-123',
    'Cảm ơn bạn đã mang chiếc gốm này về nhà. Đây là ký ức đầu tiên.',
    NULL
);
