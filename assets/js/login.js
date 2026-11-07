const formulario = document.getElementById("formLogin");

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    const senha = document.getElementById("senha").value;

    // Verificar usuário no Supabase

    const { data, error } = await supabaseClient.auth.signInWithPassword({

        email: email,

        password: senha

    });

    if (error) {

        alert("E-mail ou senha incorretos!");

        return;

    }

    alert("Login realizado com sucesso!");

    window.location.href = "cardapio.html";

});