from django.db import models


class Service(models.Model):
    service_id = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=255)
    desc = models.TextField(blank=True, default='')
    price_inr = models.CharField(max_length=100)
    raw_price = models.IntegerField(default=0)
    category = models.CharField(max_length=100, default='maintenance')
    image = models.TextField(blank=True, default='')
    icon_name = models.CharField(max_length=100, default='Wrench')
    badge = models.CharField(max_length=100, default='Essential')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.service_id})"


class Booking(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]

    reference_id = models.CharField(max_length=100, unique=True)
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.CharField(max_length=20)
    service_id = models.CharField(max_length=100)
    service_name = models.CharField(max_length=255)
    price_inr = models.CharField(max_length=100)
    date = models.CharField(max_length=50)
    time_slot = models.CharField(max_length=50)
    client_name = models.CharField(max_length=255)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=50)
    notes = models.TextField(blank=True, default='')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Confirmed')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Booking {self.reference_id} - {self.client_name}"


class GalleryItem(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100, default='detailing')
    badge = models.CharField(max_length=100, default='KB Standard')
    desc = models.TextField(blank=True, default='')
    image = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100, default='Detailing Guide')
    date_str = models.CharField(max_length=100, default='')
    read_time = models.CharField(max_length=50, default='5 min read')
    desc = models.TextField(blank=True, default='')
    image = models.TextField()
    content = models.TextField(blank=True, default='')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Review(models.Model):
    name = models.CharField(max_length=255)
    rating = models.IntegerField(default=5)
    comment = models.TextField()
    car_model = models.CharField(max_length=255, blank=True, default='')
    service_name = models.CharField(max_length=255, blank=True, default='')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.rating} stars"


class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, default='')
    subject = models.CharField(max_length=255, default='General Enquiry')
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Contact from {self.name} ({self.subject})"


class PasswordResetToken(models.Model):
    email = models.EmailField()
    token = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return f"Reset token for {self.email}"


class AdminOTP(models.Model):
    email = models.EmailField()
    otp_code = models.CharField(max_length=128)  # Holds SHA-256 hashed OTP
    purpose = models.CharField(max_length=50, default='login')  # 'login' or 'reset'
    attempts = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"OTP for {self.email} ({self.purpose})"

