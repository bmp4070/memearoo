export interface Meme {
  id: string;
  title: string;
  imageUri: string;
}

export interface MemeAttempt {
  id: string;
  memeId: string;
  memeTitle: string;
  memeImageUri: string;
  imageUri: string;
  timestamp: number;
}
