import { FormEvent, useState } from 'react';
import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const email = user?.email;
  const currentFullName = user?.user_metadata?.fullName;

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          console.log('first');
          setAvatar(null);
          (e.target as HTMLFormElement).reset(); //looks like is not working
        },
      },
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <input className="input" value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <input
          className="input"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <input
          className="block w-full rounded-md text-2xl text-text_gray_color  file:cursor-pointer file:rounded-md file:border-none file:bg-brand_bg_color file:px-5 file:py-3 file:font-medium file:text-brand_text_color file:transition file:duration-300 file:hover:bg-brand_bg_hover_color"
          id="avatar"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target?.files && e.target?.files[0];
            setAvatar(file);
          }}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            type="reset"
            variation="secondary"
            isDisabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button isDisabled={isUpdating} type="submit">
            Update account
          </Button>
        </>
      </FormRow>
    </form>
  );
}

export default UpdateUserDataForm;
