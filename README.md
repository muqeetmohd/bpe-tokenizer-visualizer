# BPE Tokenizer Visualizer

A beautiful, animated web application that visualizes the Byte Pair Encoding (BPE) process step by step.

## Features

- **Interactive Tokenization**: Enter any sentence and watch it get tokenized using BPE
- **Step-by-Step Animation**: Smooth animations showing token merging process
- **Visual Controls**: Play, pause, and navigate through steps manually
- **Progress Tracking**: Real-time progress indicator and step counter
- **Vocabulary Viewer**: Modal showing all tokens in the vocabulary
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- Node.js (v14 or higher)
- A running Spring Boot backend API at `
http://localhost:8080/api/bpe`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Integration

The frontend expects a Spring Boot backend API with the following endpoint:

**POST** `http://localhost:8080/api/bpe`

**Request Body:**
```json
{
  "sentence": "lower",
  "num_merges": 10
}
```

**Response:**
```json
{
  "steps": [
    { "tokens": ["l","o","w","</w>"], "merged": null },
    { "tokens": ["lo","w","</w>"], "merged": ["l","o"] },
    { "tokens": ["lo","we","r","</w>"], "merged": ["w","e"] },
    { "tokens": ["lo","wer","</w>"], "merged": ["r","</w>"] }
  ],
  "vocab_size": 7
}
```

## Usage

1. Enter a sentence in the input field
2. Optionally adjust the number of merges (default: 10)
3. Click "Run Tokenization" to start the process
4. Use the play/pause and navigation controls to explore the steps
5. Click "Vocabulary Size" to view all tokens

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Fetch API** for backend communication
- **CSS Animations** for smooth transitions

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx           # Top navigation bar
│   ├── InputSection.tsx     # Sentence input and controls
│   ├── Controls.tsx         # Play/pause/navigation buttons
│   ├── Visualization.tsx    # Main token visualization
│   ├── StepIndicator.tsx    # Progress and step counter
│   └── VocabularyModal.tsx  # Vocabulary popup modal
├── App.tsx                  # Main application component
├── index.tsx               # Application entry point
└── index.css               # Global styles with Tailwind
```

## Color Scheme

- **Background**: Light gray (#f5f5f5)
- **Tokens**: Light gray (#e5e7eb) for default, colored for merged
- **Navbar**: Dark gray (#1f2937)
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Merge Colors**: Yellow, Blue, Green, Amber, Violet, Red, Cyan, Lime, Orange, Pink

## Development

The app uses Create React App with TypeScript and Tailwind CSS. All components are functional components with TypeScript interfaces for type safety.

To build for production:
```bash
npm run build
```