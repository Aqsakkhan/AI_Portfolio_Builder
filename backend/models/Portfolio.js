const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
});

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  duration: String,
  description: String,
});

const contactSchema = new mongoose.Schema({
  email: String,
  github: String,
  linkedin: String,
  website: String,
});

const portfolioSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  template: {
    type: String,
    enum: ['minimal', 'developer', 'creative'],
    default: 'minimal',
  },
  name: String,
  bio: String,
  skills: [String],
  projects: [projectSchema],
  experience: [experienceSchema],
  contact: contactSchema,
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
