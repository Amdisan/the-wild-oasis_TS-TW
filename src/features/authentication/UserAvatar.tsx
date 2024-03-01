import { useUser } from './useUser';

function UserAvatar() {
  const { user } = useUser();
  const fullName = user?.user_metadata?.fullName;
  const avatar = user?.user_metadata?.avatar;

  return (
    <div className="flex items-center gap-5 text-2xl font-medium text-primary_color">
      <img
        className="block aspect-square w-14 rounded-full object-cover object-center outline-2 outline-text_gray_color"
        src={avatar || 'default-user.jpg'}
        alt={`Avatar of ${fullName}`}
      />
      <span className="text-text_color">{fullName}</span>
    </div>
  );
}

export default UserAvatar;
