function validarCadastro() {

    event.preventDefault();

    let user = input_user.value;
    let email = input_email.value;
    let senha = input_senha.value;
    let confirmarSenha = input_confirmar_senha.value;
    let fotoPerfil = "100";

    let camposNaoPreenchidos = user == "" || email == "" || senha == "" || confirmarSenha == "";

    if (camposNaoPreenchidos) {
        alert(`Preencha todos os campos`);
       
        return false;
    } else {

        const userTemMaisQueQuatroCaracter = user.length >= 4;
        const emailEValido = email.indexOf("@") >= 0 && email.indexOf(".") >= 0;

        const validacaoDeSenha = [
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            'abcdefghijklmnopqrstuvwxyz',
            '0123456789',
            '!@#$%^&*()_+-=[]{}|;:",.<>/?'
        ];

        let qtdCaracterMaisculo = 0;
        let qtdCaracterMinusculo = 0;
        let qtdCaracterNumerico = 0;
        let qtdCaracterEspecial = 0;

        for (let caracters = 0; caracters < senha.length; caracters++) {

            let caracterAtual = senha[caracters];

            if (validacaoDeSenha[0].indexOf(caracterAtual) != -1) {
                qtdCaracterMaisculo++
            }
            if (validacaoDeSenha[1].indexOf(caracterAtual) != -1) {
                qtdCaracterMinusculo++
            }
            if (validacaoDeSenha[2].indexOf(caracterAtual) != -1) {
                qtdCaracterNumerico++
            }
            if (validacaoDeSenha[3].indexOf(caracterAtual) != -1) {
                qtdCaracterEspecial++
            }

        }

        const senhaETemTodosCaracteres = qtdCaracterMaisculo > 0 || qtdCaracterMinusculo > 0 || qtdCaracterNumerico > 0 || qtdCaracterEspecial > 0;
        const confirmarSenhaIgualSenha = confirmarSenha == senha;

        if (userTemMaisQueQuatroCaracter && emailEValido && senhaETemTodosCaracteres && confirmarSenhaIgualSenha) {
            // Enviando o valor da nova input
            fetch("/usuarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // crie um atributo que recebe o valor recuperado aqui
                    // Agora vá para o arquivo routes/usuario.js
                    userServer: user,
                    emailServer: email,
                    senhaServer: senha,
                    perfilServer: fotoPerfil
                    // empresaServer: empresaVar
                }),
            })
                .then(function (resposta) {
                    console.log("resposta: ", resposta);

                    if (resposta.ok) {
                        // cardErro.style.display = "block";

                        alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

                        setTimeout(() => {
                            window.location = "indexLogin.html";
                        }, "2000");

                        limparFormulario();
                       
                    } else {
                        alert(`Email já cadastrado`);
                        throw "Houve um erro";
                    }
                })
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                   
                });

            return false;
        } else {
            alert(`Cadastro não realizado`)
        }
    }
}

function sumirMensagem() {
    cardErro.style.display = "none";
}
