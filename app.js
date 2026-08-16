document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // 1. Current Year & Toast Utilities
    // -----------------------------------------------------------------
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const toast = document.getElementById('toast');
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2800);
    }

    // -----------------------------------------------------------------
    // 2. Dynamic Typing Text Cycler Effect
    // -----------------------------------------------------------------
    const typingEl = document.getElementById('typing-text');
    if (typingEl) {
        const phrases = [
            "Modern Web Apps 💻",
            "Full-Stack Solutions 🚀",
            "Sleek User Interfaces ✨",
            "Digital Experiences 🌐"
        ];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        function typeLoop() {
            const currentPhrase = phrases[phraseIdx];

            if (isDeleting) {
                typingEl.textContent = currentPhrase.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typingEl.textContent = currentPhrase.substring(0, charIdx + 1);
                charIdx++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIdx === currentPhrase.length) {
                typeSpeed = 2200; // Pause at full phrase
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typeSpeed = 400; // Pause before typing next phrase
            }

            setTimeout(typeLoop, typeSpeed);
        }

        typeLoop();
    }

    // -----------------------------------------------------------------
    // 3. Navbar Active State on Scroll
    // -----------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // -----------------------------------------------------------------
    // 4. 3D Tilt Effect & Dynamic Mouse Sheen Overlay
    // -----------------------------------------------------------------
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // -----------------------------------------------------------------
    // 5. Share Profile Button
    // -----------------------------------------------------------------
    const shareProfileBtn = document.getElementById('share-profile-btn');
    if (shareProfileBtn) {
        shareProfileBtn.addEventListener('click', triggerShare);
    }

    function triggerShare() {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: 'Check out Aryan Mane\'s portfolio & social links!',
                url: window.location.href
            }).catch(err => console.log('Share canceled:', err));
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                showToast('Profile link copied to clipboard! ✨');
            });
        }
    }

    // -----------------------------------------------------------------
    // 6. QR Code Modal Engine (Standard Scannable QR Image)
    // -----------------------------------------------------------------
    const qrTrigger = document.getElementById('qr-modal-trigger');
    const qrModal = document.getElementById('qr-modal');
    const qrClose = document.getElementById('qr-modal-close');
    const qrWrapper = document.getElementById('qr-code-wrapper');
    const qrUrlText = document.getElementById('qr-url-text');
    const copyQrBtn = document.getElementById('copy-qr-url-btn');

    if (qrTrigger && qrModal) {
        qrTrigger.addEventListener('click', () => {
            const currentUrl = window.location.href;
            if (qrUrlText) qrUrlText.textContent = currentUrl;
            generateCanvasQR(currentUrl);
            qrModal.classList.add('show');
        });

        if (qrClose) {
            qrClose.addEventListener('click', () => qrModal.classList.remove('show'));
        }

        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) qrModal.classList.remove('show');
        });

        if (copyQrBtn) {
            copyQrBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showToast('Link copied to clipboard!');
                    qrModal.classList.remove('show');
                });
            });
        }
    }

    function generateCanvasQR(text) {
        if (!qrWrapper) return;
        qrWrapper.innerHTML = '';

        const img = document.createElement('img');
        img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}&margin=10`;
        img.alt = 'Profile QR Code';
        img.width = 180;
        img.height = 180;
        img.style.borderRadius = '8px';
        img.style.display = 'block';

        qrWrapper.appendChild(img);
    }

    // -----------------------------------------------------------------
    // 7. Ambient Canvas Starfield Animation
    // -----------------------------------------------------------------
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const numParticles = 35;

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.5 + 0.2
            });
        }

        function renderCanvas() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, idx) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.fill();

                for (let j = idx + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 110) * 0.08})`;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(renderCanvas);
        }

        renderCanvas();
    }

    // -----------------------------------------------------------------
    // 8. AI Assistant Chatbot Engine
    // -----------------------------------------------------------------
    const aiToggleBtn = document.getElementById('ai-widget-toggle');
    const aiChatWindow = document.getElementById('ai-chat-window');
    const aiChatClose = document.getElementById('ai-chat-close');
    const aiChatMessages = document.getElementById('ai-chat-messages');
    const aiChatForm = document.getElementById('ai-chat-form');
    const aiChatInput = document.getElementById('ai-chat-input');
    const chipBtns = document.querySelectorAll('.chip-btn');

    if (aiToggleBtn && aiChatWindow) {
        aiToggleBtn.addEventListener('click', () => {
            aiChatWindow.classList.toggle('show');
            if (aiChatWindow.classList.contains('show') && aiChatInput) {
                aiChatInput.focus();
            }
        });

        if (aiChatClose) {
            aiChatClose.addEventListener('click', () => {
                aiChatWindow.classList.remove('show');
            });
        }

        chipBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.dataset.query;
                handleUserMessage(query);
            });
        });

        if (aiChatForm) {
            aiChatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const text = aiChatInput.value.trim();
                if (!text) return;
                aiChatInput.value = '';
                handleUserMessage(text);
            });
        }
    }

    function handleUserMessage(userText) {
        // Append User Message
        appendMessage(userText, 'user-msg');

        // Typing Indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'ai-msg bot-msg typing-ind';
        typingIndicator.textContent = '🤖 typing...';
        aiChatMessages.appendChild(typingIndicator);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

        // Generate Bot Response
        setTimeout(() => {
            typingIndicator.remove();
            const responseText = getAIResponse(userText);
            appendMessage(responseText, 'bot-msg');
        }, 650);
    }

    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `ai-msg ${className}`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        aiChatMessages.appendChild(msgDiv);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    function getAIResponse(query) {
        const q = query.toLowerCase();

        if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language')) {
            return "💻 <b>Aryan's Key Skills:</b><br/>• JavaScript (ES6+), React.js, Node.js<br/>• HTML5, CSS3 & Responsive UI<br/>• REST APIs, Git & GitHub";
        }

        if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('message')) {
            return "📫 <b>Get in Touch:</b><br/>You can email Aryan directly at <a href='mailto:manearyan5222@gmail.com' style='color:#38bdf8;'>manearyan5222@gmail.com</a>!";
        }

        if (q.includes('social') || q.includes('link') || q.includes('profile') || q.includes('linkedin') || q.includes('instagram') || q.includes('twitter') || q.includes('github')) {
            return "🔗 <b>Aryan's Social Profiles:</b><br/>• <a href='https://www.linkedin.com/in/aryan-mane-3861ab400' target='_blank' style='color:#38bdf8;'>LinkedIn</a><br/>• <a href='https://www.instagram.com/aryanmane_7' target='_blank' style='color:#ec4899;'>Instagram</a><br/>• <a href='https://x.com/AryanManex7' target='_blank' style='color:#38bdf8;'>Twitter / X</a><br/>• <a href='https://github.com/manearyan5222' target='_blank' style='color:#a855f7;'>GitHub</a>";
        }

        if (q.includes('who') || q.includes('aryan') || q.includes('about') || q.includes('background') || q.includes('bio')) {
            return "⚡ <b>About Aryan Mane:</b><br/>Aryan is a software developer passionate about building high-performance, responsive web applications and sleek digital experiences.";
        }

        return "I'm Aryan's AI assistant! Try asking about his <b>skills</b>, <b>social profiles</b>, or <b>how to contact him</b>.";
    }
});
