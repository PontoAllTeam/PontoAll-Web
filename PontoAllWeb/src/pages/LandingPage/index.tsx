import AccessibilityBar from '@/components/Header/AccessibilityBar';
import logoPontoAll from '@/assets/images/logoPontoAll.svg';
import imgLangingPage1 from '@/assets/images/imgLandingPage1.svg';

export default function LandingPage() {
  return (
    <div className='min-h-screen w-full bg-background flex flex-col items-center overflow-x-hidden'>
      <AccessibilityBar />
      <header className='bg-white w-full shadow z-10 flex'>
        <div className='max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between'>
          <img
            src={logoPontoAll}
            alt='logo do sistema'
            className='h-20 w-auto'
          />
          <button className='bg-secondary hover:bg-accent text-white text-md font-medium py-2 px-12 rounded-4xl transition duration-300'>
            Entrar
          </button>
        </div>
      </header>
      <main className='flex flex-1 flex-col lg:flex-row w-full items-center justify-between'>
        <div className='flex-1 text-left pl-8 pr-8 pb-12'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-primary mb-6'>
            Gerencie o ponto de
            <br />
            forma simples, eficiente
            <br />e sem erros.
          </h1>
          <p className='text-lg text-secondary font-medium mb-6'>
            Automatize jornadas, evite erros e ganhe controle
            <br />
            total sobre a rotina da sua equipe.
          </p>
          <button className='bg-secondary hover:bg-accent text-white font-semibold py-3 px-6 rounded-full transition duration-300'>
            Contrate nosso serviço
          </button>
        </div>
        <div className='flex-1 flex items-end justify-end h-full'>
          <img
            src={imgLangingPage1}
            alt='imagem landingPage 1'
            className='w-full max-w-3xl object-contain self-end lg:max-w-none'
          />
        </div>
      </main>

      <footer className='w-full bg-primary text-white py-6'>
        <div className='max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center'>
          <p className='text-sm sm:text-base mb-4'>
            © 2025 PontoAll. Todos os direitos reservados.
          </p>
          <div className='mt-4 text-sm'>
            <p>
              Desenvolvido por{' '}
              <a href='https://github.com/PontoAllTeam' className='text-accent'>
                PontoAll Team
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
