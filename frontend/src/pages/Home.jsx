import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Insights from '../components/home/Insights';
import Downloads from '../components/home/Downloads';
import FAQ from '../components/home/FAQ';
import Contact from '../components/home/Contact';

const Home = () => {
    const location = useLocation();

    const isFirstRender = useRef(true);

    // Handle hash scrolling from other routes, but prevent it on initial reload
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            window.scrollTo(0, 0);
            if (window.location.hash) {
                window.history.replaceState('', document.title, window.location.pathname + window.location.search);
            }
            return;
        }

        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100); // Small delay to allow render
            }
        }
    }, [location]);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const sections = document.querySelectorAll('.fade-in-section');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <div className="home-page">
            {/* Floating navigation dots can go here */}
            <Hero />
            <div className="fade-in-section"><About /></div>
            <div className="fade-in-section"><Insights /></div>
            <div className="fade-in-section"><Downloads /></div>
            <div className="fade-in-section"><FAQ /></div>
            <div className="fade-in-section"><Contact /></div>
        </div>
    );
};

export default Home;
