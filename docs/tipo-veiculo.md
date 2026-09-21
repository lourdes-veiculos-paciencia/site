# Estoques de carros e motos

Antes de usar os novos formularios, executar `supabase/migrations/20260920_tipo_veiculo.sql` no SQL Editor do projeto correto. O script adiciona `tipo` anulavel, sem default, com valores `carro` ou `moto`. Nao altera RLS nem classifica os registros existentes. O script nao foi executado automaticamente.

Novos cadastros exigem uma escolha. Na edicao, cadastros antigos podem continuar como "Nao classificado" ou receber um tipo. No estoque, Todos inclui os nao classificados; Carros e Motos mostram somente o tipo escolhido. As pesquisas e filtros continuam funcionando dentro da categoria selecionada.

As consultas publicas e o fallback JSON permanecem iguais; somente a normalizacao passa a preservar o novo campo. Sem a coluna no banco, a leitura continua funcionando, mas salvar pelo novo formulario requer a migracao.

Nao inferimos o tipo pela marca, pois marcas como Honda fabricam carros e motos. Classifique os registros antigos pelo painel.
