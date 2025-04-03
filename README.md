# Sandbar Flood Insurance Platform

A modern, secure, and scalable platform for managing flood insurance quotes and policies. This platform serves both insurance agents/brokers and Sandbar employees, providing a unified system for quote management, policy administration, and client services.

## Features

- **User Authentication & Management**
  - Secure registration and login
  - Role-based access control
  - Multi-factor authentication support

- **Quote Management**
  - Multi-step quote submission process
  - Integration with multiple quoting engines
  - Quote approval workflow
  - Quote comparison and selection

- **Policy Administration**
  - Policy creation and management
  - Renewal processing
  - Endorsement handling
  - Cancellation management

- **Client Management**
  - Client profile management
  - Property information tracking
  - Document management
  - Inspection scheduling

- **Admin Console**
  - User and role management
  - System configuration
  - Rating table maintenance
  - Audit logging

## Tech Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Authentication**: NextAuth with Credentials Provider
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Deployment**: Vercel (Development Environment)
- **UI Components**: Shadcn UI, Lucide React Icons

### API Integrations

- Hiscox Quoting API
- Google Maps API
- NFIP National Database
- Additional quoting APIs

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd sandbar-flood-prototype
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
# Add other required environment variables
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.


## Development Guidelines

- Use TypeScript for all development
- Follow the established file structure
- Maintain consistent code formatting
- Write clear, descriptive comments for complex logic
- Follow Next.js App Router conventions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved.

## Support

For support, please contact the development team or refer to the internal documentation.
