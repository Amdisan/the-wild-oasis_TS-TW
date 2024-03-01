import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';

function Account() {
  return (
    <>
      <h1 className="text-5xl font-semibold dark:text-white">
        Update your account
      </h1>

      <div className="flex flex-col gap-7">
        <h3 className="h3">Update user data</h3>
        <UpdateUserDataForm />
      </div>

      <div className="flex flex-col gap-7">
        <h3 className="h3">Update password</h3>
        <UpdatePasswordForm />
      </div>
    </>
  );
}

export default Account;
