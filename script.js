document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.task');
    const displayProgresso = document.getElementById('status-progresso');

    /**
     * Calcula a porcentagem de tarefas concluídas e atualiza a interface
     */
    function calcularProgresso() {
        const total = checkboxes.length;
        const concluidos = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentagem = total > 0 ? Math.round((concluidos / total) * 100) : 0;
        
        displayProgresso.innerText = `Progresso: ${percentagem}%`;

        // Feedback visual: Verde se completo (100%), Laranja se em andamento
        if (percentagem === 100) {
            displayProgresso.style.color = "#10b981"; // Verde esmeralda
        } else {
            displayProgresso.style.color = "#FF8C00"; // Laranja DarkOrange
        }
    }

    /**
     * Inicialização e Persistência (LocalStorage)
     */
    checkboxes.forEach((cb, index) => {
        // Recupera o estado salvo no navegador usando o índice como chave
        const checkSalvo = localStorage.getItem('ufrj-selecon-' + index);
        
        if (checkSalvo === 'true') {
            cb.checked = true;
        }

        // Salva sempre que o usuário clicar e atualiza o progresso
        cb.addEventListener('change', () => {
            localStorage.setItem('ufrj-selecon-' + index, cb.checked);
            calcularProgresso();
        });
    });

    // Executa o cálculo ao carregar a página
    calcularProgresso();
});