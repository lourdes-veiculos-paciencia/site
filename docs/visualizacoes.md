# Convite WhatsApp e estatísticas

O convite aparece após 180 segundos visíveis na página de um veículo, uma vez por sessão da aba. Usa os contatos existentes do WhatsAppModal e inclui o veículo e o link. Não envia mensagens automaticamente. Navegar para outro veículo reinicia o tempo.

## Ativação pendente

Revisar e aplicar `supabase/migrations/20260920_visualizacoes.sql` somente no projeto Supabase autorizado, após backup. Este arquivo não foi executado pelo agente. Cria uma tabela independente e duas funções; não modifica veículos, Storage ou policies existentes. A nova tabela tem RLS e não permite leitura pública. Permissões das funções seguem https://supabase.com/docs/guides/database/functions.

Antes da migração, a página pública continua funcionando e o painel informa que as estatísticas estão indisponíveis. Não alterar variáveis de ambiente. A função de ranking usa o cliente administrativo existente, após autenticação.

## Contagem

Conta uma visita após um segundo visível. Um identificador aleatório no sessionStorage evita repetição por veículo na mesma sessão da aba, inclusive após atualizar a página. A chave única no banco impede duplicatas concorrentes. Não grava IP, nome ou telefone. Usa crypto.getRandomValues, inclusive para testes HTTP na rede local. Sem armazenamento disponível, a deduplicação entre carregamentos não é garantida; o convite ainda funciona. Registros locais sem UUID não são contados. O ranking inclui até 20 veículos; períodos são janelas móveis de 7 ou 30 dias. Veículos removidos mantêm a contagem sem nome.

Esta é uma métrica aproximada: múltiplos dispositivos/abas podem contar separadamente; robôs ou chamadas artificiais à função pública podem inflar números. Não é auditoria nem métrica de pessoas únicas. A exclusão de acessos administrativos ocorre no endpoint do site, não em chamadas diretas à função pública.

## Teste manual após ativação

1. Abrir veículo em janela anônima e conferir o ranking no admin.
2. Recarregar: a contagem não deve aumentar. Abrir outro veículo: deve contar para ele.
3. Esperar 3 minutos visíveis: convite com dois contatos e mensagem do veículo. Fechar/recarregar: não reaparece na sessão.
4. Alternar para outra aba por um minuto: esse minuto não conta para o convite.
5. Conferir filtros 7/30/todo, acesso sem login ao admin e erro de banco indisponível.

Não houve commit, deploy ou aplicação da migração. O teste integrado exige a migração autorizada.
