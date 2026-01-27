document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.task');
    const displayProgresso = document.getElementById('status-progresso');
    const btnMenu = document.getElementById('btnMenu');
    const sidebar = document.getElementById('sidebar');

    // ==========================================
    // 1. LÓGICA DE PROGRESSO (CHECKLIST)
    // ==========================================
    function calcularProgresso() {
        const total = checkboxes.length;
        const concluidos = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentagem = total > 0 ? Math.round((concluidos / total) * 100) : 0;
        
        displayProgresso.innerText = `Progresso: ${percentagem}%`;
        
        // Muda a cor para verde quando termina tudo
        if (percentagem === 100) {
            displayProgresso.style.background = "#10b981"; // Verde
            displayProgresso.style.color = "white";
        } else {
            displayProgresso.style.background = "#002E5D"; // Azul Original
            displayProgresso.style.color = "#fbbf24"; // Amarelo
        }
    }

    // Carregar progresso salvo e configurar cliques
    checkboxes.forEach((cb, index) => {
        const checkSalvo = localStorage.getItem('ufrj-2026-check-' + index);
        if (checkSalvo === 'true') cb.checked = true;

        cb.addEventListener('change', () => {
            localStorage.setItem('ufrj-2026-check-' + index, cb.checked);
            calcularProgresso();
        });
    });

    calcularProgresso();

    // ==========================================
    // 2. LÓGICA DO MENU MOBILE (ABRIR/FECHAR)
    // ==========================================
    if (btnMenu && sidebar) {
        btnMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('show');
        });

        const linksMenu = sidebar.querySelectorAll('a');
        linksMenu.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    sidebar.classList.remove('show');
                    setTimeout(() => sidebar.classList.add('hidden'), 300);
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth < 768 && 
                !sidebar.contains(e.target) && 
                !btnMenu.contains(e.target) &&
                sidebar.classList.contains('show')) {
                
                sidebar.classList.remove('show');
                setTimeout(() => sidebar.classList.add('hidden'), 300);
            }
        });
    }
});
