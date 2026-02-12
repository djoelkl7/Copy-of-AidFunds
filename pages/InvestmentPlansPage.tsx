

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { useUser } from '../contexts/UserContext';
import { GoogleGenAI } from '@google/genai';

const AIFinancialAdvisor: React.FC = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [useThinkingMode, setUseThinkingMode] = useState(false);

    // State for new goal inputs
    const [investmentGoal, setInvestmentGoal] = useState('Retirement');
    const [targetAmount, setTargetAmount] = useState('');
    const [timeline, setTimeline] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setResponse('');
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            
            const model = useThinkingMode ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
            const config = useThinkingMode ? { thinkingConfig: { thinkingBudget: 32768 } } : {};
            
            let goalContext = '';
            if (targetAmount && timeline) {
                goalContext = `My financial goal is for ${investmentGoal}. I want to reach a target of $${targetAmount.toLocaleString()} in ${timeline} years.`;
            }

            const result = await ai.models.generateContent({
                model: model,
                contents: `As an expert financial advisor for a company called AidFunds, answer the following user query about investment plans and financial strategies. The user is on a page displaying three investment plans: 'Starter Growth' (low risk), 'Dynamic Momentum' (medium risk), and 'Aggressive Alpha' (high risk). Consider the user's specific financial goals if provided. Provide a helpful, insightful, and well-structured response using Markdown for formatting (e.g., headings, bold text, lists). User's goals: "${goalContext}". User's query: "${query}"`,
                config: config,
            });

            setResponse(result.text);

        } catch (err) {
            console.error(err);
            setError('Sorry, I encountered an error while processing your request. The model may be overloaded. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatedSection>
            <div className="bg-light-bg-secondary dark:bg-primary-gray p-6 sm:p-8 rounded-lg shadow-lg mb-12">
                <h2 className="text-3xl font-bold text-center mb-2 text-light-text dark:text-white">Need Help Deciding?</h2>
                <p className="text-center text-light-text-secondary dark:text-gray-400 mb-6">Ask our AI Financial Advisor for personalized insights.</p>

                <div className="flex justify-center items-center mb-6">
                    <label htmlFor="thinking-mode-toggle" className="flex items-center cursor-pointer">
                        <span className="mr-3 text-sm font-medium text-light-text-secondary dark:text-gray-300">Quick Analysis</span>
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="thinking-mode-toggle"
                                className="sr-only"
                                checked={useThinkingMode}
                                onChange={() => setUseThinkingMode(!useThinkingMode)}
                            />
                            <div className={`block ${useThinkingMode ? 'bg-primary-red' : 'bg-gray-300 dark:bg-gray-600'} w-14 h-8 rounded-full transition-colors duration-300`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${useThinkingMode ? 'translate-x-6' : ''}`}></div>
                        </div>
                        <span className="ml-3 text-sm font-medium text-light-text-secondary dark:text-gray-300">Deep Analysis (slower)</span>
                    </label>
                </div>

                {/* Investment Goals Section */}
                <div className="mb-6 border-t border-b border-gray-200 dark:border-gray-700 py-6">
                    <h3 className="text-lg font-semibold text-center text-light-text dark:text-white mb-4">Define Your Investment Goal (Optional)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         <div>
                            <label htmlFor="investment-goal" className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-1">Goal</label>
                            <select
                                id="investment-goal"
                                value={investmentGoal}
                                onChange={(e) => setInvestmentGoal(e.target.value)}
                                className="w-full bg-gray-100 dark:bg-primary-dark border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-red transition duration-300"
                            >
                                <option>Retirement</option>
                                <option>House Down Payment</option>
                                <option>General Wealth Growth</option>
                                <option>Other</option>
                            </select>
                        </div>
                         <div>
                            <label htmlFor="target-amount" className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-1">Target Amount ($)</label>
                            <input
                                type="number"
                                id="target-amount"
                                value={targetAmount}
                                onChange={(e) => setTargetAmount(e.target.value)}
                                placeholder="e.g., 500000"
                                className="w-full bg-gray-100 dark:bg-primary-dark border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-red transition duration-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="timeline" className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-1">Timeline (Years)</label>
                            <input
                                type="number"
                                id="timeline"
                                value={timeline}
                                onChange={(e) => setTimeline(e.target.value)}
                                placeholder="e.g., 20"
                                className="w-full bg-gray-100 dark:bg-primary-dark border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-red transition duration-300"
                            />
                        </div>
                    </div>
                </div>


                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., 'Which plan is best for me?'"
                        className="flex-grow bg-gray-100 dark:bg-primary-dark border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-red transition duration-300"
                        disabled={isLoading}
                        aria-label="Ask a financial question"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !query.trim()}
                        className="bg-primary-red text-white font-bold px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {useThinkingMode ? 'Thinking...' : 'Answering...' }
                            </>
                        ) : 'Ask Advisor'}
                    </button>
                </form>

                {(response || error || isLoading) && (
                    <div className="mt-6 p-6 bg-light-bg dark:bg-black rounded-lg animate-fade-in">
                        {isLoading && !response && (
                             <div className="flex justify-center items-center">
                                <p className="text-light-text-secondary dark:text-gray-400">Our AI advisor is analyzing your query. {useThinkingMode ? 'Deep analysis may take a few moments...' : ''}</p>
                            </div>
                        )}
                        {error && <p className="text-red-500 dark:text-red-400 text-center">{error}</p>}
                        {response && (
                            <div className="prose prose-sm sm:prose dark:prose-invert max-w-none text-light-text dark:text-gray-300" style={{whiteSpace: 'pre-wrap'}}>
                                {response}
                            </div>
                        )}
                    </div>
                )}
                
                <p className="text-xs text-center text-light-text-secondary dark:text-gray-500 mt-6">
                    Disclaimer: The advice provided by the AI Financial Advisor is for informational purposes only and does not constitute financial advice. Please consult with a professional financial advisor before making any investment decisions.
                </p>
            </div>
        </AnimatedSection>
    );
};

interface InvestmentPlan {
  name: string;
  description: string;
  keyFeatures: string[];
  minInvestment: string;
  expectedReturns: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

const investmentPlans: InvestmentPlan[] = [
  {
    name: 'Starter Growth',
    description: 'Perfect for beginners looking to get started with investing. A balanced portfolio with a focus on stable growth.',
    keyFeatures: ['Diversified Portfolio', 'Low Management Fees', 'Automated Rebalancing', 'Access to Financial Advisors'],
    minInvestment: '$500',
    expectedReturns: '5-7% Annually',
    riskLevel: 'Low',
  },
  {
    name: 'Dynamic Momentum',
    description: 'For investors with some experience seeking higher returns. This plan focuses on growth stocks and market trends.',
    keyFeatures: ['Growth-Oriented Stocks', 'Active Management', 'In-depth Market Analysis', 'Quarterly Portfolio Review'],
    minInvestment: '$5,000',
    expectedReturns: '8-12% Annually',
    riskLevel: 'Medium',
  },
  {
    name: 'Aggressive Alpha',
    description: 'Designed for seasoned investors aiming for maximum returns. A high-risk, high-reward portfolio with a focus on emerging markets and tech.',
    keyFeatures: ['High-Growth Assets', 'Emerging Market Exposure', 'Advanced Trading Tools', 'Dedicated Portfolio Manager'],
    minInvestment: '$25,000',
    expectedReturns: '15%+ Annually',
    riskLevel: 'High',
  },
];

const PlanCard: React.FC<{ plan: InvestmentPlan; index: number }> = ({ plan, index }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    
    const handleGetStarted = () => {
      if (user) {
        // Placeholder for logged-in users to add the plan to their profile
        alert(`You've selected the "${plan.name}" plan! Feature to link this to your account is coming soon.`);
      } else {
        // Prompt non-logged-in users to log in
        navigate('/login');
      }
    };

    const getRiskColor = (risk: 'Low' | 'Medium' | 'High') => {
        switch (risk) {
            case 'Low': return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
            case 'Medium': return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300';
            case 'High': return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300';
        }
    };
    
    return (
        <AnimatedSection delay={100 + (index * 100)}>
            <div className="bg-light-bg-secondary dark:bg-primary-gray p-8 rounded-lg shadow-lg hover:shadow-2xl h-full flex flex-col transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary-red">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-light-text dark:text-white">{plan.name}</h3>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getRiskColor(plan.riskLevel)}`}>{plan.riskLevel} Risk</span>
                </div>
                <p className="text-light-text-secondary dark:text-gray-400 mb-6 flex-grow">{plan.description}</p>
                
                <div className="mb-6">
                    <h4 className="font-semibold text-light-text dark:text-gray-200 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                        {plan.keyFeatures.map((feature, i) => (
                            <li key={i} className="flex items-center text-light-text-secondary dark:text-gray-400">
                                <svg className="w-5 h-5 mr-2 text-primary-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center my-4 py-4 border-y border-gray-200 dark:border-gray-700">
                    <div>
                        <p className="text-sm text-light-text-secondary dark:text-gray-400">Minimum Investment</p>
                        <p className="text-xl font-bold text-light-text dark:text-white">{plan.minInvestment}</p>
                    </div>
                    <div>
                        <p className="text-sm text-light-text-secondary dark:text-gray-400">Expected Returns</p>
                        <p className="text-xl font-bold text-light-text dark:text-white">{plan.expectedReturns}</p>
                    </div>
                </div>

                <button 
                  onClick={handleGetStarted}
                  className="w-full mt-auto bg-primary-red text-white font-bold px-6 py-3 rounded-lg text-base hover:bg-red-700 transition duration-300 transform hover:scale-105"
                >
                    Get Started
                </button>
            </div>
        </AnimatedSection>
    );
};

const InvestmentPlansPage: React.FC = () => {
  return (
    <main className="bg-light-bg dark:bg-black">
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-light-text dark:text-white">Our Investment Plans</h1>
              <p className="text-lg text-light-text-secondary dark:text-gray-400 mt-4 max-w-3xl mx-auto">
                Find the perfect investment strategy tailored to your financial goals, risk tolerance, and timeline. We're here to help you grow your wealth.
              </p>
              <div className="w-24 h-1 bg-primary-red mx-auto mt-6"></div>
            </div>
          </AnimatedSection>
          
          <AIFinancialAdvisor />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {investmentPlans.map((plan, index) => (
              <PlanCard key={plan.name} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default InvestmentPlansPage;