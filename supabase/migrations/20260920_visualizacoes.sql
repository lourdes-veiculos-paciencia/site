-- Aplicar somente após revisão e autorização. Não modifica veiculos ou Storage.
begin;
create table public.veiculo_visualizacoes (
  veiculo_id uuid not null,
  visita_id uuid not null,
  criado_em timestamptz not null default now(),
  primary key (veiculo_id, visita_id)
);
create index on public.veiculo_visualizacoes (criado_em);
alter table public.veiculo_visualizacoes enable row level security;
revoke all on public.veiculo_visualizacoes from public, anon, authenticated;
grant select on public.veiculo_visualizacoes to service_role;

-- Somente registro limitado; visitantes não podem ler ou alterar estatísticas.
create function public.registrar_visualizacao_veiculo(p_veiculo uuid, p_visita uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if p_visita is null or p_veiculo is null then return; end if;
  if not exists (select 1 from public.veiculos where id = p_veiculo) then return; end if;
  insert into public.veiculo_visualizacoes (veiculo_id, visita_id)
  values (p_veiculo, p_visita) on conflict do nothing;
end;
$$;
revoke all on function public.registrar_visualizacao_veiculo(uuid, uuid) from public, anon, authenticated;
grant execute on function public.registrar_visualizacao_veiculo(uuid, uuid) to anon;

create function public.ranking_visualizacoes_veiculos(p_dias integer default 30)
returns table (id uuid, nome text, visualizacoes bigint)
language sql security invoker set search_path = '' as $$
  select e.veiculo_id,
    coalesce(max(v.marca || ' ' || v.modelo), 'Veículo removido')::text,
    count(*)
  from public.veiculo_visualizacoes e
  left join public.veiculos v on v.id = e.veiculo_id
  where p_dias = 0 or e.criado_em >= now() - make_interval(days => case when p_dias = 7 then 7 else 30 end)
  group by e.veiculo_id order by count(*) desc, e.veiculo_id limit 20;
$$;
revoke all on function public.ranking_visualizacoes_veiculos(integer) from public, anon, authenticated;
grant execute on function public.ranking_visualizacoes_veiculos(integer) to service_role;
commit;
