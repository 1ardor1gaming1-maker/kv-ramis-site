/**
 * KV/RaMIS Project Group - Оптимизированный JavaScript
 * Гарантирует 60 FPS и максимальную производительность
 */

// Конфигурация
const CONFIG = {
    PARTICLE_COUNT: 40,
    USE_THROTTLING: true,
    THROTTLE_DELAY: 16, // ~60 FPS
    DEBUG_MODE: false,
    ENABLE_CONSOLE_COMMANDS: true
};

// Глобальные состояния
let appState = {
    isAnimating: true,
    lastRenderTime: 0,
    scrollPosition: 0,
    activeSection: null,
    particles: [],
    rafId: null
};

// Основная инициализация
class KVWebsite {
    constructor() {
        this.init = this.init.bind(this);
        this.initParticles = this.initParticles.bind(this);
        this.animateParticles = this.animateParticles.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.throttle = this.throttle.bind(this);
        this.debounce = this.debounce.bind(this);
    }

    // Инициализация приложения
    init() {
        console.log('🚀 KV/RaMIS Project Group v3.0 - Финальная версия');
        
        // Проверка производительности
        this.checkPerformance();
        
        // Инициализация компонентов
        this.initNavigation();
        this.initScrollProgress();
        this.initScrollToTop();
        this.initTheme();
        this.initParticles();
        this.initAnimations();
        this.initCounters();
        this.initForm();
        this.initModal();
        this.initConsoleCommands();
        
        // События
        this.bindEvents();
        
        // Запуск анимаций
        this.startAnimations();
    }

    // Проверка производительности устройства
    checkPerformance() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        
        if (isMobile || hasLowMemory) {
            CONFIG.PARTICLE_COUNT = 20;
            CONFIG.USE_THROTTLING = true;
            console.log('⚡ Режим оптимизации для слабого устройства');
        }
        
        if (CONFIG.DEBUG_MODE) {
            console.log('📊 Производительность системы:');
            console.log('- CPU ядер:', navigator.hardwareConcurrency || 'неизвестно');
            console.log('- Память:', navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'неизвестно');
            console.log('- User Agent:', navigator.userAgent);
        }
    }

    // Навигация
    initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                navToggle.innerHTML = navLinks.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
            
            // Закрытие меню при клике на ссылку
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
        
        // Активная секция в навигации
        this.updateActiveSection();
    }

    // Прогресс скролла
    initScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;
        
        const updateProgress = () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        };
        
        window.addEventListener('scroll', this.throttle(updateProgress, 16), { passive: true });
    }

    // Кнопка "Наверх"
    initScrollToTop() {
        const scrollBtn = document.querySelector('.scroll-top');
        if (!scrollBtn) return;
        
        const checkScroll = () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        };
        
        window.addEventListener('scroll', this.throttle(checkScroll, 100), { passive: true });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Тема
    initTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = themeToggle?.querySelector('i');
        if (!themeToggle || !themeIcon) return;
        
        // Системные предпочтения
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('kvramis-theme');
        
        // Установка начальной темы
        const setTheme = (isLight) => {
            if (isLight) {
                document.documentElement.classList.add('light-theme');
                document.documentElement.classList.remove('dark-theme');
                themeIcon.className = 'fas fa-sun';
            } else {
                document.documentElement.classList.add('dark-theme');
                document.documentElement.classList.remove('light-theme');
                themeIcon.className = 'fas fa-moon';
            }
        };
        
        // Приоритет: сохранённая тема > системная
        if (savedTheme) {
            setTheme(savedTheme === 'light');
        } else {
            setTheme(!prefersDark.matches);
        }
        
        // Переключение темы
        themeToggle.addEventListener('click', () => {
            const isLight = document.documentElement.classList.contains('light-theme');
            setTheme(!isLight);
            localStorage.setItem('kvramis-theme', !isLight ? 'light' : 'dark');
            
            // Обновление частиц при смене темы
            this.updateParticlesColor();
        });
        
        // Отслеживание системных предпочтений
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('kvramis-theme')) {
                setTheme(!e.matches);
            }
        });
    }

    // Система частиц
    initParticles() {
        const canvas = document.getElementById('particlesCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d', { alpha: true });
        const particles = [];
        
        // Ресайз канваса
        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            
            ctx.scale(dpr, dpr);
            
            // Пересоздание частиц
            particles.length = 0;
            for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
                particles.push(this.createParticle(canvas));
            }
        };
        
        // Создание частицы
        this.createParticle = (canvas) => {
            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);
            const isLight = document.documentElement.classList.contains('light-theme');
            
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.8,
                speedY: (Math.random() - 0.5) * 0.8,
                color: isLight ? 
                    `rgba(74, 68, 255, ${Math.random() * 0.4 + 0.3})` :
                    `rgba(200, 200, 255, ${Math.random() * 0.4 + 0.3})`,
                originalColor: null,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.02 + 0.01
            };
        };
        
        // Анимация частиц
        this.animateParticles = (timestamp) => {
            if (!appState.isAnimating) {
                appState.rafId = requestAnimationFrame(this.animateParticles);
                return;
            }
            
            // Ограничение FPS
            if (CONFIG.USE_THROTTLING && timestamp - appState.lastRenderTime < CONFIG.THROTTLE_DELAY) {
                appState.rafId = requestAnimationFrame(this.animateParticles);
                return;
            }
            
            appState.lastRenderTime = timestamp;
            
            // Очистка канваса
            const dpr = window.devicePixelRatio || 1;
            const width = canvas.width / dpr;
            const height = canvas.height / dpr;
            
            ctx.clearRect(0, 0, width, height);
            
            // Обновление и отрисовка частиц
            particles.forEach(particle => {
                // Воббл-эффект
                particle.wobble += particle.wobbleSpeed;
                particle.x += particle.speedX + Math.sin(particle.wobble) * 0.3;
                particle.y += particle.speedY + Math.cos(particle.wobble) * 0.3;
                
                // Отскок от границ
                if (particle.x <= 0 || particle.x >= width) particle.speedX *= -1;
                if (particle.y <= 0 || particle.y >= height) particle.speedY *= -1;
                
                // Ограничение
                particle.x = Math.max(0, Math.min(width, particle.x));
                particle.y = Math.max(0, Math.min(height, particle.y));
                
                // Отрисовка
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });
            
            // Соединение частиц
            this.connectParticles(ctx, particles, width, height);
            
            appState.rafId = requestAnimationFrame(this.animateParticles);
        };
        
        // Соединение частиц
        this.connectParticles = (ctx, particles, width, height) => {
            const maxDistance = 100;
            const isLight = document.documentElement.classList.contains('light-theme');
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = isLight ?
                            `rgba(74, 68, 255, ${0.2 * (1 - distance / maxDistance)})` :
                            `rgba(200, 200, 255, ${0.2 * (1 - distance / maxDistance)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };
        
        // Обновление цвета частиц
        this.updateParticlesColor = () => {
            const isLight = document.documentElement.classList.contains('light-theme');
            particles.forEach(particle => {
                particle.color = isLight ?
                    `rgba(74, 68, 255, ${Math.random() * 0.4 + 0.3})` :
                    `rgba(200, 200, 255, ${Math.random() * 0.4 + 0.3})`;
            });
        };
        
        // Реакция на курсор
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const influenceRadius = 80;
            
            particles.forEach(particle => {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < influenceRadius) {
                    const force = (influenceRadius - distance) / influenceRadius;
                    const angle = Math.atan2(dy, dx);
                    
                    particle.x -= Math.cos(angle) * force * 3;
                    particle.y -= Math.sin(angle) * force * 3;
                }
            });
        });
        
        // Intersection Observer для паузы
        const observer = new IntersectionObserver((entries) => {
            appState.isAnimating = entries[0].isIntersecting;
        }, { threshold: 0.1 });
        
        observer.observe(canvas);
        
        // Запуск
        resizeCanvas();
        appState.rafId = requestAnimationFrame(this.animateParticles);
        window.addEventListener('resize', this.debounce(resizeCanvas, 250));
    }

    // Анимации при скролле
    initAnimations() {
        const animatedElements = document.querySelectorAll('.project-card, .tech-category, .philosophy-card, .benefit');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => observer.observe(el));
    }

    // Анимированные счётчики
    initCounters() {
        const counters = document.querySelectorAll('.stat[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target.querySelector('.stat-number');
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    const speed = parseInt(entry.target.getAttribute('data-speed')) || 50;
                    
                    this.animateCounter(counter, target, speed);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
        
        // Статистика в футере
        const codeLines = document.getElementById('codeLines');
        if (codeLines) this.animateCounter(codeLines, 15000, 5);
    }

    // Анимация счётчика
    animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start).toLocaleString();
            }
        }, 16);
    }

    // Форма обратной связи
    initForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                interest: document.getElementById('interest').value
            };
            
            // Валидация
            if (!formData.name || !formData.email || !formData.message) {
                this.showNotification('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }
            
            // Имитация отправки
            this.showNotification('Отправка заявки...', 'info');
            
            setTimeout(() => {
                form.reset();
                this.showNotification(
                    `Спасибо, ${formData.name}! Мы свяжемся с вами в ближайшее время.`,
                    'success'
                );
                
                // Логирование в консоль (для отладки)
                if (CONFIG.DEBUG_MODE) {
                    console.log('📨 Новая заявка:', formData);
                }
            }, 2000);
        });
    }

    // Модальное окно
    initModal() {
        const modal = document.getElementById('notificationModal');
        const modalClose = document.getElementById('modalClose');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        
        if (!modal || !modalClose) return;
        
        // Закрытие модалки
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Закрытие по клику вне модалки
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Экспорт функции показа уведомления
        window.showNotification = (message, type = 'info') => {
            const titles = {
                info: 'Уведомление',
                success: 'Успешно!',
                error: 'Ошибка',
                warning: 'Внимание'
            };
            
            modalTitle.textContent = titles[type] || titles.info;
            modalMessage.textContent = message;
            modal.style.display = 'flex';
            
            // Автозакрытие для успешных сообщений
            if (type === 'success') {
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 3000);
            }
        };
    }

    // Консольные команды (пасхалка)
    initConsoleCommands() {
        if (!CONFIG.ENABLE_CONSOLE_COMMANDS) return;
        
        const commands = {
            help: () => `Доступные команды: ${Object.keys(commands).join(', ')}`,
            about: () => 'KV/RaMIS Project Group - разработка свободного ПО. Основатель: Валерий, 15 лет.',
            projects: () => 'KV/OS (ОС), KV/CHAT (мессенджер), KV/UNIT (Telegram-бот)',
            theme: () => {
                const isLight = document.documentElement.classList.contains('light-theme');
                document.documentElement.classList.toggle('light-theme');
                document.documentElement.classList.toggle('dark-theme');
                return `Тема переключена на: ${isLight ? 'тёмную' : 'светлую'}`;
            },
            gpl: () => 'Мы поддерживаем GNU GPL и свободу программного обеспечения!',
            secret: () => {
                const secrets = [
                    'Ты нашёл секретную команду! 🎉',
                    'Код этого сайта полностью открыт.',
                    'KV/CHAT будет использовать Noise Protocol.',
                    'Следи за обновлениями в Telegram-канале!'
                ];
                return secrets[Math.floor(Math.random() * secrets.length)];
            }
        };
        
        // Перехват console.log для команд
        const originalLog = console.log;
        console.log = function(...args) {
            if (args.length === 1 && typeof args[0] === 'string') {
                const input = args[0].toLowerCase().trim();
                if (commands[input]) {
                    originalLog(`> ${args[0]}`);
                    originalLog(commands[input]());
                    return;
                }
            }
            originalLog.apply(console, args);
        };
        
        // Приветственное сообщение
        setTimeout(() => {
            console.log('%c🚀 Добро пожаловать в KV/RaMIS!', 'color: #6c63ff; font-size: 16px; font-weight: bold;');
            console.log('%c💡 Попробуйте команды: about, projects, gpl, secret', 'color: #ff6b9d;');
        }, 1000);
    }

    // Обновление активной секции
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    appState.activeSection = id;
                    
                    // Обновление активной ссылки в навигации
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

    // Обработчики событий
    handleScroll() {
        appState.scrollPosition = window.scrollY;
        this.updateActiveSection();
    }

    handleResize() {
        // Перезапуск анимаций при ресайзе
        if (appState.rafId) {
            cancelAnimationFrame(appState.rafId);
        }
        this.initParticles();
    }

    // Утилиты
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Запуск анимаций
    startAnimations() {
        // Запуск уже выполнен в initParticles
    }

    // Привязка событий
    bindEvents() {
        window.addEventListener('scroll', this.throttle(this.handleScroll, 100), { passive: true });
        window.addEventListener('resize', this.debounce(this.handleResize, 250));
        
        // Предотвращение контекстного меню на канвасе
        const canvas = document.getElementById('particlesCanvas');
        if (canvas) {
            canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        }
    }
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => {
    const app = new KVWebsite();
    app.init();
    
    // Глобальный экспорт для отладки
    if (CONFIG.DEBUG_MODE) {
        window.KVApp = app;
    }
});

// Очистка при размонтировании
window.addEventListener('beforeunload', () => {
    if (appState.rafId) {
        cancelAnimationFrame(appState.rafId);
    }
});

// Service Worker для офлайн-работы (опционально)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker регистрация не удалась:', error);
        });
    });
}
