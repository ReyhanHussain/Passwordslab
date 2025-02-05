document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password');
    const meterFill = document.querySelector('.meter-fill');
    const strengthText = document.querySelector('.strength-text span');
    const crackTimeText = document.querySelector('.crack-time-value');
    const entropyValue = document.querySelector('.entropy-value');
    const requirements = document.querySelectorAll('.req-item');
    const themeToggle = document.getElementById('theme-toggle');
    const termsLink = document.getElementById('terms-link');
    const termsModal = document.getElementById('terms-modal');
    const closeModal = document.querySelector('.close');

    themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.innerHTML = `<i class="fas fa-${isDark ? 'moon' : 'sun'}"></i>`;
    });


    termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        termsModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        termsModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === termsModal) {
            termsModal.style.display = 'none';
        }
    });


    passwordInput.addEventListener('contextmenu', (e) => e.preventDefault());


    toggleButton.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        toggleButton.querySelector('i').className = `far fa-${type === 'password' ? 'eye' : 'eye-slash'}`;
    });


    const strengthColors = {
        0: '#ff4444',
        1: '#ffbb33',
        2: '#ffbb33',
        3: '#00C851',
        4: '#007E33'
    };


    const strengthLabels = {
        0: 'Very Weak',
        1: 'Weak',
        2: 'Moderate',
        3: 'Strong',
        4: 'Very Strong'
    };


    const calculateEntropy = (password) => {
        let charset = 0;
        if (/[a-z]/.test(password)) charset += 26;
        if (/[A-Z]/.test(password)) charset += 26;
        if (/[0-9]/.test(password)) charset += 10;
        if (/[^A-Za-z0-9]/.test(password)) charset += 33;
        return Math.round(password.length * Math.log2(charset || 1));
    };


    const formatCrackTime = (seconds) => {
        if (seconds < 1) return 'Instant';

        const units = [
            { value: 31536000, label: 'year' },
            { value: 2592000, label: 'month' },
            { value: 86400, label: 'day' },
            { value: 3600, label: 'hour' },
            { value: 60, label: 'minute' },
            { value: 1, label: 'second' }
        ];

        for (const { value, label } of units) {
            if (seconds >= value) {
                const count = Math.floor(seconds / value);
                return `${count} ${label}${count !== 1 ? 's' : ''}`;
            }
        }
    };


    const checkRequirements = (password) => {
        const reqs = {
            length: password.length >= 12, // Increased from 8 to 12
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };

        requirements.forEach(req => {
            const requirement = req.dataset.requirement;
            if (reqs[requirement]) {
                req.classList.add('valid');
                req.querySelector('i').className = 'fas fa-check-circle';
            } else {
                req.classList.remove('valid');
                req.querySelector('i').className = 'fas fa-circle';
            }
        });

        return reqs;
    };


    const updateStrength = (result) => {
        const score = result.score;
        const crackTime = result.crack_times_seconds.online_no_throttling_10_per_second;
        const entropy = calculateEntropy(passwordInput.value);

        meterFill.style.width = `${(score + 1) * 20}%`;
        meterFill.style.backgroundColor = ['#ff4444', '#ffbb33', '#ffbb33', '#00C851', '#007E33'][score];

        strengthText.textContent = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'][score];
        strengthText.style.color = ['#ff4444', '#ffbb33', '#ffbb33', '#00C851', '#007E33'][score];

        crackTimeText.textContent = formatCrackTime(crackTime);

        entropyValue.textContent = `${entropy} bits`;

        let feedbackDiv = document.querySelector('.feedback-text'); // Use let instead of const
        if (!feedbackDiv) {
            feedbackDiv = document.createElement('div'); // Declare feedbackDiv only once
            feedbackDiv.className = 'feedback-text';
            document.querySelector('.password-strength-section').appendChild(feedbackDiv);
        }

        if (score < 3) {
            feedbackDiv.textContent = 'Consider adding more complexity: mix uppercase, lowercase, numbers, and symbols.';
        } else if (score === 3) {
            feedbackDiv.textContent = 'Good! For even better security, increase the length or add unique characters.';
        } else {
            feedbackDiv.textContent = 'Excellent! Your password is very strong.';
        }
    };

    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.feature-card, .tip-card');
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;

            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.feature-card, .tip-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();


    let debounceTimer;
    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value;

        clearTimeout(debounceTimer);

        checkRequirements(password);

        debounceTimer = setTimeout(() => {
            if (password) {
                const result = zxcvbn(password);
                updateStrength(result);
            } else {
                meterFill.style.width = '0';
                strengthText.textContent = 'None';
                strengthText.style.color = '#666';
                crackTimeText.textContent = 'Instant';
                entropyValue.textContent = '0 bits';
            }
        }, 300);
    });
});