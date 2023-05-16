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
