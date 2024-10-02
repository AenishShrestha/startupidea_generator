# CV Generator

CV Generator is a web application that helps users create ATS-friendly resumes quickly and easily. It provides a step-by-step form to input personal and professional information, enhances the CV content using AI, and allows users to download their resume in both PDF and DOCX formats.

## Features

- Multi-step form for easy data input
- AI-powered CV enhancement
- PDF and DOCX download options
- Responsive design
- ATS-friendly output

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- jsPDF (for PDF generation)
- docx (for DOCX generation)
- Groq AI (for CV enhancement)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AenishShrestha/cv_generator.git
   ```

2. Navigate to the project directory:
   ```bash
   cd cv_generator
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root directory and add your Groq API key:
   ```bash
   GROQ_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Fill in your personal information in the first step.
2. Add your professional details in the second step.
3. Click "Generate ATS-Friendly CV" to enhance your resume.
4. Review the enhanced CV and download it in your preferred format (PDF or DOCX).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [jsPDF](https://github.com/MrRio/jsPDF)
- [docx](https://github.com/dolanmiu/docx)
- [Groq](https://groq.com/)
