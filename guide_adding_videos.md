# How to Add New Videos to Your Portfolio

This guide explains how to add new video projects to your portfolio website.

## 1. Prepare Your Assets

### Thumbnail Image

1. Create a thumbnail image for your video.
   - **Recommended size:** 1280×720 pixels (16:9 aspect ratio).
   - **Format:** JPG or PNG (WebP is also fine in modern browsers).
2. Save the image in the `assets/images/` folder.
   - Use a descriptive name, e.g. `project-name-thumb.jpg`.

### Video Link

1. Upload your video to YouTube or Vimeo.
2. Get the **embed URL** (not the regular watch link).
   - **YouTube:** Share → Embed → copy the `src` URL (e.g. `https://www.youtube.com/embed/VIDEO_ID`).
   - **Vimeo:** Share → embed code → copy the `src` URL.

**Visibility:** Private YouTube videos will not play on your site. Use **Unlisted** (or Public) for portfolio embeds.

## 2. Add HTML

1. Open `index.html`.
2. Find `<section id="portfolio" ...>` and the `<div class="video-grid">` container.
3. Paste a new block **before** the closing `</div>` of `video-grid` (copy an existing `.video-item` as a template).

Use this pattern (matches `js/script.js` — **do not** use `onclick` or a global `openModal`):

```html
<div class="video-item" data-category="long-form" data-aos="fade-up">
    <div class="video-thumbnail">
        <img src="assets/images/your-thumbnail.jpg" alt="Thumbnail: Your video title" class="thumbnail-img"
            width="1280" height="720" loading="lazy">
        <div class="video-overlay">
            <button type="button" class="play-btn" data-video="https://www.youtube.com/embed/VIDEO_ID"
                aria-label="Play video: Your video title">
                <i class="fas fa-play" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    <div class="video-info">
        <h3>Your Video Title</h3>
        <p>Short description (1–2 sentences).</p>
        <span class="video-category">Long Form</span>
    </div>
</div>
```

Clicking anywhere on the card opens the modal; the embed URL comes from `data-video` on the `.play-btn`.

## 3. Placeholders

| Placeholder | Replace with |
|-------------|----------------|
| `data-category` | One of: `long-form`, `shorts`, `2d-animations`, `viral-edits` |
| `src` on `<img>` | Path to your thumbnail in `assets/images/` |
| `data-video` | Full YouTube/Vimeo **embed** URL (no watch URL) |
| `video-category` text | Label shown on the card (e.g. "Long Form", "Shorts") |

## 4. Save and Test

1. Save `index.html`.
2. Refresh the site (use a local server if possible).
3. Confirm the card appears, filters work, and play opens the correct video.

## Example

```html
<div class="video-item" data-category="shorts" data-aos="fade-up">
    <div class="video-thumbnail">
        <img src="assets/images/gaming-highlights.jpg" alt="Thumbnail: Gaming highlights" class="thumbnail-img"
            width="1280" height="720" loading="lazy">
        <div class="video-overlay">
            <button type="button" class="play-btn" data-video="https://www.youtube.com/embed/VIDEO_ID"
                aria-label="Play video: Gaming highlights">
                <i class="fas fa-play" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    <div class="video-info">
        <h3>Gaming Highlights</h3>
        <p>Fast montage with beat-synced cuts.</p>
        <span class="video-category">Shorts</span>
    </div>
</div>
```

Replace `VIDEO_ID` with your real embed path.
