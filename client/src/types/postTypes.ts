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
}

export interface AddPostDataType {
  category: PostCategoryType;
  desc: string;
  title: string;
}
