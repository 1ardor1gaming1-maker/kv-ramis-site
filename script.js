/* ===== CSS RESET & VARIABLES ===== */
:root {
    /* Цвета - тёмная тема */
    --bg-primary: #0a0a14;
    --bg-secondary: #151522;
    --bg-card: #1c1c2e;
    --bg-overlay: rgba(0, 0, 0, 0.8);
    
    --text-primary: #ffffff;
    --text-secondary: #b8b8d0;
    --text-muted: #8888aa;
    
    --accent: #6c63ff;
    --accent-light: #8a84ff;
    --accent-dark: #5a52e0;
    --accent-secondary: #ff6b9d;
    
    --success: #2ed573;
    --warning: #ffa502;
    --error: #ff4757;
    
    --border-radius: 12px;
    --border-radius-sm: 8px;
    --border-radius-lg: 16px;
    
    --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.15);
    --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.25);
    --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.35);
    --shadow-accent: 0 8px 32px rgba(108, 99, 255, 0.3);
    
    --transition-fast: 150ms ease;
    --transition-base: 250ms ease;
    --transition-slow: 350ms ease;
    
    --header-height: 70px;
    --container-width: 1200px;
}

.light-theme {
    --bg-primary: #f5f7ff;
    --bg-secondary: #ffffff;
    --bg-card: #ffffff;
    --bg-overlay: rgba(255, 255, 255, 0.95);
    
    --text-primary: #1a1a2e;
    --text-secondary: #4a4a6e;
    --text-muted: #6a6a8e;
    
    --accent: #4a44ff;
    --accent-light: #6a63ff;
    --accent-dark: #3a34e0;
    
    --shadow-sm: 0 4px 12px rgba(74, 68, 255, 0.1);
    --shadow-md: 0 8px 24px rgba(74, 68, 255, 0.15);
    --shadow-lg: 0 16px 48px rgba(74, 68, 255, 0.2);
    --shadow-accent: 0 8px 32px rgba(74, 68, 255, 0.2);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: var(--header-height);
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
    transition: background-color var(--transition-base), color var(--transition-base);
}

/* ===== UTILITY CLASSES ===== */
.container {
    width: 100%;
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 1rem;
}

.section {
    padding: 5rem 0;
}

.section-header {
    text-align: center;
    margin-bottom: 3rem;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.section-subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    font-family: 'JetBrains Mono', monospace;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.875rem 2rem;
    border-radius: var(--border-radius);
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
    position: relative;
    overflow: hidden;
}

.btn-primary {
    background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-accent);
}

.btn-secondary {
    background: transparent;
    color: var(--accent);
    border: 2px solid var(--accent);
}

.btn-secondary:hover {
    background: var(--accent);
    color: white;
}

.gradient-text {
    background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* ===== FLOATING CONTROLS ===== */
.floating-controls {
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    z-index: 1000;
}

.floating-btn {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--bg-card);
    border: 1px solid rgba(108, 99, 255, 0.2);
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.25rem;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-md);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.floating-btn:hover {
    background: var(--accent);
    color: white;
    transform: scale(1.1);
    box-shadow: var(--shadow-lg);
}

/* ===== NAVIGATION ===== */
.main-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(21, 21, 34, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(108, 99, 255, 0.1);
    z-index: 900;
    height: var(--header-height);
    transition: transform var(--transition-base);
}

.main-nav.hidden {
    transform: translateY(-100%);
}

.nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}

.nav-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 700;
    font-size: 1.5rem;
}

.logo-icon {
    color: var(--accent);
    font-size: 1.8rem;
}

.nav-links {
    display: flex;
    gap: 2rem;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 500;
    transition: color var(--transition-fast);
    padding: 0.5rem;
}

.nav-link:hover {
    color: var(--accent);
}

.nav-link i {
    font-size: 1.1rem;
}

.mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: var(--text-primary);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
}

/* ===== HERO SECTION ===== */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: var(--header-height);
}

.particles-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
}

.hero-badge {
    display: inline-block;
    background: rgba(108, 99, 255, 0.1);
    color: var(--accent);
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(108, 99, 255, 0.2);
}

.hero-title {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
}

.hero-subtitle {
    font-size: clamp(1rem, 4vw, 1.25rem);
    color: var(--text-secondary);
    margin-bottom: 3rem;
    line-height: 1.6;
}

.hero-stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 3rem 0;
    flex-wrap: wrap;
}

.stat-card {
    background: var(--bg-card);
    border: 1px solid rgba(108, 99, 255, 0.1);
    border-radius: var(--border-radius);
    padding: 1.5rem 2rem;
    min-width: 140px;
    text-align: center;
    transition: transform var(--transition-fast);
}

.stat-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent);
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--accent);
    margin-bottom: 0.5rem;
}

.stat-label {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-family: 'JetBrains Mono', monospace;
}

.hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 3rem 0;
    flex-wrap: wrap;
}

.hero-scroll-hint {
    margin-top: 3rem;
    animation: bounce 2s infinite;
}

.mouse-scroll {
    width: 30px;
    height: 50px;
    border: 2px solid var(--accent);
    border-radius: 20px;
    position: relative;
    margin: 0 auto;
}

.mouse-scroll::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: var(--accent);
    border-radius: 50%;
    animation: scroll 2s infinite;
}

@keyframes scroll {
    0% { opacity: 1; transform: translateX(-50%) translateY(0); }
    100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
}

/* ===== ABOUT SECTION ===== */
.about-card {
    background: var(--bg-card);
    border-radius: var(--border-radius-lg);
    padding: 3rem;
    max-width: 800px;
    margin: 0 auto;
    border: 1px solid rgba(108, 99, 255, 0.1);
    box-shadow: var(--shadow-lg);
}

.about-avatar {
    text-align: center;
    margin-bottom: 2rem;
}

.avatar-circle {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: white;
}

.about-info {
    text-align: center;
}

.about-info h3 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.about-role {
    color: var(--accent);
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 2rem;
    font-size: 1.1rem;
}

.about-details {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.detail {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-secondary);
    background: rgba(108, 99, 255, 0.05);
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
}

.detail i {
    color: var(--accent);
}

.about-bio {
    color: var(--text-primary);
    line-height: 1.7;
    margin-bottom: 2rem;
    font-size: 1.1rem;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
}

.social-link {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(108, 99, 255, 0.1);
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    transition: all var(--transition-fast);
    text-decoration: none;
}

.social-link:hover {
    background: var(--accent);
    color: white;
    transform: translateY(-3px);
}

/* ===== TECH SECTION ===== */
.tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.tech-category {
    background: var(--bg-card);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    border: 1px solid rgba(108, 99, 255, 0.1);
}

.tech-category h3 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    font-size: 1.25rem;
}

.tech-category h3 i {
    color: var(--accent);
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.tech-tag {
    background: rgba(108, 99, 255, 0.1);
    color: var(--accent);
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    border: 1px solid rgba(108, 99, 255, 0.2);
    transition: all var(--transition-fast);
}

.tech-tag:hover {
    background: var(--accent);
    color: white;
    transform: translateY(-2px);
}

.env-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

.env-card {
    background: var(--bg-card);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    border: 1px solid rgba(108, 99, 255, 0.1);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: transform var(--transition-fast);
}

.env-card:hover {
    transform: translateX(5px);
    border-color: var(--accent);
}

.env-card i {
    font-size: 2rem;
    color: var(--accent);
}

.env-card h4 {
    margin-bottom: 0.25rem;
    color: var(--text-primary);
}

.env-card p {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

/* ===== PROJECTS SECTION ===== */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
}

.project-card {
    background: var(--bg-card);
    border-radius: var(--border-radius);
    padding: 2rem;
    border: 1px solid rgba(108, 99, 255, 0.1);
    transition: all var(--transition-base);
    position: relative;
    display: flex;
    flex-direction: column;
}

.project-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent);
    box-shadow: var(--shadow-lg);
}

.project-card.highlight {
    border: 2px solid var(--accent);
    background: linear-gradient(135deg, rgba(108, 99, 255, 0.05), transparent);
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.project-badge {
    background: var(--accent);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: 'JetBrains Mono', monospace;
}

.project-status {
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
}

.status-dev {
    background: rgba(255, 165, 2, 0.1);
    color: var(--warning);
}

.status-proto {
    background: rgba(30, 144, 255, 0.1);
    color: #1e90ff;
}

.status-live {
    background: rgba(46, 213, 115, 0.1);
    color: var(--success);
}

.project-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.project-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex-grow: 1;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.project-tech span {
    background: rgba(108, 99, 255, 0.1);
    color: var(--accent);
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-family: 'JetBrains Mono', monospace;
}

.project-progress {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.progress-bar {
    flex: 1;
    height: 8px;
    background: rgba(108, 99, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
    border-radius: 4px;
}

.project-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: rgba(108, 99, 255, 0.1);
    color: var(--accent);
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    font-weight: 500;
    transition: all var(--transition-fast);
    border: 1px solid rgba(108, 99, 255, 0.2);
}

.project-link:hover {
    background: var(--accent);
    color: white;
}

/* ===== PHILOSOPHY SECTION ===== */
.philosophy-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.philosophy-card {
    background: var(--bg-card);
    border-radius: var(--border-radius);
    padding: 2rem;
    text-align: center;
    border: 1px solid rgba(108, 99, 255, 0.1);
    transition: transform var(--transition-fast);
}

.philosophy-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent);
}

.philosophy-card i {
    font-size: 2.5rem;
    color: var(--accent);
    margin-bottom: 1.5rem;
}

.philosophy-card h3 {
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.philosophy-card p {
    color: var(--text-secondary);
    line-height: 1.6;
}

/* ===== JOIN SECTION ===== */
.join-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
    max-width: 1000px;
    margin: 0 auto;
}

.requirements-list {
    list-style: none;
}

.requirements-list li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0;
    color: var(--text-primary);
    border-bottom: 1px solid rgba(108, 99, 255, 0.1);
}

.requirements-list li:last-child {
    border-bottom: none;
}

.requirements-list li i {
    color: var(--accent);
}

.join-form {
    background: var(--bg-card);
    border-radius: var(--border-radius);
    padding: 2rem;
    border: 1px solid rgba(108, 99, 255, 0.1);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.875rem 1rem;
    background: var(--bg-primary);
    border: 1px solid rgba(108, 99, 255, 0.2);
    border-radius: var(--border-radius-sm);
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    transition: border-color var(--transition-fast);
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--accent);
}

.form-group textarea {
    resize: vertical;
    min-height: 120px;
}

/* ===== FOOTER ===== */
.footer {
    background: var(--bg-secondary);
    padding: 3rem 0 2rem;
    border-top: 1px solid rgba(108, 99, 255, 0.1);
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 2rem;
}

.footer-brand h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--accent);
}

.footer-brand p {
    color: var(--text-secondary);
}

.footer-links {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
}

.footer-links a {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--transition-fast);
}

.footer-links a:hover {
    color: var(--accent);
}

.footer-social {
    display: flex;
    gap: 1rem;
}

.footer-social a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(108, 99, 255, 0.1);
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all var(--transition-fast);
}

.footer-social a:hover {
    background: var(--accent);
    color: white;
    transform: translateY(-3px);
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(108, 99, 255, 0.1);
}

.footer-bottom p {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
}

.footer-credits {
    color: var(--text-muted);
    font-size: 0.9rem;
}

/* ===== TERMINAL ===== */
.terminal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-overlay);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 1rem;
}

.terminal-container {
    background: var(--bg-card);
    border-radius: var(--border-radius);
    width: 100%;
    max-width: 800px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-lg);
    border: 1px solid rgba(108, 99, 255, 0.2);
}

.terminal-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(108, 99, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(21, 21, 34, 0.5);
}

.terminal-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-primary);
    font-weight: 600;
}

.terminal-title i {
    color: var(--accent);
}

.terminal-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.25rem;
    transition: color var(--transition-fast);
}

.terminal-close:hover {
    color: var(--error);
}

.terminal-content {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
    font-family: 'JetBrains Mono', monospace;
}

.terminal-output {
    margin-bottom: 1rem;
    min-height: 200px;
}

.terminal-line {
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
    word-break: break-word;
}

.terminal-prompt {
    color: var(--accent);
    margin-right: 0.5rem;
    font-weight: 600;
}

.terminal-text {
    color: var(--text-primary);
}

.terminal-input-line {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
}

.terminal-input {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--text-primary);
    font-family: 'JetBrains Mono', monospace;
    font-size: 1rem;
    padding: 0.5rem;
    outline: none;
}

.terminal-input::placeholder {
    color: var(--text-muted);
}

.terminal-hotkeys {
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(108, 99, 255, 0.1);
    text-align: center;
    color: var(--text-muted);
    font-size: 0.85rem;
}

.terminal-hotkeys kbd {
    background: rgba(108, 99, 255, 0.1);
    color: var(--accent);
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
}

/* ===== HEART CONTAINER (для пасхалки) ===== */
.heart-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 3000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#heartCanvas {
    width: 300px;
    height: 300px;
    margin-bottom: 2rem;
}

.heart-message {
    text-align: center;
    color: white;
}

.heart-message h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #ff4757;
    text-shadow: 0 0 20px rgba(255, 71, 87, 0.5);
}

.heart-message p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    color: #ffffff;
}

/* ===== MODAL ===== */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-overlay);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 1rem;
}

.modal-container {
    background: var(--bg-card);
    border-radius: var(--border-radius);
    width: 100%;
    max-width: 500px;
    box-shadow: var(--shadow-lg);
    border: 1px solid rgba(108, 99, 255, 0.2);
}

.modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid rgba(108, 99, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-title {
    color: var(--text-primary);
    font-size: 1.25rem;
    font-weight: 600;
}

.modal-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.25rem;
    transition: color var(--transition-fast);
}

.modal-close:hover {
    color: var(--error);
}

.modal-body {
    padding: 1.5rem;
    color: var(--text-primary);
    line-height: 1.6;
}

.modal-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(108, 99, 255, 0.1);
    text-align: right;
}

/* ===== SCROLL PROGRESS ===== */
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
    z-index: 999;
    transition: width 0.1s ease;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 992px) {
    .section {
        padding: 4rem 0;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .nav-links {
        position: fixed;
        top: var(--header-height);
        left: 0;
        width: 100%;
        background: var(--bg-secondary);
        flex-direction: column;
        padding: 1rem;
        gap: 0;
        display: none;
        border-bottom: 1px solid rgba(108, 99, 255, 0.1);
        box-shadow: var(--shadow-md);
    }
    
    .nav-links.active {
        display: flex;
    }
    
    .nav-link {
        padding: 1rem;
        border-bottom: 1px solid rgba(108, 99, 255, 0.1);
    }
    
    .nav-link:last-child {
        border-bottom: none;
    }
    
    .mobile-menu-btn {
        display: block;
    }
    
    .hero-stats {
        gap: 1rem;
    }
    
    .stat-card {
        padding: 1rem;
        min-width: 120px;
    }
    
    .stat-number {
        font-size: 2rem;
    }
    
    .hero-actions {
        flex-direction: column;
        align-items: stretch;
    }
    
    .btn {
        width: 100%;
        justify-content: center;
    }
}

@media (max-width: 768px) {
    html {
        font-size: 14px;
    }
    
    .section {
        padding: 3rem 0;
    }
    
    .container {
        padding: 0 1rem;
    }
    
    .hero {
        min-height: 90vh;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .projects-grid,
    .philosophy-grid {
        grid-template-columns: 1fr;
    }
    
    .tech-grid {
        grid-template-columns: 1fr;
    }
    
    .env-cards {
        grid-template-columns: 1fr;
    }
    
    .about-card {
        padding: 2rem;
    }
    
    .floating-controls {
        right: 1rem;
        bottom: 1rem;
    }
    
    .floating-btn {
        width: 48px;
        height: 48px;
        font-size: 1.1rem;
    }
    
    .join-content {
        grid-template-columns: 1fr;
    }
    
    .footer-content {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
    }
    
    .footer-links {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 2rem;
    }
    
    .hero-stats {
        flex-direction: column;
        align-items: center;
    }
    
    .stat-card {
        width: 100%;
        max-width: 200px;
    }
    
    .about-details {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    
    .detail {
        width: 100%;
        justify-content: center;
    }
    
    .terminal-container {
        max-height: 90vh;
    }
}

/* ===== PRINT STYLES ===== */
@media print {
    .floating-controls,
    .main-nav,
    .hero-scroll-hint,
    .terminal-overlay,
    .modal-overlay {
        display: none !important;
    }
    
    .hero {
        min-height: auto;
        padding: 2rem 0;
    }
    
    .section {
        padding: 2rem 0 !important;
        page-break-inside: avoid;
    }
    
    body {
        background: white !important;
        color: black !important;
    }
    
    a {
        color: black !important;
        text-decoration: underline;
    }
}
