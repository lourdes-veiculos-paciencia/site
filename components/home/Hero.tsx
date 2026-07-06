import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gradient-to-r
        from-red-700
        via-red-600
        to-red-500
      "
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <Container>
        <div
          className="
            relative
            flex
            min-h-[280px]
            flex-col
            items-center
            justify-center
            py-14
            text-center

            md:min-h-[520px]
            md:py-24
          "
        >
          {/* Badge */}
          <span
            className="
              rounded-full
              bg-white/20
              px-4
              py-1
              text-xs
              font-semibold
              uppercase
              tracking-widest
              text-white

              md:text-sm
            "
          >
            Lourdes Veículos
          </span>

          {/* Título */}
          <h1
            className="
              mt-5
              max-w-4xl
              text-3xl
              font-extrabold
              leading-tight
              text-white

              sm:text-4xl

              md:text-6xl
            "
          >
            Encontre o veículo ideal
            <br />
            para você
          </h1>

          {/* Texto */}
          <p
            className="
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-red-100

              sm:text-base

              md:text-xl
            "
          >
            Veículos revisados, procedência garantida e atendimento
            especializado para você sair de carro novo com tranquilidade.
          </p>

          {/* Botão */}
          <div className="mt-10">
            <Button
              href="/estoque"
              className="
                px-10
                py-4
                text-lg
                shadow-xl
              "
            >
              Ver Estoque
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}