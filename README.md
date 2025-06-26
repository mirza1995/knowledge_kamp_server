# Note Upload Server (NestJS Backend)

This is the backend server for the Knowledge Kamp project, a modern web application for uploading and managing notes. The backend is built with NestJS and provides APIs for handling note uploads, user authentication, and OCR processing of images.

## Project Overview

- **Backend:** This repository (NestJS) handles all server-side logic, authentication, data management, and image-to-text conversion using OCR.
- **Frontend:** A Next.js application provides the user interface for uploading and managing notes. [View the frontend repository here.](https://github.com/mirza1995/knowledge_kamp_v2)

## Technologies Used

- **Framework:** NestJS 10
- **ORM:** Drizzle ORM
- **Database:** Postgres
- **Validation:** class-validator, class-transformer
- **Authentication:** JWT
- **Other:**
  - **Tesseract.js:** Used to convert uploaded images to text using Optical Character Recognition (OCR) technology.
  - Resend (email)
  - Cookie Parser

## Tesseract.js and OCR

This server uses [Tesseract.js](https://tesseract.projectnaptha.com/) to process uploaded images and extract text content using OCR (Optical Character Recognition). This enables users to upload handwritten or printed notes as images and have them automatically converted to searchable, editable text.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Postgres database

### Installation

```bash
npm install
# or
yarn install
```

### Running the App

```bash
# development
npm run start

# watch mode
yarn start:dev

# production mode
npm run start:prod
```

### Environment Variables

Make sure to configure your database and any other required environment variables in a `.env` file.

## License

This project is licensed under the MIT License.
