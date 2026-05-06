/**
 * BARBERCLUB — Sistema SÍRUS
 * script.js
 *
 * Módulos:
 *   1. DB        — Banco de dados local (localStorage)
 *   2. Planos    — Seleção e redirecionamento
 *   3. Cadastro  — Finalização da assinatura
 *   4. Admin     — Renderização do painel
 */

/* ════════════════════════════════════════════════════
   1. BANCO DE DADOS LOCAL (localStorage)
   ════════════════════════════════════════════════════ */

   const DB_KEY = 'barberclub_db';

   const DB = {
       /** Retorna todos os clientes */
       listar() {
           return JSON.parse(localStorage.getItem(DB_KEY)) || [];
       },
   
       /** Salva a lista completa */
       salvar(lista) {
           localStorage.setItem(DB_KEY, JSON.stringify(lista));
       },
   
       /** Insere um novo cliente */
       inserir(cliente) {
           const lista = this.listar();
           lista.push(cliente);
           this.salvar(lista);
           return cliente;
       },
   
       /** Atualiza um cliente pelo ID */
       atualizar(id, campos) {
           const lista = this.listar().map(c =>
               c.id === id ? { ...c, ...campos } : c
           );
           this.salvar(lista);
       },
   
       /** Remove um cliente pelo ID */
       remover(id) {
           const lista = this.listar().filter(c => c.id !== id);
           this.salvar(lista);
       },
   
       /** Busca clientes por nome ou e-mail */
       buscar(termo) {
           const t = termo.toLowerCase();
           return this.listar().filter(c =>
               c.nome.toLowerCase().includes(t) ||
               c.email.toLowerCase().includes(t)
           );
       },
   
       /** Limpa todo o banco */
       limpar() {
           localStorage.removeItem(DB_KEY);
       },
   
       /** Gera estatísticas rápidas */
       stats() {
           const lista = this.listar();
           const legendary = lista.filter(c => c.plano === 'Legendary').length;
           const executive = lista.filter(c => c.plano === 'Executive').length;
           const receita   = (legendary * 119) + (executive * 79);
           return { total: lista.length, legendary, executive, receita };
       }
   };
   
   
   /* ════════════════════════════════════════════════════
      2. SELEÇÃO DE PLANO — index.html
      ════════════════════════════════════════════════════ */
   
   /**
    * Armazena o plano temporariamente e redireciona para o checkout.
    * @param {string} nome  - Nome do plano ('Executive' | 'Legendary')
    * @param {number} preco - Preço mensal
    */
   function selecionarPlano(nome, preco) {
       sessionStorage.setItem('temp_plano', JSON.stringify({ nome, preco }));
       window.location.href = 'cadastro.html';
   }
   
   
   /* ════════════════════════════════════════════════════
      3. CHECKOUT / CADASTRO — cadastro.html
      ════════════════════════════════════════════════════ */
   
   // Carrega os dados do plano ao abrir a página
   if (window.location.pathname.includes('cadastro.html')) {
       const info = JSON.parse(sessionStorage.getItem('temp_plano'));
   
       if (!info) {
           // Sem plano selecionado → volta para home
           window.location.href = 'index.html';
       } else {
           document.addEventListener('DOMContentLoaded', () => {
               document.getElementById('plano-nome').innerText = info.nome.toUpperCase() + ' CLUB';
               document.getElementById('plano-preco').innerText = `R$ ${info.preco},00 /mês`;
           });
       }
   }
   
   /**
    * Valida os campos e salva o novo assinante no banco.
    */
   function finalizarCadastro() {
       const nome      = document.getElementById('nomeCliente').value.trim();
       const email     = document.getElementById('emailCliente').value.trim();
       const telefone  = document.getElementById('telefoneCliente')?.value.trim() || '';
       const msgErro   = document.getElementById('msg-erro');
       const info      = JSON.parse(sessionStorage.getItem('temp_plano'));
   
       // Validação básica
       if (!nome || !email) {
           msgErro.classList.remove('hidden');
           return;
       }
       msgErro.classList.add('hidden');
   
       // Monta o objeto do cliente
       const novoCliente = {
           id:             'BC-' + Date.now(),
           nome,
           email,
           telefone,
           plano:          info.nome,
           status:         'Ativo',
           dataAssinatura: new Date().toLocaleDateString('pt-BR'),
           limiteUsos:     info.nome === 'Legendary' ? 'Ilimitado' : 4,
           usosRestantes:  info.nome === 'Legendary' ? 999 : 4
       };
   
       DB.inserir(novoCliente);
       sessionStorage.removeItem('temp_plano');
   
       // Feedback e redirecionamento
       alert(`✅ Bem-vindo ao clube, ${nome}!\nSua assinatura ${info.nome} está ativa.`);
       window.location.href = 'index.html';
   }
   
   
   /* ════════════════════════════════════════════════════
      4. PAINEL ADMIN — admin.html
      ════════════════════════════════════════════════════ */
   
   /** Renderiza cards de estatísticas e tabela de clientes */
   function renderAdmin() {
       renderStats();
       renderTabela();
   }
   
   function renderStats() {
       const s = DB.stats();
       document.getElementById('stat-total').innerText      = s.total;
       document.getElementById('stat-legendary').innerText  = s.legendary;
       document.getElementById('stat-executive').innerText  = s.executive;
       document.getElementById('stat-receita').innerText    = `R$ ${s.receita.toLocaleString('pt-BR')}`;
   }
   
   function renderTabela() {
       const busca   = document.getElementById('busca')?.value || '';
       const clientes = busca ? DB.buscar(busca) : DB.listar();
       const tbody    = document.getElementById('tabela-clientes');
       const vazio    = document.getElementById('vazio');
   
       if (!tbody) return;
   
       if (clientes.length === 0) {
           tbody.innerHTML = '';
           vazio.classList.remove('hidden');
           return;
       }
   
       vazio.classList.add('hidden');
   
       tbody.innerHTML = clientes.map(c => `
           <tr>
               <td class="text-gray-600 text-xs font-mono">${c.id}</td>
               <td class="font-semibold">${c.nome}</td>
               <td class="text-gray-400">${c.email}</td>
               <td class="text-gray-500 text-xs">${c.telefone || '—'}</td>
               <td>
                   <span class="text-xs font-bold px-2 py-1 rounded ${c.plano === 'Legendary' ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-gray-300'}">
                       ${c.plano}
                   </span>
               </td>
               <td><span class="${c.status === 'Ativo' ? 'badge-ativo' : 'badge-cancelado'}">${c.status}</span></td>
               <td class="text-center ${c.usosRestantes <= 1 ? 'text-red-400' : 'text-gray-300'}">
                   ${c.limiteUsos === 'Ilimitado' ? '∞' : c.usosRestantes}
               </td>
               <td class="text-gray-500 text-xs">${c.dataAssinatura}</td>
               <td class="flex gap-2">
                   <button onclick="registrarUso('${c.id}')"
                       class="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded hover:bg-amber-500/30 transition">
                       + Uso
                   </button>
                   <button onclick="cancelarCliente('${c.id}')"
                       class="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded hover:bg-red-500/30 transition">
                       Cancelar
                   </button>
                   <button onclick="removerCliente('${c.id}')"
                       class="text-[10px] bg-white/5 text-gray-500 border border-white/10 px-3 py-1 rounded hover:bg-white/10 transition">
                       🗑
                   </button>
               </td>
           </tr>
       `).join('');
   }
   
   /** Registra um uso no plano do cliente */
   function registrarUso(id) {
       const cliente = DB.listar().find(c => c.id === id);
       if (!cliente) return;
   
       if (cliente.limiteUsos === 'Ilimitado') {
           alert(`${cliente.nome}: uso registrado (plano ilimitado).`);
           return;
       }
   
       if (cliente.usosRestantes <= 0) {
           alert(`${cliente.nome} esgotou os usos deste mês.`);
           return;
       }
   
       DB.atualizar(id, { usosRestantes: cliente.usosRestantes - 1 });
       renderAdmin();
   }
   
   /** Cancela a assinatura de um cliente */
   function cancelarCliente(id) {
       if (!confirm('Cancelar esta assinatura?')) return;
       DB.atualizar(id, { status: 'Cancelado' });
       renderAdmin();
   }
   
   /** Remove permanentemente um cliente */
   function removerCliente(id) {
       if (!confirm('Remover este cliente do banco? Ação irreversível.')) return;
       DB.remover(id);
       renderAdmin();
   }
   
   /** Apaga todo o banco de dados */
   function limparBanco() {
       if (!confirm('Limpar TODO o banco de dados? Esta ação não pode ser desfeita.')) return;
       DB.limpar();
       renderAdmin();
   }
   
