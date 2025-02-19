// Seleciona a Seção about
const sobre = document.querySelector("#sobre");

// Seleciona o Formulário
const formulario = document.querySelector("#formulario");

// Expressão Regular para validar o e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Função para consumir os dados do Github
async function getApiGithub() {
    try {
        const dadosPerfil = await fetch(`https://api.github.com/users/Caaarolb`);
        const perfil = await dadosPerfil.json();

        let conteudo = `
            <img src="${perfil.avatar_url}" alt="Foto do Perfil do Github - ${perfil.name}">
            <article id="about_texto">
                <h2>Sobre mim</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                <div id="about_github" class="flex sobre_github">
                    <a href="${perfil.html_url}" target="_blank" class="botao">Github</a>
                    <p>${perfil.followers} Seguidores</p>
                    <p>${perfil.public_repos} Repositórios</p>
                </div>
            </article>
        `;

        sobre.innerHTML += conteudo;
    } catch (error) {
        console.error(error);
    }
}

// Validação do Formulário antes do envio
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    let validado = true;

    // Nome
    const campoNome = document.querySelector("#nome");
    const txtNome = document.querySelector("#txtNome");

    if (campoNome.value.length < 3) {
        txtNome.innerHTML = "O Nome deve ter no mínimo 3 caracteres.";
        campoNome.focus();
        validado = false;
    } else {
        txtNome.innerHTML = "";
    }

    // Email
    const campoEmail = document.querySelector("#email");
    const txtEmail = document.querySelector("#txtEmail");

    if (!campoEmail.value.match(emailRegex)) {
        txtEmail.innerHTML = "Digite um e-mail válido.";
        campoEmail.focus();
        validado = false;
    } else {
        txtEmail.innerHTML = "";
    }

    // Assunto (mensagem)
    const campoAssunto = document.querySelector("#assunto");
    const txtAssunto = document.querySelector("#txtAssunto");

    if (campoAssunto.value.length < 5) {
        txtAssunto.innerHTML = "O assunto deve ter no mínimo 5 caracteres.";
        campoAssunto.focus();
        validado = false;
    } else {
        txtAssunto.innerHTML = "";
    }

    // Se todas as validações passaram, o formulário é enviado
    if (validado) {
        formulario.submit();
    }
});

// Executa a função ao carregar o script, gerando a Seção About
getApiGithub();
