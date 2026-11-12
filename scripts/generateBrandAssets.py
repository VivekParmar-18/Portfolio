import os
import math
from PIL import Image, ImageDraw, ImageFont

public_dir = os.path.join(os.path.dirname(__file__), '..', 'public')

def get_font(name, size, bold=False):
    fonts_dir = r'C:\Windows\Fonts'
    font_map = {
        'sans': 'segoeuib.ttf' if bold else 'segoeui.ttf',
        'mono': 'consolab.ttf' if bold else 'consola.ttf',
        'serif': 'georgiab.ttf' if bold else 'georgia.ttf'
    }
    path = os.path.join(fonts_dir, font_map.get(name, 'segoeui.ttf'))
    if os.path.exists(path):
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()

def create_circular_portrait(photo_path, diameter, border_color=(255, 76, 36), border_width=4):
    img = Image.open(photo_path).convert('RGB')
    # Resize photo to fit diameter
    img = img.resize((diameter, diameter), Image.Resampling.LANCZOS)
    
    # Create high-res supersampled mask for ultra-smooth anti-aliasing (2x)
    scale = 2
    big_size = diameter * scale
    mask = Image.new('L', (big_size, big_size), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.ellipse((0, 0, big_size - 1, big_size - 1), fill=255)
    mask = mask.resize((diameter, diameter), Image.Resampling.LANCZOS)
    
    # Composite onto transparent circular image
    circular_img = Image.new('RGBA', (diameter, diameter), (0, 0, 0, 0))
    circular_img.paste(img, (0, 0), mask)
    
    # Draw border ring with supersampling
    ring_img = Image.new('RGBA', (big_size, big_size), (0, 0, 0, 0))
    draw_ring = ImageDraw.Draw(ring_img)
    bw_big = border_width * scale
    draw_ring.ellipse(
        (bw_big // 2, bw_big // 2, big_size - 1 - bw_big // 2, big_size - 1 - bw_big // 2),
        outline=border_color + (255,),
        width=bw_big
    )
    ring_res = ring_img.resize((diameter, diameter), Image.Resampling.LANCZOS)
    
    # Merge ring over circular portrait
    circular_img.alpha_composite(ring_res)
    return circular_img

def draw_corner_brackets(draw, x0, y0, x1, y1, length=28, color=(255, 76, 36), width=3):
    # Top-Left
    draw.line([(x0, y0), (x0 + length, y0)], fill=color, width=width)
    draw.line([(x0, y0), (x0, y0 + length)], fill=color, width=width)
    # Top-Right
    draw.line([(x1, y0), (x1 - length, y0)], fill=color, width=width)
    draw.line([(x1, y0), (x1, y0 + length)], fill=color, width=width)
    # Bottom-Left
    draw.line([(x0, y1), (x0 + length, y1)], fill=color, width=width)
    draw.line([(x0, y1), (x0, y1 - length)], fill=color, width=width)
    # Bottom-Right
    draw.line([(x1, y1), (x1 - length, y1)], fill=color, width=width)
    draw.line([(x1, y1), (x1, y1 - length)], fill=color, width=width)

def generate_square_preview_card():
    """Generates 1200x1200 Square Card for Google Search Result Snippets & Schema primaryImageOfPage."""
    W, H = 1200, 1200
    im = Image.new('RGB', (W, H), (5, 5, 5)) # Deep Obsidian #050505
    draw = ImageDraw.Draw(im)
    
    # 1. Subtle hairline grid
    grid_color = (18, 18, 18)
    for x in range(60, W, 100):
        draw.line([(x, 0), (x, H)], fill=grid_color, width=1)
    for y in range(60, H, 100):
        draw.line([(0, y), (W, y)], fill=grid_color, width=1)
        
    # 2. Outer architectural frame
    frame_margin = 44
    draw.rectangle(
        [(frame_margin, frame_margin), (W - frame_margin, H - frame_margin)],
        outline=(30, 30, 30),
        width=1
    )
    draw_corner_brackets(draw, frame_margin, frame_margin, W - frame_margin, H - frame_margin, length=32, color=(255, 76, 36), width=4)
    
    # 3. Top Telemetry Header
    header_font = get_font('mono', 16, bold=True)
    coral_color = (255, 76, 36)
    white_color = (244, 241, 238)
    muted_color = (130, 130, 130)
    
    # Top pulse dot
    draw.ellipse([(74, 76), (88, 90)], fill=coral_color)
    draw.ellipse([(78, 80), (84, 86)], fill=(255, 255, 255))
    draw.text((104, 73), "VIVEK PARMAR  //  SOFTWARE ENGINEER L1  //  AHMEDABAD", font=header_font, fill=white_color)
    draw.text((820, 73), "[ SYSTEM ARCHITECTURE ]", font=header_font, fill=muted_color)
    
    # 4. Portrait photo (320px diameter) in center upper area
    photo_path = os.path.join(public_dir, 'profile-photo.jpg')
    portrait_size = 310
    portrait_x = (W - portrait_size) // 2
    portrait_y = 150
    
    # Decorative halo background plate
    draw.ellipse(
        [(portrait_x - 12, portrait_y - 12), (portrait_x + portrait_size + 12, portrait_y + portrait_size + 12)],
        outline=(25, 25, 25),
        width=1
    )
    draw.ellipse(
        [(portrait_x - 6, portrait_y - 6), (portrait_x + portrait_size + 6, portrait_y + portrait_size + 6)],
        outline=(40, 40, 40),
        width=1
    )
    
    portrait = create_circular_portrait(photo_path, portrait_size, border_color=(255, 76, 36), border_width=4)
    im.paste(portrait, (portrait_x, portrait_y), portrait)
    
    # Availability badge below portrait
    badge_y = portrait_y + portrait_size + 24
    badge_text = "● PRODUCTION SYSTEMS · TECHFORCE INFOTECH"
    badge_font = get_font('mono', 14, bold=True)
    bbox = badge_font.getbbox(badge_text)
    bw = bbox[2] - bbox[0] + 36
    bh = 34
    bx = (W - bw) // 2
    draw.rounded_rectangle([(bx, badge_y), (bx + bw, badge_y + bh)], radius=6, fill=(16, 16, 16), outline=(40, 40, 40), width=1)
    draw.text((bx + 18, badge_y + 8), badge_text, font=badge_font, fill=(16, 185, 129)) # Emerald ok
    
    # 5. Core Identity Typography
    name_font = get_font('sans', 58, bold=True)
    name_text = "Vivek Parmar"
    name_bbox = name_font.getbbox(name_text)
    nw = name_bbox[2] - name_bbox[0]
    draw.text(((W - nw) // 2, 570), name_text, font=name_font, fill=white_color)
    
    subhead_font = get_font('sans', 26, bold=True)
    subhead_text = "Java Backend Engineer & Distributed Systems"
    sb_bbox = subhead_font.getbbox(subhead_text)
    sw = sb_bbox[2] - sb_bbox[0]
    draw.text(((W - sw) // 2, 642), subhead_text, font=subhead_font, fill=coral_color)
    
    desc_font = get_font('sans', 19, bold=False)
    desc_text = "Spring Boot 3 · Apache Kafka · PostgreSQL Query Optimization · AWS"
    ds_bbox = desc_font.getbbox(desc_text)
    dw = ds_bbox[2] - ds_bbox[0]
    draw.text(((W - dw) // 2, 688), desc_text, font=desc_font, fill=(190, 190, 190))
    
    # 6. Three Architectural Telemetry Cards
    card_y = 760
    card_w = 320
    card_h = 170
    card_gap = 36
    total_cards_w = (card_w * 3) + (card_gap * 2)
    start_cx = (W - total_cards_w) // 2
    
    metrics = [
        ("2+ Years", "PRODUCTION EXP", "Techforce Infotech · L1 Engineer"),
        ("-74% DB Load", "QUERY OPTIMIZATION", "Eliminated N+1 · Keyset cursors"),
        ("99.9% Uptime", "KAFKA EVENT STREAMS", "10,000+ Healthcare Orders")
    ]
    
    for i, (val, label, detail) in enumerate(metrics):
        cx = start_cx + i * (card_w + card_gap)
        # Card background
        draw.rounded_rectangle([(cx, card_y), (cx + card_w, card_y + card_h)], radius=8, fill=(12, 12, 12), outline=(32, 32, 32), width=1)
        # Left coral stripe
        draw.rounded_rectangle([(cx, card_y), (cx + 5, card_y + card_h)], radius=2, fill=coral_color)
        
        # Metric value
        val_font = get_font('sans', 36, bold=True)
        draw.text((cx + 24, card_y + 24), val, font=val_font, fill=white_color)
        
        # Metric label
        lbl_font = get_font('mono', 12, bold=True)
        draw.text((cx + 24, card_y + 82), label, font=lbl_font, fill=coral_color)
        
        # Metric detail
        det_font = get_font('sans', 13, bold=False)
        draw.text((cx + 24, card_y + 115), detail, font=det_font, fill=muted_color)
        
    # 7. Architecture Tag Bar
    tags_y = 995
    tag_box_h = 56
    tag_box_x = start_cx
    tag_box_w = total_cards_w
    draw.rounded_rectangle([(tag_box_x, tags_y), (tag_box_x + tag_box_w, tags_y + tag_box_h)], radius=6, fill=(10, 10, 10), outline=(26, 26, 26), width=1)
    
    tags_font = get_font('mono', 13, bold=True)
    tags_text = "JAVA 21  ·  SPRING BOOT  ·  KAFKA  ·  REDIS  ·  AWS  ·  POSTGRESQL  ·  DOCKER"
    tb_bbox = tags_font.getbbox(tags_text)
    tw = tb_bbox[2] - tb_bbox[0]
    draw.text(((W - tw) // 2, tags_y + 19), tags_text, font=tags_font, fill=(175, 175, 175))
    
    # 8. Bottom Footer
    footer_font = get_font('mono', 14, bold=True)
    draw.text((start_cx, 1105), "AHMEDABAD, INDIA  ·  AVAILABLE FOR SDE / BACKEND ROLES", font=footer_font, fill=muted_color)
    
    url_text = "https://vivekparmar.is-a.dev"
    url_bbox = footer_font.getbbox(url_text)
    uw = url_bbox[2] - url_bbox[0]
    draw.text((start_cx + tag_box_w - uw, 1105), url_text, font=footer_font, fill=coral_color)
    
    out_path = os.path.join(public_dir, 'preview-card.png')
    im.save(out_path, format='PNG', quality=95)
    print(f"Generated square preview card: {out_path} ({W}x{H})")

def generate_wide_og_card():
    """Generates 1200x630 Wide Card for OpenGraph & Twitter with Portrait & Hallmark telemetry."""
    W, H = 1200, 630
    im = Image.new('RGB', (W, H), (5, 5, 5))
    draw = ImageDraw.Draw(im)
    
    # 1. Subtle hairline grid
    grid_color = (18, 18, 18)
    for x in range(60, W, 100):
        draw.line([(x, 0), (x, H)], fill=grid_color, width=1)
    for y in range(60, H, 100):
        draw.line([(0, y), (W, y)], fill=grid_color, width=1)
        
    # 2. Outer architectural frame
    frame_margin = 32
    draw.rectangle(
        [(frame_margin, frame_margin), (W - frame_margin, H - frame_margin)],
        outline=(30, 30, 30),
        width=1
    )
    draw_corner_brackets(draw, frame_margin, frame_margin, W - frame_margin, H - frame_margin, length=24, color=(255, 76, 36), width=3)
    
    header_font = get_font('mono', 12, bold=True)
    coral_color = (255, 76, 36)
    white_color = (244, 241, 238)
    muted_color = (130, 130, 130)
    
    # 3. Top Telemetry Bar
    draw.ellipse([(60, 56), (70, 66)], fill=coral_color)
    draw.ellipse([(63, 59), (67, 63)], fill=(255, 255, 255))
    draw.text((82, 54), "VIVEK PARMAR  //  SOFTWARE ENGINEER L1  //  AHMEDABAD", font=header_font, fill=white_color)
    draw.text((910, 54), "[ RESILIENT DISTRIBUTED BACKENDS ]", font=header_font, fill=muted_color)
    
    # 4. Portrait photo on the right side
    photo_path = os.path.join(public_dir, 'profile-photo.jpg')
    portrait_size = 230
    portrait_x = 880
    portrait_y = 130
    
    draw.ellipse(
        [(portrait_x - 8, portrait_y - 8), (portrait_x + portrait_size + 8, portrait_y + portrait_size + 8)],
        outline=(25, 25, 25),
        width=1
    )
    portrait = create_circular_portrait(photo_path, portrait_size, border_color=(255, 76, 36), border_width=3)
    im.paste(portrait, (portrait_x, portrait_y), portrait)
    
    # Portrait caption badge
    badge_text = "● ACTIVE IN PRODUCTION"
    badge_font = get_font('mono', 10, bold=True)
    bbx = badge_font.getbbox(badge_text)
    bw = bbx[2] - bbx[0] + 20
    draw.rounded_rectangle(
        [(portrait_x + (portrait_size - bw) // 2, portrait_y + portrait_size + 14),
         (portrait_x + (portrait_size + bw) // 2, portrait_y + portrait_size + 36)],
        radius=4, fill=(12, 12, 12), outline=(32, 32, 32), width=1
    )
    draw.text((portrait_x + (portrait_size - bw) // 2 + 10, portrait_y + portrait_size + 19), badge_text, font=badge_font, fill=(16, 185, 129))
    
    # 5. Left Column Content
    headline_font = get_font('sans', 48, bold=True)
    draw.text((60, 115), "Build at the frontier.", font=headline_font, fill=white_color)
    
    subhead_font = get_font('sans', 24, bold=True)
    draw.text((62, 182), "Java Backend Engineer & Distributed Systems", font=subhead_font, fill=coral_color)
    
    desc_font = get_font('sans', 15, bold=False)
    desc_line1 = "Production Spring Boot 3 backends, Apache Kafka event ingestion, Redis caching,"
    desc_line2 = "and PostgreSQL query tuning across enterprise healthcare & ATS platforms on AWS."
    draw.text((62, 222), desc_line1, font=desc_font, fill=(180, 180, 180))
    draw.text((62, 246), desc_line2, font=desc_font, fill=(180, 180, 180))
    
    # 6. Three Telemetry Cards on Left
    metrics_y = 300
    m_w = 240
    m_h = 105
    m_gap = 20
    
    metrics = [
        ("2+ Years", "PRODUCTION EXP", "Techforce Infotech · L1"),
        ("-74% DB Load", "QUERY OPTIMIZATION", "Eliminated N+1 queries"),
        ("99.9% Uptime", "KAFKA EVENT STREAMS", "-64% peak latency on AWS")
    ]
    
    for i, (val, label, sub) in enumerate(metrics):
        mx = 60 + i * (m_w + m_gap)
        draw.rounded_rectangle([(mx, metrics_y), (mx + m_w, metrics_y + m_h)], radius=6, fill=(12, 12, 12), outline=(30, 30, 30), width=1)
        draw.rounded_rectangle([(mx, metrics_y), (mx + 4, metrics_y + m_h)], radius=2, fill=coral_color)
        
        v_font = get_font('sans', 28, bold=True)
        draw.text((mx + 16, metrics_y + 14), val, font=v_font, fill=white_color)
        
        l_font = get_font('mono', 10, bold=True)
        draw.text((mx + 16, metrics_y + 54), label, font=l_font, fill=coral_color)
        
        s_font = get_font('sans', 11, bold=False)
        draw.text((mx + 16, metrics_y + 76), sub, font=s_font, fill=muted_color)
        
    # 7. Bottom Tags Bar
    bottom_y = 550
    b_font = get_font('mono', 11, bold=False)
    draw.text((60, bottom_y), "JAVA 21  ·  SPRING BOOT  ·  KAFKA  ·  REDIS  ·  AWS  ·  POSTGRESQL  ·  DOCKER", font=b_font, fill=(160, 160, 160))
    
    url_font = get_font('mono', 13, bold=True)
    draw.text((950, bottom_y - 2), "vivekparmar.is-a.dev", font=url_font, fill=coral_color)
    
    out_png = os.path.join(public_dir, 'og-card.png')
    im.save(out_png, format='PNG', quality=95)
    print(f"Generated wide og card: {out_png} ({W}x{H})")
    
    # Also save as og-image.png and og-image.jpg for backwards compatibility with crawlers
    im.save(os.path.join(public_dir, 'og-image.png'), format='PNG', quality=95)
    im.save(os.path.join(public_dir, 'og-image.jpg'), format='JPEG', quality=92)
    print("Updated og-image.png and og-image.jpg with new card")

if __name__ == '__main__':
    generate_square_preview_card()
    generate_wide_og_card()

