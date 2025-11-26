#!/usr/bin/env python3
"""
Script to add floating software icons to index.html (Subtle Version)
"""

def add_floating_icons():
    # Read the index.html file
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print("❌ Error: index.html not found")
        return False
    
    # Add CSS link in head section
    css_link = '    <link rel="stylesheet" href="css/floating-icons.css">'
    
    if css_link not in content:
        # Find the location to insert (after style.css)
        style_css_line = '    <link rel="stylesheet" href="css/style.css">'
        if style_css_line in content:
            content = content.replace(
                style_css_line,
                style_css_line + '\n' + css_link
            )
            print("✅ Added floating-icons.css link to head")
        else:
            print("⚠️ Could not find style.css link, skipping CSS injection")
    else:
        print("ℹ️  CSS link already exists")
    
    # Floating icons HTML
    icons_html = '''        <!-- Floating Software Icons with 3D Depth Effect -->
        
        <!-- FAR LAYER (Background - Small, Blurred) -->
        <div class="floating-icon icon-far icon-1"><img src="assets/icons/filmora.png" alt="Filmora"></div>
        <div class="floating-icon icon-far icon-2"><img src="assets/icons/capcut.png" alt="CapCut"></div>
        <div class="floating-icon icon-far icon-3 icon-text">Pr</div>
        <div class="floating-icon icon-far icon-4 icon-text">Ae</div>
        <div class="floating-icon icon-far icon-5"><img src="assets/icons/filmora.png" alt="Filmora"></div>
        <div class="floating-icon icon-far icon-6"><img src="assets/icons/capcut.png" alt="CapCut"></div>
        
        <!-- MID LAYER (Midground - Medium Size) -->
        <div class="floating-icon icon-mid icon-7 icon-text">Pr</div>
        <div class="floating-icon icon-mid icon-8 icon-text">Ae</div>
        <div class="floating-icon icon-mid icon-9"><img src="assets/icons/filmora.png" alt="Filmora"></div>
        <div class="floating-icon icon-mid icon-10"><img src="assets/icons/capcut.png" alt="CapCut"></div>
        <div class="floating-icon icon-mid icon-11 icon-text">Pr</div>
        <div class="floating-icon icon-mid icon-12"><img src="assets/icons/filmora.png" alt="Filmora"></div>
        
        <!-- NEAR LAYER (Foreground - Large, Sharp) -->
        <div class="floating-icon icon-near icon-13 icon-text">Ae</div>
        <div class="floating-icon icon-near icon-14"><img src="assets/icons/capcut.png" alt="CapCut"></div>
        <div class="floating-icon icon-near icon-15 icon-text">Pr</div>
        <div class="floating-icon icon-near icon-16"><img src="assets/icons/filmora.png" alt="Filmora"></div>
        <div class="floating-icon icon-near icon-17 icon-text">Ae</div>
        <div class="floating-icon icon-near icon-18"><img src="assets/icons/capcut.png" alt="CapCut"></div>
'''
    
    # Find and replace the motion shapes section
    motion_shapes_start = '        <!-- 2D Motion Graphics Shapes -->'
    motion_shapes_end = '        <div class="motion-shape shape-icon shape-10"><i class="fas fa-photo-video"></i></div>'
    
    if motion_shapes_start in content and motion_shapes_end in content:
        # Find the section to replace
        start_idx = content.find(motion_shapes_start)
        end_idx = content.find(motion_shapes_end) + len(motion_shapes_end)
        
        # Replace with floating icons
        content = content[:start_idx] + icons_html + content[end_idx:]
        print("✅ Replaced motion shapes with floating software icons")
    elif 'floating-icon' in content:
        print("ℹ️  Floating icons already exist")
    else:
        print("❌ Could not find motion shapes section to replace")
        return False
    
    # Write the updated content
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("\n🎉 Successfully updated index.html!")
    print("   - Added 18 floating software icons")
    print("   - 3 depth layers (far/mid/near)")
    print("   - Icons: Pr, Ae, CapCut, Filmora")
    return True

if __name__ == '__main__':
    try:
        add_floating_icons()
    except Exception as e:
        print(f"❌ Error: {e}")
        exit(1)
