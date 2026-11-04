// ===============================
// CARRINHO - DOCES DA NANÁ
// ===============================

let carrinho = [];

// Pega todos os produtos
const produtos = document.querySelectorAll(".produto");

// Pega os elementos do carrinho
const itensCarrinho = document.getElementById("itensCarrinho");
const valorTotal = document.getElementById("valorTotal");
const finalizarPedido = document.getElementById("finalizarPedido");

// ===============================
// ADICIONAR PRODUTO
// ===============================

document.querySelectorAll(".adicionarCarrinho").forEach((botao) => {

    botao.addEventListener("click", function () {

        // Ignora o botão de finalizar pedido
        if (this.id === "finalizarPedido") return;

        const produto = this.closest(".produto");

        if (!produto) return;

        // Nome do produto
        const nome = produto.querySelector("p.fw-bolder")?.textContent.trim();

        // Pega o preço dentro do card
        const textos = produto.querySelectorAll("p");

        let preco = 0;

        textos.forEach((texto) => {

            const valor = texto.textContent
                .replace("R$", "")
                .replace(".", "")
                .replace(",", ".")
                .trim();

            if (!isNaN(valor) && valor !== "") {
                const numero = parseFloat(valor);

                // Considera apenas valores de preço
                if (numero > 0 && numero < 1000) {
                    preco = numero;
                }
            }
        });

        if (!nome || preco === 0) {
            alert("Não foi possível identificar o produto.");
            return;
        }

        // Procura se já existe no carrinho
        const produtoExistente = carrinho.find(
            item => item.nome === nome
        );

        if (produtoExistente) {

            produtoExistente.quantidade++;

        } else {

            carrinho.push({
                nome: nome,
                preco: preco,
                quantidade: 1
            });

        }

        atualizarCarrinho();

    });

});

// ===============================
// ATUALIZAR CARRINHO
// ===============================

function atualizarCarrinho() {

    itensCarrinho.innerHTML = "";

    if (carrinho.length === 0) {

        itensCarrinho.innerHTML = `
            <p>Seu carrinho está vazio.</p>
        `;

        valorTotal.textContent = "Total: R$ 0,00";

        return;
    }

    let total = 0;

    carrinho.forEach((item, index) => {

        const subtotal = item.preco * item.quantidade;

        total += subtotal;

        const div = document.createElement("div");

        div.classList.add(
            "d-flex",
            "justify-content-between",
            "align-items-center",
            "mb-2",
            "border-bottom",
            "pb-2"
        );

        div.innerHTML = `
            <div>
                <strong>${item.nome}</strong>
                <br>
                <small>
                    R$ ${item.preco.toFixed(2).replace(".", ",")}
                    × ${item.quantidade}
                </small>
            </div>

            <div class="d-flex align-items-center gap-2">

                <button 
                    class="btn btn-sm btn-outline-secondary diminuir"
                    data-index="${index}">
                    −
                </button>

                <strong>${item.quantidade}</strong>

                <button 
                    class="btn btn-sm btn-outline-secondary aumentar"
                    data-index="${index}">
                    +
                </button>

                <button 
                    class="btn btn-sm btn-danger remover"
                    data-index="${index}">
                    ×
                </button>

            </div>
        `;

        itensCarrinho.appendChild(div);
    });

    valorTotal.textContent =
        `Total: R$ ${total.toFixed(2).replace(".", ",")}`;

    configurarBotoesCarrinho();
}

// ===============================
// BOTÕES + / - / REMOVER
// ===============================

function configurarBotoesCarrinho() {

    // Aumentar
    document.querySelectorAll(".aumentar").forEach(botao => {

        botao.addEventListener("click", function () {

            const index = this.dataset.index;

            carrinho[index].quantidade++;

            atualizarCarrinho();
        });

    });

    // Diminuir
    document.querySelectorAll(".diminuir").forEach(botao => {

        botao.addEventListener("click", function () {

            const index = this.dataset.index;

            carrinho[index].quantidade--;

            if (carrinho[index].quantidade <= 0) {
                carrinho.splice(index, 1);
            }

            atualizarCarrinho();
        });

    });

    // Remover
    document.querySelectorAll(".remover").forEach(botao => {

        botao.addEventListener("click", function () {

            const index = this.dataset.index;

            carrinho.splice(index, 1);

            atualizarCarrinho();
        });

    });
}

// ===============================
// FILTRO DE CATEGORIAS
// ===============================

document.querySelectorAll("[data-filter]").forEach(botao => {

    botao.addEventListener("click", function () {

        const categoria = this.dataset.filter;

        produtos.forEach(produto => {

            if (categoria === "todos") {

                produto.parentElement.style.display = "";

                return;
            }

            const nomeProduto =
                produto.querySelector("p.fw-bolder")
                ?.textContent
                .toLowerCase();

            let pertenceCategoria = false;

            if (categoria === "bolos" &&
                nomeProduto.includes("bolo")) {

                pertenceCategoria = true;
            }

            if (categoria === "cookies" &&
                nomeProduto.includes("cookie")) {

                pertenceCategoria = true;
            }

            if (categoria === "bombons" &&
                nomeProduto.includes("bombom")) {

                pertenceCategoria = true;
            }

            if (categoria === "brownies" &&
                nomeProduto.includes("brownie")) {

                pertenceCategoria = true;
            }

            if (categoria === "outros") {

                pertenceCategoria =
                    !nomeProduto.includes("bolo") &&
                    !nomeProduto.includes("cookie") &&
                    !nomeProduto.includes("bombom") &&
                    !nomeProduto.includes("brownie");

            }

            produto.parentElement.style.display =
                pertenceCategoria ? "" : "none";

        });

    });

});

// ===============================
// FINALIZAR PELO WHATSAPP
// ===============================

finalizarPedido.addEventListener("click", function () {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }

    let mensagem =
        "Olá! Gostaria de fazer um pedido:%0A%0A";

    let total = 0;

    carrinho.forEach(item => {

        const subtotal = item.preco * item.quantidade;

        total += subtotal;

        mensagem +=
            `${item.quantidade}x ${item.nome} - R$ ${subtotal.toFixed(2).replace(".", ",")}%0A`;

    });

    mensagem +=
        `%0A*Total: R$ ${total.toFixed(2).replace(".", ",")}*`;

    // =====================================
    // COLOQUE AQUI O NÚMERO DO WHATSAPP
    // =====================================

    const numeroWhatsApp = "+5541996175949";

    const url =
        `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

    window.open(url, "_blank");

});