from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Skill(models.Model):
    """Technical skill displayed in the orbiting skills section."""

    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('devops', 'DevOps'),
        ('design', 'Design'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    icon = models.CharField(
        max_length=50,
        help_text="Emoji or icon class (e.g. 🐍 or fa-python)"
    )
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    proficiency = models.IntegerField(
        default=80,
        validators=[MinValueValidator(1), MaxValueValidator(100)],
        help_text="Skill proficiency from 1 to 100"
    )
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.icon} {self.name}"


class Project(models.Model):
    """Portfolio project displayed in the work section."""

    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    url = models.URLField(blank=True, help_text="Live project URL")
    github_url = models.URLField(blank=True, help_text="GitHub repository URL")
    tech_stack = models.CharField(
        max_length=300,
        help_text="Comma-separated technologies (e.g. Django, React, PostgreSQL)"
    )
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-featured', 'title']

    def __str__(self):
        return self.title

    def tech_list(self):
        """Return tech stack as a list."""
        return [t.strip() for t in self.tech_stack.split(',') if t.strip()]


class Review(models.Model):
    """Client testimonial displayed in the reviews marquee."""

    client_name = models.CharField(max_length=150)
    client_role = models.CharField(
        max_length=200,
        blank=True,
        help_text="e.g. CEO at TechCorp"
    )
    content = models.TextField()
    rating = models.IntegerField(
        default=5,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-rating']

    def __str__(self):
        return f"{self.client_name} — {'⭐' * self.rating}"


class Contact(models.Model):
    """Contact form submission stored in the database."""

    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=300)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.subject[:50]}"
