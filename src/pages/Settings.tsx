import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';

function Settings() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="h1">Update hotel settings</h1>
      <UpdateSettingsForm />
    </div>
  );
}

export default Settings;
