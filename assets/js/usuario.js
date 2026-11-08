document.addEventListener("DOMContentLoaded", async () => {

    // Elementos do HTML
    const botaoEntrar = document.getElementById("botaoEntrar");
    const areaUsuario = document.getElementById("areaUsuario");

    const nomeCliente = document.getElementById("nomeCliente");
    const emailCliente = document.getElementById("emailCliente");

    // Atualiza o menu conforme o estado do usuário
    function atualizarMenu(session) {

        if (session) {

            // Usuário está logado
            botaoEntrar.style.display = "none";
            areaUsuario.style.display = "block";

            const usuario = session.user;

            const nome = usuario.user_metadata?.nome_completo || "Cliente";

            nomeCliente.textContent = `Olá, ${nome}!`;
            emailCliente.textContent = usuario.email;

        } else {

            // Usuário não está logado
            botaoEntrar.style.display = "inline-block";
            areaUsuario.style.display = "none";

        }
    }

    // Verifica se existe uma sessão
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        console.error("Erro ao verificar usuário:", error);
        return;
    }

    atualizarMenu(data.session);

    // Observa quando o usuário entra ou sai
    supabaseClient.auth.onAuthStateChange((event, session) => {
        atualizarMenu(session);
    });

});