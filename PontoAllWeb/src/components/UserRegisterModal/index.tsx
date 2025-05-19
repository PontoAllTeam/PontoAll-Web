export default function UserRegisterModal() {
  return (
    <div className='flex-col'>
      <h3 className='text-2xl text-text-secondary font-semibold'>
        Cadastrar Funcionário
      </h3>
      <hr className='border-t border-text-primary' />
      <form className='flex flex-col'>
        <label className='block text-text-secondary text-sm font-semibold mb-2 mt-8'>
          Nome
        </label>
        <input
          type='text'
          className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
          placeholder='Digite o nome do funcionário'
          //value={name}
          //onChange={(e) => setCorporateName(e.target.value)}
        />
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              CPF
            </label>
            <input
              type='text'
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              placeholder='Digite o CPF do funcionário'
              //value={corporateCnpj}
              //onChange={(e) => setCorporateCnpj(e.target.value)}
            />
          </div>
          <div className='flex-1'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              Telefone
            </label>
            <input
              type='text'
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              placeholder='Digite o telefone do funcionário'
              //value={corporatePhone}
              //onChange={(e) => setCorporatePhone(e.target.value)}
            />
          </div>
        </div>
        <label className='block text-text-secondary text-sm font-semibold mb-2'>
          E-mail
        </label>
        <input
          type='text'
          className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-6 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
          placeholder='Digite o e-mail do funcionário'
          //value={corporateCnpj}
          //onChange={(e) => setCorporateCnpj(e.target.value)}
        />
      </form>
    </div>
  );
}
