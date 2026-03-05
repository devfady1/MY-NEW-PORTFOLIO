# 🚀 Ultra-Animated Portfolio | Fady Ashraf & Nexus Code

A "Never-Seen-Before" personal portfolio website built with **Django**, **GSAP**, and **Tailwind CSS**. This project follows a "Zero Static Elements" philosophy, where every component, text, and interaction is infused with high-end animations and micro-interactions.

![Portfolio Preview](https://raw.githubusercontent.com/devfady1/MY-NEW-PORTFOLIO/main/preview.png) *(Note: Placeholder for preview image)*

## ✨ Key Features

- **🎯 Zero Static Elements**: Every section, button, and text element has smooth entrance and scroll-triggered animations.
- **🛡️ Nexus Branding**: Deeply integrated branding for **Fady Ashraf** and **Nexus Code**.
- **💥 Animated NEXUS Logo**: A per-character animated navbar logo with gradient cycling, wave floats, glow pulses, and interactive hover scatter effects.
- **🧲 Magnetic Interaction**: Interactive elements (buttons, links) pull towards the cursor with a realistic magnetic snap-back effect.
- **🌌 Tech Universe Skills**: Skills displayed in a dynamic orbiting layout with floating animations.
- **🃏 3D Project Cards**: Work items feature a realistic 3D tilt effect that reacts to mouse movement.
- **📈 Dynamic Content**: Powered by a Django backend with a custom seeder for instantaneous project/skill/review management.
- **📱 Ultra-Responsive**: Fluid typography and dynamic viewport units ensure a flawless experience on Mobiles, Tablets, and Ultra-wide monitors.
- **📧 AJAX Contact Form**: Seamless message submission with built-in CSRF protection and animated state feedback.

## 🛠️ Tech Stack

- **Backend**: Python / Django
- **Frontend**: HTML5, Vanilla JavaScript, CSS3
- **Animations**: GSAP (ScrollTrigger, ScrollTo, Custom Tweens)
- **Styling**: Tailwind CSS (Optimized Layouts)
- **Database**: SQLite (Development) / PostgreSQL (Production Ready)

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- `pip` (Python Package Manager)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/devfady1/MY-NEW-PORTFOLIO.git
   cd MY-NEW-PORTFOLIO
   ```

2. **Setup Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/scripts/activate  # Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize Database**
   ```bash
   python manage.py migrate
   ```

5. **Seed Sample Data (Recommended)**
   ```bash
   python manage.py seed
   ```

6. **Run Server**
   ```bash
   python manage.py runserver
   ```
   Visit `http://127.0.0.1:8000` to see the magic!

## 📂 Project Structure

```text
├── core/               # Django App for main logic
│   ├── management/     # Custom seed commands
│   ├── models.py       # Skills, Projects, Reviews, Contacts
│   └── views.py        # Rendering & API logic
├── static/
│   ├── css/style.css   # Main design system & custom animations
│   └── js/main.js      # GSAP orchestration & form handling
├── templates/
│   └── index.html      # Main single-page template
└── portfolio/          # Project configuration
```

## 👨‍💻 Created By
**Fady Ashraf**  
*Founder of Nexus Code*

---
⭐ If you find this project inspiring, feel free to star the repo!