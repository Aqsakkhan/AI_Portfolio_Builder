# AI Portfolio Builder

A full-stack AI-powered portfolio builder application that allows developers to create stunning professional portfolios with AI-enhanced content.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router v6
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **AI**: OpenAI API (gpt-3.5-turbo)

## Features

- 🎨 **3 Templates**: Minimal, Developer (dark/terminal), and Creative (gradient)
- 🤖 **AI Enhancement**: Enhance bio, project descriptions, and work experience with GPT-3.5
- 💡 **AI Skill Suggestions**: Auto-suggest relevant skills based on your bio and projects
- 📄 **PDF Export**: Download your portfolio as PDF using browser print
- 🌐 **Publish & Share**: Get a unique shareable URL for your portfolio
- 📱 **Responsive Design**: Works on all screen sizes

## Project Structure

```
AI_Portfolio_Builder/
├── backend/
│   ├── models/
│   │   └── Portfolio.js
│   ├── routes/
│   │   ├── ai.js
│   │   └── portfolio.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js
│   │   ├── components/
│   │   │   ├── templates/
│   │   │   │   ├── CreativeTemplate.jsx
│   │   │   │   ├── DeveloperTemplate.jsx
│   │   │   │   └── MinimalTemplate.jsx
│   │   │   └── ui/
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── Navbar.jsx
│   │   │       ├── SkillTag.jsx
│   │   │       └── StepIndicator.jsx
│   │   ├── pages/
│   │   │   ├── Builder.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── PortfolioView.jsx
│   │   │   └── Preview.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- OpenAI API Key (optional - app works without it with fallbacks)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with VITE_API_URL=http://localhost:5000
npm run dev
```

### Environment Variables

**Backend** (`backend/.env`):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai_portfolio_builder
OPENAI_API_KEY=your_openai_api_key_here
```

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:5000
```

## API Endpoints

### Portfolio
- `POST /api/portfolio` - Create portfolio
- `GET /api/portfolio/:slug` - Get portfolio by slug
- `PUT /api/portfolio/:slug` - Update portfolio
- `DELETE /api/portfolio/:slug` - Delete portfolio
- `POST /api/portfolio/:slug/publish` - Publish portfolio

### AI
- `POST /api/ai/enhance-bio` - Enhance bio with AI
- `POST /api/ai/enhance-project` - Enhance project description
- `POST /api/ai/enhance-experience` - Enhance work experience
- `POST /api/ai/suggest-skills` - Suggest skills based on bio/projects

## License

MIT
