/**
 * BARBEARIA BLACK - JAVASCRIPT DE INTERATIVIDADE E COMPORTAMENTO
 * Funcionalidades:
 * - Menu Mobile Responsivo (Abrir/Fechar com transições fluidas)
 * - Filtro Dinâmico de Categorias de Serviços
 * - Modal Interativo de Agendamento Online com Cálculo e Integração WhatsApp
 * - Notificações Toast Modernas
 * - Rastreamento e Logs de Interações (Console Mock)
 * - Navbar com background dinâmico ao rolar a página
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c💈 BARBEARIA BLACK - Sistema Inicializado com Sucesso!', 'color: #D4AF37; font-size: 14px; font-weight: bold;');

    // ==========================================
    // 1. MENU MOBILE (HAMBURGUER E DRAWER)
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
    const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
        if (!mobileMenuDrawer || !mobileMenuBackdrop) return;
        mobileMenuDrawer.classList.remove('translate-x-full');
        mobileMenuBackdrop.classList.remove('hidden');
        setTimeout(() => {
            mobileMenuBackdrop.classList.add('opacity-100');
        }, 10);
        document.body.style.overflow = 'hidden';
        console.log('📱 Menu Mobile aberto.');
    }

    function closeMobileMenu() {
        if (!mobileMenuDrawer || !mobileMenuBackdrop) return;
        mobileMenuDrawer.classList.add('translate-x-full');
        mobileMenuBackdrop.classList.remove('opacity-100');
        setTimeout(() => {
            mobileMenuBackdrop.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
        console.log('📱 Menu Mobile fechado.');
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
    }
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // ==========================================
    // 2. NAVBAR ADAPTATIVA NO SCROLL
    // ==========================================
    const mainHeader = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (!mainHeader) return;
        if (window.scrollY > 50) {
            mainHeader.classList.add('shadow-xl', 'bg-dark-900/95');
            mainHeader.classList.remove('bg-dark-900/80');
        } else {
            mainHeader.classList.remove('shadow-xl', 'bg-dark-900/95');
            mainHeader.classList.add('bg-dark-900/80');
        }
    });

    // ==========================================
    // 3. FILTRO DE SERVIÇOS POR CATEGORIA
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Atualizar classes ativas dos botões
            filterButtons.forEach(b => {
                b.classList.remove('bg-gold-500', 'text-black', 'font-semibold', 'shadow-lg');
                b.classList.add('bg-dark-800', 'text-gray-300', 'border-white/10');
            });
            btn.classList.remove('bg-dark-800', 'text-gray-300', 'border-white/10');
            btn.classList.add('bg-gold-500', 'text-black', 'font-semibold', 'shadow-lg');

            // Filtrar cards com animação suave
            serviceCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });

            console.log(`✂️ Categoria de serviços selecionada: [${category.toUpperCase()}]`);
        });
    });

    // ==========================================
    // 4. MODAL INTERATIVO DE AGENDAMENTO
    // ==========================================
    const bookingModal = document.getElementById('booking-modal');
    const bookingBackdrop = document.getElementById('booking-modal-backdrop');
    const bookingCloseBtn = document.getElementById('booking-modal-close');
    const openBookingBtns = document.querySelectorAll('.btn-open-booking');
    const bookingForm = document.getElementById('booking-form');
    const serviceSelect = document.getElementById('booking-service');
    const barberSelect = document.getElementById('booking-barber');
    const dateInput = document.getElementById('booking-date');
    const timeSelect = document.getElementById('booking-time');
    const summaryPrice = document.getElementById('booking-summary-price');

    // Definir data mínima como hoje
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }

    // Mapa de Preços para Atualização Dinâmica
    const servicePrices = {
        'corte-classico': 'R$ 60,00',
        'fade-degrade': 'R$ 70,00',
        'platinado-grisalhos': 'R$ 85,00',
        'barboterapia-toalha': 'R$ 55,00',
        'modelagem-barba': 'R$ 45,00',
        'combo-black-classic': 'R$ 110,00',
        'combo-vip-don': 'R$ 145,00',
        'combo-pai-filho': 'R$ 120,00'
    };

    function updateSummaryPrice() {
        if (!serviceSelect || !summaryPrice) return;
        const selectedVal = serviceSelect.value;
        if (servicePrices[selectedVal]) {
            summaryPrice.textContent = servicePrices[selectedVal];
        } else {
            summaryPrice.textContent = 'A partir de R$ 45,00';
        }
    }

    if (serviceSelect) {
        serviceSelect.addEventListener('change', updateSummaryPrice);
    }

    function openModal(preSelectedService = null) {
        if (!bookingModal) return;
        
        if (preSelectedService && serviceSelect) {
            serviceSelect.value = preSelectedService;
            updateSummaryPrice();
        }

        bookingModal.classList.remove('hidden');
        setTimeout(() => {
            bookingModal.classList.remove('opacity-0', 'pointer-events-none');
            const modalContent = bookingModal.querySelector('.modal-content-box');
            if (modalContent) {
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }
        }, 10);
        document.body.style.overflow = 'hidden';
        console.log('📅 Modal de Agendamento Aberto.');
    }

    function closeModal() {
        if (!bookingModal) return;
        const modalContent = bookingModal.querySelector('.modal-content-box');
        if (modalContent) {
            modalContent.classList.add('scale-95');
            modalContent.classList.remove('scale-100');
        }
        bookingModal.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            bookingModal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 250);
        console.log('📅 Modal de Agendamento Fechado.');
    }

    openBookingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceKey = btn.getAttribute('data-service-key');
            openModal(serviceKey);
        });
    });

    if (bookingCloseBtn) {
        bookingCloseBtn.addEventListener('click', closeModal);
    }
    if (bookingBackdrop) {
        bookingBackdrop.addEventListener('click', closeModal);
    }

    // Fechar com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingModal && !bookingModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // ==========================================
    // 5. ENVIO DO FORMULÁRIO DE AGENDAMENTO
    // ==========================================
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('booking-name')?.value.trim();
            const phone = document.getElementById('booking-phone')?.value.trim();
            const serviceText = serviceSelect?.options[serviceSelect.selectedIndex]?.text || '';
            const barberText = barberSelect?.options[barberSelect.selectedIndex]?.text || 'Qualquer barbeiro disponível';
            const date = dateInput?.value || '';
            const time = timeSelect?.value || '';
            const price = summaryPrice?.textContent || '';

            if (!name || !phone || !date || !time) {
                showToast('Por favor, preencha todos os campos obrigatórios!', 'error');
                return;
            }

            // Dados do Agendamento Formatados
            const bookingPayload = {
                cliente: name,
                whatsapp: phone,
                servico: serviceText,
                barbeiro: barberText,
                data: date,
                horario: time,
                valorEstimado: price,
                timestamp: new Date().toISOString()
            };

            console.log('%c✅ AGENDAMENTO REALIZADO COM SUCESSO!', 'color: #10B981; font-weight: bold; font-size: 13px;');
            console.table(bookingPayload);

            // Montar mensagem para WhatsApp
            const zapMessage = `Olá! Gostaria de confirmar meu agendamento na *Barbearia Black*:%0A%0A` +
                `👤 *Nome:* ${encodeURIComponent(name)}%0A` +
                `✂️ *Serviço:* ${encodeURIComponent(serviceText)}%0A` +
                `💈 *Profissional:* ${encodeURIComponent(barberText)}%0A` +
                `📅 *Data:* ${encodeURIComponent(date)}%0A` +
                `⏰ *Horário:* ${encodeURIComponent(time)}%0A` +
                `💵 *Valor:* ${encodeURIComponent(price)}%0A%0A` +
                `Por favor, confirmem o meu horário!`;

            const whatsappUrl = `https://wa.me/5511999998888?text=${zapMessage}`;

            // Exibir Toast de Sucesso
            showToast('Agendamento recebido! Redirecionando para o WhatsApp da barbearia...', 'success');

            // Fechar modal após 1.5s e redirecionar para o WhatsApp
            setTimeout(() => {
                closeModal();
                bookingForm.reset();
                window.open(whatsappUrl, '_blank');
            }, 1400);
        });
    }

    // ==========================================
    // 6. SISTEMA DE TOAST NOTIFICATIONS
    // ==========================================
    function showToast(message, type = 'success') {
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'fixed top-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `pointer-events-auto transform transition-all duration-300 ease-out translate-y-[-20px] opacity-0 flex items-center gap-3 p-4 rounded-xl shadow-2xl border ${
            type === 'success' 
                ? 'bg-dark-800 text-white border-gold-500/40' 
                : 'bg-red-950 text-white border-red-500/40'
        }`;

        const iconSvg = type === 'success'
            ? `<div class="w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
                 <i class="fa-solid fa-check text-sm"></i>
               </div>`
            : `<div class="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                 <i class="fa-solid fa-triangle-exclamation text-sm"></i>
               </div>`;

        toast.innerHTML = `
            ${iconSvg}
            <div class="text-sm flex-1 leading-snug">${message}</div>
        `;

        toastContainer.appendChild(toast);

        // Animação de entrada
        setTimeout(() => {
            toast.classList.remove('translate-y-[-20px]', 'opacity-0');
        }, 10);

        // Remover após 4 segundos
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-x-full');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    }

    // ==========================================
    // 7. BOTÃO FLUTUANTE DO WHATSAPP (LOG E FEEDBACK)
    // ==========================================
    const floatingZap = document.getElementById('floating-whatsapp');
    if (floatingZap) {
        floatingZap.addEventListener('click', () => {
            console.log('💬 Cliente clicou no botão flutuante de WhatsApp.');
        });
    }

    // Inicializar ícones Lucide caso a biblioteca esteja presente
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
