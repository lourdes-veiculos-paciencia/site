# ☁️ Setup - Upload de Imagens Supabase

## 📋 Pré-requisitos

Você precisa configurar o Supabase Storage para armazenar as imagens dos carros.

## 🔧 Passos para Configurar

### 1. **Acesse o Supabase Dashboard**
- Vá para [supabase.com](https://supabase.com)
- Abra seu projeto

### 2. **Crie um Bucket de Storage**
- No menu esquerdo, clique em **"Storage"**
- Clique em **"Create a new bucket"**
- Configure assim:
  - **Bucket name:** `veiculos`
  - **Visibility:** Public (para URLs públicas)
  - Clique em **"Create bucket"**

### 3. **Configure as Políticas de Acesso**

Vá para **Policies** (dentro de Storage > veiculos) e crie as seguintes regras:

#### Para Upload (INSERT):
Como o painel usa login administrativo proprio, e nao login do Supabase, o upload no navegador usa a chave publica (`anon`). Crie uma policy de insert para o bucket `veiculos`:

```sql
create policy "Permitir upload publico no bucket veiculos"
on storage.objects
for insert
to anon
with check (bucket_id = 'veiculos');
```

#### Para Leitura (SELECT):
```sql
create policy "Permitir leitura publica no bucket veiculos"
on storage.objects
for select
to public
using (bucket_id = 'veiculos');
```

Ou use o painel de Policies do Supabase para fazer isso visualmente.

### 4. **Configurar Variáveis de Ambiente** (já devem estar em .env)

Certifique-se que seu `.env.local` tem:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica
SUPABASE_SERVICE_ROLE_KEY=sua_chave_secreta
```

## ✅ Como Usar

### No Painel Admin - Criar Novo Veículo
1. Vá para `/admin/veiculos/novo`
2. Preencha os dados do veículo
3. Na seção **"Imagens"**, clique para selecionar as fotos
4. As imagens serão enviadas automaticamente para o Supabase
5. Clique em "Salvar"

### No Painel Admin - Editar Veículo
1. Vá para `/admin` e clique em "Editar"
2. Na seção **"Imagens"**, você verá as imagens atuais
3. Pode:
   - **Remover**: Passe o mouse sobre a foto e clique no ✕
   - **Adicionar**: Clique para selecionar novas fotos
4. Clique em "Atualizar"

## 🖼️ Características do Upload

- ✅ Suporta múltiplas imagens (PNG, JPG, GIF)
- ✅ Máximo 5MB por imagem
- ✅ Preview em tempo real
- ✅ Drag & drop support (opcional para adicionar)
- ✅ Remoção de imagens antes de salvar
- ✅ URLs públicas automáticas

## 🎯 O que Acontece com as Imagens

1. **Upload**: Imagens são enviadas para `supabase.com/storage/v1/object/public/veiculos/imagens/...`
2. **Armazenamento**: URLs são salvas no banco de dados como array JSON
3. **Exibição**: O site usa essas URLs em vez do arquivo JSON local
4. **Acesso**: 100% dos dados vêm do Supabase

## 📱 URLs das Imagens no Banco

No banco de dados, as imagens ficam assim:
```json
{
  "id": "uuid",
  "marca": "Fiat",
  "modelo": "Uno",
  "imagens": [
    "https://...supabase.co/storage/v1/object/public/veiculos/imagens/1720432800000-abc123-photo.jpg",
    "https://...supabase.co/storage/v1/object/public/veiculos/imagens/1720432801000-def456-photo.jpg"
  ]
}
```

## 🚀 Próximos Passos

Depois de configurar o Storage:
1. Crie um novo veículo com fotos
2. As imagens aparecerão automaticamente no site
3. Você pode deletar o arquivo `data/veiculos.json` depois de migrar tudo

## Banco de Dados

A tabela `veiculos` precisa ter uma coluna para guardar as URLs das fotos. Se aparecer o erro `Could not find the 'imagens' column of 'veiculos' in the schema cache`, rode no SQL Editor:

```sql
alter table public.veiculos
add column if not exists imagens jsonb;

notify pgrst, 'reload schema';
```

O campo salva um array JSON com as URLs publicas das imagens enviadas ao Storage.

## ❓ Troubleshooting

### Erro: "Storage not found"
- Certifique-se que o bucket `veiculos` foi criado
- Verifique se está com visibility "Public"

### Erro: "Permission denied"
- Verifique as Policies em Storage > Policies
- Certifique-se que está autenticado

### Imagens não aparecem
- Verificar a URL pública no bucket
- Testar a URL diretamente no navegador

---

Para dúvidas, consulte a [documentação oficial do Supabase Storage](https://supabase.com/docs/guides/storage/quickstart).
