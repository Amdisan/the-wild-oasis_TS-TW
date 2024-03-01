import { useForm } from 'react-hook-form';
import { useUpdateUser } from './useUpdateUser';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';

type FormValues = {
  password: string;
  passwordConfirm: string;
};

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<FormValues>();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }: FormValues) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password (min 6 characters)"
        error={errors?.password?.message}
      >
        <input
          className="input"
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password needs a minimum of 6 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <input
          className="input"
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().password === value || 'Passwords need to match',
          })}
        />
      </FormRow>
      <FormRow>
        <>
          <Button onClick={reset} variation="secondary" type="reset">
            Cancel
          </Button>
          <Button isDisabled={isUpdating} type="submit">
            Update password
          </Button>
        </>
      </FormRow>
    </form>
  );
}

export default UpdatePasswordForm;
