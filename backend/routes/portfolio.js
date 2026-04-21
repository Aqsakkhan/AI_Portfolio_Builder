const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { nanoid } = require('nanoid');
const Portfolio = require('../models/Portfolio');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(limiter);

function generateSlug(name) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 30);
  return `${base}-${nanoid(6)}`;
}

// Sanitize slug to allow only safe characters
function sanitizeSlug(slug) {
  return String(slug).replace(/[^a-z0-9-]/g, '');
}

// POST /api/portfolio - create
router.post('/', async (req, res) => {
  const { name, template, bio, skills, projects, experience, contact } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const slug = generateSlug(name);
  const portfolio = new Portfolio({
    slug,
    name,
    template: template || 'minimal',
    bio,
    skills: skills || [],
    projects: projects || [],
    experience: experience || [],
    contact: contact || {},
  });

  await portfolio.save();
  res.status(201).json(portfolio);
});

// GET /api/portfolio/:slug - get by slug
router.get('/:slug', async (req, res) => {
  const slug = sanitizeSlug(req.params.slug);
  const portfolio = await Portfolio.findOne({ slug });
  if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });
  res.json(portfolio);
});

// PUT /api/portfolio/:slug - update
router.put('/:slug', async (req, res) => {
  const slug = sanitizeSlug(req.params.slug);
  const portfolio = await Portfolio.findOneAndUpdate(
    { slug },
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });
  res.json(portfolio);
});

// DELETE /api/portfolio/:slug - delete
router.delete('/:slug', async (req, res) => {
  const slug = sanitizeSlug(req.params.slug);
  const portfolio = await Portfolio.findOneAndDelete({ slug });
  if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });
  res.json({ message: 'Portfolio deleted successfully' });
});

// POST /api/portfolio/:slug/publish - publish
router.post('/:slug/publish', async (req, res) => {
  const slug = sanitizeSlug(req.params.slug);
  const portfolio = await Portfolio.findOneAndUpdate(
    { slug },
    { $set: { isPublished: true } },
    { new: true }
  );
  if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });
  res.json({ message: 'Portfolio published', slug: portfolio.slug, portfolio });
});

module.exports = router;
