import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import {
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  Clock,
} from "lucide-react";

export default function Localizacao() {
  return (
    <>
      <Header />

      <main className="bg-gray-100 py-12">
        <Container>
          <SectionTitle
            title="Nossa Localização"
            subtitle="Venha conhecer a Lourdes Veículos. Será um prazer receber você!"
          />

          {/* Mapa */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
            <iframe
              src="https://www.google.com/maps?q=Lourdes+Veiculos+Rio+de+Janeiro&output=embed"
              width="100%"
              height="500"
              loading="lazy"
              allowFullScreen
              className="border-0"
            />
          </div>

          {/* Botões */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <a
              href="https://www.google.com/maps/place/Lourdes+Veiculos/data=!4m2!3m1!1s0x0:0x871408be5687cea1?sa=X&ved=1t:2428&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition-all p-8 text-center"
            >
              <Navigation className="mx-auto w-10 h-10 text-red-600 mb-4" />

              <h3 className="text-xl font-bold">
                Abrir no Google Maps
              </h3>

              <p className="text-gray-600 mt-2">
                Trace sua rota até nossa loja.
              </p>
            </a>

            <a
              href="https://wa.me/5521999132358"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition-all p-8 text-center"
            >
              <MessageCircle className="mx-auto w-10 h-10 text-red-600 mb-4" />

              <h3 className="text-xl font-bold">
                WhatsApp
              </h3>

              <p className="text-gray-600 mt-2">
                Converse com nossa equipe.
              </p>
            </a>

            <a
              href="tel:+5521999132358"
              className="bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition-all p-8 text-center"
            >
              <Phone className="mx-auto w-10 h-10 text-red-600 mb-4" />

              <h3 className="text-xl font-bold">
                Ligar Agora
              </h3>

              <p className="text-gray-600 mt-2">
                Atendimento imediato.
              </p>
            </a>
          </div>

          {/* Informações */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

            <div className="bg-white rounded-xl shadow p-8">
              <MapPin className="w-8 h-8 text-red-600 mb-4" />

              <h3 className="text-2xl font-bold mb-4">
                Endereço
              </h3>

              <p className="text-gray-700 leading-8">
                Estr. Santa Eugênia, 772
                <br />
                Paciência
                <br />
                Rio de Janeiro - RJ
                <br />
                CEP: 23520-560
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-8">
              <Clock className="w-8 h-8 text-red-600 mb-4" />

              <h3 className="text-2xl font-bold mb-4">
                Horário de Atendimento
              </h3>

              <p className="text-gray-700">
                <strong>Segunda a Sexta</strong>
                <br />
                08:00 às 18:00
              </p>

              <div className="mt-5">
                <p className="text-gray-700">
                  <strong>Sábado</strong>
                  <br />
                  08:00 às 16:00
                </p>
              </div>
            </div>

          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}