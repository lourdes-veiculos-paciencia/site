export interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  versao: string;
  ano: number;
  km: number;
  preco: number;
  imagens: string[];
  combustivel: string;
  cambio: string;
  cor: string;
  cidade: string;
  portas: number;
  motor: string;
  finalPlaca: number;
  descricao: string;
  opcionais: string[];
  destaque: boolean;
  vendido: boolean;
}