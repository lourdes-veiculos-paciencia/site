# Acesso administrativo ao Storage

As consultas publicas mantem a chave publicavel existente. Apenas as exclusoes administrativas usam um cliente separado com `SUPABASE_SECRET_KEY`, construido apos validar a sessao assinada. A verificacao de vinculos nesse cliente enxerga os registros sem os filtros de RLS. Nenhuma policy precisa ser alterada.

Configuracao privada do servidor:

- `ADMIN_USER` e `ADMIN_PASSWORD`: credenciais existentes, preservadas.
- `ADMIN_SESSION_SECRET`: segredo aleatorio de pelo menos 32 caracteres. Gerar, por exemplo, com `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` em um terminal privado.
- `SUPABASE_SECRET_KEY`: Secret key (`sb_secret_...`) do mesmo projeto Supabase. Nunca usar prefixo `NEXT_PUBLIC`, enviar ao navegador ou versionar.

Em desenvolvimento, configure no `.env.local`, reinicie `npm.cmd run dev` e entre novamente no painel. O cookie antigo `admin-auth=true` nao e aceito. A sessao assinada dura oito horas; trocar senha ou segredo invalida sessoes anteriores. Logout remove o cookie do navegador; um token previamente copiado continua valido ate expirar ou os segredos serem trocados.

Quando o deploy for autorizado, configure os dois novos segredos no servidor de producao antes de publicar. Nao publique `.env.local`. O acesso administrativo falha de forma fechada sem a configuracao; o estoque publico nao depende desses segredos.

Validacao local sem exclusoes reais: `node --test tests/*.test.mjs`, `npm.cmd run lint`, `npm.cmd run build`.

O teste de exclusao real ainda depende da chave configurada e deve usar somente um arquivo descartavel. Banco e Storage nao compartilham uma transacao: permanece uma janela de concorrencia com cadastros/edicoes simultaneos. Nao excluir fotos de formularios ainda nao salvos. A galeria continua usando a leitura publica para visualizacao; a decisao de excluir e sempre refeita no servidor com o cliente administrativo.
