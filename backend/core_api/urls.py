from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ServiceViewSet, BookingViewSet, GalleryItemViewSet,
    BlogPostViewSet, ReviewViewSet, ContactMessageViewSet,
    AdminLoginView, AdminVerifyLoginOTPView, AdminForgotPasswordView,
    AdminResetPasswordView, AdminStatsView, FileUploadView, AdminUserManageView
)

router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='services')
router.register(r'bookings', BookingViewSet, basename='bookings')
router.register(r'gallery', GalleryItemViewSet, basename='gallery')
router.register(r'blogs', BlogPostViewSet, basename='blogs')
router.register(r'reviews', ReviewViewSet, basename='reviews')
router.register(r'contact', ContactMessageViewSet, basename='contact')

urlpatterns = [
    path('admin/login', AdminLoginView.as_view(), name='admin_login'),
    path('admin/verify-login-otp', AdminVerifyLoginOTPView.as_view(), name='admin_verify_login_otp'),
    path('admin/forgot-password', AdminForgotPasswordView.as_view(), name='admin_forgot_password'),
    path('admin/reset-password', AdminResetPasswordView.as_view(), name='admin_reset_password'),
    path('admin/stats', AdminStatsView.as_view(), name='admin_stats'),
    path('admin/users', AdminUserManageView.as_view(), name='admin_users'),
    path('admin/users/<int:user_id>', AdminUserManageView.as_view(), name='admin_user_detail'),
    path('upload/', FileUploadView.as_view(), name='file_upload'),
    path('', include(router.urls)),
]
