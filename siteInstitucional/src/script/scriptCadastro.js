function validarCadastro() {

    event.preventDefault();

    let user = input_user.value;
    let email = input_email.value;
    let senha = input_senha.value;
    let confirmarSenha = input_confirmar_senha.value;

    let camposNaoPreenchidos = user == "" || email == "" || senha == "" || confirmarSenha == "";

    if (camposNaoPreenchidos) {
        alert(`Preencha todos os campos`);
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
            alert(`Cadastro realizado com sucesso`)
            window.open("../login/index.html")
        } else {
            alert(`Campos inválidos`)
        }

    }

}