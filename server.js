// --- Server for AI Video Weaver ---
// This code is ready for deployment on services like Render.

const express = require('express');
const cors = require('cors');
const app = express();
// Use the port provided by the environment (like Render), or 3001 for local development
const port = 'https://video-1-1wqs.onrender.com';

// --- Middleware ---
// Enable CORS for all routes to allow requests from the React app
app.use(cors());
// Enable parsing of JSON bodies in requests
app.use(express.json());

/**
 * Simulates the AI video generation process.
 * In a real application, this function would:
 * 1. Call a language model to break the prompt into scenes.
 * 2. Call a text-to-video AI model for each scene.
 * 3. Use a tool like FFmpeg to stitch the video clips together.
 */
const simulateVideoGeneration = (prompt) => {
    if (!prompt) return { clips: [], finalVideoUrl: null };

    // 1. Simulate breaking prompt into clips
    const keywords = prompt.split(' ').filter(word => word.length > 3);
    const count = Math.floor(Math.random() * 5) + 4; // 4 to 8 clips
    const clips = Array.from({ length: count }, (_, i) => ({
        id: `server_clip_${Date.now()}_${i}`,
        description: `Cảnh ${i + 1}: ${keywords[i % keywords.length] || 'phong cảnh rộng'}`,
        // In a real app, this URL would point to the generated clip
        thumbnailUrl: `https://placehold.co/400x225/8d2a2a/ffffff?text=${encodeURIComponent(`Cảnh ${i+1}`)}`,
        status: 'done', // Mark as done since the server handles generation
    }));

    // 2. Simulate final video URL
    const finalVideoUrl = `https://placehold.co/1280x720/000000/ffffff?text=${encodeURIComponent('Video từ Server: ' + prompt)}`;

    return { clips, finalVideoUrl };
};

// --- API Endpoint ---
app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log(`Received generation request for prompt: "${prompt}"`);

    // Simulate the time it takes for the AI to work
    console.log('Simulating AI analysis and video generation...');
    await new Promise(resolve => setTimeout(resolve, 3500)); // Simulate a 3.5-second process

    const result = simulateVideoGeneration(prompt);

    console.log('Generation complete. Sending response.');
    res.json(result);
});

// --- Start Server ---
app.listen(port, () => {
    console.log(`AI Video Weaver server listening at http://localhost:${port}`);
});
