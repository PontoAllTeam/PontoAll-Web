import { useState, useEffect } from 'react';

interface InputProps {
  label: string;
  value?: string;
  description?: string;
  action: (value: string) => void;
}

function Input({ label, value = '', description, action }: InputProps) {
  return (
    <div className='mb-4'>
      <label className='block text-text-primary text-sm mb-1 break-all'>
        {label}:
      </label>
      <input
        type='text'
        className='w-full py-2 pl-4 text-sm text-text-primary rounded border border-text-primary focus:outline-none focus:border-gray-300'
        value={value}
        onChange={(e) => {
          action(e.target.value);
        }}
      />
      {description && (
        <p className='text-sm text-text-primary mt-1 text-center'>
          {description}
        </p>
      )}
    </div>
  );
}

interface ModalProps {
  title?: string;
  inputs?: { label: string; description?: string }[];
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
        {/* Cabeçalho do Modal */}
        <div className='flex justify-center items-center px-4 py-0 mr-0 border-0'>
          <h2 className='text-text-secondary text-xl font-semibold'>{title}</h2>
        </div>

        {/* Separador */}
        <hr className="border-t border-text-primary w-5/6 mx-auto" />

        {/* Corpo do Modal */}
        <div>
          {inputs.map((input, index) => (
            <Input
              key={`${input.label}-${index}`}
              label={input.label}
              description={input.description}
              value={formData[input.label] || ''}
              action={(value) => handleFormSubmit(input.label, value)}
            />
          ))}
          {description && (
            <p className='text-md text-text-primary p-4 text-center'>
              {description}
            </p>
          )}
        </div>

        {/* Rodapé do Modal */}
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
