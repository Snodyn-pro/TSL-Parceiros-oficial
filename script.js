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
        alert('Mensagem enviada com sucesso! Entraremos em contacto em breve.');
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
            
            // Estilizar o header para a seta no extremo direito e centralizar texto
            header.style.position = 'relative';
            header.style.paddingRight = '40px';
            header.style.textAlign = 'center';
            header.style.justifyContent = 'center';
            header.style.display = 'flex';
            header.style.alignItems = 'center';
            
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
        
        // Organize service card text
        const serviceContent = card.querySelector('.service-content p');
        if (serviceContent) {
            serviceContent.style.textAlign = 'justify';
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
        
        // Organize value card text
        const valueContent = card.querySelector('.value-content p');
        if (valueContent) {
            valueContent.style.textAlign = 'justify';
        }
    });

    // Adicionar suporte para texto justificado em depoimentos
    document.querySelectorAll('.testimonial-content p').forEach(content => {
        if (window.innerWidth <= 768) {
            content.style.textAlign = 'center';
        } else {
            content.style.textAlign = 'justify';
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
            visionParagraph.style.textAlign = 'justify';
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

    // Exibir campo de texto 'Outro' apenas se o checkbox 'Outro' estiver marcado
    const apoioOutroCheckbox = document.getElementById('apoio5');
    const apoioOutroContainer = document.getElementById('apoio-outro-container');
    if (apoioOutroCheckbox && apoioOutroContainer) {
      apoioOutroCheckbox.addEventListener('change', function() {
        if (apoioOutroCheckbox.checked) {
          apoioOutroContainer.style.display = 'block';
        } else {
          apoioOutroContainer.style.display = 'none';
          document.getElementById('apoio-outro').value = '';
        }
      });
      // Estado inicial
      apoioOutroContainer.style.display = apoioOutroCheckbox.checked ? 'block' : 'none';
    }
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
            header.style.textAlign = 'center';
            header.style.justifyContent = 'center';
            header.style.display = 'flex';
            header.style.alignItems = 'center';
        });
        
        // Centralize os subtítulos na seção Nossos Serviços
        document.querySelectorAll('.service-card h3').forEach(subtitle => {
            subtitle.style.textAlign = 'center';
            subtitle.style.justifyContent = 'center';
            subtitle.style.display = 'block';
            subtitle.style.paddingRight = '30px'; // Espaço para a seta
        });
        
        // Ajustar espaçamento nos headers de valores para acomodar a seta
        document.querySelectorAll('.value-card h3').forEach(header => {
            header.style.position = 'relative';
            header.style.paddingRight = '40px';
            header.style.whiteSpace = 'normal';
            header.style.overflow = 'visible';
            header.style.textOverflow = 'clip';
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
            visionParagraph.style.textAlign = 'justify';
        }
        
        // Centralizar textos dos depoimentos em mobile
        document.querySelectorAll('.testimonial-content p').forEach(content => {
            content.style.textAlign = 'center';
        });
    } else {
        // Justificar textos em desktop
        document.querySelectorAll('.service-card p, .value-card p, .testimonial-content p, .vision-text p').forEach(content => {
            content.style.textAlign = 'justify';
        });
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
                logoContainer.style.height = '120px';
                logoContainer.style.top = '-20px';
            }
            
            // Ajustar tamanho para telas muito pequenas
            if (window.innerWidth <= 480) {
                logo.style.height = '100px';
                
                if (logoContainer) {
                    logoContainer.style.height = '100px';
                    logoContainer.style.top = '-15px';
                }
            } else {
                logo.style.height = '120px';
            }
        } else {
            // Desktop
            logo.style.height = '140px';
            
            const logoContainer = document.querySelector('.logo');
            if (logoContainer) {
                logoContainer.style.height = '150px';
                logoContainer.style.top = '-25px';
            }
        }
    }
    
    // Executar no carregamento
    adjustLogo();
    
    // E também quando a janela é redimensionada
    window.addEventListener('resize', adjustLogo);
});

// Add window resize handler for text alignment
window.addEventListener('resize', function() {
    // Update text alignment based on current screen size
    if (window.innerWidth <= 768) {
        // Mobile - center service subtitles and testimonials
        document.querySelectorAll('.service-header, .service-card h3').forEach(header => {
            header.style.textAlign = 'center';
            header.style.justifyContent = 'center';
        });
        
        document.querySelectorAll('.testimonial-content p').forEach(content => {
            content.style.textAlign = 'center';
        });
    } else {
        // Desktop - justify all card text contents
        document.querySelectorAll('.service-card p, .value-card p, .testimonial-content p, .vision-text p').forEach(content => {
            content.style.textAlign = 'justify';
        });
        
        // Make sure service feature lists stay left-aligned
        document.querySelectorAll('.service-features li').forEach(item => {
            item.style.textAlign = 'left';
        });
    }
});

// Newsletter Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            
            // Here you would typically send this data to your backend
            console.log('Newsletter subscription:', {
                name: nameInput.value,
                email: emailInput.value
            });
            
            // Clear the form
            newsletterForm.reset();
            
            // Show success message
            alert('Obrigado por subscrever a nossa newsletter!');
        });
    }

    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Moderno Stepper para Questionário de Rastreamento
const rastreamentoModal = document.getElementById('rastreamento-modal');
const rastreamentoModalContent = document.getElementById('rastreamento-modal-content');
const startJourneyBtn = document.getElementById('start-journey-btn');
const closeRastreamentoModal = document.getElementById('close-rastreamento-modal');
const rastreamentoStepper = document.getElementById('rastreamento-stepper');
const rastreamentoProgressBar = document.getElementById('rastreamento-progress-bar');
const rastreamentoPopup = document.getElementById('rastreamento-popup');
const closeRastreamentoPopup = document.getElementById('close-rastreamento-popup');

const rastreamentoSteps = [
  {
    title: 'Bem-vindo!',
    desc: 'Obrigado por contactar a TSL Parceiros! Para que possamos preparar uma proposta adequada às suas necessidades, agradecemos que preencha o seguinte formulário inicial.',
    field: null
  },
  {
    title: '1. Nome da empresa',
    desc: '',
    field: { type: 'text', name: 'empresa', placeholder: 'Nome da empresa', required: true }
  },
  {
    title: '2. Forma jurídica',
    desc: 'ex: Empresário em nome individual, Sociedade Unipessoal, Lda, etc.',
    field: { type: 'text', name: 'juridica', placeholder: 'Forma jurídica', required: false }
  },
  {
    title: '3. Área de atividade/setor',
    desc: '',
    field: { type: 'text', name: 'area', placeholder: 'Área de atividade/setor', required: false }
  },
  {
    title: '4. Número de sócios',
    desc: '',
    field: { type: 'number', name: 'socios', placeholder: 'Número de sócios', min: 1, required: false }
  },
  {
    title: '5. Número de funcionários (incluindo os sócios)',
    desc: '',
    field: { type: 'number', name: 'funcionarios', placeholder: 'Número de funcionários', min: 1, required: false }
  },
  {
    title: '6. Tem contabilidade organizada ou regime simplificado?',
    desc: '',
    field: { type: 'text', name: 'contabilidade', placeholder: '', required: false }
  },
  {
    title: '7. Valor médio mensal de vendas (faturação)',
    desc: '',
    field: { type: 'text', name: 'vendas', placeholder: '', required: false }
  },
  {
    title: '8. Valor médio mensal de compras/despesas fixas',
    desc: '',
    field: { type: 'text', name: 'despesas', placeholder: '', required: false }
  },
  {
    title: '9. Utiliza algum software de faturação? Qual?',
    desc: '',
    field: { type: 'text', name: 'software', placeholder: '', required: false }
  },
  {
    title: '10. Tem IVA trimestral ou mensal?',
    desc: '',
    field: { type: 'text', name: 'iva', placeholder: '', required: false }
  },
  {
    title: '11. Tem atividade internacional (ex: exportações, importações)?',
    desc: '',
    field: { type: 'text', name: 'internacional', placeholder: '', required: false }
  },
  {
    title: '12. Que tipo de apoio procura?',
    desc: '',
    field: { type: 'checkboxes', name: 'apoio', options: [
      'Contabilidade geral',
      'Apoio fiscal e declarações',
      'Consultoria financeira',
      'Reestruturação de negócio',
      'Outro (especifique)'
    ], outro: true }
  },
  {
    title: 'Objetivo',
    desc: 'Este questionário permite à TSL analisar a carga de trabalho, o tipo de negócio e propor um serviço mais adequado, evitando sub ou sobrevalorização.',
    field: null
  }
];
let rastreamentoStep = 0;
let rastreamentoData = {};

function renderRastreamentoStep() {
  if (!rastreamentoStepper) return;
  rastreamentoStepper.innerHTML = '';
  const lang = localStorage.getItem('site-lang') || 'pt';
  const dict = translations[lang] || translations['pt'];
  const step = rastreamentoSteps[rastreamentoStep];
  const stepDiv = document.createElement('div');
  stepDiv.className = 'rastreamento-step-anim';
  // Título
  if (step.title) {
    const h = document.createElement('div');
    h.className = 'rastreamento-step-title';
    const titleKey = `rastreamento-step-${rastreamentoStep}-title`;
    h.textContent = dict[titleKey] || step.title;
    stepDiv.appendChild(h);
  }
  // Descrição
  if (step.desc) {
    const d = document.createElement('div');
    d.className = 'rastreamento-step-desc';
    const descKey = `rastreamento-step-${rastreamentoStep}-desc`;
    d.textContent = dict[descKey] || step.desc;
    stepDiv.appendChild(d);
  }
  // Campo
  if (step.field) {
    if (step.field.type === 'checkboxes') {
      const group = document.createElement('div');
      group.style.marginBottom = '1.1rem';
      group.className = 'checkbox-group';
      let outroCheckbox = null;
      let outroInput = null;
      step.field.options.forEach((opt, idx) => {
        const item = document.createElement('div');
        item.className = 'checkbox-item';
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.justifyContent = 'space-between';
        item.style.width = '100%';
        item.style.gap = '1rem';
        item.style.marginBottom = '0.7rem';

        const label = document.createElement('label');
        label.style.flex = '1';
        label.style.textAlign = 'left';
        label.style.margin = '0';
        label.style.fontWeight = '500';
        label.style.color = 'var(--dark-color)';
        label.style.whiteSpace = 'normal';
        label.style.wordBreak = 'break-word';
        label.style.lineHeight = '1.4';
        label.style.cursor = 'pointer';
        const optKey = `rastreamento-step-${rastreamentoStep}-opt-${idx}`;
        label.textContent = dict[optKey] || opt;

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = step.field.name;
        input.value = dict[optKey] || opt;
        input.style.accentColor = 'var(--primary-color)';
        input.style.minWidth = '20px';
        input.style.width = '20px';
        input.style.height = '20px';
        input.style.marginLeft = '0';
        input.style.marginRight = '0';
        input.style.cursor = 'pointer';
        input.style.alignSelf = 'center';
        input.style.transition = 'box-shadow 0.2s, border 0.2s';
        input.style.borderRadius = '4px';
        input.style.border = '1.5px solid #b2dfdb';

        item.appendChild(label);
        item.appendChild(input);
        group.appendChild(item);
        if ((dict[optKey] || opt).toLowerCase().includes('outro') || (dict[optKey] || opt).toLowerCase().includes('other') || (dict[optKey] || opt).toLowerCase().includes('sonstiges')) {
          outroCheckbox = input;
        }
      });
      if (step.field.outro) {
        outroInput = document.createElement('input');
        outroInput.type = 'text';
        outroInput.name = 'apoio_outro';
        outroInput.placeholder = dict['rastreamento-step-12-outro-placeholder'] || 'Especifique...';
        outroInput.style.marginTop = '0.2rem';
        outroInput.style.width = '100%';
        outroInput.style.display = 'none';
        group.appendChild(outroInput);
        if (outroCheckbox) {
          outroCheckbox.addEventListener('change', function() {
            outroInput.style.display = outroCheckbox.checked ? 'block' : 'none';
            if (!outroCheckbox.checked) outroInput.value = '';
          });
        }
      }
      stepDiv.appendChild(group);
    } else {
      const input = document.createElement('input');
      input.type = step.field.type;
      input.name = step.field.name;
      // Placeholder dinâmico
      const phKey = `rastreamento-step-${rastreamentoStep}-placeholder`;
      input.placeholder = dict[phKey] || step.field.placeholder || '';
      if (step.field.min) input.min = step.field.min;
      if (step.field.required) input.required = true;
      input.value = rastreamentoData[step.field.name] || '';
      stepDiv.appendChild(input);
    }
  }
  // Navegação
  const btns = document.createElement('div');
  btns.className = 'rastreamento-step-btns';
  if (rastreamentoStep > 0) {
    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'prev-btn';
    prev.textContent = dict['rastreamento-btn-prev'] || 'Anterior';
    prev.onclick = () => {
      rastreamentoStep--;
      renderRastreamentoStep();
      updateProgressBar();
    };
    btns.appendChild(prev);
  }
  if (rastreamentoStep < rastreamentoSteps.length - 1) {
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'next-btn';
    next.textContent = dict['rastreamento-btn-next'] || 'Próximo';
    next.onclick = () => {
      // Validação simples
      if (step.field && step.field.required) {
        const input = rastreamentoStepper.querySelector('input');
        if (!input.value.trim()) {
          input.style.border = '1.5px solid #e74c3c';
          input.focus();
          return;
        }
      }
      // Salvar valor
      if (step.field) {
        if (step.field.type === 'checkboxes') {
          rastreamentoData[step.field.name] = Array.from(rastreamentoStepper.querySelectorAll('input[type=checkbox]:checked')).map(i=>i.value);
          rastreamentoData['apoio_outro'] = rastreamentoStepper.querySelector('input[name=apoio_outro]')?.value || '';
        } else {
          rastreamentoData[step.field.name] = rastreamentoStepper.querySelector('input').value;
        }
      }
      rastreamentoStep++;
      renderRastreamentoStep();
      updateProgressBar();
    };
    btns.appendChild(next);
  } else {
    const submit = document.createElement('button');
    submit.type = 'button';
    submit.className = 'submit-btn';
    submit.textContent = dict['rastreamento-btn-submit'] || 'Submeter';
    submit.onclick = () => {
      // Salvar último valor
      const lastStep = rastreamentoSteps[rastreamentoStep];
      if (lastStep.field) {
        if (lastStep.field.type === 'checkboxes') {
          rastreamentoData[lastStep.field.name] = Array.from(rastreamentoStepper.querySelectorAll('input[type=checkbox]:checked')).map(i=>i.value);
          rastreamentoData['apoio_outro'] = rastreamentoStepper.querySelector('input[name=apoio_outro]')?.value || '';
        } else {
          rastreamentoData[lastStep.field.name] = rastreamentoStepper.querySelector('input').value;
        }
      }
      rastreamentoModal.style.display = 'none';
      document.body.style.overflow = '';
      rastreamentoStep = 0;
      rastreamentoData = {};
      renderRastreamentoStep();
      updateProgressBar();
      rastreamentoPopup.style.display = 'flex';
    };
    btns.appendChild(submit);
  }
  stepDiv.appendChild(btns);
  rastreamentoStepper.appendChild(stepDiv);
}
function updateProgressBar() {
  if (!rastreamentoProgressBar) return;
  const percent = Math.round((rastreamentoStep) / (rastreamentoSteps.length-1) * 100);
  rastreamentoProgressBar.style.width = percent + '%';
}
if (startJourneyBtn && rastreamentoModal) {
  startJourneyBtn.addEventListener('click', function(e) {
    e.preventDefault();
    rastreamentoModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    rastreamentoStep = 0;
    rastreamentoData = {};
    renderRastreamentoStep();
    updateProgressBar();
  });
}
if (closeRastreamentoModal && rastreamentoModal) {
  closeRastreamentoModal.addEventListener('click', function() {
    rastreamentoModal.style.display = 'none';
    document.body.style.overflow = '';
  });
}
if (rastreamentoModal) {
  rastreamentoModal.addEventListener('click', function(e) {
    if (e.target === rastreamentoModal) {
      rastreamentoModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
}
if (closeRastreamentoPopup && rastreamentoPopup) {
  closeRastreamentoPopup.addEventListener('click', function() {
    rastreamentoPopup.style.display = 'none';
  });
}

// === MULTILINGUAL SUPPORT ===
const translations = {
  pt: {
    'nav-inicio': 'Início',
    'nav-servicos': 'Serviços',
    'nav-sobre': 'Sobre',
    'nav-visao': 'Visão',
    'nav-valores': 'Valores',
    'nav-contacto': 'Contacto',
    'nav-faq': 'FAQ',
    'nav-newsletter': 'Newsletter',
    'cta-transformacao': 'Inicie a Sua Transformação',
    'hero-title': 'A transformar vidas e negócios',
    'hero-subtitle': 'De mãos dadas com o seu crescimento rumo ao sucesso sustentável',
    'servicos-title': 'Os Nossos Serviços',
    'sobre-title': 'Sobre Nós',
    'visao-title': 'A Nossa Visão',
    'valores-title': 'Os Nossos Valores',
    'contacto-title': 'Contacte-nos',
    'servico-negocio-title': 'Negócio',
    'servico-negocio-1': 'Desenvolvimento de ideias e modelos de negócio',
    'servico-negocio-2': 'Abertura de empresas',
    'servico-negocio-3': 'Estratégia de crescimento e investimento',
    'servico-financas-title': 'Finanças e Contabilidade',
    'servico-financas-1': 'Contabilidade e fiscalidade',
    'servico-financas-2': 'Consultoria financeira e controlo de gestão',
    'servico-financas-3': 'Finanças e investimentos pessoais e empresariais',
    'servico-marketing-title': 'Marketing e Imagem',
    'servico-marketing-1': 'Plano e estratégia de marketing',
    'servico-marketing-2': 'Marketing digital e branding',
    'servico-marketing-3': 'Gestão de redes sociais',
    'servico-operacoes-title': 'Operações e Processos',
    'servico-operacoes-1': 'Mapeamento e optimização de processos',
    'servico-operacoes-2': 'Gestão da qualidade e implementação de sistemas',
    'servico-operacoes-3': 'Gestão de projetos e melhoria contínua',
    'servico-sustentabilidade-title': 'Sustentabilidade e ESG',
    'servico-sustentabilidade-1': 'Diagnóstico ESG e matriz de materialidade',
    'servico-sustentabilidade-2': 'Desenvolvimento e implementação de estratégias ESG',
    'servico-sustentabilidade-3': 'Elaboração de relatórios de sustentabilidade segundo padrões internacionais (GRI, ABNT PR 2030-ESG)',
    'valor-sabedoria-title': 'Sabedoria com Propósito',
    'valor-sabedoria-desc': 'Unimos sabedoria antiga como os princípios do Rei Salomão, experiência profissional e formação académica para decisões estratégicas com propósito, integridade, alta performance e crescimento sustentável.',
    'valor-parceria-title': 'Parceria que Transforma',
    'valor-parceria-desc': 'Caminhamos de mãos dadas com os nossos clientes, com proximidade real e compromisso genuíno com os seus resultados. Somos parceiros de confiança que acreditam no poder da relação humana para gerar transformação duradoura.',
    'valor-conhecimento-title': 'Conhecimento em Movimento',
    'valor-conhecimento-desc': 'Transformamos conhecimento em ação, com soluções práticas, simples e acessíveis. Comunicamos com clareza, falamos a linguagem dos nossos clientes e entregamos ferramentas que fazem diferença no dia a dia.',
    'valor-crescimento-title': 'Crescimento Sustentável',
    'valor-crescimento-desc': 'Trabalhamos para que cada cliente evolua de forma estruturada e duradoura. Queremos mais do que sucesso rápido — buscamos crescimento inteligente, responsável e alinhado com o futuro que desejam construir.',
    'valor-impacto-title': 'Impacto com Valor',
    'valor-impacto-desc': 'Acreditamos na força da transformação económica e social. Cada ação nossa é orientada para gerar valor real: nos negócios, nas famílias e na sociedade. O nosso sucesso é medido pelo impacto positivo que deixamos juntos.',
    'form-nome-placeholder': 'Nome completo',
    'form-email-placeholder': 'Email',
    'form-tel-placeholder': 'Telemóvel',
    'form-servico-placeholder': 'Selecione o serviço',
    'form-servico-1': '1. Estratégia e Criação de Negócio',
    'form-servico-2': '2. Finanças e Contabilidade',
    'form-servico-3': '3. Marketing e Imagem',
    'form-servico-4': '4. Operações e Processos',
    'form-servico-5': '5. Sustentabilidade e ESG',
    'form-mensagem-placeholder': 'Mensagem',
    'form-enviar': 'Enviar mensagem',
    'footer-direitos': '© 2024 TSL Parceiros. Todos os direitos reservados.',
    'hero-icon-1': 'Crescimento Acelerado',
    'hero-icon-2': 'Apoio Personalizado',
    'hero-icon-3': 'Resultados Sustentáveis',
    'hero-sabedoria': 'Sabedoria',
    'hero-parceria': 'Parceria',
    'hero-conhecimento': 'Conhecimento',
    'hero-crescimento': 'Crescimento',
    'hero-impacto': 'Impacto',
    'sobre-missao': 'A TSL Parceiros tem como missão promover a transformação financeira de indivíduos e empresas, através de soluções integradas de consultoria, educação financeira e reestruturação estratégica. Atuamos com foco na capacitação, sustentabilidade e crescimento, apoiando os nossos clientes na construção de bases sólidas para decisões eficazes e duradouras.',
    'sobre-experiencia': 'Combinamos experiência em gestão financeira, rigor técnico e princípios orientadores inspirados na alta performance, disciplina desportiva e sabedoria bíblica, para gerar impacto real e mensurável. A nossa abordagem é personalizada, prática e orientada para resultados, assegurando um acompanhamento de proximidade e confiança ao longo de todo o ciclo de desenvolvimento dos nossos parceiros.',
    'sobre-parceiros': 'Somos mais do que consultores: somos parceiros de jornada, que acreditam que cada pessoa e cada negócio tem potencial para se tornar uma referência com base sólida, mentalidade vencedora e finanças saudáveis.',
    'feature-metodologia': 'Metodologia Comprovada',
    'feature-equipa': 'Equipa Especializada',
    'feature-resultados': 'Resultados Garantidos',
    'visao-desc': 'Ser, até 2030, a referência global em consultoria para indivíduos e empresas, reconhecida pela capacidade de transformar realidades financeiras com proximidade, rigor e propósito. Ambicionamos acelerar o crescimento sustentável de quem começa pequeno, através de soluções criativas, personalizadas e ancoradas em valores sólidos, promovendo impacto económico, social e espiritual duradouro.',
    'footer-redes': 'Redes Sociais',
    'whatsapp-fale': 'Fale connosco',
    'rastreamento-step-0-title': 'Bem-vindo!',
    'rastreamento-step-0-desc': 'Obrigado por contactar a TSL Parceiros! Para que possamos preparar uma proposta adequada às suas necessidades, agradecemos que preencha o seguinte formulário inicial.',
    'rastreamento-step-1-title': '1. Nome da empresa',
    'rastreamento-step-1-placeholder': 'Nome da empresa',
    'rastreamento-step-2-title': '2. Forma jurídica',
    'rastreamento-step-2-desc': 'ex: Empresário em nome individual, Sociedade Unipessoal, Lda, etc.',
    'rastreamento-step-2-placeholder': 'Forma jurídica',
    'rastreamento-step-3-title': '3. Área de atividade/setor',
    'rastreamento-step-3-placeholder': 'Área de atividade/setor',
    'rastreamento-step-4-title': '4. Número de sócios',
    'rastreamento-step-4-placeholder': 'Número de sócios',
    'rastreamento-step-5-title': '5. Número de funcionários (incluindo os sócios)',
    'rastreamento-step-5-placeholder': 'Número de funcionários',
    'rastreamento-step-6-title': '6. Tem contabilidade organizada ou regime simplificado?',
    'rastreamento-step-7-title': '7. Valor médio mensal de vendas (faturação)',
    'rastreamento-step-8-title': '8. Valor médio mensal de compras/despesas fixas',
    'rastreamento-step-9-title': '9. Utiliza algum software de faturação? Qual?',
    'rastreamento-step-10-title': '10. Tem IVA trimestral ou mensal?',
    'rastreamento-step-11-title': '11. Tem atividade internacional (ex: exportações, importações)?',
    'rastreamento-step-12-title': '12. Que tipo de apoio procura?',
    'rastreamento-step-12-opt-0': 'Contabilidade geral',
    'rastreamento-step-12-opt-1': 'Apoio fiscal e declarações',
    'rastreamento-step-12-opt-2': 'Consultoria financeira',
    'rastreamento-step-12-opt-3': 'Reestruturação de negócio',
    'rastreamento-step-12-opt-4': 'Outro (especifique)',
    'rastreamento-step-12-outro-placeholder': 'Especifique...',
    'rastreamento-step-13-title': 'Objetivo',
    'rastreamento-step-13-desc': 'Este questionário permite à TSL analisar a carga de trabalho, o tipo de negócio e propor um serviço mais adequado, evitando sub ou sobrevalorização.',
    'rastreamento-btn-prev': 'Anterior',
    'rastreamento-btn-next': 'Próximo',
    'rastreamento-btn-submit': 'Submeter',
    'site-title': 'TSL Parceiros',
    'meta-description': 'Consultoria, educação financeira e soluções para empresas e indivíduos.',
    'burger-menu-label': 'Menu',
    'close-modal': 'Fechar',
  },
  en: {
    'nav-inicio': 'Home',
    'nav-servicos': 'Services',
    'nav-sobre': 'About',
    'nav-visao': 'Vision',
    'nav-valores': 'Values',
    'nav-contacto': 'Contact',
    'nav-faq': 'FAQ',
    'nav-newsletter': 'Newsletter',
    'cta-transformacao': 'Start Your Transformation',
    'hero-title': 'Transforming lives and businesses',
    'hero-subtitle': 'Hand in hand with your growth towards sustainable success',
    'servicos-title': 'Our Services',
    'sobre-title': 'About Us',
    'visao-title': 'Our Vision',
    'valores-title': 'Our Values',
    'contacto-title': 'Contact Us',
    'servico-negocio-title': 'Business',
    'servico-negocio-1': 'Business idea and model development',
    'servico-negocio-2': 'Company formation',
    'servico-negocio-3': 'Growth and investment strategy',
    'servico-financas-title': 'Finance and Accounting',
    'servico-financas-1': 'Accounting and taxation',
    'servico-financas-2': 'Financial consulting and management control',
    'servico-financas-3': 'Personal and business finance and investments',
    'servico-marketing-title': 'Marketing and Image',
    'servico-marketing-1': 'Marketing plan and strategy',
    'servico-marketing-2': 'Digital marketing and branding',
    'servico-marketing-3': 'Social media management',
    'servico-operacoes-title': 'Operations and Processes',
    'servico-operacoes-1': 'Process mapping and optimization',
    'servico-operacoes-2': 'Quality management and systems implementation',
    'servico-operacoes-3': 'Project management and continuous improvement',
    'servico-sustentabilidade-title': 'Sustainability and ESG',
    'servico-sustentabilidade-1': 'ESG diagnosis and materiality matrix',
    'servico-sustentabilidade-2': 'Development and implementation of ESG strategies',
    'servico-sustentabilidade-3': 'Preparation of sustainability reports according to international standards (GRI, ABNT PR 2030-ESG)',
    'valor-sabedoria-title': 'Wisdom with Purpose',
    'valor-sabedoria-desc': 'We combine ancient wisdom such as King Solomon’s principles, professional experience and academic training for strategic decisions with purpose, integrity, high performance and sustainable growth.',
    'valor-parceria-title': 'Partnership that Transforms',
    'valor-parceria-desc': 'We walk hand in hand with our clients, with real proximity and genuine commitment to their results. We are trusted partners who believe in the power of human relationships to generate lasting transformation.',
    'valor-conhecimento-title': 'Knowledge in Motion',
    'valor-conhecimento-desc': 'We turn knowledge into action, with practical, simple and accessible solutions. We communicate clearly, speak our clients’ language and deliver tools that make a difference in everyday life.',
    'valor-crescimento-title': 'Sustainable Growth',
    'valor-crescimento-desc': 'We work so that each client evolves in a structured and lasting way. We want more than quick success — we seek intelligent, responsible growth aligned with the future they want to build.',
    'valor-impacto-title': 'Impact with Value',
    'valor-impacto-desc': 'We believe in the power of economic and social transformation. Every action we take is aimed at generating real value: in business, in families and in society. Our success is measured by the positive impact we leave together.',
    'form-nome-placeholder': 'Full name',
    'form-email-placeholder': 'Email',
    'form-tel-placeholder': 'Phone',
    'form-servico-placeholder': 'Select service',
    'form-servico-1': '1. Business Strategy and Creation',
    'form-servico-2': '2. Finance and Accounting',
    'form-servico-3': '3. Marketing and Image',
    'form-servico-4': '4. Operations and Processes',
    'form-servico-5': '5. Sustainability and ESG',
    'form-mensagem-placeholder': 'Message',
    'form-enviar': 'Send message',
    'footer-direitos': '© 2024 TSL Partners. All rights reserved.',
    'hero-icon-1': 'Accelerated Growth',
    'hero-icon-2': 'Personalized Support',
    'hero-icon-3': 'Sustainable Results',
    'hero-sabedoria': 'Wisdom',
    'hero-parceria': 'Partnership',
    'hero-conhecimento': 'Knowledge',
    'hero-crescimento': 'Growth',
    'hero-impacto': 'Impact',
    'sobre-missao': 'TSL Partners aims to promote the financial transformation of individuals and companies through integrated consulting, financial education, and strategic restructuring solutions. We focus on empowerment, sustainability, and growth, supporting our clients in building solid foundations for effective and lasting decisions.',
    'sobre-experiencia': 'We combine experience in financial management, technical rigor, and guiding principles inspired by high performance, sports discipline, and biblical wisdom to generate real and measurable impact. Our approach is personalized, practical, and results-oriented, ensuring close and trustworthy support throughout our partners’ development cycle.',
    'sobre-parceiros': 'We are more than consultants: we are journey partners who believe that every person and every business has the potential to become a reference with a solid foundation, a winning mindset, and healthy finances.',
    'feature-metodologia': 'Proven Methodology',
    'feature-equipa': 'Specialized Team',
    'feature-resultados': 'Guaranteed Results',
    'visao-desc': 'By 2030, to be the global reference in consulting for individuals and companies, recognized for the ability to transform financial realities with proximity, rigor, and purpose. We aim to accelerate the sustainable growth of those who start small, through creative, personalized solutions anchored in solid values, promoting lasting economic, social, and spiritual impact.',
    'footer-redes': 'Social Networks',
    'whatsapp-fale': 'Contact us',
    'rastreamento-step-0-title': 'Welcome!',
    'rastreamento-step-0-desc': 'Thank you for contacting TSL Partners! To prepare a suitable proposal for your needs, please fill out the following initial form.',
    'rastreamento-step-1-title': '1. Company name',
    'rastreamento-step-1-placeholder': 'Company name',
    'rastreamento-step-2-title': '2. Legal form',
    'rastreamento-step-2-desc': 'e.g.: Sole proprietorship, Single-member LLC, etc.',
    'rastreamento-step-2-placeholder': 'Legal form',
    'rastreamento-step-3-title': '3. Business area/sector',
    'rastreamento-step-3-placeholder': 'Business area/sector',
    'rastreamento-step-4-title': '4. Number of partners',
    'rastreamento-step-4-placeholder': 'Number of partners',
    'rastreamento-step-5-title': '5. Number of employees (including partners)',
    'rastreamento-step-5-placeholder': 'Number of employees',
    'rastreamento-step-6-title': '6. Do you have organized accounting or simplified regime?',
    'rastreamento-step-7-title': '7. Average monthly sales (revenue)',
    'rastreamento-step-8-title': '8. Average monthly purchases/fixed expenses',
    'rastreamento-step-9-title': '9. Do you use any invoicing software? Which?',
    'rastreamento-step-10-title': '10. Do you have quarterly or monthly VAT?',
    'rastreamento-step-11-title': '11. Do you have international activity (e.g.: exports, imports)?',
    'rastreamento-step-12-title': '12. What type of support are you looking for?',
    'rastreamento-step-12-opt-0': 'General accounting',
    'rastreamento-step-12-opt-1': 'Tax support and declarations',
    'rastreamento-step-12-opt-2': 'Financial consulting',
    'rastreamento-step-12-opt-3': 'Business restructuring',
    'rastreamento-step-12-opt-4': 'Other (specify)',
    'rastreamento-step-12-outro-placeholder': 'Specify...',
    'rastreamento-step-13-title': 'Objective',
    'rastreamento-step-13-desc': 'This questionnaire allows TSL to analyze the workload, business type, and propose a more suitable service, avoiding under or overvaluation.',
    'rastreamento-btn-prev': 'Previous',
    'rastreamento-btn-next': 'Next',
    'rastreamento-btn-submit': 'Submit',
    'site-title': 'TSL Partners',
    'meta-description': 'Consulting, financial education and solutions for companies and individuals.',
    'burger-menu-label': 'Menu',
    'close-modal': 'Close',
  },
  de: {
    'nav-inicio': 'Startseite',
    'nav-servicos': 'Dienstleistungen',
    'nav-sobre': 'Über Uns',
    'nav-visao': 'Vision',
    'nav-valores': 'Werte',
    'nav-contacto': 'Kontakt',
    'nav-faq': 'FAQ',
    'nav-newsletter': 'Newsletter',
    'cta-transformacao': 'Starten Sie Ihre Transformation',
    'hero-title': 'Wir transformieren Leben und Unternehmen',
    'hero-subtitle': 'Hand in Hand mit Ihrem Wachstum zum nachhaltigen Erfolg',
    'servicos-title': 'Unsere Dienstleistungen',
    'sobre-title': 'Über Uns',
    'visao-title': 'Unsere Vision',
    'valores-title': 'Unsere Werte',
    'contacto-title': 'Kontaktieren Sie uns',
    'servico-negocio-title': 'Geschäft',
    'servico-negocio-1': 'Entwicklung von Geschäftsideen und -modellen',
    'servico-negocio-2': 'Firmengründung',
    'servico-negocio-3': 'Wachstums- und Investitionsstrategie',
    'servico-financas-title': 'Finanzen und Buchhaltung',
    'servico-financas-1': 'Buchhaltung und Steuern',
    'servico-financas-2': 'Finanzberatung und Controlling',
    'servico-financas-3': 'Private und geschäftliche Finanzen und Investitionen',
    'servico-marketing-title': 'Marketing und Image',
    'servico-marketing-1': 'Marketingplan und Strategie',
    'servico-marketing-2': 'Digitales Marketing und Branding',
    'servico-marketing-3': 'Social Media Management',
    'servico-operacoes-title': 'Betrieb und Prozesse',
    'servico-operacoes-1': 'Prozessabbildung und -optimierung',
    'servico-operacoes-2': 'Qualitätsmanagement und Systemimplementierung',
    'servico-operacoes-3': 'Projektmanagement und kontinuierliche Verbesserung',
    'servico-sustentabilidade-title': 'Nachhaltigkeit und ESG',
    'servico-sustentabilidade-1': 'ESG-Diagnose und Wesentlichkeitsmatrix',
    'servico-sustentabilidade-2': 'Entwicklung und Umsetzung von ESG-Strategien',
    'servico-sustentabilidade-3': 'Erstellung von Nachhaltigkeitsberichten nach internationalen Standards (GRI, ABNT PR 2030-ESG)',
    'valor-sabedoria-title': 'Weisheit mit Zweck',
    'valor-sabedoria-desc': 'Wir vereinen alte Weisheiten wie die Prinzipien von König Salomo, Berufserfahrung und akademische Ausbildung für strategische Entscheidungen mit Zweck, Integrität, hoher Leistung und nachhaltigem Wachstum.',
    'valor-parceria-title': 'Partnerschaft, die Verändert',
    'valor-parceria-desc': 'Wir gehen Hand in Hand mit unseren Kunden, mit echter Nähe und echtem Engagement für ihre Ergebnisse. Wir sind vertrauenswürdige Partner, die an die Kraft menschlicher Beziehungen glauben, um dauerhafte Veränderungen zu bewirken.',
    'valor-conhecimento-title': 'Wissen in Bewegung',
    'valor-conhecimento-desc': 'Wir verwandeln Wissen in Aktion, mit praktischen, einfachen und zugänglichen Lösungen. Wir kommunizieren klar, sprechen die Sprache unserer Kunden und liefern Werkzeuge, die im Alltag einen Unterschied machen.',
    'valor-crescimento-title': 'Nachhaltiges Wachstum',
    'valor-crescimento-desc': 'Wir arbeiten daran, dass jeder Kunde strukturiert und dauerhaft wächst. Wir wollen mehr als schnellen Erfolg — wir streben intelligentes, verantwortungsbewusstes Wachstum an, das mit der Zukunft, die sie aufbauen wollen, im Einklang steht.',
    'valor-impacto-title': 'Wirkung mit Wert',
    'valor-impacto-desc': 'Wir glauben an die Kraft der wirtschaftlichen und sozialen Transformation. Jede unserer Handlungen ist darauf ausgerichtet, echten Wert zu schaffen: in Unternehmen, Familien und der Gesellschaft. Unser Erfolg wird an der positiven Wirkung gemessen, die wir gemeinsam hinterlassen.',
    'form-nome-placeholder': 'Vollständiger Name',
    'form-email-placeholder': 'E-Mail',
    'form-tel-placeholder': 'Telefon',
    'form-servico-placeholder': 'Dienstleistung auswählen',
    'form-servico-1': '1. Strategie und Unternehmensgründung',
    'form-servico-2': '2. Finanzen und Buchhaltung',
    'form-servico-3': '3. Marketing und Image',
    'form-servico-4': '4. Betrieb und Prozesse',
    'form-servico-5': '5. Nachhaltigkeit und ESG',
    'form-mensagem-placeholder': 'Nachricht',
    'form-enviar': 'Nachricht senden',
    'footer-direitos': '© 2024 TSL Partner. Alle Rechte vorbehalten.',
    'hero-icon-1': 'Beschleunigtes Wachstum',
    'hero-icon-2': 'Individuelle Unterstützung',
    'hero-icon-3': 'Nachhaltige Ergebnisse',
    'hero-sabedoria': 'Weisheit',
    'hero-parceria': 'Partnerschaft',
    'hero-conhecimento': 'Wissen',
    'hero-crescimento': 'Wachstum',
    'hero-impacto': 'Wirkung',
    'sobre-missao': 'TSL Partner hat es sich zur Aufgabe gemacht, die finanzielle Transformation von Einzelpersonen und Unternehmen durch integrierte Beratungs-, Finanzbildungs- und strategische Restrukturierungslösungen zu fördern. Wir konzentrieren uns auf Befähigung, Nachhaltigkeit und Wachstum und unterstützen unsere Kunden beim Aufbau solider Grundlagen für effektive und dauerhafte Entscheidungen.',
    'sobre-experiencia': 'Wir kombinieren Erfahrung im Finanzmanagement, technische Strenge und Leitprinzipien, die von hoher Leistung, sportlicher Disziplin und biblischer Weisheit inspiriert sind, um echte und messbare Auswirkungen zu erzielen. Unser Ansatz ist personalisiert, praxisnah und ergebnisorientiert und gewährleistet eine enge und vertrauensvolle Betreuung während des gesamten Entwicklungszyklus unserer Partner.',
    'sobre-parceiros': 'Wir sind mehr als Berater: Wir sind Wegbegleiter, die daran glauben, dass jede Person und jedes Unternehmen das Potenzial hat, mit einer soliden Basis, einer Gewinnermentalität und gesunden Finanzen zu einer Referenz zu werden.',
    'feature-metodologia': 'Bewährte Methodik',
    'feature-equipa': 'Spezialisiertes Team',
    'feature-resultados': 'Garantierte Ergebnisse',
    'visao-desc': 'Bis 2030 wollen wir die globale Referenz in der Beratung für Einzelpersonen und Unternehmen sein, die für die Fähigkeit anerkannt ist, finanzielle Realitäten mit Nähe, Strenge und Ziel zu transformieren. Wir wollen das nachhaltige Wachstum derjenigen beschleunigen, die klein anfangen, durch kreative, personalisierte Lösungen, die auf soliden Werten basieren und nachhaltige wirtschaftliche, soziale und spirituelle Auswirkungen fördern.',
    'footer-redes': 'Soziale Netzwerke',
    'whatsapp-fale': 'Kontaktieren Sie uns',
    'rastreamento-step-0-title': 'Willkommen!',
    'rastreamento-step-0-desc': 'Vielen Dank, dass Sie TSL Partner kontaktieren! Um ein passendes Angebot für Ihre Bedürfnisse vorzubereiten, füllen Sie bitte das folgende Formular aus.',
    'rastreamento-step-1-title': '1. Firmenname',
    'rastreamento-step-1-placeholder': 'Firmenname',
    'rastreamento-step-2-title': '2. Rechtsform',
    'rastreamento-step-2-desc': 'z.B.: Einzelunternehmen, Ein-Personen-GmbH, etc.',
    'rastreamento-step-2-placeholder': 'Rechtsform',
    'rastreamento-step-3-title': '3. Tätigkeitsbereich/Sektor',
    'rastreamento-step-3-placeholder': 'Tätigkeitsbereich/Sektor',
    'rastreamento-step-4-title': '4. Anzahl der Gesellschafter',
    'rastreamento-step-4-placeholder': 'Anzahl der Gesellschafter',
    'rastreamento-step-5-title': '5. Anzahl der Mitarbeiter (einschließlich Gesellschafter)',
    'rastreamento-step-5-placeholder': 'Anzahl der Mitarbeiter',
    'rastreamento-step-6-title': '6. Haben Sie eine organisierte Buchhaltung oder ein vereinfachtes System?',
    'rastreamento-step-7-title': '7. Durchschnittlicher monatlicher Umsatz',
    'rastreamento-step-8-title': '8. Durchschnittliche monatliche Einkäufe/feste Ausgaben',
    'rastreamento-step-9-title': '9. Verwenden Sie eine Abrechnungssoftware? Welche?',
    'rastreamento-step-10-title': '10. Haben Sie vierteljährliche oder monatliche Mehrwertsteuer?',
    'rastreamento-step-11-title': '11. Haben Sie internationale Aktivitäten (z.B.: Export, Import)?',
    'rastreamento-step-12-title': '12. Welche Art von Unterstützung suchen Sie?',
    'rastreamento-step-12-opt-0': 'Allgemeine Buchhaltung',
    'rastreamento-step-12-opt-1': 'Steuerliche Unterstützung und Erklärungen',
    'rastreamento-step-12-opt-2': 'Finanzberatung',
    'rastreamento-step-12-opt-3': 'Unternehmensrestrukturierung',
    'rastreamento-step-12-opt-4': 'Sonstiges (bitte angeben)',
    'rastreamento-step-12-outro-placeholder': 'Bitte angeben...',
    'rastreamento-step-13-title': 'Ziel',
    'rastreamento-step-13-desc': 'Mit diesem Fragebogen kann TSL die Arbeitsbelastung, die Art des Unternehmens analysieren und einen geeigneteren Service vorschlagen, um Unter- oder Überbewertung zu vermeiden.',
    'rastreamento-btn-prev': 'Zurück',
    'rastreamento-btn-next': 'Weiter',
    'rastreamento-btn-submit': 'Absenden',
    'site-title': 'TSL Partner',
    'meta-description': 'Beratung, Finanzbildung und Lösungen für Unternehmen und Einzelpersonen.',
    'burger-menu-label': 'Menü',
    'close-modal': 'Schließen',
  }
};

function setLanguage(lang) {
  const dict = translations[lang] || translations['pt'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });
  // Select options
  document.querySelectorAll('option[data-i18n]').forEach(opt => {
    const key = opt.getAttribute('data-i18n');
    if (dict[key]) {
      opt.textContent = dict[key];
    }
  });
  // Atualizar <title>
  const titleEl = document.querySelector('title[data-i18n="site-title"]');
  if (titleEl && dict['site-title']) {
    titleEl.textContent = dict['site-title'];
  }
  // Atualizar <meta name="description">
  const metaDesc = document.querySelector('meta[name="description"][data-i18n="meta-description"]');
  if (metaDesc && dict['meta-description']) {
    metaDesc.setAttribute('content', dict['meta-description']);
  }
  // Atualizar aria-label do burger menu
  const burger = document.querySelector('.burger[data-i18n="burger-menu-label"]');
  if (burger && dict['burger-menu-label']) {
    burger.setAttribute('aria-label', dict['burger-menu-label']);
  }
  // Atualizar aria-label do botão de fechar modal
  const closeModalBtn = document.querySelector('#close-rastreamento-modal[data-i18n="close-modal"]');
  if (closeModalBtn && dict['close-modal']) {
    closeModalBtn.setAttribute('aria-label', dict['close-modal']);
  }
  localStorage.setItem('site-lang', lang);
}

document.addEventListener('DOMContentLoaded', function() {
  // Idioma inicial
  const savedLang = localStorage.getItem('site-lang') || 'pt';
  setLanguage(savedLang);
  // Clique nas bandeiras
  document.querySelectorAll('#language-selector img[data-lang]').forEach(flag => {
    flag.addEventListener('click', function() {
      setLanguage(this.getAttribute('data-lang'));
    });
  });
});