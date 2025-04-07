document.getElementById('formulario').addEventListener('submit', function(e) {
  e.preventDefault();

  const valor = parseFloat(document.getElementById('valor').value);
  const dias = parseInt(document.getElementById('dias').value);
  const resultado = document.getElementById('resultado');
  const tabela = document.getElementById('tabela');
  const corpoTabela = tabela.querySelector('tbody');

  if (isNaN(valor) || isNaN(dias) || valor <= 0 || dias <= 0) {
    resultado.innerHTML = "<p>Preencha os campos corretamente.</p>";
    tabela.style.display = 'none';
    return;
  }

  const porDia = valor / dias;
  resultado.innerHTML = `<p>Você precisa juntar <strong>R$ ${porDia.toFixed(2)}</strong> por dia para alcançar seu objetivo.</p>`;

  corpoTabela.innerHTML = '';
  let acumulado = 0;

  for (let i = 1; i <= dias; i++) {
    acumulado += porDia;
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>Dia ${i}</td>
      <td>R$ ${acumulado.toFixed(2)}</td>
    `;
    corpoTabela.appendChild(linha);
  }

  tabela.style.display = 'table';
});

// Exportar como PDF
function exportarPDF() {
  const elemento = document.querySelector('.container');
  const opt = {
    margin:       0.5,
    filename:     'economia_inteligente.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().from(elemento).set(opt).save();
}

// Compartilhar no WhatsApp
function compartilhar() {
  const valor = document.getElementById('valor').value;
  const dias = document.getElementById('dias').value;
  const link = `https://economiainteligente.vercel.app/`;
  const mensagem = `Estou planejando juntar R$ ${valor} em ${dias} dias com o site Economia Inteligente! Veja como: ${link}`;
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}
