import fakeUserImage from '@/features/assets/profile/fake-user.jpg';

export type FakeUserType = {
  src?: string;
  alt: string;
  initials: string;
  online?: boolean;
  active?: boolean;
  size?: number;
  name: string;
  role: string;
};

export const FakeUser: FakeUserType = {
  src: fakeUserImage,
  alt: 'Paul Sager',
  initials: 'PJ',
  online: true,
  active: false,
  size: 40,
  name: 'Paul Sager',
  role: 'Administrator'
};
