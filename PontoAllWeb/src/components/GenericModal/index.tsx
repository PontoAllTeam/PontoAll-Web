import { useState, useEffect } from 'react';

interface InputProps {
  label: string;
  value?: string;
  description?: string;
  action: (value: string) => void;
}

function TextInput({ label, value = '', description, action }: InputProps) {
  return (
    <div className='mb-4'>
      <label className='block text-text-primary text-sm mb-1 break-all'>
        {label}:
      </label>
      <input
        type='text'
        className='w-full py-2 pl-4 text-sm text-text-primary rounded border border-neutral-dark'
        value={value}
        onChange={(e) => action(e.target.value)}
      />
      {description && (
        <p className='text-sm text-text-primary mt-1 text-center'>
          {description}
        </p>
      )}
    </div>
  );
}

function SelectInput({ label, value = '', description, action, options = [] }: InputProps & { options: string[] }) {
  return (
    <div className='mb-4'>
      <label className='block text-text-primary text-sm mb-1 break-all'>
        {label}:
      </label>
      <select
        className='w-full py-2 pl-4 text-sm text-text-primary rounded border border-neutral-dark'
        value={value}
        onChange={(e) => action(e.target.value)}
      >
        <option value=''>Selecione</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {description && (
        <p className='text-sm text-text-primary mt-1 text-center'>
          {description}
        </p>
      )}
    </div>
  );
}

interface InputField {
  label: string;
  description?: string;
  type?: 'text' | 'select';
  options?: string[];
}

interface ModalProps {
  title?: string;
  inputs?: InputField[];
  description?: string;
  action?: (data: { [key: string]: string }) => void;
  statusModal?: boolean;
  onClose?: () => void;
}

export default function Modal({
  title = 'Título',
  inputs = [],
  description,
  action,
  statusModal = false,
  onClose,
}: ModalProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(statusModal);

  useEffect(() => {
    setShowModal(statusModal);
  }, [statusModal]);

  const handleFormSubmit = (label: string, value: string) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const closeModal = () => {
    if (onClose) {
      onClose();
    } else {
      setShowModal(false);
    }
  };

  const handleSubmit = () => {
    if (action) {
      action(formData);
    }
    closeModal();
  };

  if (!showModal) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
      <form className='bg-white rounded-lg shadow-lg w-full max-w-lg p-4'>
        {/* Cabeçalho */}
        <div className='flex justify-left items-center'>
          <h2 className='text-text-secondary text-xl font-semibold'>{title}</h2>
        </div>

        <hr className='border-t border-text-primary mx-auto mb-4' />

        {/* Corpo */}
        <div>
          {inputs.map((input, index) => {
            const value = formData[input.label] || '';
            const commonProps = {
              label: input.label,
              description: input.description,
              value,
              action: (val: string) => handleFormSubmit(input.label, val),
            };

            return input.type === 'select' ? (
              <SelectInput key={index} {...commonProps} options={input.options || []} />
            ) : (
              <TextInput key={index} {...commonProps} />
            );
          })}

          {description && (
            <p className='text-md text-text-primary p-4 text-center'>
              {description}
            </p>
          )}
        </div>

        {/* Rodapé */}
        <div className='flex justify-end px-4 py-2'>
          <button
            type='button'
            className='bg-neutral-light text-text-primary px-5 py-1 rounded hover:bg-neutral-dark transition'
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            type='button'
            className='bg-secondary text-white px-5 py-1 rounded hover:bg-accent transition ml-3'
            onClick={handleSubmit}
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
}
