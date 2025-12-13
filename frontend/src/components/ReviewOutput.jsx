import React from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

const ReviewOutput = ({ review, isLoading }) => {
    return (
        <div className="h-full w-full p-6 overflow-y-auto bg-gray-50">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Analyzing your code...</p>
                </div>
            ) : review ? (
                <div className="prose prose-slate max-w-none bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        className="rounded-md shadow-sm !my-4"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className="bg-gray-100 text-red-500 px-1 py-0.5 rounded font-mono text-sm" {...props}>
                                        {children}
                                    </code>
                                )
                            },
                            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mt-8 mb-4 flex items-center gap-2" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 my-4 text-gray-700" {...props} />,
                            li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                            p: ({ node, ...props }) => <p className="leading-7 text-gray-700 my-4" {...props} />
                        }}
                    >
                        {review}
                    </Markdown>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <div className="text-6xl mb-4">🚀</div>
                    <p className="text-xl font-semibold text-gray-600">Ready to Review</p>
                    <p className="mt-2 text-sm">Select a language and click "Review Code" to start.</p>
                </div>
            )}
        </div>
    );
};

export default ReviewOutput;
