# Startup Idea Generator

This is a Next.js project that generates startup ideas based on selected categories using AI-powered text generation.

## Features

- Interactive UI for selecting business categories
- AI-powered startup idea generation
- Display of generated ideas with market demand and supply ratings

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building the web application
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Groq SDK](https://groq.com/) - AI text generation API

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/AenishShrestha/startupidea_generator.git
   ```

2. Install dependencies:
   ```bash
   cd startup-idea-generator
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Groq API key:
   ```bash
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Select at least 3 categories from the provided options.
2. Click the "Generate Ideas" button.
3. View the generated startup ideas, each with a title, description, and market demand/supply ratings.

## Project Structure

- `components/ui/StartupIdeaGenerator.tsx`: Main component for the idea generator UI
- `app/api/generate-ideas/route.ts`: API route for generating ideas using Groq
- `app/page.tsx`: Main page component
- `next.config.mjs`: Next.js configuration file
- `tailwind.config.ts`: Tailwind CSS configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
