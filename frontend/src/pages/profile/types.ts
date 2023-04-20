export type Post = {
  id: number;
  avatar: string;
  text: string;
  createdAt: string;
  author: {
    firstName: string;
    lastName: string;
  };
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
