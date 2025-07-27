# CTRL+Shift Podcast Website

A modern podcast website built with Next.js, featuring an admin panel for managing episodes and their associated sources and timestamps.

## Features

- **Public Website**: Display latest episode and archive of all episodes
- **Admin Panel**: Secure login system for managing podcast episodes
- **Episode Management**: Add new episodes with sections, timestamps, and sources
- **Database Integration**: MongoDB with Mongoose for data persistence
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens with bcrypt password hashing
- **Deployment**: Ready for Vercel or similar platforms

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Database

Run the development server to ensure the database connection works:

```bash
pnpm dev
```

### 4. Create Admin Users

Run the setup script to create initial admin users:

```bash
pnpm setup-admin
```

This will create a default admin user with:
- Username: `admin`
- Password: `admin123`
- Email: `admin@example.com`

**Important**: Change these credentials after first login!

### 5. Start Development Server

```bash
pnpm dev
```

The website will be available at `http://localhost:3000`

## Usage

### Public Website

- **Home Page** (`/`): Displays the latest episode
- **Archive** (`/archive`): Shows all episodes
- **Sources** (`/sources/[id]`): Displays episode details with sections and sources

### Admin Panel

- **Login** (`/admin/login`): Admin authentication
- **Dashboard** (`/admin/dashboard`): Manage all episodes
- **Add Episode** (`/admin/episodes/new`): Create new episodes
- **Edit Episode** (`/admin/episodes/[id]/edit`): Update existing episodes
- **Delete Episodes**: Remove episodes with confirmation dialog

### Adding Episodes

1. Log in to the admin panel
2. Click "Add Episode" on the dashboard
3. Fill in the episode information:
   - Title, date, description
   - Spotify episode URL
   - Sections with timestamps
   - Sources for each section
4. Save the episode

When you add a new episode, it automatically becomes the "latest" episode and the previous latest episode moves to the archive.

## Database Schema

### Episode Collection
```typescript
{
  id: string;           // Unique episode ID
  title: string;        // Episode title
  date: string;         // Publication date
  description: string;  // Episode description
  spotifyUrl: string;   // Spotify episode URL
  sections: [           // Episode sections
    {
      title: string;    // Section title
      timestamp: string; // Time range (e.g., "00:00:00 - 00:15:00")
      sources: [        // Sources for this section
        {
          title: string; // Source title
          url: string;   // Source URL
        }
      ]
    }
  ];
  isLatest: boolean;    // Whether this is the latest episode
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Last update timestamp
}
```

### Admin Collection
```typescript
{
  username: string;     // Admin username
  password: string;     // Hashed password
  email: string;        // Admin email
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Last update timestamp
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected admin routes
- Input validation and sanitization

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE). 