# DropLink

DropLink is a modern, user-friendly file sharing application that allows users to easily upload files and share them via generated links. Built with React for the frontend and Express.js for the backend, DropLink provides a seamless experience for file sharing.

## Features

- **Drag & Drop Upload**: Intuitive drag-and-drop interface for file uploads
- **One-Click Sharing**: Generate shareable links instantly
- **Copy to Clipboard**: Easy link copying with visual feedback
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, modern interface with smooth animations

## Tech Stack

### Frontend

- React.js
- React Icons
- CSS3 with animations
- Axios for API requests

### Backend

- Express.js
- Multer for file uploads
- Path-to-regexp for route handling
- Node.js

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Brian-An/file-sharing.git
cd droplink
```

2. Install dependencies for both frontend and backend

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create environment files

```bash
# In the backend directory
cp .env.example .env
```

4. Configure your environment variables in the `.env` file

```
PORT = 9000
BACKEND_URL = http://localhost:9000
MONGODB_URL = MONGODBURL
```

### Running the Application

1. Start the backend server

```bash
cd backend
npm run dev
```

2. Start the frontend development server

```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Drag and drop a file into the upload area or click to browse
2. Once uploaded, a download link will be generated
3. Copy the link to share with others
4. Recipients can click the link to download the file

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React Icons](https://react-icons.github.io/react-icons/) for the beautiful icons
- [Express.js](https://expressjs.com/) for the backend framework
- [Multer](https://github.com/expressjs/multer) for file upload handling
