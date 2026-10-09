# Waqas Ahmad — Portfolio

This repository contains my personal portfolio website:

**[connect2waqas.github.io](https://connect2waqas.github.io/)**

I built it to introduce myself, share the projects I am working on, and make it easy for recruiters and other developers to find my CV and contact me.

## About me

I am studying for a B.S. in Artificial Intelligence at the University of Haripur and currently working as an AI Engineering Intern at Decode Labs. My main interests are Python development, data structures and algorithms, object-oriented programming, data analysis, and practical AI systems.

## What the site includes

- A short introduction and current availability
- Selected Python and AI-related projects
- GitHub repository feed
- Academic background and current coursework
- Technical skills and tools
- Downloadable PDF and Word versions of my CV
- GitHub, LinkedIn, and email contact links
- A visitor message form backed by a serverless API

## Tech used

- Semantic HTML
- Tailwind CSS through the Play CDN
- Vanilla JavaScript
- GitHub REST API
- Vercel serverless functions
- Supabase PostgreSQL for visitor messages

## Run it locally

This is a mostly static site, so it can be opened with any local static server. For example, with Python installed:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a browser.

The visitor log needs the serverless API and its environment variables to work. Copy the example configuration files before testing that feature locally:

```bash
copy .env.example .env.local
copy supabase-config.example.js supabase-config.js
```

Do not commit `.env.local` or `supabase-config.js`; they contain local configuration and are ignored by Git.

## Project layout

```text
.
├── api/
│   └── visitor-log.js       # Serverless visitor message endpoint
├── assets/
│   ├── Waqas_Ahmad_CV.pdf   # Downloadable CV
│   ├── Waqas_Ahmad_CV.docx  # Editable CV
│   └── ...                  # Profile and branding assets
├── index.html                # Portfolio page and client-side logic
└── README.md
```

## Deployment

The site is deployed on Vercel and can be updated by pushing changes to the `main` branch. The public site is also compatible with GitHub Pages for the static portion; the visitor log requires the serverless API deployment.

## Contact

- Email: [waqasnadan972@gmail.com](mailto:waqasnadan972@gmail.com)
- GitHub: [@connect2waqas](https://github.com/connect2waqas)
- LinkedIn: [Waqas Ahmad](https://linkedin.com/in/waqas-ahmad-578727286)
