function validarCadastro() {

    event.preventDefault();

    let user = input_user.value;
    let email = input_email.value;
    let senha = input_senha.value;
    let confirmarSenha = input_confirmar_senha.value;

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
                    senhaServer: senha
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

// function listar() {
//     fetch("/empresas/listar", {
//         method: "GET",
//     })
//         .then(function (resposta) {
//             resposta.json().then((empresas) => {
//                 empresas.forEach((empresa) => {
//                     listaEmpresas.innerHTML += `<option value='${empresa.id}'>${empresa.cnpj}</option>`;
//                 });
//             });
//         })
//         .catch(function (resposta) {
//             console.log(`#ERRO: ${resposta}`);
//         });
// }

function sumirMensagem() {
    cardErro.style.display = "none";
}

// function cadastrar() {
//     aguardar();

//     //Recupere o valor da nova input pelo nome do id
//     // Agora vá para o método fetch logo abaixo
//     var nomeVar = nome_input.value;
//     var emailVar = email_input.value;
//     var senhaVar = senha_input.value;
//     var confirmacaoSenhaVar = confirmacao_senha_input.value;
//     var empresaVar = listaEmpresas.value
//     if (
//         nomeVar == "" ||
//         emailVar == "" ||
//         senhaVar == "" ||
//         confirmacaoSenhaVar == "" ||
//         empresaVar == ""
//     ) {
//         cardErro.style.display = "block";
//         mensagem_erro.innerHTML =
//             "(Mensagem de erro para todos os campos em branco)";

//        
//         return false;
//     } else {
//         setInterval(sumirMensagem, 5000);
//     }

//     // Enviando o valor da nova input
//     fetch("/usuarios/cadastrar", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             // crie um atributo que recebe o valor recuperado aqui
//             // Agora vá para o arquivo routes/usuario.js
//             nomeServer: nomeVar,
//             emailServer: emailVar,
//             senhaServer: senhaVar,
//             empresaServer: empresaVar
//         }),
//     })
//         .then(function (resposta) {
//             console.log("resposta: ", resposta);

//             if (resposta.ok) {
//                 cardErro.style.display = "block";

//                 mensagem_erro.innerHTML =
//                     "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

//                 setTimeout(() => {
//                     window.location = "login.html";
//                 }, "2000");

//                 limparFormulario();
//                
//             } else {
//                 throw "Houve um erro ao tentar realizar o cadastro!";
//             }
//         })
//         .catch(function (resposta) {
//             console.log(`#ERRO: ${resposta}`);
//            
//         });

//     return false;
// }

// function listar() {
//     fetch("/empresas/listar", {
//         method: "GET",
//     })
//         .then(function (resposta) {
//             resposta.json().then((empresas) => {
//                 empresas.forEach((empresa) => {
//                     listaEmpresas.innerHTML += `<option value='${empresa.id}'>${empresa.cnpj}</option>`;
//                 });
//             });
//         })
//         .catch(function (resposta) {
//             console.log(`#ERRO: ${resposta}`);
//         });
// }

// function sumirMensagem() {
//     cardErro.style.display = "none";
// }