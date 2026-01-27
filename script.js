document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.task');
    const displayProgresso = document.getElementById('status-progresso');

    function calcularProgresso() {
        const total = checkboxes.length;
        const concluidos = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentagem = total > 0 ? Math.round((concluidos / total) * 100) : 0;
        
        displayProgresso.innerText = `Progresso: ${percentagem}%`;

        if (percentagem === 100) {
            displayProgresso.style.color = "#10b981";
        } else {
            displayProgresso.style.color = "#FF8C00";
        }
    }

    checkboxes.forEach((cb, index) => {
        const checkSalvo = localStorage.getItem('ufrj-selecon-' + index);
        if (checkSalvo === 'true') {
            cb.checked = true;
        }

        cb.addEventListener('change', () => {
            localStorage.setItem('ufrj-selecon-' + index, cb.checked);
            calcularProgresso();
        });
    });

    calcularProgresso();

    // --- ADIÇÃO: LÓGICA DO MENU MOBILE ---
    const btnMenu = document.getElementById('btnMenu');
    const sidebar = document.getElementById('sidebar');

    if(btnMenu && sidebar) {
        btnMenu.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('flex');
        });

        // Fecha o menu ao clicar em qualquer link (no mobile)
        const navLinks = sidebar.querySelectorAll('.nav-item');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    sidebar.classList.add('hidden');
                    sidebar.classList.remove('flex');
                }
            });
        });
    }
});
