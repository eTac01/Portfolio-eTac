// ========================================
// ELITE CYBERSECURITY PORTFOLIO
// JavaScript - Binary Rain, Terminal, Animations
// ========================================

// Binary Rain Animation
class BinaryRain {
    constructor() {
        this.canvas = document.getElementById('binary-rain');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');

        this.fontSize = 14;
        this.resizeCanvas();
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);

        window.addEventListener('resize', () => this.resizeCanvas());
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const text = Math.random() > 0.5 ? '1' : '0';
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            this.ctx.fillText(text, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Terminal Typewriter Effect
class Typewriter {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Interactive Terminal
class InteractiveTerminal {
    constructor() {
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');

        if (!this.output || !this.input) return;

        this.commands = {
            help: () => this.showHelp(),
            whoami: () => 'chudaraj_kushwaha',
            ls: () => 'skills.txt  projects/  certifications/  contact.txt',
            'cat skills.txt': () => this.showSkills(),
            'cat contact.txt': () => this.showContact(),
            'cat certifications/': () => this.showCertifications(),
            'cat certifications': () => this.showCertifications(),
            'ls certifications': () => 'ceh.txt  tryhackme.txt  ibm_cyber.txt  python_sec.txt',
            certifications: () => this.showCertifications(),
            certs: () => this.showCertifications(),
            resume: () => this.openResume(),
            'show resume': () => this.openResume(),
            'nmap -sV localhost': () => this.showNmap(),
            clear: () => this.clearTerminal(),
            about: () => 'Elite cybersecurity professional | Offensive Security | Defensive Intelligence',
            date: () => new Date().toLocaleString(),
            pwd: () => '/home/chudaraj/security',
            uname: () => 'Linux security-terminal 5.15.0-kali x86_64'
        };

        this.input.addEventListener('keydown', (e) => this.handleInput(e));
        // Removed auto-focus to prevent scrolling to terminal on page load
        // this.input.focus();

        // Set initial content
        this.clearTerminal();
    }

    handleInput(e) {
        if (e.key === 'Enter') {
            const command = this.input.value.trim();
            this.input.value = '';

            if (command) {
                this.addLine(`<span class="terminal-green">$</span> ${command}`);
                this.executeCommand(command);
            }

            this.scrollToBottom();
        }
    }

    executeCommand(command) {
        const cmd = command.toLowerCase();

        if (this.commands[cmd]) {
            const result = this.commands[cmd]();
            if (result) {
                this.addLine(result);
            }
        } else {
            this.addLine(`<span style="color: var(--accent-red);">Command not found: ${command}</span>`);
            this.addLine('Type "help" for available commands');
        }
    }

    openResume() {
        const resumeUrl = 'resume.html'; // Default to HTML version if available
        // In a real scenario, check if file exists or use specific path
        window.open(resumeUrl, '_blank');
        return '<span class="terminal-green">Opening resume in new secure frequency...</span>';
    }

    showHelp() {
        return `
<span class="terminal-green">Available Commands:</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  whoami              Display current user
  ls                  List directory contents
  resume              Open Resume (Secure PDF)
  certifications      Display security credentials
  cat skills.txt      Display skills
  cat contact.txt     Display contact info
  nmap -sV localhost  Scan local services
  about               About me
  pwd                 Print working directory
  clear               Clear terminal
  help                Show this help message
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    }

    showSkills() {
        return `
<span class="terminal-green">[OFFENSIVE SECURITY]</span>
  ✓ Penetration Testing
  ✓ Malware Analysis
  ✓ Exploit Development
  ✓ Red Team Operations

<span class="terminal-green">[DEFENSIVE SECURITY]</span>
  ✓ SOC Operations
  ✓ SIEM Management
  ✓ Incident Response
  ✓ Threat Hunting

<span class="terminal-green">[CLOUD & DEVSECOPS]</span>
  ✓ AWS Security
  ✓ Container Security
  ✓ CI/CD Security`;
    }

    showCertifications() {
        return `
<span class="terminal-green">[SECURITY CREDENTIALS]</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span class="glow-cyan">Certified Ethical Hacker (CEH)</span>
   Issuer: EC-Council
   Status: <span class="terminal-amber">In Progress...</span>

<span class="glow-green">TryHackMe Certifications</span>
   Issuer: TryHackMe
   Status: <span class="terminal-green">Completed</span>
   [TOP 1% RANKING ACHIEVED]

<span class="glow-cyan">Cybersecurity Fundamentals</span>
   Issuer: IBM
   Status: <span class="terminal-green">Completed</span>

<span class="glow-green">Python for Security</span>
   Issuer: Udemy
   Status: <span class="terminal-green">Completed</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    }

    showContact() {
        return `
<span class="terminal-green">[CONTACT INFORMATION]</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Email:    ranchji806@gmail.com
  GitHub:   github.com/eTac01
  LinkedIn: linkedin.com/in/chudaraj-kushwaha-39b189266/
  Location: Chittoor, AP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    }

    showNmap() {
        return `
<span class="terminal-green">Starting Nmap scan...</span>

PORT     STATE SERVICE    VERSION
22/tcp   open  ssh        OpenSSH 8.9
80/tcp   open  http       nginx 1.21.6
443/tcp  open  https      nginx 1.21.6
3306/tcp open  mysql      MySQL 8.0.28

<span class="terminal-green">✓ Scan complete. 4 services detected.</span>`;
    }

    clearTerminal() {
        this.output.innerHTML = `
<p class="terminal-line terminal-green">Welcome to Chudaraj's Security Terminal</p>
<p class="terminal-line">Type 'help' for available commands</p>
<p class="terminal-line">Type 'resume' to view full CV</p>
<p class="terminal-line">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>`;
        return '';
    }

    addLine(text) {
        const line = document.createElement('p');
        line.className = 'terminal-line';
        line.innerHTML = text;
        this.output.appendChild(line);
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }
}

// Scroll Spy for Navigation
class ScrollSpy {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navItems = document.querySelectorAll('.nav-item');

        window.addEventListener('scroll', () => this.updateActiveLink());
        this.updateActiveLink();
    }

    updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
}

// Firewall Bar Animation
class FirewallBars {
    constructor() {
        this.bars = document.querySelectorAll('.firewall-fill');
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.5 }
        );

        this.bars.forEach(bar => this.observer.observe(bar));
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const skill = bar.getAttribute('data-skill');
                bar.style.setProperty('--skill', skill);
                this.observer.unobserve(bar);
            }
        });
    }
}

// Threat Level Animation
class ThreatLevel {
    constructor() {
        this.bars = document.querySelectorAll('.threat-fill');
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.5 }
        );

        this.bars.forEach(bar => this.observer.observe(bar));
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute('data-level');
                bar.style.setProperty('--level', `${level}%`);
                this.observer.unobserve(bar);
            }
        });
    }
}

// Loader
class Loader {
    constructor() {
        this.loader = document.getElementById('loader');
        if (!this.loader) return;

        // Failsafe: Force remove loader after 3 seconds
        setTimeout(() => {
            this.hide();
        }, 3000);

        // Hide immediately when DOM is ready (don't wait for images/external scripts)
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.hide(), 500); // Small delay for "Encryption" effect
            });
        } else {
            setTimeout(() => this.hide(), 500);
        }
    }

    hide() {
        if (!this.loader.classList.contains('hidden')) {
            this.loader.classList.add('hidden');
        }
    }
}

// GitHub Stats Fetcher
class GitHubStats {
    constructor(username = 'eTac01') {
        this.username = username;
        this.apiUrl = `https://api.github.com/users/${username}`;
        this.reposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
        this.fetchStats();
    }

    async fetchStats() {
        try {
            // Fetch user data and repositories in parallel
            const [userResponse, reposResponse] = await Promise.all([
                fetch(this.apiUrl),
                fetch(this.reposUrl)
            ]);

            if (!userResponse.ok || !reposResponse.ok) {
                throw new Error('Failed to fetch GitHub data');
            }

            const userData = await userResponse.json();
            const reposData = await reposResponse.json();

            // Update the stats
            this.updateStats(userData, reposData);
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
            // Fallback to default values
            this.updateStatsWithDefaults();
        }
    }

    updateStats(userData, reposData) {
        const reposElement = document.getElementById('github-repos');
        const projectsElement = document.getElementById('github-projects');
        const followersElement = document.getElementById('github-followers');

        // Total repositories
        const totalRepos = userData.public_repos || reposData.length;

        // Count security-related projects (based on keywords in name/description)
        const securityKeywords = ['security', 'malware', 'pentest', 'exploit', 'vulnerability', 'ctf', 'hack', 'cyber', 'network', 'forensic'];
        const securityProjects = reposData.filter(repo => {
            const name = (repo.name || '').toLowerCase();
            const description = (repo.description || '').toLowerCase();
            return securityKeywords.some(keyword => name.includes(keyword) || description.includes(keyword));
        }).length;

        // Followers
        const followers = userData.followers || 0;

        // Animate the numbers
        if (reposElement) {
            this.animateNumber(reposElement, totalRepos, '+');
        }
        if (projectsElement) {
            this.animateNumber(projectsElement, securityProjects, '+');
        }
        if (followersElement) {
            this.animateNumber(followersElement, followers, '');
        }
    }

    updateStatsWithDefaults() {
        const reposElement = document.getElementById('github-repos');
        const projectsElement = document.getElementById('github-projects');
        const followersElement = document.getElementById('github-followers');

        if (reposElement) reposElement.textContent = '18+';
        if (projectsElement) projectsElement.textContent = '10+';
        if (followersElement) followersElement.textContent = '3';
    }

    animateNumber(element, targetNumber, suffix = '') {
        let currentNumber = 0;
        const increment = Math.ceil(targetNumber / 20);
        const duration = 1000; // 1 second
        const stepTime = duration / (targetNumber / increment);

        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(timer);
            }
            element.textContent = currentNumber + suffix;
        }, stepTime);
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        // Get Input Values
        const nameInput = this.form.querySelector('input[type="text"]');
        const emailInput = this.form.querySelector('input[type="email"]');
        const messageInput = this.form.querySelector('textarea');

        const name = nameInput ? nameInput.value : 'Anonymous';
        const email = emailInput ? emailInput.value : 'No Email';
        const message = messageInput ? messageInput.value : '';

        // Simulate encryption and sending
        const btn = this.form.querySelector('.btn-cyber');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i data-lucide="loader"></i><span>Encrypting...</span>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i data-lucide="check"></i><span>Redirecting to Secure Channel...</span>';

            setTimeout(() => {
                // Construct Gmail URL
                const subject = encodeURIComponent(`Portfolio Contact: ${name}`);
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=Chudarajkushwaha45@gmail.com&su=${subject}&body=${body}`;

                // Open Gmail
                window.open(gmailUrl, '_blank');

                btn.innerHTML = originalText;
                btn.disabled = false;
                this.form.reset();
                lucide.createIcons();
            }, 1000);
        }, 1500);
    }
}

// Smooth Scroll
function smoothScroll() {
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
}

// Initialize Everything
const init = () => {
    // Initialize Binary Rain
    new BinaryRain();

    // Initialize Loader
    new Loader();

    // Initialize GitHub Stats (Live Repository Count)
    new GitHubStats('eTac01');

    // Initialize Typewriter for hero command
    const typedCommand = document.getElementById('typed-command');
    if (typedCommand) {
        new Typewriter(typedCommand, [
            'whoami',
            'cat skills.txt',
            'nmap -sV target.com',
            'python3 exploit.py',
            './malware_analyzer'
        ], 150);
    }

    // Initialize Interactive Terminal
    new InteractiveTerminal();

    // Initialize Scroll Spy
    new ScrollSpy();

    // Initialize Firewall Bars
    new FirewallBars();

    // Initialize Threat Level
    new ThreatLevel();

    // Initialize Contact Form
    new ContactForm();

    // Initialize Smooth Scroll
    smoothScroll();

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Cursor Ripple Effect (Optional - Performance Optimized)
let rippleTimeout;
document.addEventListener('mousemove', (e) => {
    if (rippleTimeout) return;

    rippleTimeout = setTimeout(() => {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent-cyan);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            left: ${e.clientX - 10}px;
            top: ${e.clientY - 10}px;
            animation: ripple-expand 0.6s ease-out forwards;
        `;

        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
        rippleTimeout = null;
    }, 100);
});

// Ripple Animation
const style = document.createElement('style');
style.textContent = `
@keyframes ripple-expand {
    0% {
        transform: scale(1);
        opacity: 0.5;
    }
    100% {
        transform: scale(3);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// Performance: Reduce Motion Support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}
