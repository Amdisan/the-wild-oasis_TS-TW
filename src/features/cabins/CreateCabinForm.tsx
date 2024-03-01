import { FieldErrors, useForm } from 'react-hook-form';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';

type FormValues = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | string;
};

type CreateCabinFormProps = {
  cabinToEdit?:
    | {
        createdAt: string;
        description: string;
        discount: number;
        id: number;
        image: string;
        maxCapacity: number;
        name: string;
        regularPrice: number;
      }
    | { id: undefined };
  onCloseModal?: () => void;
};

function CreateCabinForm({
  cabinToEdit = { id: undefined },
  onCloseModal,
}: CreateCabinFormProps) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<FormValues>({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;

  function onSubmit(data: FormValues) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { cabin: { ...data, image }, id: editId! },
        {
          //function parameter can be data that is exactly created or edited object
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      const newData = { cabin: { ...data, image: image } };
      createCabin(newData, {
        //function parameter can be data that is exactly created or edited object
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  //will be called by handlesubmit if there is form validation error
  function onError(errors: FieldErrors<FormValues>) {
    console.log(errors);
  }

  return (
    <form
      className={`overflow-hidden text-2xl ${onCloseModal ? 'w-[80rem]' : 'rounded-lg border border-border_color bg-primary_color px-16 py-10'}`}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <input
          className="input"
          disabled={isWorking}
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <input
          className="input"
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <input
          className="input"
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 10,
              message: 'Price should be at least 10',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <input
          className="input"
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <textarea
          className="shadow-mg h-32 w-full rounded-lg border px-5 py-3"
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <input
          type="file"
          className="block w-full rounded-md text-2xl text-text_gray_color  file:cursor-pointer file:rounded-md file:border-none file:bg-brand_bg_color file:px-5 file:py-3 file:font-medium file:text-brand_text_color file:transition file:duration-300 file:hover:bg-brand_bg_hover_color"
          disabled={isWorking}
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button isDisabled={isWorking} type="submit">
            {isEditSession ? 'Edit cabin' : 'Create new cabin'}
          </Button>
        </>
      </FormRow>
    </form>
  );
}

export default CreateCabinForm;
