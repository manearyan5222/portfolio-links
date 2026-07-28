document.addEventListener('DOMContentLoaded', () => {
    // Current Year Update
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Set interactive local storage counters for likes/shares
    const likeCountEl = document.getElementById('like-count');
    const shareCountEl = document.getElementById('share-count');
    
    let likes = parseInt(localStorage.getItem('portfolio_likes') || '0', 10);
    let shares = parseInt(localStorage.getItem('portfolio_shares') || '0', 10);

    likeCountEl.textContent = likes;
    shareCountEl.textContent = shares;

    // Likes increment logic
    const likesBox = document.getElementById('stat-likes');
    if (likesBox) {
        likesBox.addEventListener('click', () => {
            likes++;
            localStorage.setItem('portfolio_likes', likes);
            likeCountEl.textContent = likes;
            showToast('Thank you for the support! 💖');
            createHeartExplosion(likesBox);
        });
    }

    // Toast System
    const toast = document.getElementById('toast');
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // WhatsApp Action Handling
    const whatsappCard = document.getElementById('whatsapp-card');
    if (whatsappCard) {
        const phone = whatsappCard.dataset.phone;
        const chatBtn = whatsappCard.querySelector('.chat-btn');
        const copyBtn = whatsappCard.querySelector('.copy-btn');

        chatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
        });

        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(phone).then(() => {
                showToast(`Copied WhatsApp number: ${phone}`);
            }).catch(() => {
                showToast('Failed to copy number.');
            });
        });

        // Clicking card defaults to chat
        whatsappCard.addEventListener('click', () => {
            chatBtn.click();
        });
    }

    // Profile Share Button
    const shareBtn = document.getElementById('share-profile-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            shares++;
            localStorage.setItem('portfolio_shares', shares);
            shareCountEl.textContent = shares;

            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    text: 'Check out my portfolio and social channels!',
                    url: window.location.href
                }).catch(err => console.log('Share error:', err));
            } else {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showToast('Link copied to clipboard! Share it with anyone.');
                });
            }
        });
    }

    // Particle background generation
    const particleContainer = document.getElementById('particle-container');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random dimensions
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random positioning
        resetParticlePosition(particle);
        
        particleContainer.appendChild(particle);

        animateParticle(particle);
    }

    function resetParticlePosition(particle) {
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
    }

    function animateParticle(particle) {
        const duration = Math.random() * 20000 + 10000;
        const xTranslation = (Math.random() - 0.5) * 200;
        const yTranslation = (Math.random() - 0.5) * 200;

        const animation = particle.animate([
            { transform: 'translate(0, 0)', opacity: particle.style.opacity },
            { transform: `translate(${xTranslation}px, ${yTranslation}px)`, opacity: 0 }
        ], {
            duration: duration,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        });
    }

    // Mini interactive effect: Heart explosion
    function createHeartExplosion(parentElement) {
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'absolute';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '1.2rem';
            heart.style.pointerEvents = 'none';
            heart.style.transform = 'translate(-50%, -50%)';
            parentElement.appendChild(heart);

            const angle = (i / 8) * Math.PI * 2;
            const velocity = Math.random() * 50 + 30;
            const destX = Math.cos(angle) * velocity;
            const destY = Math.sin(angle) * velocity;

            heart.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
            }).onfinish = () => heart.remove();
        }
    }
});
