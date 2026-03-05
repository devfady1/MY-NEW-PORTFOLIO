from django.core.management.base import BaseCommand
from core.models import Skill, Project, Review

class Command(BaseCommand):
    help = 'Seed the database with real portfolio data for Fady Ashraf (Nexus Code)'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database with Nexus Code data...')

        # ── Skills ──────────────────────────────────────────────
        skills_data = [
            {'name': 'Python',     'icon': '🐍', 'category': 'backend',  'proficiency': 95, 'order': 1},
            {'name': 'Django',     'icon': '🎯', 'category': 'backend',  'proficiency': 95, 'order': 2},
            {'name': 'Hardware Integration', 'icon': '🖨️', 'category': 'systems', 'proficiency': 90, 'order': 3}, # HL7, Thermal Printers
            {'name': 'AI & Local LLMs', 'icon': '🤖', 'category': 'backend', 'proficiency': 85, 'order': 4}, # Ollama, AI Agents
            {'name': 'VPS Deployment', 'icon': '☁️', 'category': 'devops',   'proficiency': 88, 'order': 5},
            {'name': 'REST APIs',  'icon': '🔗', 'category': 'backend',  'proficiency': 92, 'order': 6},
            {'name': 'PostgreSQL', 'icon': '🗄️', 'category': 'backend',  'proficiency': 85, 'order': 7},
            {'name': 'JavaScript', 'icon': '⚡', 'category': 'frontend', 'proficiency': 80, 'order': 8},
            {'name': 'HTML/CSS',   'icon': '🎨', 'category': 'frontend', 'proficiency': 85, 'order': 9},
            {'name': 'Linux/Networking', 'icon': '🐧', 'category': 'devops',   'proficiency': 85, 'order': 10}, # Local DNS setup
            {'name': 'Clean Architecture', 'icon': '📐', 'category': 'design',   'proficiency': 90, 'order': 11}, # Clean, human-written code focus
            {'name': 'Git',        'icon': '📦', 'category': 'devops',   'proficiency': 88, 'order': 12},
        ]
        for s in skills_data:
            Skill.objects.update_or_create(name=s['name'], defaults=s)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(skills_data)} skills'))

        # ── Projects ────────────────────────────────────────────
        projects_data = [
            {
                'title': 'Hospital Management System (HMS)',
                'description': 'A comprehensive healthcare management platform featuring advanced patient modules, automated attendance tracking, and seamless deployment on VPS environments.',
                'tech_stack': 'Django, Python, PostgreSQL, Linux VPS',
                'featured': True,
                'order': 1,
            },
            {
                'title': 'HL7 Medical Device Integration',
                'description': 'Specialized system integration that securely links local hospital hardware and medical devices directly to a remote VPS using the HL7 healthcare protocol.',
                'tech_stack': 'Python, HL7 Protocol, Networking, System Architecture',
                'featured': True,
                'order': 2,
            },
            {
                'title': 'Altekia Kafe Management System',
                'description': 'End-to-end venue management system customized with local DNS configurations, specialized thermal printing scripts for receipts, and localized network setup.',
                'tech_stack': 'Django, Python, Thermal Printing, Local DNS',
                'featured': True,
                'order': 3,
            },
            {
                'title': 'Nexus Code Platform',
                'description': 'The official software house platform for Nexus Code, showcasing high-end animations, magnetic UI elements, and providing software services for clients.',
                'tech_stack': 'Django, GSAP, Tailwind CSS, JavaScript',
                'featured': False,
                'order': 4,
            },
            {
                'title': 'Mostaql Freelance Solutions',
                'description': 'Delivered numerous tailored web applications, backend architectures, and API integrations for various clients across the MENA region.',
                'tech_stack': 'Python, Django, APIs, Clean Code',
                'featured': False,
                'order': 5,
            },
        ]
        for p in projects_data:
            Project.objects.update_or_create(title=p['title'], defaults=p)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(projects_data)} projects'))

        # ── Reviews ─────────────────────────────────────────────
        reviews_data = [
            {
                'client_name': 'Medical Center Director',
                'client_role': 'Healthcare Client',
                'content': 'Eng. Fady delivered our HMS perfectly. The HL7 medical device integration with our remote servers was exactly what we needed to modernize our operations.',
                'rating': 5,
                'order': 1,
            },
            {
                'client_name': 'Venue Manager',
                'client_role': 'Altekia Kafe',
                'content': 'The management system works flawlessly. The custom thermal printing scripts and local network setup by Nexus Code made our daily operations incredibly smooth.',
                'rating': 5,
                'order': 2,
            },
            {
                'client_name': 'Verified Client',
                'client_role': 'Mostaql Platform',
                'content': 'Excellent developer. Fady wrote clean, simple, and human-readable code exactly as requested, without any unnecessary complexity. Highly recommended.',
                'rating': 5,
                'order': 3,
            },
            {
                'client_name': 'Operations Lead',
                'client_role': 'Enterprise Client',
                'content': 'Fady handled our VPS deployment seamlessly. His deep understanding of backend architecture and robust API design is truly impressive.',
                'rating': 5,
                'order': 4,
            },
        ]
        for r in reviews_data:
            Review.objects.update_or_create(client_name=r['client_name'], defaults=r)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(reviews_data)} reviews'))

        self.stdout.write(self.style.SUCCESS('\n[DONE] Nexus Code database seeded successfully!'))