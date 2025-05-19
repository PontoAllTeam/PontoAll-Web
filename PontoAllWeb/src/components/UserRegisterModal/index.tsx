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
          className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-4 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
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
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-4 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
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
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-4 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
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
          className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-4 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
          placeholder='Digite o e-mail do funcionário'
          //value={corporateCnpj}
          //onChange={(e) => setCorporateCnpj(e.target.value)}
        />
        <label className='block text-text-secondary text-sm font-semibold mb-2'>
          E-mail de recuperação
        </label>
        <input
          type='text'
          className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-4 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
          placeholder='Digite o e-mail de recuperação do funcionário'
          //value={corporateCnpj}
          //onChange={(e) => setCorporateCnpj(e.target.value)}
        />
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              Registro
            </label>
            <input
              type='text'
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-4 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              placeholder='Digite o número do registro do funcionário'
              //value={corporateCnpj}
              //onChange={(e) => setCorporateCnpj(e.target.value)}
            />
          </div>
          <div className='flex-1'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              Tipo de Funcionário
            </label>
            <select
              required
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-4 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              // value={valorSelecionado}
              // onChange={(e) => setValorSelecionado(e.target.value)}
            >
              <option value="" disabled selected>Selecione o tipo do funcionário</option>
            </select>
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              Departamento
            </label>
            <select
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-4 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              // value={valorSelecionado}
              // onChange={(e) => setValorSelecionado(e.target.value)}
            >
              <option value="" disabled selected>Selecione o departamento do funcionário</option>
            </select>
          </div>
          <div className='flex-1'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              Setor
            </label>
            <select
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-4 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              // value={valorSelecionado}
              // onChange={(e) => setValorSelecionado(e.target.value)}
            >
              <option value="" disabled selected>Selecione o setor do funcionário</option>
            </select>
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              Senha
            </label>
            <input
              type='text'
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-4 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              placeholder='Digite a senha do funcionário'
              //value={corporateCnpj}
              //onChange={(e) => setCorporateCnpj(e.target.value)}
            />
          </div>
          <div className='flex-1'>
            <label className='block text-text-secondary text-sm font-semibold mb-2'>
              Status
            </label>
            <select
              required
              className='w-full h-10 py-2 p-2 text-sm text-text-primary mb-4 rounded-sm border border-text-primary focus:border-2 outline-none transition-all'
              // value={valorSelecionado}
              // onChange={(e) => setValorSelecionado(e.target.value)}
            >
              <option value="" disabled selected>Selecione o status do funcionário</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
