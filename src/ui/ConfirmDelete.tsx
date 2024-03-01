import { HiTrash } from 'react-icons/hi2';
import Button from './Button';

type ConfirmDeleteProps = {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
  onCloseModal?: () => void;
};

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDeleteProps) {
  return (
    <div className="flex w-[40rem] flex-col gap-5">
      <h3 className="h3">Delete {resourceName}</h3>
      <p className="mb-5 text-text_gray_color">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-5">
        <Button
          variation="secondary"
          isDisabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          icon={<HiTrash />}
          variation="danger"
          isDisabled={disabled}
          onClick={() => {
            console.log('delete');
            onConfirm();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
