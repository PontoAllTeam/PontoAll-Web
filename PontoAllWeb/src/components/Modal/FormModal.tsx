import * as Modal from './BaseModal';
import { FormEvent } from 'react';
import Button from '../Button';
import { MdAdd, MdClose } from 'react-icons/md';
import { useModalForm } from '@/hooks/useModalForm';
import { ModalProps } from './types';

interface FormModalProps extends ModalProps {
  onSubmit: (data?: unknown) => void;
  submitButtonLabel?: string;
  submitButtonColor?: 'secondary' | 'green' | 'red' | 'blue' | 'white';
  cancelButtonLabel?: string;
  cancelButtonColor?:
    | 'secondary'
    | 'cancel'
    | 'white'
    | 'red'
    | 'blue'
    | 'yellow'
    | 'green'
    | 'purple';
}

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  closeOnBackdropClick = false,
  showCloseButton = true,
  submitButtonLabel = 'Salvar',
  submitButtonColor = 'green',
  cancelButtonLabel = 'Cancelar',
  cancelButtonColor = 'cancel',
}: FormModalProps) {
  const { isSubmitting, handleSubmit } = useModalForm();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await handleSubmit(onSubmit, onClose);
  };

  return (
    <Modal.ModalRoot
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdropClick={closeOnBackdropClick && !isSubmitting}
    >
      <form onSubmit={handleFormSubmit}>
        <Modal.ModalHeader
          onClose={onClose}
          showCloseButton={showCloseButton}
          title={title}
        />
        <Modal.ModalContent>{children}</Modal.ModalContent>
        <Modal.ModalFooter>
          <Button
            type='button'
            onClick={onClose}
            label={cancelButtonLabel}
            color={cancelButtonColor}
            icon={<MdClose className='font-bold' />}
            disabled={isSubmitting}
          />
          <Button
            type='submit'
            label={isSubmitting ? 'Processando...' : submitButtonLabel}
            color={submitButtonColor}
            icon={<MdAdd className='font-bold' />}
            disabled={isSubmitting}
          />
        </Modal.ModalFooter>
      </form>
    </Modal.ModalRoot>
  );
}
