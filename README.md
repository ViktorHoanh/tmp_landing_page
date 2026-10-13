# Landing page HB101

Trang landing page tĩnh để giới thiệu và bán sản phẩm **Siêu kích rễ phục hồi cây HB101**.

Giao diện đã được làm mới theo phong cách storefront hiện đại (hero lớn, khối lợi ích, thẻ sản phẩm, CTA rõ ràng), tham khảo tinh thần trải nghiệm từ các mẫu web bán hàng phổ biến.

## Cấu trúc

- `index.html`: khung nội dung trang
- `styles.css`: toàn bộ giao diện
- `script.js`: render chương trình sale, gallery ảnh, xử lý form và điều hướng dạng trang qua header
- `Images/`: thư mục ảnh sản phẩm
- `Videos/`: thư mục video hướng dẫn sử dụng (`HDSD.MP4`)

## Chạy nhanh trên Windows (PowerShell)

```powershell
Set-Location "D:\Temp"
python -m http.server 5500
```

Mở trình duyệt tại: `http://localhost:5500`

## Điều hướng giao diện

- Header gồm 4 mục: `Trang chủ`, `Giới thiệu`, `Hướng dẫn sử dụng`, `Liên hệ`.
- Khi bấm menu, trang chuyển mượt theo từng mục (không dồn toàn bộ nội dung dài trên một màn).
- Nút `Hướng dẫn nhanh` mở popup tóm tắt và có thể chuyển ngay đến phần hướng dẫn đầy đủ.

