# 🏥 Prescripto - Doctor Appointment Booking System

A full-stack MERN application for booking doctor appointments with integrated payment processing, admin panel, and doctor dashboard.

![Doctor Appointment System](https://img.shields.io/badge/Status-Ready%20for%20Deployment-success)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 👥 User Features

- **User Authentication** - Secure registration and login with JWT
- **Doctor Search** - Browse and filter doctors by speciality
- **Appointment Booking** - Book appointments with available doctors
- **Online Payment** - Integrated Razorpay payment gateway
- **Profile Management** - Update personal information and profile picture
- **Appointment History** - View and manage all appointments
- **Cancel Appointments** - Cancel unpaid appointments

### 👨‍⚕️ Doctor Features

- **Doctor Dashboard** - View earnings, appointments, and patient statistics
- **Appointment Management** - Complete or cancel appointments
- **Profile Management** - Update profile details, fees, and availability
- **Image Upload** - Update profile picture with Cloudinary
- **Availability Toggle** - Control appointment availability status
- **Patient Details** - Access patient information for appointments

### 👨‍💼 Admin Features

- **Admin Dashboard** - Comprehensive analytics with charts and KPIs
- **Doctor Management** - Add, view, and manage doctors
- **Appointment Overview** - Monitor all appointments system-wide
- **Analytics** - 7-day appointment trends and status distribution
- **Total Revenue** - Track earnings and financial metrics
- **User Statistics** - Monitor total patients and doctors

---

## 🛠️ Tech Stack

### Frontend

- **React 19.2.0** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **React Toastify** - Toast notifications
- **Lucide React** - Icon library
- **Chart.js** - Data visualization (Admin Panel)

### Backend

- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage and management
- **Multer** - File upload middleware
- **Razorpay** - Payment gateway integration

### Additional Tools

- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing
- **Validator** - Input validation

---

## 📁 Project Structure

```
dr.booking/
├── backend/                 # Node.js + Express backend
│   ├── config/             # Configuration files (MongoDB, Cloudinary)
│   ├── controller/         # Route controllers (admin, doctor, user)
│   ├── middlewares/        # Auth and upload middlewares
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── uploads/            # Temporary file uploads
│   ├── .env                # Environment variables
│   ├── server.js           # Entry point
│   └── package.json
│
├── frontend/               # React user-facing application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── assets/         # Images and icons
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React Context API
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── .env                # Environment variables
│   └── package.json
│
└── admin/                  # React admin panel
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/     # Navbar, Sidebar, etc.
    │   ├── context/        # Admin and Doctor contexts
    │   ├── pages/
    │   │   ├── Admin/      # Admin dashboard, doctors, appointments
    │   │   └── Doctor/     # Doctor dashboard, appointments, profile
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    └── package.json
```

---

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Cloudinary account
- Razorpay account (for payments)

### Clone Repository

```bash
git clone https://github.com/yourusername/dr.booking.git
cd dr.booking
```

### Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

#### Admin Panel

```bash
cd admin
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` folder:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Server
PORT=4000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password

# JWT
JWT_SECRET=your_strong_jwt_secret_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
CURRENCY=INR
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` folder:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Admin Panel Environment Variables

Create a `.env` file in the `admin` folder:

```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## 🏃‍♂️ Running the Application

### Development Mode

#### Start Backend Server

```bash
cd backend
npm start
# Server runs on http://localhost:4000
```

#### Start Frontend

```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

#### Start Admin Panel

```bash
cd admin
npm run dev
# Admin panel runs on http://localhost:5174
```

### Production Build

#### Frontend

```bash
cd frontend
npm run build
npm run preview
```

#### Admin Panel

```bash
cd admin
npm run build
npm run preview
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:4000/api
```

### Authentication Headers

```javascript
// User
headers: {
  token: "user_jwt_token";
}

// Admin
headers: {
  aToken: "admin_jwt_token";
}

// Doctor
headers: {
  dToken: "doctor_jwt_token";
}
```

### Main Endpoints

#### User Routes (`/api/user`)

- `POST /register` - User registration
- `POST /login` - User login
- `GET /get-profile` - Get user profile (protected)
- `POST /update-profile` - Update profile (protected)
- `POST /book-appointment` - Book appointment (protected)
- `GET /appointments` - Get user appointments (protected)
- `POST /cancel-appointment` - Cancel appointment (protected)
- `POST /payment-razorpay` - Create payment order (protected)
- `POST /verify-razorpay` - Verify payment (protected)

#### Admin Routes (`/api/admin`)

- `POST /login` - Admin login
- `POST /add-doctor` - Add new doctor (protected)
- `GET /all-doctors` - Get all doctors (protected)
- `GET /appointments` - Get all appointments (protected)
- `POST /cancel-appointment` - Cancel appointment (protected)
- `GET /dashboard` - Get dashboard analytics (protected)

#### Doctor Routes (`/api/doctor`)

- `POST /login` - Doctor login
- `GET /appointments` - Get doctor appointments (protected)
- `POST /complete-appointment` - Mark complete (protected)
- `POST /cancel-appointment` - Cancel appointment (protected)
- `GET /dashboard` - Get doctor dashboard (protected)
- `GET /profile` - Get doctor profile (protected)
- `POST /update-profile` - Update profile with image (protected)

---

## 📸 Screenshots

### User Frontend

- Homepage with featured doctors
- Doctor listing with search and filter
- Appointment booking page
- Profile management
- Payment integration

### Admin Panel

- Dashboard with analytics and charts
- Doctor management
- Appointment overview
- Revenue tracking

### Doctor Panel

- Doctor dashboard with statistics
- Appointment management
- Profile editor with image upload
- Availability toggle

---

## 🌐 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Create a new project on your hosting platform
2. Connect GitHub repository or deploy via CLI
3. Set all environment variables from `.env`
4. Deploy with start command: `node server.js`
5. Note your backend URL for frontend configuration

### Frontend Deployment (Vercel/Netlify)

1. Update `.env` with production backend URL
2. Build project: `npm run build`
3. Deploy `dist` folder to Vercel/Netlify
4. Configure environment variables in platform settings

### Admin Panel Deployment

Follow same steps as frontend deployment

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Whitelist IP addresses or allow all (0.0.0.0/0)
3. Create database user
4. Get connection string and update in backend `.env`

### Payment Gateway (Razorpay)

1. Create Razorpay account
2. Switch to live mode in production
3. Update API keys in environment variables
4. Configure webhooks for payment notifications

---

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Protected API routes with middleware
- ✅ CORS configuration
- ✅ Environment variable protection
- ✅ Input validation
- ✅ Secure payment processing

---

## 🧪 Testing

### Manual Testing Checklist

**User Flow:**

- [ ] User registration and login
- [ ] Browse and search doctors
- [ ] Book appointment
- [ ] Complete payment
- [ ] View appointments
- [ ] Cancel appointment
- [ ] Update profile

**Doctor Flow:**

- [ ] Doctor login
- [ ] View dashboard
- [ ] Manage appointments
- [ ] Update profile
- [ ] Upload profile image
- [ ] Toggle availability

**Admin Flow:**

- [ ] Admin login
- [ ] View analytics dashboard
- [ ] Add new doctor
- [ ] Manage appointments
- [ ] View all doctors

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Shubhayu Chakraborty**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: shubhayuchakraborty803@example.com

---

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB team for the database
- Cloudinary for image management
- Razorpay for payment processing
- Tailwind CSS for styling utilities
- Chart.js for data visualization

---

## 📞 Support

For support, email shubhayuchakraborty803@example.com or open an issue in the repository.

---

## 🔮 Future Enhancements

- [ ] Email notifications for appointments
- [ ] SMS notifications via Twilio
- [ ] Video consultation feature
- [ ] Prescription management
- [ ] Medical records storage
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced search filters
- [ ] Doctor reviews and ratings
- [ ] Calendar integration

---

**Made with ❤️ by Shubhayu Chakraborty**
