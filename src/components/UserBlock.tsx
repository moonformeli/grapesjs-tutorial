import { type User } from '../types';

interface UserProps {
  user: User;
}

export default function UserBlock({ user }: UserProps) {
  const { avatar, first_name, last_name } = user;

  return (
    <div className='user-block'>
      <img
        src={avatar}
        alt={first_name}
        className='rounded-full w-[50px] h-[50px]'
      />
      <p>
        {first_name} {last_name}
      </p>
    </div>
  );
}
