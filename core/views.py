import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST

from .models import Skill, Project, Review, Contact


def index(request):
    """Render the single-page portfolio with all dynamic content."""
    context = {
        'skills': Skill.objects.all(),
        'projects': Project.objects.all(),
        'reviews': Review.objects.all(),
    }
    return render(request, 'index.html', context)


@require_POST
def contact_submit(request):
    """Handle contact form submission via AJAX with CSRF protection."""
    try:
        data = json.loads(request.body)

        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()

        # Basic validation
        if not all([name, email, subject, message]):
            return JsonResponse(
                {'success': False, 'error': 'All fields are required.'},
                status=400
            )

        Contact.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message,
        )

        return JsonResponse({
            'success': True,
            'message': 'Thank you! Your message has been sent successfully.'
        })

    except json.JSONDecodeError:
        return JsonResponse(
            {'success': False, 'error': 'Invalid request format.'},
            status=400
        )
    except Exception as e:
        return JsonResponse(
            {'success': False, 'error': 'Something went wrong. Please try again.'},
            status=500
        )
