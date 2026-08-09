document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // 1. Current Year & Utilities
    // -----------------------------------------------------------------
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Toast Notification Utility
    const toast = document.getElementById('toast');
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2800);
    }

    // Share Profile Button
    const shareProfileBtn = document.getElementById('share-profile-btn');
    if (shareProfileBtn) {
        shareProfileBtn.addEventListener('click', triggerShare);
    }

    function triggerShare() {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: 'Check out Aryan Mane\'s social links!',
                url: window.location.href
            }).catch(err => console.log('Share canceled:', err));
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                showToast('Profile link copied to clipboard! ✨');
            });
        }
    }

    // -----------------------------------------------------------------
    // 2. 3D Tilt Effect & Dynamic Mouse Sheen Overlay
    // -----------------------------------------------------------------
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // -----------------------------------------------------------------
    // 3. Theme Switcher Engine
    // -----------------------------------------------------------------
    const themeButtons = document.querySelectorAll('.theme-btn');
    const savedTheme = localStorage.getItem('portfolio_theme') || 'midnight';
    setTheme(savedTheme);

    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const themeVal = btn.dataset.themeVal;
            setTheme(themeVal);
            localStorage.setItem('portfolio_theme', themeVal);
            showToast(`Theme switched to ${themeVal.toUpperCase()} ✨`);
        });
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        themeButtons.forEach(btn => {
            if (btn.dataset.themeVal === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // -----------------------------------------------------------------
    // 4. Tab Navigation Engine
    // -----------------------------------------------------------------
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetEl = document.getElementById(`tab-${targetTab}`);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // -----------------------------------------------------------------
    // 5. WhatsApp Actions
    // -----------------------------------------------------------------
    const whatsappCard = document.getElementById('whatsapp-card');
    if (whatsappCard) {
        const phone = whatsappCard.dataset.phone;
        const chatBtn = whatsappCard.querySelector('.chat-btn');
        const copyBtn = whatsappCard.querySelector('.copy-btn');

        if (chatBtn) {
            chatBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(phone).then(() => {
                    showToast(`WhatsApp Number Copied: ${phone}`);
                });
            });
        }
    }

    // -----------------------------------------------------------------
    // 6. QR Code Modal Engine (Pure JS Canvas Generator)
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

    // Standard Scannable QR Code Generator
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

                // Draw subtle connecting web lines
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
    // 8. Micro Burst FX on Likes
    // -----------------------------------------------------------------
    function createHeartExplosion(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = `${rect.left + rect.width / 2}px`;
            heart.style.top = `${rect.top + rect.height / 2}px`;
            heart.style.fontSize = '1.1rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '999';
            document.body.appendChild(heart);

            const angle = (i / 10) * Math.PI * 2;
            const dist = Math.random() * 60 + 30;
            const destX = Math.cos(angle) * dist;
            const destY = Math.sin(angle) * dist;

            heart.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`, opacity: 0 }
            ], {
                duration: 850,
                easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
            }).onfinish = () => heart.remove();
        }
    }
});
