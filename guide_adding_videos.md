# How to Add New Videos to Your Portfolio

This guide explains how to add new video projects to your portfolio website.

## 1. Prepare Your Assets

### Thumbnail Image
1.  Create a thumbnail image for your video.
    *   **Recommended Size:** 1280x720 pixels (16:9 aspect ratio).
    *   **Format:** JPG or PNG.
2.  Save the image in the `assets/images/` folder.
    *   Give it a descriptive name, e.g., `project-name-thumb.jpg`.

### Video Link
1.  Upload your video to YouTube or Vimeo.
2.  Get the **Embed URL** (not the regular watch link).
    *   **YouTube:** Click Share -> Embed -> Copy the `src` URL (e.g., `https://www.youtube.com/embed/VIDEO_ID`).
    *   **Vimeo:** Click Share -> Get the embed code -> Copy the `src` URL.

## 2. Add HTML Code

1.  Open `index.html` in a text editor (like VS Code or Notepad).
2.  Find the **Portfolio Section** (`<section id="portfolio" ...>`).
3.  Locate the `<div class="video-grid">` container.
4.  Copy the code block below and paste it inside the `video-grid`, after the last `.video-item`.

```html
<!-- New Video Item -->
<div class="video-item" data-category="CATEGORY_NAME" data-aos="fade-up">
    <div class="video-thumbnail">
        <img src="assets/images/YOUR_THUMBNAIL.jpg" alt="Video Title" class="thumbnail-img">
        <div class="video-overlay">
            <button class="play-btn" onclick="openModal('VIDEO_EMBED_URL')">
                <i class="fas fa-play"></i>
            </button>
        </div>
    </div>
    <div class="video-info">
        <div class="video-category">CATEGORY_DISPLAY_NAME</div>
        <h3>Video Title Here</h3>
        <p>Short description of the project (1-2 sentences).</p>
    </div>
</div>
```

## 3. Customize the Code

Replace the placeholders in the code you just pasted:

*   **`CATEGORY_NAME`**: The category filter key. Must be one of:
    *   `long-form`
    *   `shorts`
    *   `2d-animations`
    *   `viral-edits`
*   **`CATEGORY_DISPLAY_NAME`**: The text shown on the card (e.g., "Long Form", "Shorts", "2D Animation").
*   **`assets/images/YOUR_THUMBNAIL.jpg`**: The path to your thumbnail image.
*   **`VIDEO_EMBED_URL`**: The YouTube/Vimeo embed URL you copied earlier.
*   **`Video Title Here`**: The title of your project.
*   **`Short description...`**: A brief description of what you did.

## 4. Save and Test

1.  Save the `index.html` file.
2.  Refresh your website in the browser.
3.  Check if the new video card appears in the Portfolio section.
4.  Click the "Play" button to ensure the video opens correctly in the modal.
5.  Test the category filters to make sure your video appears under the correct category.

## Example

Here is a complete example for a "Gaming Highlights" video:

```html
<div class="video-item" data-category="long-form" data-aos="fade-up">
    <div class="video-thumbnail">
        <img src="assets/images/gaming-highlights.jpg" alt="Pubg Mobile Highlights" class="thumbnail-img">
        <div class="video-overlay">
            <button class="play-btn" onclick="openModal('https://www.youtube.com/embed/dQw4w9WgXcQ')">
                <i class="fas fa-play"></i>
            </button>
        </div>
    </div>
    <div class="video-info">
        <div class="video-category">Long Form</div>
        <h3>Pubg Mobile Highlights</h3>
        <p>High-energy gaming montage with beat-synced editing and visual effects.</p>
    </div>
</div>
```
