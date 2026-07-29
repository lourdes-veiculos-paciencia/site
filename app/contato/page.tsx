import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import WhatsAppModal from "@/components/WhatsAppModal";

import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

export default function Contato() {
  return (
    <>
      <Header />

      <main className="bg-gray-100 py-12">
        <Container>
          <SectionTitle
            title="Entre em Contato"
            subtitle="Estamos prontos para ajudá-lo a encontrar o veículo ideal."
          />

          {/* Ações rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

            <WhatsAppModal>
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-8 text-center cursor-pointer">
                <MessageCircle className="mx-auto text-red-600 w-10 h-10 mb-4" />

                <h3 className="text-xl font-bold">
                  WhatsApp
                </h3>

                <p className="text-gray-600 mt-2">
                  Converse com nossa equipe.
                </p>
              </div>
            </WhatsAppModal>

            <a
              href="tel:+5521999132358"
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-8 text-center"
            >
              <Phone className="mx-auto text-red-600 w-10 h-10 mb-4" />

              <h3 className="text-xl font-bold">
                Ligar Agora
              </h3>

              <p className="text-gray-600 mt-2">
                (21) 99913-2358
              </p>
            </a>

            <a
              href="/localizacao"
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-8 text-center"
            >
              <MapPin className="mx-auto text-red-600 w-10 h-10 mb-4" />

              <h3 className="text-xl font-bold">
                Localização
              </h3>

              <p className="text-gray-600 mt-2">
                Veja como chegar.
              </p>
            </a>

          </div>

          {/* Informações */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">

            <div className="bg-white rounded-xl shadow p-6">
              <MapPin className="text-red-600 mb-4" />

              <h3 className="font-bold text-xl mb-3">
                Endereço
              </h3>

              <p className="text-gray-600">
                Estr. Santa Eugênia, 772
                <br />
                Paciência
                <br />
                Rio de Janeiro - RJ, 23520-560
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <Phone className="text-red-600 mb-4" />

              <h3 className="font-bold text-xl mb-3">
                Telefones
              </h3>

              <p className="text-gray-600">
                WhatsApp 1: (21) 99913-2358
              </p>

              <p className="text-gray-600 mt-2">
                WhatsApp 2: (21) 96565-4406
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <Clock className="text-red-600 mb-4" />

              <h3 className="font-bold text-xl mb-3">
                Horário
              </h3>

              <p className="text-gray-600">
                Segunda a Sexta
                <br />
                08:00 às 18:00
              </p>

              <p className="text-gray-600 mt-3">
                Sábado
                <br />
                08:00 às 16:00
              </p>
            </div>

          </div>

          {/* Chamada Final */}
          <div className="bg-red-600 rounded-2xl text-white text-center mt-16 p-10">

            <h2 className="text-3xl font-bold">
              Ainda está com dúvidas?
            </h2>

            <p className="mt-4 text-red-100">
              Nossa equipe está pronta para atender você.
            </p>

            <div className="mt-8 flex justify-center">
              <WhatsAppModal>
                <div className="inline-block bg-white text-red-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition cursor-pointer">
                  Conversar pelo WhatsApp
                </div>
              </WhatsAppModal>
            </div>

          </div>

        </Container>
      </main>

      <Footer />
    </>
  );
}
