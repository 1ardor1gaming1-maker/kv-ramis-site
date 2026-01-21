/**
 * KV/RaMIS Project Group - Ultimate Edition
 * Полностью оптимизированный JavaScript
 */

class KVWebsite {
    constructor() {
        this.state = {
            theme: localStorage.getItem('theme') || 'dark',
            navVisible: localStorage.getItem('navVisible') !== 'false',
            terminalOpen: false,
            particlesEnabled: true,
            lastHeartbeat: Date.now()
        };

        this.components = {
            preloader: null,
            particles: null,
            terminal: null,
            heart: null
        };

        this.init();
    }

    async init() {
        console.log('🚀 KV/RaMIS Project Group v4.0');
        
        this.setupPerformance();
        this.setupTheme();
        this.setupNavigation();
        this.setupParticles();
        this.setupTerminal();
        this.setupHeart();
        this.setupAnimations();
        this.setupEventListeners();
        this.setupCounters();
        
        // Показ сайта после загрузки
        setTimeout(() => this.showSite(), 500);
    }

    setupPerformance() {
        // Отключение анимаций для слабых устройств
        if (navigator.connection?.saveData || navigator.deviceMemory < 4) {
            this.state.particlesEnabled = false;
            document.body.classList.add('reduce-motion');
        }

        // Мониторинг FPS
        this.setupFPSCounter();
    }

    setupFPSCounter() {
        if (!localStorage.getItem('debug')) return;
        
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                if (fps < 30) {
                    console.warn(`⚠️ Low FPS: ${fps}`);
                    this.optimizePerformance();
                }
                frameCount = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(checkFPS);
        };
        
        requestAnimationFrame(checkFPS);
    }

    optimizePerformance() {
        if (this.components.particles) {
            this.components.particles.reduceCount();
        }
        
        // Отключение тяжёлых анимаций
        document.querySelectorAll('.complex-animation').forEach(el => {
            el.style.animation = 'none';
        });
    }

    setupTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
        
        document.getElementById('themeToggle').addEventListener('click', () => {
            const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
            this.showNotification(`Тема: ${newTheme === 'dark' ? 'Тёмная' : 'Светлая'}`);
        });
        
        // Следим за системными настройками
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        this.state.theme = theme;
        document.documentElement.className = theme + '-theme';
        localStorage.setItem('theme', theme);
        
        const icon = document.querySelector('#themeToggle i');
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        
        // Обновляем частицы при смене темы
        if (this.components.particles) {
            this.components.particles.updateColors();
        }
    }

    setupNavigation() {
        const nav = document.getElementById('mainNav');
        const toggleBtn = document.getElementById('toggleNav');
        
        // Восстанавливаем состояние
        nav.classList.toggle('hidden', !this.state.navVisible);
        
        toggleBtn.addEventListener('click', () => {
            this.state.navVisible = !this.state.navVisible;
            nav.classList.toggle('hidden', !this.state.navVisible);
            localStorage.setItem('navVisible', this.state.navVisible);
            
            const icon = toggleBtn.querySelector('i');
            icon.className = this.state.navVisible ? 'fas fa-eye-slash' : 'fas fa-eye';
        });
        
        // Мобильное меню
        const mobileBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Закрытие меню при клике на ссылку
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Активная ссылка при скролле
        this.setupActiveNavigation();
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => observer.observe(section));
    }

    setupParticles() {
        if (!this.state.particlesEnabled) return;
        
        const canvas = document.getElementById('particlesCanvas');
        if (!canvas) return;
        
        this.components.particles = new ParticleSystem(canvas);
    }

    setupTerminal() {
        const terminal = new TerminalSystem();
        this.components.terminal = terminal;
        
        // Кнопки открытия терминала
        document.getElementById('terminalToggle').addEventListener('click', () => {
            terminal.toggle();
        });
        
        document.getElementById('quickTerminalBtn')?.addEventListener('click', () => {
            terminal.toggle();
        });
        
        // Горячая клавиша `
        document.addEventListener('keydown', (e) => {
            if (e.key === '`' || e.key === 'ё') {
                e.preventDefault();
                terminal.toggle();
            }
            
            // Escape закрывает терминал
            if (e.key === 'Escape' && terminal.isOpen) {
                terminal.close();
            }
        });
        
        // Добавление команды honey))
        terminal.addCommand('honey))', () => {
            terminal.print('❤️ Загрузка секретного сообщения...');
            setTimeout(() => {
                this.showHeart();
                terminal.close();
            }, 1000);
        });
    }

    setupHeart() {
        this.components.heart = new Heart3D();
        document.getElementById('closeHeart').addEventListener('click', () => {
            document.getElementById('heartContainer').style.display = 'none';
        });
    }

    showHeart() {
        const container = document.getElementById('heartContainer');
        container.style.display = 'flex';
        this.components.heart.start();
        
        // Автозакрытие через 10 секунд
        setTimeout(() => {
            container.style.display = 'none';
        }, 10000);
    }

    setupAnimations() {
        // Анимация появления элементов при скролле
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.project-card, .tech-category, .philosophy-card').forEach(el => {
            observer.observe(el);
        });
        
        // Прогресс скролла
        this.setupScrollProgress();
        
        // Кнопка "Наверх"
        this.setupScrollToTop();
    }

    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    }

    setupScrollToTop() {
        const btn = document.getElementById('scrollTop');
        
        window.addEventListener('scroll', () => {
            btn.style.opacity = window.scrollY > 300 ? '1' : '0';
            btn.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
        });
        
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    setupEventListeners() {
        // Форма обратной связи
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }
        
        // Модальное окно
        this.setupModal();
        
        // Ресайз окна
        this.setupResizeHandler();
        
        // Heartbeat для мониторинга
        this.setupHeartbeat();
    }

    setupModal() {
        const modal = document.getElementById('modalOverlay');
        const closeBtn = document.getElementById('modalClose');
        const okBtn = document.getElementById('modalOk');
        
        const closeModal = () => {
            modal.style.display = 'none';
        };
        
        closeBtn.addEventListener('click', closeModal);
        okBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    showNotification(message) {
        const modal = document.getElementById('modalOverlay');
        const messageEl = document.getElementById('modalMessage');
        
        messageEl.textContent = message;
        modal.style.display = 'flex';
    }

    handleFormSubmit(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Показываем загрузку
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;
        
        // Имитация отправки
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            this.showNotification('Спасибо! Мы свяжемся с вами в ближайшее время.');
        }, 1500);
    }

    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (this.components.particles) {
                    this.components.particles.resize();
                }
            }, 250);
        });
    }

    setupCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                return;
            }
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        };
        
        updateCounter();
    }

    setupHeartbeat() {
        setInterval(() => {
            const now = Date.now();
            if (now - this.state.lastHeartbeat > 60000) {
                console.log('💓 Heartbeat: сайт активен');
                this.state.lastHeartbeat = now;
            }
        }, 30000);
    }

    showSite() {
        document.body.style.visibility = 'visible';
        
        // Показываем анимированные элементы
        document.querySelectorAll('.hero-content > *').forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, i * 100);
        });
    }
}

// Система частиц
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0, radius: 100 };
        this.frameId = null;
        
        this.init();
        this.start();
    }

    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        
        this.createParticles();
    }

    createParticles() {
        this.particles = [];
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);
        
        const count = Math.min(50, Math.floor((width * height) / 5000));
        
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: this.getParticleColor(),
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }

    getParticleColor() {
        const isLight = document.documentElement.classList.contains('light-theme');
        return isLight ? 'rgba(74, 68, 255, {opacity})' : 'rgba(200, 200, 255, {opacity})';
    }

    updateColors() {
        const colorTemplate = this.getParticleColor();
        this.particles.forEach(p => {
            p.color = colorTemplate.replace('{opacity}', p.opacity);
        });
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        // Пауза при выходе из viewport
        const observer = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) {
                this.stop();
            } else {
                this.start();
            }
        });
        observer.observe(this.canvas);
    }

    animate() {
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);
        
        // Очистка
        this.ctx.clearRect(0, 0, width, height);
        
        // Обновление частиц
        this.particles.forEach(particle => {
            // Движение
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Отскок от границ
            if (particle.x <= 0 || particle.x >= width) particle.speedX *= -1;
            if (particle.y <= 0 || particle.y >= height) particle.speedY *= -1;
            
            // Взаимодействие с мышью
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                particle.x -= Math.cos(angle) * force * 2;
                particle.y -= Math.sin(angle) * force * 2;
            }
            
            // Отрисовка
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color.replace('{opacity}', particle.opacity);
            this.ctx.fill();
        });
        
        // Соединения
        this.drawConnections();
        
        this.frameId = requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        const maxDistance = 100;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = 0.2 * (1 - distance / maxDistance);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    start() {
        if (!this.frameId) {
            this.animate();
        }
    }

    stop() {
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
    }

    reduceCount() {
        this.particles = this.particles.slice(0, Math.floor(this.particles.length / 2));
    }
}

// Терминальная система
class TerminalSystem {
    constructor() {
        this.isOpen = false;
        this.history = [];
        this.historyIndex = -1;
        this.commands = new Map();
        
        this.initCommands();
    }

    initCommands() {
        this.addCommand('help', () => {
            this.print('Доступные команды:');
            this.print('  help     - эта справка');
            this.print('  clear    - очистить терминал');
            this.print('  about    - о проекте');
            this.print('  projects - список проектов');
            this.print('  theme    - переключить тему');
        });
        
        this.addCommand('clear', () => {
            this.clear();
        });
        
        this.addCommand('about', () => {
            this.print('KV/RaMIS Project Group - сообщество разработчиков свободного ПО.');
            this.print('Основатель: Валерий, 15 лет.');
            this.print('Основные проекты: KV/OS, KV/CHAT, KV/UNIT');
        });
        
        this.addCommand('projects', () => {
            this.print('Активные проекты:');
            this.print('  KV/OS   - экспериментальная ОС (25%)');
            this.print('  KV/CHAT - P2P мессенджер (40%)');
            this.print('  KV/UNIT - Telegram бот (85%)');
        });
        
        this.addCommand('theme', () => {
            const currentTheme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.className = newTheme + '-theme';
            localStorage.setItem('theme', newTheme);
            this.print(`Тема переключена на ${newTheme === 'dark' ? 'тёмную' : 'светлую'}`);
        });
    }

    addCommand(name, handler) {
        this.commands.set(name.toLowerCase(), handler);
    }

    toggle() {
        const overlay = document.getElementById('terminalOverlay');
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        const overlay = document.getElementById('terminalOverlay');
        const input = document.getElementById('terminalInput');
        
        overlay.style.display = 'flex';
        this.isOpen = true;
        
        setTimeout(() => {
            input.focus();
        }, 100);
        
        // Обработчик закрытия
        document.getElementById('terminalClose').addEventListener('click', () => this.close());
        
        // Обработчик ввода
        input.addEventListener('keydown', (e) => this.handleInput(e));
    }

    close() {
        const overlay = document.getElementById('terminalOverlay');
        overlay.style.display = 'none';
        this.isOpen = false;
    }

    handleInput(e) {
        const input = document.getElementById('terminalInput');
        
        if (e.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
                this.executeCommand(command);
                this.history.push(command);
                this.historyIndex = this.history.length;
                input.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.history.length > 0) {
                this.historyIndex = Math.max(0, this.historyIndex - 1);
                input.value = this.history[this.historyIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.history.length > 0) {
                this.historyIndex = Math.min(this.history.length, this.historyIndex + 1);
                input.value = this.history[this.historyIndex] || '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autoComplete(input);
        }
    }

    executeCommand(command) {
        this.print(`$ ${command}`, true);
        
        const cmd = command.toLowerCase();
        const handler = this.commands.get(cmd);
        
        if (handler) {
            handler();
        } else {
            this.print(`Команда не найдена: ${command}`);
            this.print('Введите "help" для списка команд');
        }
    }

    autoComplete(input) {
        const partial = input.value.toLowerCase();
        const matches = Array.from(this.commands.keys()).filter(cmd => 
            cmd.startsWith(partial)
        );
        
        if (matches.length === 1) {
            input.value = matches[0];
        } else if (matches.length > 1) {
            this.print('Возможные команды: ' + matches.join(', '));
        }
    }

    print(text, isCommand = false) {
        const output = document.querySelector('.terminal-output');
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        if (isCommand) {
            const prompt = document.createElement('span');
            prompt.className = 'terminal-prompt';
            prompt.textContent = '$';
            line.appendChild(prompt);
        }
        
        const textEl = document.createElement('span');
        textEl.className = 'terminal-text';
        textEl.textContent = text;
        line.appendChild(textEl);
        
        output.appendChild(line);
        
        // Автоскролл
        output.scrollTop = output.scrollHeight;
    }

    clear() {
        const output = document.querySelector('.terminal-output');
        output.innerHTML = '';
        this.print('Терминал очищен.');
    }
}

// 3D Сердечко (упрощённая версия без Three.js)
class Heart3D {
    constructor() {
        this.canvas = document.getElementById('heartCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isAnimating = false;
        this.frameId = null;
        this.time = 0;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = Math.min(400, window.innerWidth * 0.8);
        this.canvas.height = this.canvas.width;
    }

    start() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.time = 0;
        this.animate();
    }

    stop() {
        this.isAnimating = false;
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
        }
    }

    animate() {
        if (!this.isAnimating) return;
        
        this.time += 0.05;
        this.drawHeart();
        this.frameId = requestAnimationFrame(() => this.animate());
    }

    drawHeart() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const size = Math.min(width, height) * 0.3;
        
        // Очистка
        ctx.clearRect(0, 0, width, height);
        
        // Создание градиента
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size * 2);
        gradient.addColorStop(0, '#ff4757');
        gradient.addColorStop(0.5, '#ff3838');
        gradient.addColorStop(1, '#ff0000');
        
        // Рисуем сердечко
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(Math.sin(this.time * 0.5) * 0.1); // Лёгкое вращение
        
        // Формула сердечка
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
            const t = angle;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            
            const scaleX = size / 16;
            const scaleY = size / 16;
            
            const px = x * scaleX;
            const py = y * scaleY;
            
            if (angle === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        
        ctx.closePath();
        
        // Заполнение и обводка
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        
        // Блик
        ctx.beginPath();
        ctx.arc(size * 0.3, -size * 0.3, size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
        
        ctx.restore();
        
        // Пульсация
        const pulse = 1 + Math.sin(this.time * 2) * 0.05;
        this.canvas.style.transform = `scale(${pulse})`;
        
        // Свечение
        this.canvas.style.boxShadow = `0 0 ${30 + Math.sin(this.time * 3) * 10}px rgba(255, 71, 87, 0.7)`;
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const app = new KVWebsite();
    
    // Экспорт для отладки
    if (localStorage.getItem('debug')) {
        window.KVApp = app;
    }
    
    // Показываем подсказку про терминал
    setTimeout(() => {
        if (!localStorage.getItem('terminalHintShown')) {
            app.showNotification('💡 Подсказка: Нажмите ` или кнопку терминала для доступа к консоли');
            localStorage.setItem('terminalHintShown', 'true');
        }
    }, 3000);
});

// Service Worker для офлайн-работы
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service Worker не зарегистрирован:', err);
        });
    });
}
