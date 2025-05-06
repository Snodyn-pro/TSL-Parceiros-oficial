// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-links li');
const body = document.body;
const overlay = document.querySelector('.nav-overlay');

// Função para fechar o menu
function closeMenu() {
    nav.classList.remove('nav-active');
    body.style.overflow = 'auto';
    
    navLinks.forEach(link => {
        link.style.animation = '';
    });
}

// Função para abrir o menu
function openMenu() {
    nav.classList.add('nav-active');
    body.style.overflow = 'hidden';
    
    navLinks.forEach((link, index) => {
        link.style.animation = `fadeInRight 0.5s ease forwards ${index * 0.1}s`;
    });
}

// Toggle do menu ao clicar no burger
burger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (nav.classList.contains('nav-active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('nav-active')) {
        closeMenu();
    }
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
            closeMenu();
        }
    });
});

// Fechar menu ao redimensionar a tela
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('nav-active')) {
        closeMenu();
    }
});

// Fechar menu ao mudar orientação do dispositivo
window.addEventListener('orientationchange', () => {
    if (nav.classList.contains('nav-active')) {
        closeMenu();
    }
});

// Adicionar animação de fade in para os links
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}`;
document.head.appendChild(style);

// Smooth Scrolling for Navigation Links
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

// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        // For now, we'll just show a success message
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        this.reset();
    });
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add animation class to service cards on hover
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add touch support for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('touchstart', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('touchend', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Optimize scroll performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Update scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
});

// Add passive scroll listener for better performance
document.addEventListener('scroll', () => {}, { passive: true });

// Add smooth scroll behavior to the entire page
document.documentElement.style.scrollBehavior = 'smooth';

// Função para expandir e recolher os cards de serviço
function toggleServiceContent(card) {
    // Alterna a classe 'active' no card clicado
    card.classList.toggle('active');
    
    // Opcional: fechar outros cards quando um é aberto
    const allCards = document.querySelectorAll('.service-card');
    allCards.forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('active')) {
            otherCard.classList.remove('active');
        }
    });
}

// Detectar se é dispositivo móvel
function isMobileDevice() {
    return (window.innerWidth <= 768 || 
            navigator.userAgent.match(/Android/i) || 
            navigator.userAgent.match(/iPhone|iPad|iPod/i));
}

// Otimizar comportamento de toque para dispositivos móveis
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Adicionar evento de clique para todos os cards de serviço
    serviceCards.forEach(card => {
        // Remover o atributo onclick para evitar conflitos
        if (card.hasAttribute('onclick')) {
            card.removeAttribute('onclick');
        }
        
        // Adicionar event listener diretamente ao card
        card.addEventListener('click', function(e) {
            // Impedir que o evento de clique se propague
            e.stopPropagation();
            toggleServiceContent(this);
        });
    });
    
    // Ajustar tamanho dos elementos baseado no tamanho da tela
    function adjustSizeForScreen() {
        if (window.innerWidth <= 480) {
            document.documentElement.style.fontSize = '15px';
        } else if (window.innerWidth <= 768) {
            document.documentElement.style.fontSize = '16px';
        } else {
            document.documentElement.style.fontSize = '16px';
        }
    }
    
    // Executar no carregamento e no redimensionamento
    adjustSizeForScreen();
    window.addEventListener('resize', adjustSizeForScreen);
});

// Fix para problema de 100vh em navegadores móveis
function setVhVariable() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Executa no carregamento e quando a janela é redimensionada
window.addEventListener('load', setVhVariable);
window.addEventListener('resize', setVhVariable);

// Visão e Valores Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Visão Toggle
    const visionText = document.querySelector('.vision-text');
    const visionTitle = visionText.querySelector('h2');

    if (window.innerWidth <= 768) {
        // Configurar título da visão sem seta
        if (visionTitle) {
            visionTitle.style.cursor = 'default';
            visionTitle.style.paddingRight = '15px';
            visionTitle.style.textAlign = 'center';
        }
        
        // Garantir que o conteúdo da visão esteja sempre visível
        const visionParagraph = visionText.querySelector('p');
        if (visionParagraph) {
            visionParagraph.style.maxHeight = 'none';
            visionParagraph.style.opacity = '1';
            visionParagraph.style.overflow = 'visible';
        }

        // Valores Toggle - ajustar headers para setas à direita
        const valueCards = document.querySelectorAll('.value-card');
        valueCards.forEach(card => {
            const title = card.querySelector('h3');
            if (title) {
                title.style.position = 'relative';
                title.style.paddingRight = '40px';
                title.style.textOverflow = 'ellipsis';
                title.style.whiteSpace = 'nowrap';
                title.style.overflow = 'hidden';
                
                title.addEventListener('click', () => {
                    // Fecha outros cards
                    valueCards.forEach(otherCard => {
                        if (otherCard !== card && otherCard.classList.contains('active')) {
                            otherCard.classList.remove('active');
                        }
                    });
                    card.classList.toggle('active');
                });
            }
        });
    }

    // Atualiza comportamento ao redimensionar
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth <= 768;
        
        // Remove classes active se não estiver em mobile
        if (!isMobile) {
            visionText.classList.remove('active');
            valueCards.forEach(card => card.classList.remove('active'));
        }
    });
});

// Mobile-specific initialization
function initializeMobileFeatures() {
    if (!isMobileDevice()) return;
    
    // Evitar inicialização duplicada
    if (window.mobileInitialized) {
        console.log("Mobile features already initialized, skipping");
        return;
    }
    
    console.log("Mobile features initialized");
    window.mobileInitialized = true;

    // Ensure all accordions start collapsed on mobile
    document.querySelectorAll('.service-card, .value-card').forEach(card => {
        card.classList.remove('active');
    });
    
    document.querySelector('.vision-text')?.classList.remove('active');

    // Services Accordion (Mobile Only) - CORREÇÃO ESPECÍFICA
    const serviceCards = document.querySelectorAll('.service-card');
    console.log("Encontrados", serviceCards.length, "cards de serviço");
    
    serviceCards.forEach((card, index) => {
        const header = card.querySelector('.service-header');
        if (header) {
            console.log("Adicionando listener ao serviço", index + 1);
            
            // Estilizar o header para a seta no extremo direito
            header.style.position = 'relative';
            header.style.paddingRight = '40px';
            header.style.textOverflow = 'ellipsis';
            header.style.whiteSpace = 'nowrap';
            header.style.overflow = 'hidden';
            
            // Remover todos os event listeners existentes
            const headerClone = header.cloneNode(true);
            header.parentNode.replaceChild(headerClone, header);
            
            // Adicionar novos event listeners ao clone
            headerClone.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("Clicou no serviço", index + 1);
                
                // TRUE TOGGLE: Se estiver ativo, desativa. Se não estiver, ativa.
                const isActive = card.classList.contains('active');
                
                // Fecha todos os cards EXCETO o atual
                serviceCards.forEach(c => {
                    if (c !== card) {
                        c.classList.remove('active');
                    }
                });
                
                // Toggle no card atual
                if (isActive) {
                    card.classList.remove('active');
                } else {
                    card.classList.add('active');
                }
                
                // Forçar reflow para animar
                card.offsetHeight;
            });
        }
    });

    // Values Accordion (Mobile Only) - CORREÇÃO
    const valueCards = document.querySelectorAll('.value-card');
    console.log("Encontrados", valueCards.length, "cards de valores");
    
    valueCards.forEach((card, index) => {
        const header = card.querySelector('h3');
        if (header) {
            console.log("Adicionando listener ao valor", index + 1);
            
            // Estilizar o header para permitir múltiplas linhas
            header.style.position = 'relative';
            header.style.paddingRight = '40px';
            header.style.whiteSpace = 'normal'; // Permitir quebra de linha
            header.style.overflow = 'visible';
            header.style.textOverflow = 'initial';
            header.style.minHeight = '60px'; // Garantir altura mínima
            header.style.display = 'flex';
            header.style.alignItems = 'flex-start'; // Alinhar ao topo em vez do centro
            header.style.lineHeight = '1.3';
            
            // Remover todos os event listeners existentes
            const headerClone = header.cloneNode(true);
            header.parentNode.replaceChild(headerClone, header);
            
            // Adicionar novos event listeners ao clone
            headerClone.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("Clicou no valor", index + 1);
                
                // TRUE TOGGLE: Se estiver ativo, desativa. Se não estiver, ativa.
                const isActive = card.classList.contains('active');
                
                // Fecha todos os cards EXCETO o atual
                valueCards.forEach(c => {
                    if (c !== card) {
                        c.classList.remove('active');
                    }
                });
                
                // Toggle no card atual
                if (isActive) {
                    card.classList.remove('active');
                } else {
                    card.classList.add('active');
                }
                
                // Forçar reflow para animar
                card.offsetHeight;
            });
        }
    });

    // Vision Section Toggle (Mobile Only)
    const visionText = document.querySelector('.vision-text');
    const visionTitle = visionText?.querySelector('h2');
    if (visionTitle) {
        console.log("Configurando a seção de visão para sempre visível");
        
        // Remover todos os event listeners existentes
        const titleClone = visionTitle.cloneNode(true);
        visionTitle.parentNode.replaceChild(titleClone, visionTitle);
        
        // Configurar visão para sempre visível
        titleClone.style.cursor = 'default';
        titleClone.style.paddingRight = '15px';
        titleClone.style.textAlign = 'center';
        
        const visionParagraph = visionText.querySelector('p');
        if (visionParagraph) {
            visionParagraph.style.maxHeight = 'none';
            visionParagraph.style.opacity = '1';
            visionParagraph.style.overflow = 'visible';
        }
    }
}

// Inicializar as funcionalidades mobile quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM carregado - inicializando funcionalidades");
    
    // Verificar se a variável mobileInitialized ainda não existe
    if (typeof window.mobileInitialized === 'undefined') {
        window.mobileInitialized = false;
    }
    
    // Inicializar funcionalidades mobile
    initializeMobileFeatures();
    
    // Adicionar event listener para o card de valores (desktop e mobile)
    const valueCards = document.querySelectorAll('.value-card');
    console.log("Adicionando listeners a", valueCards.length, "cards de valores (desktop e mobile)");
    
    valueCards.forEach((card, index) => {
        // Garantir que os títulos estão visíveis integralmente
        const header = card.querySelector('h3');
        if (header) {
            // Remover qualquer limitação de altura/largura que possa cortar o texto
            header.style.whiteSpace = 'normal';
            header.style.textOverflow = 'clip';
            header.style.overflow = 'visible';
            header.style.maxWidth = '100%';
            header.style.width = 'auto';
            header.style.minHeight = 'auto';
            header.style.height = 'auto';
            header.style.padding = '20px 50px 20px 15px';
            header.style.lineHeight = '1.5';
            header.style.display = 'block';
            
            // Para dispositivos móveis, garantir que o texto não seja cortado
            if (window.innerWidth <= 768) {
                header.style.fontSize = '1.1rem';
            }
        }
        
        // Certifique-se de que o card inteiro seja clicável
        card.style.cursor = 'pointer';
        
        // Adicionar evento de clique no card inteiro
        card.addEventListener('click', function(e) {
            // Impedir que o evento de clique se propague
            e.stopPropagation();
            
            console.log("Clicou no card de valor", index + 1);
            
            // TRUE TOGGLE: Se estiver ativo, desativa. Se não estiver, ativa.
            const isActive = this.classList.contains('active');
            
            // Fecha todos os outros cards
            valueCards.forEach(c => {
                if (c !== this) {
                    c.classList.remove('active');
                }
            });
            
            // Toggle no card atual
            if (isActive) {
                this.classList.remove('active');
            } else {
                this.classList.add('active');
            }
        });
    });
    
    // Garantir que os valores possam ser expandidos em desktop também
    const addDesktopValueCardListeners = function() {
        if (window.innerWidth > 768) {
            console.log("Adicionando comportamento de clique para desktop");
            valueCards.forEach((card, index) => {
                const content = card.querySelector('.value-content');
                if (content) {
                    content.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
                    content.style.opacity = '1';
                    content.style.maxHeight = 'none';
                }
                
                // Adicionar efeito de hover mais pronunciado
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px)';
                    this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
                });
            });
        }
    };
    
    // Executar imediatamente
    addDesktopValueCardListeners();
    
    // Executar novamente se a janela for redimensionada
    window.addEventListener('resize', addDesktopValueCardListeners);
});

// Remover código de debugging desnecessário
window.addEventListener('load', function() {
    // Verificar se estamos em modo mobile e aplicar padding apropriado
    if (window.innerWidth <= 768) {
        console.log("Modo mobile detectado - ajustando headers");
        
        // Ajustar espaçamento nos headers de serviços para acomodar a seta
        document.querySelectorAll('.service-header').forEach(header => {
            header.style.position = 'relative';
            header.style.paddingRight = '40px';
            header.style.textOverflow = 'ellipsis';
            header.style.whiteSpace = 'nowrap';
            header.style.overflow = 'hidden';
        });
        
        // Ajustar espaçamento nos headers de valores para acomodar a seta
        document.querySelectorAll('.value-card h3').forEach(header => {
            header.style.position = 'relative';
            header.style.paddingRight = '40px';
            header.style.textOverflow = 'ellipsis';
            header.style.whiteSpace = 'nowrap';
            header.style.overflow = 'hidden';
        });
        
        // Configurar visão para sempre visível
        const visionTitle = document.querySelector('.vision-text h2');
        if (visionTitle) {
            visionTitle.style.cursor = 'default';
            visionTitle.style.paddingRight = '15px';
            visionTitle.style.textAlign = 'center';
        }
        
        const visionParagraph = document.querySelector('.vision-text p');
        if (visionParagraph) {
            visionParagraph.style.maxHeight = 'none';
            visionParagraph.style.opacity = '1';
            visionParagraph.style.overflow = 'visible';
        }
    }
});

// Aplicar tamanho correto ao logo em dispositivos móveis
document.addEventListener('DOMContentLoaded', function() {
    // Função para ajustar o logo de acordo com o tamanho da tela
    function adjustLogo() {
        const logo = document.querySelector('.logo-img');
        
        if (!logo) return;
        
        // Os ajustes de imagem são feitos via CSS com content: url()
        // Aqui apenas ajustamos outros estilos se necessário
        if (window.innerWidth <= 768) {
            const logoContainer = document.querySelector('.logo');
            if (logoContainer) {
                logoContainer.style.height = '110px';
                logoContainer.style.top = '-25px';
            }
            
            // Ajustar tamanho para telas muito pequenas
            if (window.innerWidth <= 480) {
                logo.style.height = '110px';
            } else {
                logo.style.height = '120px';
            }
        } else {
            // Desktop
            logo.style.height = '140px';
            
            const logoContainer = document.querySelector('.logo');
            if (logoContainer) {
                logoContainer.style.height = '125px';
                logoContainer.style.top = '-25px';
            }
        }
    }
    
    // Executar no carregamento
    adjustLogo();
    
    // E também quando a janela é redimensionada
    window.addEventListener('resize', adjustLogo);
});