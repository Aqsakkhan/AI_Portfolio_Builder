const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(aiLimiter);

let openai = null;
try {
  const OpenAI = require('openai');
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
} catch (e) {
  console.warn('OpenAI not initialized:', e.message);
}

async function callOpenAI(prompt) {
  if (!openai) {
    return null; // fallback will be used
  }
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500,
    temperature: 0.7,
  });
  return completion.choices[0].message.content.trim();
}

// POST /api/ai/enhance-bio
router.post('/enhance-bio', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  const prompt = `Rewrite the following bio professionally for a software developer portfolio. Make it compelling and concise (2-3 sentences). Bio: ${text}`;
  const result = await callOpenAI(prompt);

  if (!result) {
    return res.json({
      enhanced: text,
      note: 'AI enhancement unavailable. Original text returned.',
    });
  }
  res.json({ enhanced: result });
});

// POST /api/ai/enhance-project
router.post('/enhance-project', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  const prompt = `Rewrite the following project description professionally for a developer portfolio. Highlight technical details and impact. Description: ${text}`;
  const result = await callOpenAI(prompt);

  if (!result) {
    return res.json({
      enhanced: text,
      note: 'AI enhancement unavailable. Original text returned.',
    });
  }
  res.json({ enhanced: result });
});

// POST /api/ai/suggest-skills
router.post('/suggest-skills', async (req, res) => {
  const { bio, projects } = req.body;
  if (!bio && !projects) return res.status(400).json({ error: 'Bio or projects required' });

  const projectsText = Array.isArray(projects)
    ? projects.map((p) => p.description || p.title).join(', ')
    : projects || '';

  const prompt = `Based on the following bio and projects, suggest a list of relevant technical skills (return as comma-separated list, no explanations). Bio: ${bio || ''}. Projects: ${projectsText}`;
  const result = await callOpenAI(prompt);

  if (!result) {
    return res.json({
      skills: [],
      note: 'AI suggestion unavailable.',
    });
  }
  const skills = result
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  res.json({ skills });
});

// POST /api/ai/enhance-experience
router.post('/enhance-experience', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  const prompt = `Rewrite the following work experience description professionally. Highlight achievements and impact. Description: ${text}`;
  const result = await callOpenAI(prompt);

  if (!result) {
    return res.json({
      enhanced: text,
      note: 'AI enhancement unavailable. Original text returned.',
    });
  }
  res.json({ enhanced: result });
});

module.exports = router;
