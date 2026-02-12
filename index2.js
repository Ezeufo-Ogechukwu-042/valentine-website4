        // Create floating hearts
        const heartsContainer = document.getElementById('hearts');
        const emojis = ['💕', '💖', '💗', '💓', '💝', '💘'];
        
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 4 + 's';
            heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            heartsContainer.appendChild(heart);
            
            setTimeout(() => heart.remove(), 6000);
        }
        
        setInterval(createHeart, 500);

        // Button functionality
        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');
        const buttonsContainer = document.getElementById('buttons-container');
        const mainContent = document.getElementById('main-content');
        const celebration = document.getElementById('celebration');
        const bigHeart = document.getElementById('big-heart');
        const successMessage = document.getElementById('success-message');

        let noClickCount = 0;
        const phrases = [
            "Are you sure? 😢",
            "Please think again! 🙏",
            "Don't break my heart! 💔",
            "I'll be very sad... 😞",
            "Single click can change everything! 💫",
            "Pretty please with a cherry on top! 🍒",
            "My heart is getting weaker! 💓"
        ];

        // Move no button away when hovered or clicked
        noBtn.addEventListener('mouseover', moveNoButton);
        noBtn.addEventListener('click', moveNoButton);
        noBtn.addEventListener('touchstart', moveNoButton);

        function moveNoButton() {
            const containerRect = buttonsContainer.getBoundingClientRect();
            const btnRect = noBtn.getBoundingClientRect();
            
            // Get viewport dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Calculate safe movement area (keep button within viewport)
            const maxX = viewportWidth - btnRect.width - 20;
            const maxY = viewportHeight - btnRect.height - 20;
            const minX = 20;
            const minY = 20;
            
            // Generate random position
            let newX, newY;
            let attempts = 0;
            
            do {
                newX = Math.random() * (maxX - minX) + minX;
                newY = Math.random() * (maxY - minY) + minY;
                attempts++;
            } while (
                // Check distance from container center (keep somewhat near)
                Math.abs(newX - viewportWidth/2) < 100 &&
                Math.abs(newY - viewportHeight/2) < 100 &&
                attempts < 10
            );

            // Add phrases periodically
            noClickCount++;
            if (noClickCount <= phrases.length) {
                noBtn.textContent = phrases[noClickCount - 1];
                // Make text smaller for longer phrases
                if (phrases[noClickCount - 1].length > 20) {
                    noBtn.style.fontSize = 'clamp(0.7rem, 2vw, 1rem)';
                }
            }

            // Position the button using fixed positioning
            noBtn.style.position = 'fixed';
            noBtn.style.left = newX + 'px';
            noBtn.style.top = newY + 'px';
            noBtn.style.zIndex = '100';
        }

        // Yes button click - celebration!
        yesBtn.addEventListener('click', celebrate);

        function celebrate() {
            // Hide main content
            mainContent.classList.add('hidden');
            
            // Show big heart
            bigHeart.classList.add('active');
            bigHeart.style.left = 'calc(50% - 75px)';
            bigHeart.style.top = 'calc(50% - 75px)';
            
            // Trigger celebration after heart animation
            setTimeout(() => {
                showCelebration();
                successMessage.classList.add('active');
                launchConfetti();
            }, 800);
        }

        function showCelebration() {
            celebration.classList.add('active');
            
            // Create confetti
            const colors = ['💖', '💕', '💗', '💓', '💝', '💘', '❤️', '🧡', '💛', '💚', '💙', '💜'];
            const confettiCount = 150;
            
            for (let i = 0; i < confettiCount; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                    confetti.style.animationDelay = Math.random() * 0.5 + 's';
                    confetti.style.fontSize = (Math.random() * 15 + 10) + 'px';
                    confetti.style.zIndex = '100';
                    celebration.appendChild(confetti);
                    
                    setTimeout(() => confetti.remove(), 4000);
                }, i * 30);
            }
            
            // Create more hearts rapidly
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    createHeart();
                }, i * 100);
            }
        }

        function launchConfetti() {
            // Additional celebration effects
            const additionalConfetti = ['🎉', '🎊', '✨', '⭐', '🌟', '💫'];
            for (let i = 0; i < 80; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.textContent = additionalConfetti[Math.floor(Math.random() * additionalConfetti.length)];
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
                    confetti.style.animationDelay = Math.random() * 0.3 + 's';
                    confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
                    celebration.appendChild(confetti);
                }, i * 40);
            }
        }

        // Touch device support - make no button move on tap
        document.addEventListener('touchmove', function(e) {
            if (e.target === noBtn) {
                moveNoButton();
            }
        }, { passive: true });

        // Reset no button position on window resize
        window.addEventListener('resize', () => {
            if (!mainContent.classList.contains('hidden')) {
                noBtn.style.position = 'relative';
                noBtn.style.left = 'auto';
                noBtn.style.top = 'auto';
            }
        });