from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from core_api.models import Service, Booking, GalleryItem, BlogPost, Review, ContactMessage


class Command(BaseCommand):
    help = 'Seeds initial database for KB Garage India'

    def handle(self, *args, **options):
        self.stdout.write('Seeding KB Garage Database...')

        # 1. Create Superuser / Admin User
        admin_user, created = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'rikinp0102@gmail.com',
                'is_staff': True,
                'is_superuser': True
            }
        )
        admin_user.set_password('admin123')
        admin_user.save()
        if created:
            self.stdout.write(self.style.SUCCESS('Admin user created: admin / admin123'))
        else:
            self.stdout.write('Admin user updated with password admin123')

        # 2. Seed Services
        if not Service.objects.exists():
            services_data = [
                {
                    "service_id": "general",
                    "title": "General Maintenance & Multi-Point Check",
                    "desc": "Comprehensive engine diagnostic, synthetic oil replacement, filter change, and Indian road condition suspension check.",
                    "price_inr": "₹2,499",
                    "raw_price": 2499,
                    "category": "maintenance",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Suzuki_Swift_%282024%29_hybrid_IMG_8820.jpg/1280px-Suzuki_Swift_%282024%29_hybrid_IMG_8820.jpg",
                    "icon_name": "Wrench",
                    "badge": "Essential",
                    "is_active": True,
                },
                {
                    "service_id": "ceramic",
                    "title": "9H Ceramic Coating & Paint Armor",
                    "desc": "Ultra-hydrophobic 9H ceramic shield engineered for Indian weather, monsoon protection & intense UV dust resistance.",
                    "price_inr": "₹14,999",
                    "raw_price": 14999,
                    "category": "detailing",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tata_Nexon_EV_in_Hyderabad_02.jpg/1280px-Tata_Nexon_EV_in_Hyderabad_02.jpg",
                    "icon_name": "Sparkles",
                    "badge": "Popular",
                    "is_active": True,
                },
                {
                    "service_id": "ppf",
                    "title": "TPU Paint Protection Film (PPF)",
                    "desc": "Self-healing TPU film covering high-impact front zones against gravel, scratches, and highway debris.",
                    "price_inr": "₹49,999",
                    "raw_price": 49999,
                    "category": "detailing",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/2024_Hyundai_Creta_1.5_MPi_SX%28O%29_%28India%29_front_view.png/1280px-2024_Hyundai_Creta_1.5_MPi_SX%28O%29_%28India%29_front_view.png",
                    "icon_name": "ShieldCheck",
                    "badge": "Ultimate Armor",
                    "is_active": True,
                },
                {
                    "service_id": "tuning",
                    "title": "Stage 1 / 2 ECU Performance Tuning",
                    "desc": "Dyno-tested custom remap for Indian fuel specs, optimizing torque response, fuel economy, and horsepower boost.",
                    "price_inr": "₹19,999",
                    "raw_price": 19999,
                    "category": "performance",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg/1280px-Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg",
                    "icon_name": "Zap",
                    "badge": "High Performance",
                    "is_active": True,
                },
                {
                    "service_id": "detailing",
                    "title": "Deep Interior Steam & Leather Care",
                    "desc": "Complete interior sanitization, AC duct steam cleaning, leather conditioning & stain removal.",
                    "price_inr": "₹5,999",
                    "raw_price": 5999,
                    "category": "detailing",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/2021_Toyota_Fortuner_2.8_VRZ_4x4_%28Malaysia%29_front_view.jpg/1280px-2021_Toyota_Fortuner_2.8_VRZ_4x4_%28Malaysia%29_front_view.jpg",
                    "icon_name": "Sparkles",
                    "badge": "Signature",
                    "is_active": True,
                },
            ]
            for data in services_data:
                Service.objects.create(**data)
            self.stdout.write(self.style.SUCCESS(f'Seeded {len(services_data)} services.'))

        # 3. Seed Gallery Items
        if not GalleryItem.objects.exists():
            gallery_data = [
                {
                    "title": "Tata Nexon EV (Dark Edition)",
                    "category": "ceramic",
                    "badge": "5-Year Ceramic Shield",
                    "desc": "Stage 2 paint restoration followed by dual-layer 9H nano ceramic shield for intense shine.",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tata_Nexon_EV_in_Hyderabad_02.jpg/1280px-Tata_Nexon_EV_in_Hyderabad_02.jpg",
                    "is_active": True,
                },
                {
                    "title": "Mahindra Thar 4x4 (Red Rage)",
                    "category": "tuning",
                    "badge": "Stage 1 ECU + Offroad Tuning",
                    "desc": "Dyno-proven ECU remapping boosting low-end torque for mountain trails & highway cruising.",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg/1280px-Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg",
                    "is_active": True,
                },
                {
                    "title": "Hyundai Creta SX(O) 2024",
                    "category": "ppf",
                    "badge": "Full TPU PPF Armor",
                    "desc": "Self-healing clear bra paint protection film against gravel, scratches, and Indian road debris.",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/2024_Hyundai_Creta_1.5_MPi_SX%28O%29_%28India%29_front_view.png/1280px-2024_Hyundai_Creta_1.5_MPi_SX%28O%29_%28India%29_front_view.png",
                    "is_active": True,
                },
                {
                    "title": "Toyota Fortuner Legender",
                    "category": "detailing",
                    "badge": "Full Interior + Engine Steam",
                    "desc": "Precision leather conditioning, interior sanitization, and dust-free engine bay detailing.",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/2021_Toyota_Fortuner_2.8_VRZ_4x4_%28Malaysia%29_front_view.jpg/1280px-2021_Toyota_Fortuner_2.8_VRZ_4x4_%28Malaysia%29_front_view.jpg",
                    "is_active": True,
                },
                {
                    "title": "Volkswagen Virtus 1.5 GT (India)",
                    "category": "tuning",
                    "badge": "Stage 2 Remap & Exhaust",
                    "desc": "Custom TCU gear shift speed mapping, performance downpipe, and crackle tune calibration.",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/2022_Volkswagen_Virtus_1.5_GT_%28India%29_front_view_01.png/1280px-2022_Volkswagen_Virtus_1.5_GT_%28India%29_front_view_01.png",
                    "is_active": True,
                },
                {
                    "title": "Maruti Suzuki Swift ZXi+",
                    "category": "ceramic",
                    "badge": "Paint Correction & Polish",
                    "desc": "Complete scratch removal, high-gloss machine polishing, and hydrophobic paint sealant.",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Suzuki_Swift_%282024%29_hybrid_IMG_8820.jpg/1280px-Suzuki_Swift_%282024%29_hybrid_IMG_8820.jpg",
                    "is_active": True,
                },
            ]
            for data in gallery_data:
                GalleryItem.objects.create(**data)
            self.stdout.write(self.style.SUCCESS(f'Seeded {len(gallery_data)} gallery items.'))

        # 4. Seed Blog Posts
        if not BlogPost.objects.exists():
            blog_data = [
                {
                    "title": "Understanding Ceramic Coating vs PPF: Which Protection Does Your Car Need?",
                    "category": "Detailing Guide",
                    "date_str": "August 2, 2026",
                    "read_time": "5 min read",
                    "desc": "A technical breakdown of ceramic hydrophobic coatings vs self-healing paint protection films for high-speed rock chip defense.",
                    "image": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
                    "content": "Detailed guide comparing 9H Ceramic Coating with TPU Paint Protection Film for Indian road conditions.",
                    "is_active": True,
                },
                {
                    "title": "Stage 1 vs Stage 2 ECU Remaps: Safe Horsepower Gains Explained",
                    "category": "Performance Tuning",
                    "date_str": "July 28, 2026",
                    "read_time": "7 min read",
                    "desc": "Learn how dyno telemetry and software calibration unlock hidden torque while preserving engine longevity.",
                    "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
                    "content": "Deep dive into ECU tuning safely increasing power output without risking engine thermal overload.",
                    "is_active": True,
                },
                {
                    "title": "Why Multi-Stage Paint Correction is Essential Before Ceramic Shielding",
                    "category": "Paint Restoration",
                    "date_str": "July 19, 2026",
                    "read_time": "4 min read",
                    "desc": "How swirl marks, micro-scratches, and orange peel reduction prepare the clear coat for flawless ceramic bonding.",
                    "image": "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80",
                    "content": "Step-by-step overview of machine polishing and paint depth gauge analysis.",
                    "is_active": True,
                },
            ]
            for data in blog_data:
                BlogPost.objects.create(**data)
            self.stdout.write(self.style.SUCCESS(f'Seeded {len(blog_data)} blog posts.'))

        # 5. Seed Reviews
        if not Review.objects.exists():
            reviews_data = [
                {
                    "name": "Rohan Sharma",
                    "rating": 5,
                    "comment": "Got 9H Ceramic Coating done for my Thar. Outstanding hydrophobic shine and scratch protection!",
                    "car_model": "Mahindra Thar 4x4",
                    "service_name": "9H Ceramic Coating",
                    "is_active": True,
                },
                {
                    "name": "Aman Verma",
                    "rating": 5,
                    "comment": "Stage 1 ECU remap transformed my Virtus 1.5 GT. Throttle lag is completely gone!",
                    "car_model": "Volkswagen Virtus 1.5 GT",
                    "service_name": "Stage 1 ECU Remap",
                    "is_active": True,
                },
                {
                    "name": "Priya Nair",
                    "rating": 5,
                    "comment": "Full TPU PPF installed flawlessly on my Nexon EV. Self-healing scratches are incredible.",
                    "car_model": "Tata Nexon EV",
                    "service_name": "TPU Paint Protection Film",
                    "is_active": True,
                },
            ]
            for data in reviews_data:
                Review.objects.create(**data)
            self.stdout.write(self.style.SUCCESS(f'Seeded {len(reviews_data)} reviews.'))

        # 6. Seed Sample Bookings
        if not Booking.objects.exists():
            bookings_data = [
                {
                    "reference_id": "KB-782910",
                    "make": "Mahindra",
                    "model": "Thar 4x4",
                    "year": "2024",
                    "service_id": "tuning",
                    "service_name": "Stage 1 / 2 ECU Performance Tuning",
                    "price_inr": "₹19,999",
                    "date": "2026-08-15",
                    "time_slot": "10:00 AM",
                    "client_name": "Vikramaditya Mehta",
                    "client_email": "vikram.m@example.com",
                    "client_phone": "+91 98765 43210",
                    "notes": "Requesting aggressive throttle response calibration for off-road trip.",
                    "status": "Confirmed",
                },
                {
                    "reference_id": "KB-348219",
                    "make": "Tata",
                    "model": "Nexon EV",
                    "year": "2025",
                    "service_id": "ceramic",
                    "service_name": "9H Ceramic Coating & Paint Armor",
                    "price_inr": "₹14,999",
                    "date": "2026-08-16",
                    "time_slot": "02:00 PM",
                    "client_name": "Sneha Patel",
                    "client_email": "sneha.p@example.com",
                    "client_phone": "+91 98123 99887",
                    "notes": "Dark edition paint requires dual layer protection.",
                    "status": "Pending",
                },
            ]
            for data in bookings_data:
                Booking.objects.create(**data)
            self.stdout.write(self.style.SUCCESS(f'Seeded {len(bookings_data)} sample bookings.'))

        # 7. Seed Sample Contact Messages
        if not ContactMessage.objects.exists():
            ContactMessage.objects.create(
                name="Karan Malhotra",
                email="karan.m@example.com",
                phone="+91 99887 66554",
                subject="Ceramic Coating Quote",
                message="Hi, I want a complete 9H ceramic coating quote for my new Skoda Slavia 1.5 TSI. Please let me know slot availability.",
                is_read=False
            )
            self.stdout.write(self.style.SUCCESS('Seeded sample contact message.'))

        self.stdout.write(self.style.SUCCESS('Database seeding completed successfully!'))
