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

// CLIENTES

function cadastrarCliente() {

    const nome =
    document.getElementById("nomeCliente").value;

    const telefone =
    document.getElementById("telefoneCliente").value;

    const email =
    document.getElementById("emailCliente").value;

    if (!nome || !telefone || !email) {
        alert("Preencha todos os campos.");
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
    document.getElementById("nomeServico").value;

    const valor =
    document.getElementById("valorServico").value;

    if (!nome || !valor) {
        alert("Preencha todos os campos.");
        return;
    }

    servicos.push({
        nome,
        valor
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

    agendamentos.forEach((agendamento, index) => {

        lista.innerHTML += `
        <tr>
            <td>${agendamento.cliente}</td>
            <td>${agendamento.servico}</td>
            <td>${agendamento.data}</td>
            <td>${agendamento.hora}</td>
            <td>
                <button onclick="removerAgendamento(${index})">
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

atualizarOpcoesServicos();
atualizarOpcoesHorarios();