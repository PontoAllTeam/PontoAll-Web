import logoPontoAll from "../../assets/images/logoPontoAll.svg";

export default function LoginPage() {

  return (
    <div className="h-screen w-screen bg-background">
      <div className="md:w-[45%] w-full h-full bg-neutral-light flex flex-col justify-center items-center px-8">
      <img
          src={logoPontoAll}
          alt="Logo do Sistema"
          className="w-full max-w-[350px] h-auto"
        />
        <h3 className="text-lg font-medium text-secondary">
          Chegue, registre e trabalhe. <br />
          O futuro da marcação de ponto está aqui!
        </h3>
      </div>
    </div>
  );
}
