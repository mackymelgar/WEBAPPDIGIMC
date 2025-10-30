# Malaybalay City Government Portal

A modern, responsive web application for Malaybalay City government services with an integrated AI chatbox assistant.

## Features

- 🏛️ **Split-screen Hero Design** - Elegant image carousel with service information
- 📋 **Comprehensive Services** - 9 categories covering all city government services
- 💬 **AI Chat Assistant** - Floating chatbot with emoji support and quick actions
- 🔍 **Service Explorer** - Detailed information on requirements, fees, and procedures
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- ✨ **Smooth Animations** - Motion animations for enhanced user experience

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or download this project

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Project Structure

```
├── App.tsx                          # Main application component
├── main.tsx                         # Application entry point
├── index.html                       # HTML template
├── components/
│   ├── Header.tsx                   # Navigation header
│   ├── HeroSection.tsx              # Hero with split-screen design
│   ├── ServicesSection.tsx          # Services grid
│   ├── QuickLinksSection.tsx        # Quick access links
│   ├── AllServicesExplorer.tsx      # Detailed service browser
│   ├── ChatBox.tsx                  # AI chat assistant
│   ├── Footer.tsx                   # Footer component
│   ├── figma/
│   │   └── ImageWithFallback.tsx    # Image component with fallback
│   └── ui/                          # Shadcn UI components
└── styles/
    └── globals.css                  # Global styles with Tailwind v4

```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animations
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Vite** - Build tool

## Services Included

### Business & Permits
- Business Permit Application
- Mayor's Permit Renewal
- Barangay Business Clearance

### Health Services
- Health Certificate
- Vaccination Services
- Maternal Health Services

### Education Programs
- Scholarship Application
- School Enrollment Assistance

### Building & Construction
- Building Permit
- Occupancy Permit

### Community Programs
- 4Ps Program
- Livelihood Programs

### Public Safety
- Fire Safety Inspection
- Emergency Response

### Employment Services
- Job Placement Assistance
- Skills Training

### Housing Programs
- Socialized Housing

### Environment & Sanitation
- Waste Collection Services
- Tree Planting Programs

## Customization

### Update Images
Replace Unsplash URLs in component files with your own images.

### Modify Services
Edit `components/AllServicesExplorer.tsx` to update service information.

### Connect AI Backend
Update `components/ChatBox.tsx` in the `handleSend` function to connect to your AI API.

### Change Theme Colors
Modify `styles/globals.css` to update the color scheme.

## License

This project is created for the City Government of Malaybalay.

## Support

For issues or questions, please contact the development team.
