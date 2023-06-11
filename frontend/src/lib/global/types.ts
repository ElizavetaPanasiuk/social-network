export type Profile<AVATAR_T> = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: AVATAR_T;
  country: string;
  city: string;
  dateOfBirth: Date;
  password: string;
  email: string;
};

export type ConversationsResponse = {
  id: string;
  userId1: number;
  userId2: number;
  user1: Pick<Profile<string>, 'id' | 'avatar' | 'firstName' | 'lastName'>;
  user2: Pick<Profile<string>, 'id' | 'avatar' | 'firstName' | 'lastName'>;
}[];

export type SubscribersResponse = {
  id: number;
  subscriberId: number;
  profileId: number;
  subscriber: Pick<Profile<string>, 'id' | 'avatar' | 'firstName' | 'lastName'>;
}[];

export type SubscriptionsResponse = {
  id: number;
  subscriberId: number;
  profileId: number;
  profile: Pick<Profile<string>, 'id' | 'avatar' | 'firstName' | 'lastName'>;
}[];

export type Field<T> = {
  value: T;
  maxLength?: number;
  minLength?: number;
  regexp?: RegExp;
};

export type Fields<T> = {
  [fieldName: string]: Field<T>;
};

export type FormField<T> = Field<T> & { valid: boolean };

export type FormData<T> = {
  [fieldName: string]: FormField<T>;
};

export type PostInfo = {
  id: number;
  text: string;
  userId: number;
  liked: boolean;
  likes: number;
  createdAt: string;
  comments: number;
  user: Pick<Profile<string>, 'id' | 'avatar' | 'firstName' | 'lastName'>;
};

export type CommentInfo = {
  createdAt: string;
  id: number;
  liked: boolean;
  likes: number;
  text: string;
  userId: number;
  user: Pick<Profile<string>, 'id' | 'avatar' | 'firstName' | 'lastName'>;
};

export type MessageType = {
  createdAt: string;
  id: number;
  roomId: string;
  text: string;
  updatedAt: string;
  userId: number;
  user: Pick<Profile<string>, 'id' | 'avatar' | 'firstName' | 'lastName'>;
};

export type NotificationType = 'success' | 'warning' | 'error' | 'info';

export type QueryError = {
  value: boolean;
  message: string;
};

export type DateObj = {
  year: number | null;
  month: number | null;
  date: number | null;
};
