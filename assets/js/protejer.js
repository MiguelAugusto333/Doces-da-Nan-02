async function verificarLogin() {

    const { data, error } =
        await supabaseClient.auth.getSession();

    if (error || !data.session) {
        window.location.href = "login.html";
        return;
    }

    console.log("Cliente logado!");

}

verificarLogin();