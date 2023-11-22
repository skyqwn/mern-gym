export enum PostCategoryType {
  FREE = "FREE",
  ASK = "ASK",
  FLEX = "FLEX",
  REVIEW = "REVIEW",
  SHAREING = "SHAREING",
}

export interface PostType {
  author: {
    id: string;
    nickname: string;
  };
  authorId: string;
  category: PostCategoryType;
  createAt: string;
  desc: string;
  id: string;
  title: string;
  updateAt: string;
  likeUsers: string[];
}

export interface AddPostDataType {
  category: PostCategoryType;
  desc: string;
  title: string;
}

export interface AddPostDataTypeWithUser extends AddPostDataType {
  author: { id: string };
  authorId: string;
}
