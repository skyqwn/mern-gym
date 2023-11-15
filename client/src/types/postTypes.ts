enum PostCategoryType {
  FREE = "FREE",
  ASK = "ASK",
  FLEX = "FLEX",
  REVIEW = "REVIEW",
  SHAREING = "SHAREING",
}

export interface PostType {
  category: PostCategoryType;
  desc: string;
  title: string;
  id: string;
  author: {
    id: string;
    nickname: string;
  };
  authorId: string;
  createAt: string;
  updateAt: string;
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
