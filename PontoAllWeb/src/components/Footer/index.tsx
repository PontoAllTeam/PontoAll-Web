export default function Footer() {
  return (
    <footer className='w-full bg-primary text-white py-6'>
        <div className='max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center'>
          <p className='text-sm sm:text-base mb-4'>
            © 2025 PontoAll. Todos os direitos reservados.
          </p>
          <div className='mt-4 text-sm'>
            <p>
              Desenvolvido por{' '}
              <a href='https://github.com/PontoAllTeam' className='text-accent' target="_blank" rel="noopener noreferrer">
                PontoAll Team
              </a>
            </p>
          </div>
        </div>
      </footer>
  );
}
