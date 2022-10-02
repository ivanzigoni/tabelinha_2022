
async function main() {
  const root = document.querySelector('.root');
  let result = [];

  if (root.firstChild) root.removeChild(root.firstChild);  

  try {
    const request = await fetch("https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json");
    result = await request.json();
  } catch(e) {
    return main();
  }
  
  const table = document.createElement("table");
  table.style.height = "99vh";
  table.style.width = "99vw";


  const columns = document.createElement("tr");

  const column_name = document.createElement("th");
  column_name.innerText = "NOME";

  const column_qtd_votos = document.createElement("th");
  column_qtd_votos.innerText = "QTD VOTOS";

  const column_percentage = document.createElement("th");
  column_percentage.innerText = "PORCENTAGEM";

  columns.appendChild(column_name);
  columns.appendChild(column_qtd_votos);
  columns.appendChild(column_percentage);

  table.appendChild(columns);

  for (let i = 0; i < result.cand.length; i += 1) {
    const { vap, pvap, nm, n } = result.cand[i];

    const tr = document.createElement("tr");
    tr.style.textAlign = "center"
    tr.style.fontSize = "120%"

    const td_name = document.createElement("td")
    const nameText = nm.split(" ")[nm.split(" ").length - 1]
    td_name.innerText = `${n === "30" ? "D'ÁVILA" : nameText} ${n}`;

    const td_vap = document.createElement("td");
    td_vap.innerText = vap; 

    const td_pvap = document.createElement("td");
    td_pvap.innerText = `${pvap}%`;

    tr.appendChild(td_name);
    tr.appendChild(td_vap);
    tr.appendChild(td_pvap);

    table.appendChild(tr);
  }

  root.appendChild(table);

}

main();

setInterval(() => {
  main();
}, 15000);