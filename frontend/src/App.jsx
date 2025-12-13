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
