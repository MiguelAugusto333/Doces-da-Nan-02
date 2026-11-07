async function sairDaConta() {

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert("Erro ao sair da conta!");
        console.error(error);
        return;
    }

    alert("Você saiu da sua conta!");

    window.location.href = "login.html";

}