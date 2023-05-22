type ProfileMainInfo = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
};

export type ConversationsResponse = {
  id: string;
  userId1: number;
  userId2: number;
  user1: ProfileMainInfo;
  user2: ProfileMainInfo;
}[];

export type SubscribersResponse = {
  id: number;
  subscriberId: number;
  profileId: number;
  subscriber: ProfileMainInfo;
}[];

export type SubscriptionsResponse = {
  id: number;
  subscriberId: number;
  profileId: number;
  profile: ProfileMainInfo;
}[];

export type Field<T> = {
  value: T;
  maxLength?: number;
  minLength?: number;
};

export type Fields<T> = {
  [fieldName: string]: Field<T>;
};

export type FormField<T> = Field<T> & { valid: boolean };

export type FormData<T> = {
  [fieldName: string]: FormField<T>;
};

export type BasicProfileInfo = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
};

export type PostInfo = {
  id: number;
  text: string;
  userId: number;
  liked: boolean;
  likes: number;
  createdAt: string;
  comments: number;
  user: BasicProfileInfo;
};

export type CommentInfo = {
  createdAt: string;
  id: number;
  liked: boolean;
  likes: number;
  text: string;
  userId: number;
  user: BasicProfileInfo;
};

export type MessageType = {
  createdAt: string;
  id: number;
  roomId: string;
  text: string;
  updatedAt: string;
  userId: number;
  user: BasicProfileInfo;
};
