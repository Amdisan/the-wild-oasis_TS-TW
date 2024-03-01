import { useForm } from 'react-hook-form';
import { useSignup } from './useSignup';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';

// Email regex: /\S+@\S+\.\S+/

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<FormValues>();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }: FormValues) {
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <input
          className="input"
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <input
          className="input"
          type="email"
          id="email"
          disabled={isLoading}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <input
          className="input"
          type="password"
          id="password"
          disabled={isLoading}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password needs a minimum  of 6 characters ',
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <input
          className="input"
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRow>

      <FormRow>
        <>
          {/* type is an HTML attribute! */}
          <Button
            isDisabled={isLoading}
            variation="secondary"
            type="reset"
            onClick={reset}
          >
            Cancel
          </Button>
          <Button isDisabled={isLoading} type="submit">
            Create new user
          </Button>
        </>
      </FormRow>
    </form>
  );
}

export default SignupForm;
