#!/usr/bin/env node

/**
 * Script to generate Open Graph image for BPE Tokenizer Visualizer
 * 
 * Instructions:
 * 1. Install puppeteer: npm install puppeteer --save-dev
 * 2. Run this script: node generate-og-image.js
 * 3. The og-image.png will be created in the public folder
 */

const puppeteer = require('puppeteer');
const path = require('path');

async function generateOGImage() {
    console.log('🚀 Starting Open Graph image generation...');
    
    try {
        // Launch browser
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Set viewport to exact OG image dimensions
        await page.setViewport({
            width: 1200,
            height: 630,
            deviceScaleFactor: 2 // Higher resolution
        });
        
        // Load the HTML file
        const htmlPath = path.join(__dirname, 'public', 'og-image-generator.html');
        await page.goto(`file://${htmlPath}`, {
            waitUntil: 'networkidle0'
        });
        
        // Wait for animations to settle
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Take screenshot
        const screenshot = await page.screenshot({
            type: 'png',
            fullPage: false,
            path: path.join(__dirname, 'public', 'og-image.png')
        });
        
        console.log('✅ Open Graph image generated successfully!');
        console.log('📁 Image saved to: public/og-image.png');
        console.log('📏 Dimensions: 1200x630 pixels');
        
        await browser.close();
        
    } catch (error) {
        console.error('❌ Error generating image:', error);
        process.exit(1);
    }
}

// Run the script
generateOGImage();
