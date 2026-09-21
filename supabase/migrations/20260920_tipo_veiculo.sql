-- Executar antes de usar os novos formularios. Nao classifica nem remove registros existentes.
BEGIN;
ALTER TABLE public.veiculos
  ADD COLUMN IF NOT EXISTS tipo text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.veiculos'::regclass AND conname = 'veiculos_tipo_check'
  ) THEN
    ALTER TABLE public.veiculos ADD CONSTRAINT veiculos_tipo_check
      CHECK (tipo IS NULL OR tipo IN ('carro', 'moto'));
  END IF;
END $$;
COMMIT;

NOTIFY pgrst, 'reload schema';
