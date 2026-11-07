
document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formCadastro");

    if (!formulario) {
        console.error("Formulário formCadastro não encontrado!");
        return;
    }

    formulario.addEventListener("submit", async (event) => {

        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;
        const termos = document.getElementById("termos").checked;

        if (!nome || !email || !senha || !confirmarSenha) {
            alert("Preencha todos os campos!");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não são iguais!");
            return;
        }

        if (senha.length < 6) {
            alert("A senha precisa ter pelo menos 6 caracteres!");
            return;
        }

        if (!termos) {
            alert("Você precisa aceitar os termos!");
            return;
        }

        try {

            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: senha,
                options: {
    emailRedirectTo: "http://127.0.0.1:5500/cardapio.html",

    data: {
        nome_completo: nome
    }
}
            });

            if (error) {
                alert("Erro no cadastro: " + error.message);
                console.error(error);
                return;
            }

            alert("Cadastro realizado! Verifique seu e-mail para confirmar a conta.");

            formulario.reset();

        } catch (erro) {

            console.error("Erro inesperado:", erro);
            alert("Não foi possível realizar o cadastro. Verifique o Console.");

        }

    });

});
