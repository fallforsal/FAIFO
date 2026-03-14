# Database Schema: "Chuyen Trong Tay" Project
**Target DB:** Supabase (PostgreSQL)

## 1. Table: `products`
Stores static information about the pottery items.

| Field | Data Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Primary Key, Default: `uuid_generate_v4()` | Unique identifier for each product line. |
| `name` | String | Not Null | Product name (e.g., "Bình gốm Faifo"). |
| `description` | Text | Nullable | General product information (used in Screen 3). |
| `model_3d_url` | String | Nullable | URL to the 3D model file (.glb, .gltf). |
| `story_text` | Text | Nullable | The artisan's background story (used in Screen 4). |
| `video_url` | String | Nullable | URL to the pottery making process video (used in Screen 5). |
| `created_at` | Timestamp | Default: `now()` | Record creation time. |

## 2. Table: `nfc_chips`
Acts as the bridge between the physical NFC chip, the product, and the user's data.

| Field | Data Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Primary Key | The unique identifier written to the physical NFC chip. |
| `product_id` | UUID | Foreign Key (`products.id`) | Links the chip to a specific pottery product. |
| `status` | Enum | `AVAILABLE`, `WISH_LOCKED`, `DIARY_LOCKED` | Current state of the chip. |
| `owner_id` | UUID | Foreign Key (`auth.users.id`), Nullable | Links to Supabase Auth. Crucial for Row Level Security (RLS) to protect diary privacy. |

## 3. Table: `interactions`
Stores the dynamic content created by users (Gift messages or Diary entries).

| Field | Data Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Primary Key, Default: `uuid_generate_v4()` | Unique identifier for the memory/interaction. |
| `nfc_chip_id` | UUID | Foreign Key (`nfc_chips.id`) | Links the content to the specific NFC chip. |
| `content` | Text | Not Null | The actual message (Wish) or diary entry. |
| `media_url` | String | Nullable | URL for any attached image/video. |
| `created_at` | Timestamp | Default: `now()` | Date of creation (Crucial for sorting Diary entries chronologically). |

## Relationships & Notes for AI Agent:
- `products` (1) to (Many) `nfc_chips`
- `nfc_chips` (1) to (Many) `interactions` (A diary can have multiple interaction entries over time, while a wish might just have one).
- When fetching data for the frontend cinematic flow, please perform a join query starting from `nfc_chips` -> `products` and `interactions` based on the chip ID parameter from the URL.