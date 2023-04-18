export type Post = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  text: string;
  createdAt: Date;
};

export type ProfileData = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  country: string;
  city: string;
  avatar: string;
};
