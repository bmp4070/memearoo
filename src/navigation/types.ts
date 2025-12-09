import { Meme } from '../types/models';

export type RootStackParamList = {
  Tabs: undefined;
  MemeChallenge: { meme: Meme };
  Result: { meme: Meme; photoUri: string };
  AttemptDetail: { attemptId: string };
};

export type TabParamList = {
  Home: undefined;
  Gallery: undefined;
  Settings: undefined;
};
