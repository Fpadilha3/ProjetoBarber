 let clientes =
JSON.parse(localStorage.getItem("clientes")) || [];

let servicos =
JSON.parse(localStorage.getItem("servicos")) || [];

let agendamentos =
JSON.parse(localStorage.getItem("agendamentos")) || [];

// DASHBOARD

function atualizarDashboard() {

    const c = document.getElementById("totalClientes");
    const s = document.getElementById("totalServicos");
    const a = document.getElementById("totalAgendamentos");

    if (c) c.innerText = clientes.length;
    if (s) s.innerText = servicos.length;
    if (a) a.innerText = agendamentos.length;
}

// VALIDAÇÕES EM TEMPO REAL - CLIENTES

function formatarTelefone(input) {
    let valor = input.value.replace(/\D/g, '');
    
    if (valor.length > 11) {
        valor = valor.slice(0, 11);
    }
    
    if (valor.length > 0) {
        valor = '(' + valor;
    }
    if (valor.length > 3) {
        valor = valor.slice(0, 3) + ') ' + valor.slice(3);
    }
    if (valor.length > 9) {
        valor = valor.slice(0, 9) + '-' + valor.slice(9);
    }
    
    input.value = valor;
}

function formatarTelefoneExibicao(telefone) {
    // Recebe apenas números e formata para exibição
    const valor = telefone.replace(/\D/g, '');
    
    if (valor.length === 10) {
        return valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (valor.length === 11) {
        return valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    
    return telefone;
}

function limparTelefone() {
    const input = document.getElementById("telefoneCliente");
    input.value = "";
    input.style.borderColor = "";
    input.title = "";
}

function validarNomeCliente() {
    const nome = document.getElementById("nomeCliente").value.trim();
    const input = document.getElementById("nomeCliente");
    
    if (!nome) {
        input.style.borderColor = "";
        input.title = "";
        return;
    }
    
    if (!/^[a-záàâãéèêíïóôõöúçñ\s]+$/i.test(nome)) {
        input.style.borderColor = "#ff4444";
        input.title = "❌ Apenas letras e espaços permitidos";
        return false;
    }
    
    input.style.borderColor = "#44ff44";
    input.title = "✓ Nome válido";
    return true;
}

function validarTelefoneCliente() {
    const telefone = document.getElementById("telefoneCliente").value.trim();
    const input = document.getElementById("telefoneCliente");
    
    if (!telefone) {
        input.style.borderColor = "";
        input.title = "";
        return;
    }
    
    // Remover caracteres não numéricos para validação
    const apenasNumeros = telefone.replace(/\D/g, '');
    
    if (!/^\d{10,11}$/.test(apenasNumeros)) {
        input.style.borderColor = "#ff4444";
        input.title = "❌ Deve ter 10 ou 11 dígitos";
        return false;
    }
    
    // Verificar se é celular (começa com 9)
    const primeiroDigitoNumero = apenasNumeros.substring(2, 3);
    if (primeiroDigitoNumero !== "9") {
        input.style.borderColor = "#ff4444";
        input.title = "❌ Deve ser um celular (começar com 9)";
        return false;
    }
    
    input.style.borderColor = "#44ff44";
    input.title = "✓ Telefone válido";
    return true;
}

function validarEmailCliente() {
    const email = document.getElementById("emailCliente").value.trim();
    const input = document.getElementById("emailCliente");
    
    if (!email) {
        input.style.borderColor = "";
        input.title = "";
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        input.style.borderColor = "#ff4444";
        input.title = "❌ Email inválido";
        return false;
    }
    
    input.style.borderColor = "#44ff44";
    input.title = "✓ Email válido";
    return true;
}

// VALIDAÇÕES EM TEMPO REAL - SERVIÇOS

function validarNomeServico() {
    const nome = document.getElementById("nomeServico").value.trim();
    const input = document.getElementById("nomeServico");
    
    if (!nome) {
        input.style.borderColor = "";
        input.title = "";
        return;
    }
    
    if (!/^[a-záàâãéèêíïóôõöúçñ\s]+$/i.test(nome)) {
        input.style.borderColor = "#ff4444";
        input.title = "❌ Apenas letras e espaços permitidos";
        return false;
    }
    
    input.style.borderColor = "#44ff44";
    input.title = "✓ Nome válido";
    return true;
}

function validarValorServico() {
    const valor = document.getElementById("valorServico").value.trim();
    const input = document.getElementById("valorServico");
    
    if (!valor) {
        input.style.borderColor = "";
        input.title = "";
        return;
    }
    
    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
        input.style.borderColor = "#ff4444";
        input.title = "❌ Valor deve ser positivo";
        return false;
    }
    
    input.style.borderColor = "#44ff44";
    input.title = "✓ Valor válido";
    return true;
}

// VALIDAÇÕES EM TEMPO REAL - AGENDAMENTOS

function validarDataAgendamento() {
    const data = document.getElementById("agData").value;
    const input = document.getElementById("agData");
    
    if (!data) {
        input.style.borderColor = "";
        input.title = "";
        return;
    }
    
    const dataAgendamento = new Date(data + "T00:00:00");
    const ano = dataAgendamento.getFullYear();
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    // Verificar se o ano é 2026
    if (ano !== 2026) {
        input.style.borderColor = "#ff4444";
        input.title = "❌ Apenas datas de 2026 são permitidas";
        return false;
    }
    
    // Verificar se não é uma data no passado
    if (dataAgendamento < hoje) {
        input.style.borderColor = "#ff4444";
        input.title = "❌ Data não pode ser no passado";
        return false;
    }
    
    input.style.borderColor = "#44ff44";
    input.title = "✓ Data válida";
    return true;
}

// CLIENTES

function cadastrarCliente() {

    const nome =
    document.getElementById("nomeCliente").value.trim();

    const telefoneBruto =
    document.getElementById("telefoneCliente").value.trim();

    const email =
    document.getElementById("emailCliente").value.trim();

    if (!nome || !telefoneBruto || !email) {
        alert("Preencha todos os campos.");
        return;
    }

    // Validar nome: apenas letras e espaços
    if (!/^[a-záàâãéèêíïóôõöúçñ\s]+$/i.test(nome)) {
        alert("Nome deve conter apenas letras. Sem números ou caracteres especiais.");
        return;
    }

    // Extrair apenas números do telefone
    const telefone = telefoneBruto.replace(/\D/g, '');

    // Validar telefone: apenas números com 10 ou 11 dígitos
    if (!/^\d{10,11}$/.test(telefone)) {
        alert("Telefone deve conter 10 ou 11 dígitos apenas.");
        return;
    }

    // Validar se é celular (começa com 9 após o DDD)
    const primeiroDigitoNumero = telefone.substring(2, 3);
    if (primeiroDigitoNumero !== "9") {
        alert("Telefone deve ser um celular (começar com 9).");
        return;
    }

    // Validar email: formato básico
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Email inválido. Use o formato: exemplo@dominio.com");
        return;
    }

    clientes.push({
        nome,
        telefone,
        email
    });

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

    document.getElementById("nomeCliente").value = "";
    document.getElementById("telefoneCliente").value = "";
    document.getElementById("emailCliente").value = "";

    renderClientes();
    atualizarDashboard();

    alert("Cliente cadastrado com sucesso!");
}

function renderClientes() {

    const lista =
    document.getElementById("listaClientes");

    if (!lista) return;

    lista.innerHTML = "";

    clientes.forEach((cliente, index) => {

        lista.innerHTML += `
        <tr>
            <td>${cliente.nome}</td>
            <td>${formatarTelefoneExibicao(cliente.telefone)}</td>
            <td>${cliente.email}</td>
            <td>
                <button onclick="removerCliente(${index})">
                    Excluir
                </button>
            </td>
        </tr>
        `;
    });

    atualizarOpcoesClientes();
}

function atualizarOpcoesClientes() {

    const sel = document.getElementById("agCliente");
    if (!sel) return;

    sel.innerHTML = '<option value="">--Selecione um cliente--</option>';

    // Ordenar clientes alfabeticamente
    const clientesOrdenados = [...clientes].sort((a, b) => 
        a.nome.localeCompare(b.nome, 'pt-BR')
    );

    clientesOrdenados.forEach(cliente => {
        sel.innerHTML += `
            <option value="${cliente.nome}">
                ${cliente.nome}
            </option>
        `;
    });
}

function removerCliente(index) {

    clientes.splice(index, 1);

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

    renderClientes();
    atualizarDashboard();
}

// SERVIÇOS

function cadastrarServico() {

    const nome =
    document.getElementById("nomeServico").value.trim();

    const valor =
    document.getElementById("valorServico").value.trim();

    if (!nome || !valor) {
        alert("Preencha todos os campos.");
        return;
    }

    // Validar nome: apenas letras e espaços
    if (!/^[a-záàâãéèêíïóôõöúçñ\s]+$/i.test(nome)) {
        alert("Nome do serviço deve conter apenas letras. Sem números ou caracteres especiais.");
        return;
    }

    // Validar valor: apenas números positivos
    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
        alert("Valor deve ser um número positivo.");
        return;
    }

    servicos.push({
        nome,
        valor: valorNumerico.toFixed(2)
    });

    localStorage.setItem(
        "servicos",
        JSON.stringify(servicos)
    );

    document.getElementById("nomeServico").value = "";
    document.getElementById("valorServico").value = "";

    renderServicos();
    atualizarDashboard();

    alert("Serviço cadastrado!");
}

function renderServicos() {

    const lista =
    document.getElementById("listaServicos");

    if (!lista) return;

    lista.innerHTML = "";

    servicos.forEach((servico, index) => {

        lista.innerHTML += `
        <tr>
            <td>${servico.nome}</td>
            <td>R$ ${servico.valor}</td>
            <td>
                <button onclick="removerServico(${index})">
                    Excluir
                </button>
            </td>
        </tr>
        `;
    });

    atualizarOpcoesServicos();
}

function removerServico(index) {

    servicos.splice(index, 1);

    localStorage.setItem(
        "servicos",
        JSON.stringify(servicos)
    );

    renderServicos();
    atualizarDashboard();
}

function atualizarOpcoesServicos() {

    const sel = document.getElementById("agServico");
    if (!sel) return;

    sel.innerHTML = '<option value="">--Selecione um serviço--</option>';

    servicos.forEach(servico => {
        sel.innerHTML += `
            <option value="${servico.nome}">
                ${servico.nome} - R$ ${servico.valor}
            </option>
        `;
    });
}

function atualizarOpcoesHorarios() {

    const sel = document.getElementById("agHora");
    if (!sel) return;

    sel.innerHTML = '<option value="">--Selecione um horário--</option>';

    const start = 7 * 60 + 30; // 7:30 em minutos
    const end = 20 * 60; // 20:00 em minutos
    for (let m = start; m <= end; m += 30) {
        const hh = String(Math.floor(m / 60)).padStart(2, '0');
        const mm = String(m % 60).padStart(2, '0');
        sel.innerHTML += `<option value="${hh}:${mm}">${hh}:${mm}</option>`;
    }
}

// AGENDAMENTOS

function agendar() {

    const cliente =
    document.getElementById("agCliente").value;

    const servico =
    document.getElementById("agServico").value;

    const data =
    document.getElementById("agData").value;

    const hora =
    document.getElementById("agHora").value;

    if (!cliente || !servico || !data || !hora) {
        alert("Preencha todos os campos.");
        return;
    }

    // Validar data: não permitir datas no passado
    const dataAgendamento = new Date(data + "T00:00:00");
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataAgendamento < hoje) {
        alert("Não é possível agendar em uma data passada. Escolha uma data futura.");
        return;
    }

    // Validar se já existe agendamento no mesmo horário
    const horarioOcupado = agendamentos.some(ag => ag.data === data && ag.hora === hora);
    
    if (horarioOcupado) {
        alert("Este horário já está ocupado. Escolha outro horário.");
        return;
    }

    agendamentos.push({
        cliente,
        servico,
        data,
        hora
    });

    localStorage.setItem(
        "agendamentos",
        JSON.stringify(agendamentos)
    );

    document.getElementById("agCliente").value = "";
    document.getElementById("agServico").value = "";
    document.getElementById("agData").value = "";
    document.getElementById("agHora").value = "";

    renderAgendamentos();
    atualizarDashboard();

    alert("Agendamento realizado!");
}

function renderAgendamentos() {

    const lista =
    document.getElementById("listaAgendamentos");

    if (!lista) return;

    lista.innerHTML = "";

    // Ordenar agendamentos por data e hora
    const agendamentosOrdenados = [...agendamentos].sort((a, b) => {
        // Criar objetos Date para comparação
        const dataHoraA = new Date(a.data + "T" + a.hora);
        const dataHoraB = new Date(b.data + "T" + b.hora);
        return dataHoraA - dataHoraB;
    });

    agendamentosOrdenados.forEach((agendamento, index) => {

        lista.innerHTML += `
        <tr>
            <td>${agendamento.cliente}</td>
            <td>${agendamento.servico}</td>
            <td>${agendamento.data}</td>
            <td>${agendamento.hora}</td>
            <td>
                <button onclick="removerAgendamento(${agendamentos.indexOf(agendamento)})">
                    Excluir
                </button>
            </td>
        </tr>
        `;
    });
}

function removerAgendamento(index) {

    agendamentos.splice(index, 1);

    localStorage.setItem(
        "agendamentos",
        JSON.stringify(agendamentos)
    );

    renderAgendamentos();
    atualizarDashboard();
}

function limparHistorico() {

    if (!confirm("Deseja limpar todo o histórico de agendamentos?")) return;

    agendamentos = [];

    localStorage.setItem(
        "agendamentos",
        JSON.stringify(agendamentos)
    );

    renderAgendamentos();
    atualizarDashboard();

    alert("Histórico limpo com sucesso!");
}

// PESQUISAR CLIENTE

function pesquisarCliente() {

    const termo =
    document.getElementById("pesquisaCliente").value.toLowerCase();

    const lista =
    document.getElementById("listaClientes");

    if (!lista) return;

    lista.innerHTML = "";

    clientes
    .filter(cliente =>
        cliente.nome.toLowerCase().includes(termo)
    )
    .forEach((cliente, index) => {

        lista.innerHTML += `
        <tr>
            <td>${cliente.nome}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.email}</td>
            <td>
                <button onclick="removerCliente(${index})">
                    Excluir
                </button>
            </td>
        </tr>
        `;
    });
}

// INICIALIZAÇÃO

renderClientes();
renderServicos();
renderAgendamentos();
atualizarDashboard();

atualizarOpcoesClientes();
atualizarOpcoesServicos();
atualizarOpcoesHorarios();