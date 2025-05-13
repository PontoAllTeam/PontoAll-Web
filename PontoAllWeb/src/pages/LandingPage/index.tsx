import imgLangingPage1 from '@/assets/images/imgLandingPage1.svg';

export default function LandingPage() {
  return (
    <div className='bg-background flex flex-col items-center'>
      <div className='flex justify-between items-center lg:px-13 lg:flex-row flex-col'>
        <div className='h-full w-[50%] py-13 lg:w-full lg:max-w-[40%] shrink-0 lg:text-left text-center'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-primary mb-6 text-wrap'>
            Gerencie o ponto de forma simples, eficiente e sem erros.
          </h1>
          <p className='text-lg text-secondary font-medium mb-6 text-wrap'>
            Automatize jornadas, evite erros e ganhe controle total sobre a rotina da sua equipe.
          </p>
          <button className='bg-secondary hover:bg-accent text-white font-semibold py-3 px-9 rounded-full transition duration-300 shadow-md'>
            Contrate nosso serviço
          </button>
        </div>
        <div className='flex relative self-end justify-center items-end size-full lg:max-w-[60%]'>
          <img
            src={imgLangingPage1}
            alt='imagem landingPage 1'
            className='h-full object-cover shrink-0'
          />
        </div>
      </div>
    </div>
  );
}
