export interface Veiculo {
  id: number;

  marca: string;
  modelo: string;
  versao: string;

  ano: number;
  km: number;
  preco: number;

  combustivel: string;
  cambio: string;

  motor: string;
  cor: string;
  cidade: string;

  portas: number;
  final_placa: number;

  descricao: string;

  destaque: boolean;
  vendido: boolean;

  created_at?: string;
  updated_at?: string;

  imagens: string[];
  opcionais?: string[];
}