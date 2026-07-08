import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import EstoqueContent from "@/components/estoque/EstoqueContent";
import { buscarVeiculosPublicos } from "@/lib/veiculos";

export default async function EstoquePage() {
  const veiculos = await buscarVeiculosPublicos();

  return (
    <>
      <Header />

      <main className="bg-gray-100 py-12">
        <Container>
          <SectionTitle
            title="Nosso Estoque"
            subtitle="Encontre o veiculo ideal para voce."
          />

          <EstoqueContent veiculos={veiculos} />
        </Container>
      </main>

      <Footer />
    </>
  );
}
