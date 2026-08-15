import logging
import hashlib
from django.core.mail import send_mail, get_connection
from django.conf import settings

logger = logging.getLogger(__name__)

OWNER_EMAIL = getattr(settings, 'OWNER_NOTIFICATION_EMAIL', 'aryansprajapati9999@gmail.com')


def hash_otp(code: str) -> str:
    """Returns SHA-256 hash of plaintext OTP with project salt."""
    secret_salt = getattr(settings, 'SECRET_KEY', 'kb_garage_default_salt')
    return hashlib.sha256(f"{secret_salt}:{code}".encode('utf-8')).hexdigest()


def _dispatch_email(subject, plain_message, html_message, recipient_list):
    """
    Sends email via configured backend (SMTP / Console).
    If SMTP fails (e.g. network timeout), logs the message to console gracefully.
    """
    try:
        # Deduplicate recipients
        recipients = list(set([r for r in recipient_list if r]))
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=recipients,
            html_message=html_message,
            fail_silently=False
        )
        print(f"✅ Real Email dispatched to {recipients}: {subject}")
    except Exception as e:
        logger.warning(f"SMTP dispatch warning: {e}. Falling back to console logger.")
        try:
            console_connection = get_connection('django.core.mail.backends.console.EmailBackend')
            send_mail(
                subject=subject,
                message=plain_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=recipient_list,
                html_message=html_message,
                connection=console_connection,
                fail_silently=True
            )
        except Exception as fallback_err:
            logger.error(f"Console email logging error: {fallback_err}")


def send_otp_email(email, otp_code, purpose='login'):
    subject = "KB Garage Admin Login" if purpose == 'login' else "KB Garage Admin Password Reset"

    plain_message = f"""KB Garage Admin Verification

Your verification OTP is: {otp_code}

This OTP is valid for 5 minutes.

If you did not attempt to log in to the KB Garage Admin Panel, please ignore this email.
"""

    html_message = f"""
    <div style="font-family: Arial, sans-serif; max-width: 520px; border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden; margin: 0 auto; background-color: #ffffff;">
      <div style="background-color: #0f172a; color: #ffffff; padding: 20px; text-align: center;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: #ffffff;">KB GARAGE ADMIN</h2>
        <p style="margin: 4px 0 0 0; color: #d4af37; font-size: 12px; font-weight: 700; text-transform: uppercase;">
          {'Admin Login OTP' if purpose == 'login' else 'Password Reset OTP'}
        </p>
      </div>
      <div style="padding: 24px; text-align: center;">
        <p style="color: #475569; font-size: 14px; margin-top: 0;">Your verification OTP is:</p>
        <div style="margin: 20px 0; padding: 14px 20px; background-color: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px; display: inline-block;">
          <span style="font-size: 34px; font-weight: 900; letter-spacing: 6px; color: #ef4444; font-family: monospace;">{otp_code}</span>
        </div>
        <p style="color: #64748b; font-size: 13px;">This OTP is valid for 5 minutes.</p>
        <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
        <p style="color: #94a3b8; font-size: 12px; margin-bottom: 0;">If you did not attempt to log in to the KB Garage Admin Panel, please ignore this email.</p>
      </div>
    </div>
    """

    _dispatch_email(subject, plain_message, html_message, [email])


def send_admin_welcome_email(email, username):
    subject = f"[KB Garage Admin] Welcome to Admin Team - {username}"
    
    plain_message = f"""KB Garage Admin Team Registration

Hello {username},

You have been successfully added as an Admin team member for KB Garage India.

Account Details:
Username: {username}
Email:    {email}

You can now log in to the KB Garage Admin Portal at:
http://localhost:3000/admin/login

Welcome to the team!
"""

    html_message = f"""
    <div style="font-family: Arial, sans-serif; max-width: 550px; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div style="background-color: #0f172a; color: #ffffff; padding: 24px; text-align: center;">
        <h2 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 1px;">KB GARAGE INDIA</h2>
        <p style="margin: 4px 0 0 0; color: #d4af37; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Admin Team Member Added</p>
      </div>
      <div style="padding: 28px;">
        <h3 style="color: #0f172a; margin-top: 0;">Welcome to the KB Garage Admin Team!</h3>
        <p style="color: #475569; font-size: 14px; line-height: 1.6;">Hello <strong>{username}</strong>,</p>
        <p style="color: #475569; font-size: 14px; line-height: 1.6;">You have been successfully registered as an Admin team member. You now have access to manage bookings, services, gallery projects, customer reviews, and dashboard metrics.</p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <div style="font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">Your Registered Credentials</div>
          <div style="font-size: 14px; color: #0f172a; margin-bottom: 4px;">Username: <strong>{username}</strong></div>
          <div style="font-size: 14px; color: #0f172a;">Email: <strong>{email}</strong></div>
        </div>
        <div style="text-align: center; margin-top: 24px;">
          <a href="http://localhost:3000/admin/login" style="background-color: #d4af37; color: #0f172a; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; display: inline-block;">Access Admin Portal</a>
        </div>
      </div>
    </div>
    """

    _dispatch_email(subject, plain_message, html_message, [email])




def send_booking_notification_email(booking):
    subject = f"[KB Garage Appointment Booking] Ref: {booking.reference_id} - {booking.client_name}"
    
    plain_message = f"""
====================================================
           KB GARAGE INDIA - NEW BOOKING
====================================================

BOOKING REFERENCE: {booking.reference_id}
STATUS:            {booking.status}

---------------- CLIENT DETAILS --------------------
Full Name:  {booking.client_name}
Email:      {booking.client_email}
Phone:      {booking.client_phone}

---------------- VEHICLE DETAILS -------------------
Vehicle:    {booking.year} {booking.make} {booking.model}

---------------- SERVICE & SLOT --------------------
Service:    {booking.service_name} ({booking.price_inr})
Date:       {booking.date}
Time Slot:  {booking.time_slot}

---------------- NOTES / REQUESTS ------------------
{booking.notes or 'None'}

====================================================
Sent to Owner Inbox: {OWNER_EMAIL}
====================================================
"""

    html_message = f"""
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 650px; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div style="background-color: #0f172a; color: #ffffff; padding: 24px; text-align: center;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 2px; color: #ffffff;">KB GARAGE INDIA</h2>
        <p style="margin: 6px 0 0 0; color: #d4af37; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Official Service Appointment Form</p>
      </div>
      
      <div style="padding: 28px; background-color: #f8fafc;">
        <div style="background-color: #ffffff; padding: 18px; border-radius: 8px; border-left: 6px solid #ef4444; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b;">Booking Reference</div>
          <div style="font-size: 22px; font-weight: 800; color: #ef4444; margin-top: 2px;">{booking.reference_id}</div>
          <div style="font-size: 13px; color: #0f172a; margin-top: 4px;">Status: <strong>{booking.status}</strong></div>
        </div>

        <h4 style="margin: 0 0 12px 0; color: #0f172a; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">1. Client Information</h4>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569; width: 35%;">Client Name:</td>
            <td style="padding: 12px 16px; color: #0f172a; font-weight: 600;">{booking.client_name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569;">Email Address:</td>
            <td style="padding: 12px 16px; color: #0f172a;"><a href="mailto:{booking.client_email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">{booking.client_email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: 700; color: #475569;">Phone Number:</td>
            <td style="padding: 12px 16px; color: #0f172a;"><a href="tel:{booking.client_phone}" style="color: #2563eb; text-decoration: none; font-weight: 600;">{booking.client_phone}</a></td>
          </tr>
        </table>

        <h4 style="margin: 0 0 12px 0; color: #0f172a; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">2. Vehicle & Service Details</h4>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569; width: 35%;">Car Vehicle:</td>
            <td style="padding: 12px 16px; color: #0f172a; font-weight: 700;">{booking.year} {booking.make} {booking.model}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569;">Service Selected:</td>
            <td style="padding: 12px 16px; color: #0f172a;"><strong style="color: #ef4444;">{booking.service_name}</strong> ({booking.price_inr})</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569;">Scheduled Slot:</td>
            <td style="padding: 12px 16px; color: #0f172a; font-weight: 600;">{booking.date} @ {booking.time_slot}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: 700; color: #475569;">Vehicle Notes:</td>
            <td style="padding: 12px 16px; color: #0f172a;">{booking.notes or 'None'}</td>
          </tr>
        </table>

        <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #94a3b8;">
          This email was generated automatically by KB Garage System for Owner <a href="mailto:{OWNER_EMAIL}" style="color: #64748b;">{OWNER_EMAIL}</a>.
        </div>
      </div>
    </div>
    """
    
    recipients = [booking.client_email, OWNER_EMAIL] if getattr(booking, 'client_email', None) else [OWNER_EMAIL]
    _dispatch_email(subject, plain_message, html_message, recipients)


def send_contact_notification_email(contact):
    subject = f"[KB Garage Contact Inquiry] {contact.subject} - {contact.name}"
    
    plain_message = f"""
====================================================
           KB GARAGE INDIA - NEW ENQUIRY
====================================================

Sender Name:  {contact.name}
Sender Email: {contact.email}
Sender Phone: {contact.phone or 'N/A'}
Subject:      {contact.subject}

---------------- MESSAGE CONTENT -------------------
{contact.message}

====================================================
Sent to Owner Inbox: {OWNER_EMAIL}
====================================================
"""

    html_message = f"""
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 650px; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div style="background-color: #0f172a; color: #ffffff; padding: 24px; text-align: center;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 2px; color: #ffffff;">KB GARAGE INDIA</h2>
        <p style="margin: 6px 0 0 0; color: #d4af37; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Customer Contact Form Submission</p>
      </div>
      
      <div style="padding: 28px; background-color: #f8fafc;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569; width: 30%;">Sender Name:</td>
            <td style="padding: 12px 16px; color: #0f172a; font-weight: 600;">{contact.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569;">Email Address:</td>
            <td style="padding: 12px 16px; color: #0f172a;"><a href="mailto:{contact.email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">{contact.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 16px; font-weight: 700; color: #475569;">Phone Number:</td>
            <td style="padding: 12px 16px; color: #0f172a;">{contact.phone or 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: 700; color: #475569;">Enquiry Subject:</td>
            <td style="padding: 12px 16px; color: #ef4444; font-weight: 700;">{contact.subject}</td>
          </tr>
        </table>
        
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h4 style="margin: 0 0 10px 0; color: #475569; font-size: 13px; font-weight: 700; text-transform: uppercase;">Message Content:</h4>
          <p style="margin: 0; color: #0f172a; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">{contact.message}</p>
        </div>

        <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #94a3b8;">
          Sent to KB Garage Owner Inbox: <a href="mailto:{OWNER_EMAIL}" style="color: #64748b;">{OWNER_EMAIL}</a>
        </div>
      </div>
    </div>
    """
    
    recipients = [contact.email, OWNER_EMAIL] if getattr(contact, 'email', None) else [OWNER_EMAIL]
    _dispatch_email(subject, plain_message, html_message, recipients)


def send_forgot_password_email(email, reset_token):
    subject = "[KB Garage Owner Admin] Password Reset Link"
    reset_url = f"http://localhost:3000/admin/login?reset_token={reset_token}"
    
    plain_message = f"""
KB Garage Owner Password Reset

You requested a password reset for your KB Garage Owner Account ({email}).
Please use the following reset link to set your new password:

Reset URL: {reset_url}
Token:     {reset_token}
"""
    
    html_message = f"""
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 550px; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div style="background-color: #0f172a; color: #ffffff; padding: 24px; text-align: center;">
        <h2 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1.5px; color: #ffffff;">KB GARAGE ADMIN</h2>
        <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Owner Security Portal</p>
      </div>
      <div style="padding: 28px; background-color: #ffffff;">
        <h3 style="color: #0f172a; margin-top: 0;">Password Reset Instructions</h3>
        <p style="color: #475569; font-size: 14px; line-height: 1.5;">We received a password reset request for your owner account (<strong style="color: #0f172a;">{email}</strong>).</p>
        <div style="margin: 28px 0; text-align: center;">
          <a href="{reset_url}" style="background-color: #ef4444; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 2px 6px rgba(239,68,68,0.3);">Reset Admin Password</a>
        </div>
        <p style="color: #94a3b8; font-size: 12px; margin-bottom: 0;">If you did not request this, you can ignore this email. Token: <code>{reset_token}</code></p>
      </div>
    </div>
    """
    
    _dispatch_email(subject, plain_message, html_message, [email])
