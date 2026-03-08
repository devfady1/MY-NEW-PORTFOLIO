from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify


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
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField()
    full_description = models.TextField(
        blank=True,
        help_text="Detailed description shown on the project detail page"
    )
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    url = models.URLField(blank=True, help_text="Live project URL")
    github_url = models.URLField(blank=True, help_text="GitHub repository URL")
    tech_stack = models.CharField(
        max_length=300,
        help_text="Comma-separated technologies (e.g. Django, React, PostgreSQL)"
    )
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_date = models.DateField(blank=True, null=True, help_text="When the project was completed")

    class Meta:
        ordering = ['order', '-featured', 'title']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
            # Ensure unique slug
            original_slug = self.slug
            counter = 1
            while Project.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
                self.slug = f"{original_slug}-{counter}"
                counter += 1
        super().save(*args, **kwargs)

    def tech_list(self):
        """Return tech stack as a list."""
        return [t.strip() for t in self.tech_stack.split(',') if t.strip()]


class ProjectImage(models.Model):
    """Additional images for a project, displayed in the detail gallery."""

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=300, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.project.title} — Image {self.order}"


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
