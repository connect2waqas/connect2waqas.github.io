# Waqas Ahmad | AI & Python Engineer Portfolio

Personal portfolio website engineered with clean architectural principles, responsive design, and dynamic backend integration.

## 🚀 Overview
- **Developer**: Waqas Ahmad ([@connect2waqas](https://github.com/connect2waqas))
- **Program**: B.S. Artificial Intelligence &bull; University of Haripur
- **Internship**: AI Engineering Intern at Decode Labs (Remote)
- **Location**: Haripur, Pakistan

---

## 🛠️ System Architecture & Technology Stack

- **Presentation Layer (External Schema)**: Semantic HTML5, Tailwind CSS (via Play CDN), Vanilla JavaScript (ES6+).
- **Dynamic API Layer**: Real-time asynchronous GitHub REST API consumption with client-side DOM hydration and XSS escaping.
- **Data Persistence Layer (Conceptual Schema)**: Cloud PostgreSQL database hosted on **Supabase** with Row-Level Security (RLS) policies.
- **Hosting & CI/CD**: Global edge deployment via **Vercel** with automatic continuous deployment on `git push`.

---

## 📂 Project Structure

```text
connect2waqas.github.io/
├── index.html        # Complete single-page application (Structure, Styles, Scripts)
├── README.md         # Architecture overview & documentation
└── .gitignore        # Version control ignore patterns
```

---

## 🔒 Database Schema (PostgreSQL)

```sql
CREATE TABLE public.visitor_log (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    role TEXT,
    message TEXT NOT NULL
);

ALTER TABLE public.visitor_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.visitor_log FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public insert" ON public.visitor_log FOR INSERT TO anon WITH CHECK (true);
```
