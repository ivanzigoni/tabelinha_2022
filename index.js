const REFRESH_INTERVAL = 25000;

function images(name) {
  const map = {
    "12": "./assets/ciro.jpeg",
    "13": "./assets/lula.jpg",
    "22": "./assets/bozo.jpeg",
    "21": "./assets/manzano.jpg",
    "14": "./assets/padre.jpeg",
    "30": "./assets/davila.jpeg",
    "27": "./assets/eymael.jpeg",
  }
  return map[name] ? map[name] : "./assets/default.jpeg";
}

function formatNumString(num) {
  return String(num).replace(/(.)(?=(\d{3})+$)/g,'$1.');
}

async function main() {
  const root = document.querySelector('.root');
  let result = [];

  if (root.firstChild) {
    while (root.firstChild) root.removeChild(root.firstChild);
  } 

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

  const vote_sum = result.cand.reduce((acc, cand) => {
    const { vap, pvap, nm, n } = cand;

    const tr = document.createElement("tr");
    tr.style.textAlign = "center"
    tr.style.fontSize = "120%"

    const avatar_div = document.createElement("div")
    avatar_div.style.display = "flex";
    avatar_div.style.flexDirection = "column";
    avatar_div.style.alignItems = "center";

    const td_name = document.createElement("td")
    const nameText = nm.split(" ")[nm.split(" ").length - 1]
    td_name.innerText = `${n === "30" ? "D'ÁVILA" : nameText} ${n}`;

    const img = document.createElement("img")
    img.src = images(String(n))
    img.style.height = "40px"
    img.style.width = "80px";

    const td_vap = document.createElement("td");
    td_vap.innerText = formatNumString(vap); 

    const td_pvap = document.createElement("td");
    td_pvap.innerText = `${pvap}%`;

    avatar_div.appendChild(img);
    avatar_div.appendChild(td_name);
    tr.appendChild(avatar_div);
    tr.appendChild(td_vap);
    tr.appendChild(td_pvap);

    table.appendChild(tr);

    acc += +vap;
    return acc;
  }, 0);

  const total_votes = document.createElement("h3");
  total_votes.innerText = `TOTAL VOTOS: ${formatNumString(vote_sum)}`

  const refresh_warning = document.createElement("h4")
  refresh_warning.innerText = `atualiza a cada ${REFRESH_INTERVAL / 1000} segundos`

  root.appendChild(total_votes)
  root.appendChild(refresh_warning)
  root.appendChild(table);
}

main();

setInterval(() => {
  main();
}, REFRESH_INTERVAL);
