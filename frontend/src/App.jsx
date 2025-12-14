import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import ReviewOutput from './components/ReviewOutput';
import { reviewCode } from './services/api';

function App() {
    const [code, setCode] = useState('// Type your code here\nfunction example() {\n  return "Hello World";\n}');
    const [language, setLanguage] = useState('javascript');
    const [review, setReview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleReview = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await reviewCode(code);
            setReview(result);
        } catch (err) {
            setError("Failed to fetch review. Please check backend connection.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* Header */}
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center z-10 shadow-md h-16 shrink-0">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span>🤖</span> AI Code Review Assistant
                </h1>
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/KaranOps/IntelliReview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        title="View on GitHub"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-8 h-8"
                            aria-hidden="true"
                        >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    <button
                        onClick={handleReview}
                        disabled={isLoading}
                        className={`px-6 py-2 rounded font-semibold transition-colors ${isLoading
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isLoading ? 'Reviewing...' : 'Review Code'}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 overflow-hidden relative">
                {error && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow-lg">
                        {error}
                        <button onClick={() => setError(null)} className="ml-4 font-bold">✕</button>
                    </div>
                )}

                {/* Sidebar */}
                <aside className="w-20 bg-gray-900 text-white flex flex-col items-center py-6 gap-4 border-r border-gray-700 shrink-0">
                    <LanguageButton lang="cpp" label="C++" current={language} set={setLanguage} />
                    <LanguageButton lang="java" label="Java" current={language} set={setLanguage} />
                    <LanguageButton lang="python" label="Py" current={language} set={setLanguage} />
                    <LanguageButton lang="javascript" label="JS" current={language} set={setLanguage} />
                </aside>

                <div className="flex flex-1 h-full">
                    {/* Left: Code Editor */}
                    <div className="w-1/2 h-full">
                        <CodeEditor code={code} language={language} onChange={setCode} />
                    </div>

                    {/* Right: Review Output */}
                    <div className="w-1/2 h-full bg-white">
                        <ReviewOutput review={review} isLoading={isLoading} />
                    </div>
                </div>
            </main>
        </div>
    );
}

const LanguageButton = ({ lang, label, current, set }) => (
    <button
        onClick={() => set(lang)}
        className={`w-12 h-12 rounded-lg font-bold text-sm transition-all flex items-center justify-center
            ${current === lang
                ? 'bg-blue-600 shadow-lg scale-105 ring-2 ring-blue-400'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
        title={lang}
    >
        {label}
    </button>
);

export default App;
