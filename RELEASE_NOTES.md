# KB Garage India - Major Feature Release & Update Notes

## 📌 Executive Summary
This major release migrates the backend architecture to **Django & Django REST Framework (DRF)** inside `backend/`, connects all frontend components to live APIs, introduces full **Owner Administration** at `http://localhost:3000/admin`, and activates **Live Gmail SMTP Notifications** and **2-Step Security OTP Authentication** targeting owner email `rikinp0102@gmail.com`.

---

## 🚀 Detailed Features & Improvements

### 1. Django REST Framework Backend (`backend/`)
- **Django Application Architecture**:
  - `core_api` app built with models for `Service`, `Booking`, `GalleryItem`, `BlogPost`, `Review`, `ContactMessage`, `PasswordResetToken`, and `AdminOTP`.
  - Serializers and ViewSets exposing RESTful endpoints under `/api/`.
  - Custom file upload endpoint (`POST /api/upload/`) handling direct image file uploads from owner devices.
  - Automated database seeding (`python manage.py seed_db`) populating initial services (in `₹ INR`), transformations gallery, blog articles, reviews, sample bookings, and superuser (`admin` / `admin123`).

### 2. Live Gmail SMTP & Form-Layout Notifications (`rikinp0102@gmail.com`)
- **Appointment Bookings**: Every customer reservation generates an HTML form email to `rikinp0102@gmail.com` with Booking Reference ID, Client Details, Vehicle Specs, Service, Slot, and Notes.
- **Contact Inquiries**: Every inquiry submitted on the Contact page dispatches an HTML form email to `rikinp0102@gmail.com`.
- **2-Step Security OTPs**: OTP verification codes for login and password resets are dispatched live to `rikinp0102@gmail.com`.

### 3. Owner Admin Portal & 2-Step OTP Security (`http://localhost:3000/admin`)
- **2-Step Login Authentication**:
  - **Step 1**: Enter Username/Email & Password.
  - **Step 2**: Backend validates credentials, generates a 6-digit OTP code, and emails it to `rikinp0102@gmail.com`. Owner submits 6-digit OTP to complete login.
- **Forgot Password with OTP Verification**:
  - Request OTP to `rikinp0102@gmail.com` -> Submit 6-digit OTP + New Password + Confirm Password to reset securely.
- **Comprehensive Owner Dashboard**:
  - **Bookings Management**: Filter by status (`Confirmed`, `Pending`, `Completed`, `Cancelled`), update appointment statuses, or delete records.
  - **Services & Price Architecture**: Add, edit descriptions, change prices in `₹ INR`, and toggle active status.
  - **Transformations Gallery**: Includes a direct **`Upload Image File`** button for picking photos from device with live image preview, alongside edit and delete options.
  - **Blog Articles & Guides**: Publish, edit, or delete automotive guides.
  - **Customer Testimonials**: Manage reviews & 5-star ratings.
  - **Contact Inquiries**: Inspect client contact messages.

### 4. Frontend Integration (`Frontend/`)
- Updated `Frontend/lib/api.ts` and pages (`/gallery`, `/blog`, `/services`, `/contact`, `/admin`) to communicate with live Django APIs.
- **Preserved UI Excellence**: Kept all existing design elements, glassmorphism, gold accents, typography, and responsive layouts strictly intact.

---

## 🛠️ How to Run Locally

### 1. Backend Server:
```powershell
cd backend
.\venv\Scripts\python.exe manage.py runserver 8000
```
- API Base URL: `http://localhost:8000/api/`

### 2. Frontend Application:
```powershell
cd Frontend
npm run dev
```
- Customer Site: `http://localhost:3000`
- Owner Admin Portal: `http://localhost:3000/admin`
