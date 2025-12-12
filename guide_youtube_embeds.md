# YouTube Video Guide

## 1. Private vs. Unlisted (CRITICAL)
You mentioned your videos are **Private**.
- **Private**: Only YOU can see them. They will **NOT** work on your website.
- **Unlisted**: Hidden from your channel/search, but **anyone with the link (like your website visitors) can see them**.

**Action Required**: Go to your YouTube Studio and change the visibility of all portfolio videos from "Private" to **"Unlisted"**.

## 2. Getting Embed Codes for Many Videos
If you have a lot of videos, doing them one by one is tedious. I have created a small tool below.

### Bulk Embed Code Generator
1.  Copy the list of your YouTube links (e.g., from a spreadsheet or text file).
2.  Open your browser's "Console" (Right-click on your website -> Inspect -> Console).
3.  Paste the following code into the console and press Enter:

```javascript
function generateVideoGrid(urls) {
    const videoGrid = urls.map(url => {
        // Extract Video ID
        let videoId = '';
        if (url.includes('youtu.be')) {
            videoId = url.split('/').pop();
        } else if (url.includes('youtube.com')) {
            const urlParams = new URLSearchParams(new URL(url).search);
            videoId = urlParams.get('v');
        }

        if (!videoId) return '';

        return `
            <!-- Video Item -->
            <div class="video-item" data-category="long-form" data-aos="fade-up">
                <div class="video-thumbnail">
                    <div class="thumbnail-placeholder">
                        <i class="fas fa-play-circle"></i>
                    </div>
                    <div class="video-overlay">
                        <button class="play-btn" data-video="https://www.youtube.com/embed/${videoId}">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                    <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" 
                         style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1;" 
                         alt="Video Thumbnail">
                </div>
                <div class="video-info">
                    <h3>Video Title</h3>
                    <p>Description...</p>
                    <span class="video-category">Category</span>
                </div>
            </div>`;
    }).join('\n');

    console.log(videoGrid);
    return videoGrid;
}

// USAGE:
// Replace the links below with your actual video links
const myVideos = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://youtu.be/dQw4w9WgXcQ",
    // ... add more links here
];

generateVideoGrid(myVideos);
```

4.  The console will print out the HTML code for all your videos.
5.  Copy that HTML and paste it into the `video-grid` section of your `index.html`.

## 3. Thumbnails
The code above automatically tries to fetch the **high-quality thumbnail** from YouTube (`maxresdefault.jpg`). This saves you from having to upload images manually!
