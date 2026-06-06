const clientes =
JSON.parse(localStorage.getItem("clientes")) || [];

const servicos =
JSON.parse(localStorage.getItem("servicos")) || [];

const agendamentos =
JSON.parse(localStorage.getItem("agendamentos")) || [];

function atualizarDashboard() {

    const c =
    document.getElementById("totalClientes");

    const s =
    document.getElementById("totalServicos");

    const a =
    document.getElementById("totalAgendamentos");

    if(c) c.innerText = clientes.length;

    if(s) s.innerText = servicos.length;

    if(a) a.innerText = agendamentos.length;
}

atualizarDashboard();