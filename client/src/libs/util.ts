export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export const getOptions = () => {
  const postCategoryOptions = [
    { value: "FREE", label: "자유" },
    { value: "ASK", label: "궁금해요" },
    { value: "FLEX", label: "자랑하기" },
    { value: "REVIEW", label: "리뷰" },
    { value: "SHARING", label: "공유" },
  ];

  return {
    postCategoryOptions,
  };
};
