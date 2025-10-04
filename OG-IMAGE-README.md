# Open Graph Image Generation

This guide will help you generate a custom Open Graph image for your BPE Tokenizer Visualizer website.

## What's Already Done ✅

1. **Open Graph Meta Tags Added** - Added comprehensive meta tags to `public/index.html`
2. **Twitter Card Support** - Added Twitter-specific meta tags
3. **Manifest Updated** - Updated `manifest.json` with proper app metadata
4. **Image Generator Created** - Created `public/og-image-generator.html` for the visual design

## How to Generate the Open Graph Image

### Option 1: Using Puppeteer (Recommended)

1. **Install Puppeteer** (if not already installed):
   ```bash
   npm install puppeteer --save-dev
   ```

2. **Generate the image**:
   ```bash
   npm run generate-og
   ```

3. **The image will be created** at `public/og-image.png` (1200x630 pixels)

### Option 2: Manual Screenshot

1. **Open the generator** in your browser:
   ```
   file:///path/to/your/project/public/og-image-generator.html
   ```

2. **Take a screenshot** at exactly 1200x630 pixels
3. **Save as** `public/og-image.png`

### Option 3: Online Tools

You can also use online tools like:
- [Canva](https://canva.com) - Create a 1200x630 image
- [Figma](https://figma.com) - Design and export
- [Adobe Express](https://express.adobe.com) - Quick design tool

## Image Design Features

The generated image includes:
- **Branded gradient background** matching your app's theme
- **Animated token previews** showing BPE in action
- **Clear title and description** explaining the tool
- **Feature highlights** with icons
- **Professional layout** optimized for social sharing

## Testing Your Open Graph Tags

### Facebook/Meta Debugger
1. Go to [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Enter your website URL
3. Click "Debug" to see how it will appear

### Twitter Card Validator
1. Go to [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Enter your website URL
3. Preview how it will look on Twitter

### LinkedIn Post Inspector
1. Go to [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
2. Enter your website URL
3. See how it appears on LinkedIn

## Customization

To customize the Open Graph image:

1. **Edit the design** in `public/og-image-generator.html`
2. **Update colors** to match your brand
3. **Modify text** and descriptions
4. **Add your logo** or branding elements
5. **Regenerate** using the methods above

## Meta Tags Included

The following meta tags have been added to your `index.html`:

- `og:title` - Page title for social sharing
- `og:description` - Description for social sharing
- `og:image` - The 1200x630 image
- `og:url` - Your website URL
- `og:type` - Website type
- `twitter:card` - Twitter card type
- `twitter:title` - Twitter-specific title
- `twitter:description` - Twitter-specific description
- `twitter:image` - Twitter-specific image

## Next Steps

1. **Generate the image** using one of the methods above
2. **Test the sharing** on different platforms
3. **Deploy your changes** to see the results
4. **Share your link** and see the beautiful preview!

## Troubleshooting

- **Image not showing?** Make sure `og-image.png` exists in the `public` folder
- **Wrong dimensions?** Ensure the image is exactly 1200x630 pixels
- **Not updating?** Clear your browser cache and try the debugger tools
- **Still showing React logo?** Wait a few minutes for social media caches to update

Your BPE Tokenizer Visualizer will now have a professional, branded appearance when shared on social media! 🎉
