import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            q: "What is the Gini Index?",
            a: "The Gini index is a measure of statistical dispersion representing the income inequality within a nation. A score of 0 means perfect equality (everyone has the exact same income), while 100 means perfect inequality (one person has all the income)."
        },
        {
            q: "What is the Inequality Severity Index?",
            a: "This is a custom composite metric developed in Milestone 2. It mathematically blends the baseline Gini coefficient with the structural wealth concentration factor (Top 10% vs Bottom 10% income share) to reveal extreme disparity zones."
        },
        {
            q: "How is the Inclusive Development Score calculated?",
            a: "The score tracks whether the Median Income growth outpaces or matches the GDP per Capita growth. High scores indicate the average citizen's wealth is proportionally rising alongside national economic expansion."
        },
        {
            q: "Can researchers download and use this dataset?",
            a: "Yes! The curated Merged_sheet.xlsx is available in the Download section. You are free to replicate the analytical DAX models documented in the analysis for independent socio-economic studies."
        },
        {
            q: "Is this data policy-relevant?",
            a: "Absolutely. Identifying 'Growth-Skewed Economies'—nations with high GDP but low median incomes and high inequality—provides direct evidence for needed reforms in taxation, wage structuring, and welfare distribution."
        }
    ];

    return (
        <section id="faq" className="faq-section section">
            <div className="container">
                <div className="faq-container">
                    <div className="faq-header">
                        <h2 className="section-title text-left">
                            Frequently Asked <span className="gradient-text">Questions</span>
                        </h2>
                        <p className="section-subtitle text-left">
                            Expert explanations regarding our methodology, formulas, and policy applications.
                        </p>
                        <div className="faq-illustration">
                            <HelpCircle size={100} className="floating-icon" />
                        </div>
                    </div>

                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item glass-panel ${openIndex === index ? 'open' : ''}`}
                                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                            >
                                <div className="faq-question">
                                    <h3>{faq.q}</h3>
                                    <div className="faq-toggle">
                                        <ChevronDown size={20} />
                                    </div>
                                </div>
                                <div className="faq-answer">
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
