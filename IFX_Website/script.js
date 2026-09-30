// ========================================
// IDEAFORGENEX GROUP - MAIN JAVASCRIPT
// ========================================

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    initHeroSlider();
    initParticles();
});

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 5000;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    setInterval(nextSlide, slideInterval);
}

// Floating Particles Background
function initParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 45;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height + 10;
            this.size = Math.random() * 2 + 1;
            this.speedY = -(Math.random() * 0.8 + 0.2);
            this.speedX = (Math.random() * 0.4 - 0.2);
            this.opacity = Math.random() * 0.5 + 0.15;
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            
            if (this.y < -10) {
                this.y = canvas.height + 10;
                this.x = Math.random() * canvas.width;
            }
            if (this.x < -10 || this.x > canvas.width + 10) {
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    function setup() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
            particles[i].y = Math.random() * canvas.height;
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    setup();
    animate();
}

// Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = current + '+';
        }
    }, 40);
}

// Observe stats for counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Idea Modal Data
const ideaData = {
    waste: {
        title: 'Smart Waste Management',
        status: '🟢 Live',
        description: 'AI-powered system for efficient waste sorting and recycling optimization.',
        problem: 'Cities were struggling with inefficient waste collection, leading to environmental pollution and high operational costs.',
        solution: 'An AI-powered waste management system that optimizes collection routes, monitors bin levels in real-time, and automates sorting processes.',
        benefits: [
            'Reduced waste collection costs by 40%',
            'Improved recycling rates by 35%',
            'Real-time monitoring and analytics',
            'Automated sorting and routing'
        ],
        futureScope: 'Scaling to multiple cities, integrating with smart city infrastructure, and expanding to industrial waste management.',
        timeline: [
            { date: 'Q1 2024', milestone: 'Research and development' },
            { date: 'Q2 2024', milestone: 'Prototype development' },
            { date: 'Q3 2024', milestone: 'Pilot testing' },
            { date: 'Q4 2024', milestone: 'Full deployment' }
        ]
    },
    learning: {
        title: 'Digital Learning Platform',
        status: '🟡 Ongoing',
        description: 'Interactive education system for skill development and knowledge sharing.',
        problem: 'Access to quality education and skill development was limited in rural areas and underserved communities.',
        solution: 'An interactive digital learning platform with offline capabilities, personalized learning paths, and community-driven content creation.',
        benefits: [
            'Offline access to educational content',
            'Personalized learning paths',
            'Community-driven content',
            'Progress tracking and certification'
        ],
        futureScope: 'Partnerships with educational institutions, certification programs, and global expansion to bridge the education gap.',
        timeline: [
            { date: 'Q2 2024', milestone: 'Platform development' },
            { date: 'Q3 2024', milestone: 'Content creation' },
            { date: 'Q4 2024', milestone: 'Beta testing' },
            { date: '2025', milestone: 'Full launch' }
        ]
    },
    energy: {
        title: 'Renewable Energy Grid',
        status: '🔵 Future',
        description: 'Decentralized energy distribution system for sustainable communities.',
        problem: 'Traditional energy grids are inefficient, expensive to maintain, and not environmentally sustainable.',
        solution: 'A decentralized renewable energy distribution system that integrates solar, wind, and other renewable sources with smart grid technology.',
        benefits: [
            'Reduced carbon footprint',
            'Lower energy costs for communities',
            'Resilient and reliable power supply',
            'Scalable and modular design'
        ],
        futureScope: 'Integration with smart home systems, expansion to industrial applications, and development of energy trading platforms.',
        timeline: [
            { date: '2025', milestone: 'Research and design' },
            { date: '2026', milestone: 'Prototype development' },
            { date: '2027', milestone: 'Pilot implementation' },
            { date: '2028', milestone: 'Full deployment' }
        ]
    },
    home: {
        title: 'Smart Home Automation',
        status: '🟢 Live',
        description: 'IoT-based home management system for energy efficiency and security.',
        problem: 'Homeowners lacked affordable, easy-to-use smart home solutions that didn\'t require technical expertise.',
        solution: 'A user-friendly IoT-based home automation system with voice control, energy monitoring, and security features.',
        benefits: [
            '30% average energy savings',
            'Voice-controlled automation',
            'Real-time security monitoring',
            'Easy setup and maintenance'
        ],
        futureScope: 'Integration with renewable energy systems, AI-driven automation, and expansion to commercial buildings.',
        timeline: [
            { date: 'Q2 2024', milestone: 'Development' },
            { date: 'Q3 2024', milestone: 'Testing' },
            { date: 'Q4 2024', milestone: 'Launch' },
            { date: '2025', milestone: 'Expansion' }
        ]
    },
    ai: {
        title: 'AI Customer Support',
        status: '🟡 Ongoing',
        description: 'Intelligent chatbot system for automated customer service and support.',
        problem: 'Businesses struggled with providing 24/7 customer support while maintaining quality and reducing costs.',
        solution: 'An AI-powered chatbot system that handles customer inquiries, provides instant responses, and escalates complex issues to human agents.',
        benefits: [
            '24/7 availability',
            'Reduced operational costs',
            'Improved response times',
            'Seamless human handoff'
        ],
        futureScope: 'Integration with CRM systems, multi-language support, and advanced sentiment analysis.',
        timeline: [
            { date: 'Q3 2024', milestone: 'AI model training' },
            { date: 'Q4 2024', milestone: 'Integration testing' },
            { date: '2025', milestone: 'Beta deployment' },
            { date: '2025', milestone: 'Full launch' }
        ]
    },
    farming: {
        title: 'Urban Farming System',
        status: '🔵 Future',
        description: 'Automated hydroponic farming solution for urban food production.',
        problem: 'Urban areas face food security challenges, limited space for traditional farming, and high transportation costs for fresh produce.',
        solution: 'An automated hydroponic farming system designed for urban environments, with IoT monitoring, automated nutrient delivery, and vertical growing capabilities.',
        benefits: [
            'Year-round food production',
            '90% less water usage',
            'No pesticides required',
            'Local food production'
        ],
        futureScope: 'Community farming initiatives, integration with smart city infrastructure, and development of mobile farming units.',
        timeline: [
            { date: '2025', milestone: 'Research and design' },
            { date: '2026', milestone: 'Prototype development' },
            { date: '2027', milestone: 'Pilot testing' },
            { date: '2028', milestone: 'Commercial launch' }
        ]
    }
};

// Open Idea Modal
function openIdeaModal(ideaId) {
    const modal = document.getElementById('ideaModal');
    const modalBody = document.getElementById('modalBody');
    const idea = ideaData[ideaId];

    if (!idea) return;

    let timelineHTML = '<div class="modal-timeline">';
    idea.timeline.forEach(item => {
        timelineHTML += `
            <div class="modal-timeline-item">
                <strong>${item.date}</strong> - ${item.milestone}
            </div>
        `;
    });
    timelineHTML += '</div>';

    let benefitsHTML = '<ul>';
    idea.benefits.forEach(benefit => {
        benefitsHTML += `<li>${benefit}</li>`;
    });
    benefitsHTML += '</ul>';

    modalBody.innerHTML = `
        <span class="status-badge ${idea.status.includes('Live') ? 'live' : idea.status.includes('Ongoing') ? 'ongoing' : 'future'}">${idea.status}</span>
        <h2>${idea.title}</h2>
        <p><strong>Description:</strong> ${idea.description}</p>
        
        <h3>Problem Statement</h3>
        <p>${idea.problem}</p>
        
        <h3>Proposed Solution</h3>
        <p>${idea.solution}</p>
        
        <h3>Benefits</h3>
        ${benefitsHTML}
        
        <h3>Future Scope</h3>
        <p>${idea.futureScope}</p>
        
        <h3>Progress Timeline</h3>
        ${timelineHTML}
        
        <div style="margin-top: 30px; display: flex; gap: 15px; flex-wrap: wrap;">
            <a href="contact.html" class="btn btn-primary">Partner With Us</a>
            <a href="contact.html" class="btn btn-secondary">Request Demo</a>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
const closeModal = document.querySelector('.close-modal');
const modal = document.getElementById('ideaModal');

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Filter Ideas
const filterBtns = document.querySelectorAll('.filter-btn');
const ideaCards = document.querySelectorAll('.idea-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        ideaCards.forEach(card => {
            const status = card.getAttribute('data-status');
            if (filter === 'all' || status === filter) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    });
});

    // Purpose Card Interaction
    const purposeCards = document.querySelectorAll('.purpose-card');
    const purposeContents = document.querySelectorAll('.tab-content');

    purposeCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards and contents
            purposeCards.forEach(c => c.classList.remove('active'));
            purposeContents.forEach(c => c.classList.remove('active'));

            // Add active class to selected card and its content
            card.classList.add('active');
            const tabId = card.getAttribute('data-tab');
            const content = document.getElementById(tabId);
            if (content) {
                content.classList.add('active');
            }
        });
    });

// Form Handling
function handleFormSubmit(event, formType) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // In a real application, you would send this data to a server
    console.log(`${formType} form submitted:`, Object.fromEntries(formData));
    
    // Show success message
    alert('Thank you for your submission! We will get back to you within 24-48 hours.');
    
    // Reset form
    form.reset();
}

// AI Assistant
function toggleAIChat() {
    const aiChat = document.getElementById('aiChat');
    aiChat.classList.toggle('active');
}

function sendAIQuery(query) {
    const chatMessages = document.getElementById('chatMessages');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = query;
    chatMessages.appendChild(userMessage);
    
    // Get AI response
    const response = getAIResponse(query);
    
    // Add AI message after a short delay
    setTimeout(() => {
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai-message';
        aiMessage.textContent = response;
        chatMessages.appendChild(aiMessage);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message) {
        sendAIQuery(message);
        chatInput.value = '';
    }
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function getAIResponse(query) {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('what is ideaforgenex') || lowerQuery.includes('about ideaforgenex')) {
        return 'Ideaforgenex Group is a future-focused innovation organization building smart solutions across technology, sustainability, and real-world systems. We turn bold ideas into practical, scalable products.';
    } else if (lowerQuery.includes('services') || lowerQuery.includes('offer')) {
        return 'We offer three main services: Product Development (building apps, platforms, systems), Idea Consulting (refining and structuring ideas), and AI Solutions (AI systems and automation). Visit our Services page for more details!';
    } else if (lowerQuery.includes('founder') || lowerQuery.includes('who is')) {
        return 'Hemanth Chinthala is the Founder & CEO of Ideaforgenex Group. He is a student and innovator focused on solving real-world problems through ideas and technology.';
    } else if (lowerQuery.includes('collaborate') || lowerQuery.includes('partner')) {
        return 'You can collaborate with us by visiting our Contact page and selecting "Collaborate With Us" to submit your proposal. We\'re always looking for innovative partners!';
    } else if (lowerQuery.includes('project') || lowerQuery.includes('start')) {
        return 'To start a project, visit our Contact page and fill out the "Start a Project" form. Tell us about your idea and we\'ll help you bring it to life!';
    } else if (lowerQuery.includes('ideas') || lowerQuery.includes('hub')) {
        return 'Visit our Ideas Hub to explore our current projects including Smart Waste Management, Digital Learning Platform, Renewable Energy Grid, and more!';
    } else if (lowerQuery.includes('portfolio')) {
        return 'Our Portfolio showcases our proof of work including case studies, projects built, systems designed, and partnerships. Check it out to see what we\'ve accomplished!';
    } else if (lowerQuery.includes('contact') || lowerQuery.includes('reach')) {
        return 'You can reach us through our Contact page or email us at hello@ideaforgenex.com. We typically respond within 24-48 hours.';
    } else if (lowerQuery.includes('join') || lowerQuery.includes('career')) {
        return 'We\'re always looking for talented individuals to join our team! Visit our Contact page and select "Join Us" to submit your application.';
    } else {
        return 'I\'m here to help! You can ask me about Ideaforgenex, our services, our founder, how to collaborate, start a project, or navigate to different sections of our website.';
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(17, 17, 17, 0.8)';
    }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Ideaforgenex Group website loaded successfully');
    
    // Set active nav link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath) || (currentPath === '/' && linkPath === 'index.html')) {
            link.classList.add('glowing-active');
        }
    });
    
    // Recognition Carousel functionality
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (carouselTrack && prevBtn && nextBtn) {
        const scrollAmount = 320; // card width + gap
        
        prevBtn.addEventListener('click', () => {
            carouselTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            carouselTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        
        // Auto slide every 6000ms
        setInterval(() => {
            carouselTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }, 6000);
    }
});

// IFG Bot Knowledge Base - Secure and Guarded
const IFG_BOT_KNOWLEDGE_BASE = {
    identity: {
        name: "Idea Forgenex Group",
        description: "A forward-thinking innovation group focused on transforming ideas into practical solutions through creativity, technology, and execution.",
        motto: "Ideas That Build Tomorrow"
    },
    founder: {
        name: "Hemanth Chinthala",
        role: "Founder & CEO",
        background: "Student and innovator who started Ideaforgenex with a vision to solve real-world problems through ideas and technology."
    },
    core_ventures: [
        "Smart Waste Management - AI-powered waste sorting and recycling optimization",
        "Digital Learning Platform - Interactive education system for skill development",
        "Renewable Energy Grid - Decentralized energy distribution for sustainable communities",
        "HomeGrid Relay - Hardware firmware and dashboard for appliance scheduling and power monitoring",
        "EduLink Portal - Local learning hub with offline Wi-Fi router relays"
    ],
    contact_info: {
        email: "ideaforgenexgroup@gmail.com",
        location: "Online First - Operating digitally to connect and collaborate globally"
    },
    services: [
        "Product Development",
        "System Design",
        "Brand Development",
        "Consulting",
        "Collaboration Opportunities"
    ],
    guardrails: {
        strict_instructions: "Only provide information contained within this knowledge base. Do not hallucinate, invent, or speculate beyond these facts. If asked about information not present here, politely state that you don't have that information and suggest contacting the team directly.",
        scope_limit: "Stay within the scope of Ideaforgenex Group's activities, services, and publicly available information. Do not make claims about partnerships, achievements, or future plans not explicitly stated."
    }
};

// Map conditional tab contents visibility handling logic rules cleanly
const optButtons = document.querySelectorAll('.option-buttons button');
const tabForms = document.querySelectorAll('.tab-content');

optButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        tabForms.forEach(form => form.classList.remove('active'));
        // Correlate active targets explicitly
        const targetId = ['project', 'collaborate', 'join', 'enquiry', 'idea'][idx];
        document.getElementById(targetId)?.classList.add('active');
    });
});

// Sync visual active states during live client rendering contexts
document.addEventListener("DOMContentLoaded", () => {
    const activePath = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-link").forEach(link => {
        if(link.getAttribute("href") === activePath) {
            link.classList.add("glowing-active");
        } else {
            link.classList.remove("glowing-active");
        }
    });
});