🏫 About the Project
Campus hostels and offices at MIT-ADT University currently rely on manual paper registers and phone calls to manage parcel deliveries. Students have no visibility into whether their parcel has arrived, and security staff have no digital tool to track or batch deliveries.
Smart Campus Parcel Management System replaces this manual process with a real-time digital platform that tracks every parcel from the moment it arrives at the campus gate to verified collection by the student.

👥 Team
NamePRNRoleKrushna Ganesh KumbharADT24SOCB0568Full Stack / FlutterSakshi Duryodhan ShindeADT24SOCB0991UI / FirebaseDax Hareshbhai PatelADT24SOCB0344Backend / Testing
Project Guide: Dr. Ram Kumar Solanki
Department: School of Computing, MIT-ADT University
Academic Year: 2025–26
Subject: Project Based Learning (PBL)

🎯 Problem Statement

"Campus hostels and offices lack a centralized digital system to track, notify, and verify parcel deliveries from the campus gate to the final recipient, resulting in lost parcels, delayed pickups, and significant administrative overhead."

Pain Points

📭 Students don't know when their parcel arrives
🚶 Repeated unnecessary trips to the campus gate
📋 Security staff maintain handwritten paper registers
📵 No push notification system for parcel arrivals
📊 No analytics or visibility for admin/management


✅ Our Solution
An end-to-end Flutter + Firebase app with three user roles:
RoleWhat they can doStudentView parcels, track status in real-time, receive push notifications, show QR code for collectionGate Staff (Admin)Log incoming parcels by enrollment number, scan QR codes to mark collectedAdmin DashboardView all parcels, pending/collected stats, aging alerts
Why better than OTP-only delivery?
OTP verifies the last 5% of the delivery — identity at pickup. Our system handles 100% of the lifecycle — from gate entry to verified collection — with full digital audit trail.

🚀 Key Features

🔔 Instant Push Notifications — student notified the moment parcel is logged at gate
📍 End-to-End Status Tracking — Arrived at Gate → Stored at Office → Ready → Collected
📱 QR Code Collection — unique QR per parcel, scanned by staff at handover
🛡️ Triple-Layer Security — QR Code + Student ID + Digital Log
📊 Admin Dashboard — pending parcels, aging alerts, hostel-wise filtering
🔄 Real-Time Sync — Firestore updates reflect instantly across all devices


🛠️ Tech Stack
LayerTechnologyFrontendFlutter (Dart)BackendFirebase (Serverless)DatabaseCloud Firestore (NoSQL)AuthenticationFirebase AuthNotificationsFirebase Cloud Messaging (FCM)QR Generationflutter_qr_codeQR Scanningmobile_scannerUI DesignGoogle StitchDev ToolsVS Code, Android Studio, GitHub

📱 App Screens
ScreenRoleDescriptionLoginBothStudent / Admin toggle loginMy ParcelsStudentList of all parcels with statusParcel DetailStudentFull tracking timeline + QR codeLog New ParcelAdminForm to log incoming parcelAdmin DashboardAdminOverview stats + pending parcel list

📂 Project Structure
lib/
├── main.dart
├── models/
│   └── parcel.dart
├── screens/
│   ├── login_screen.dart
│   ├── student/
│   │   ├── my_parcels_screen.dart
│   │   └── parcel_detail_screen.dart
│   └── admin/
│       ├── add_parcel_screen.dart
│       └── admin_dashboard_screen.dart
├── widgets/
│   ├── parcel_card.dart
│   ├── status_pill.dart
│   └── tracking_timeline.dart
└── services/
    ├── auth_service.dart
    └── parcel_service.dart

⚙️ Getting Started
Prerequisites

Flutter SDK 3.x
Android Studio / VS Code
Firebase project (Firestore + FCM enabled)
Android emulator or physical device

Installation
bash# Clone the repository
git clone https://github.com/b1t79/Smart-Campus-Management-System.git

# Navigate to project directory
cd Smart-Campus-Management-System

# Install dependencies
flutter pub get

# Run the app
flutter run

⚠️ You will need to add your own google-services.json from Firebase Console to android/app/ before running.


📊 Success Metrics
MetricTargetParcel pickup timeUnder 30 minutes from arrivalLost parcelsZero — 100% digitally loggedStaff logging timeUnder 2 minutes per parcelManual calls reduced80%+ reduction

🗓️ Development Timeline
PhaseTasksStatusWeek 1–2Requirements, UI Design, Architecture✅ DoneWeek 3–4Flutter screens, Firebase setup, Auth🔄 In ProgressWeek 5FCM notifications, QR Code module🔄 In ProgressWeek 6Admin scanner, Scan-to-Collect flow📋 PlannedWeek 7Pilot with 30 students, 1 hostel block📋 PlannedWeek 8Bug fixes, final review, submission📋 Planned

🔮 Future Scope

🤖 AI-based delivery route optimization
🔐 Smart Locker integration
🪪 Student ID card NFC-based collection
🌐 Multi-campus rollout
📈 Admin analytics dashboard with charts


📜 License
This project is licensed under the GNU General Public License v3.0 — see the LICENSE file for details.
© 2025–26 MIT Art, Design and Technology University. All rights reserved.
This project is submitted as part of the Project Based Learning (PBL) curriculum, School of Computing, MIT-ADT University, Pune
