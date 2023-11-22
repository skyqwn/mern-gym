import React, { useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store";
import { postActions } from "../reducers/post/postSlice";
import PostCreateModal from "../components/modals/PostCreateModal";
import { fetchPost } from "../reducers/post/postThunk";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

const Community = () => {
  const dispatch = useAppDispatch();
  const postState = useAppSelector((state) => state.postSlice);
  console.log(postState);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = Number(searchParams.get("page"));
  const navigate = useNavigate();
  const totalPage = postState.totalPage;
  const page = useMemo(() => {
    if (queryPage) return queryPage;
    return 1;
  }, [queryPage]);
  useEffect(() => {
    if (page > 0) {
      dispatch(fetchPost(page));
    } else {
      navigate("/community?page=1");
    }
  }, [page]);
  return (
    <Container>
      <PostCreateModal />
      <div className="fixed bottom-24 right-5 shadow-xl  rounded-full w-14 flex items-center justify-center text-white">
        <Button
          label="✏️"
          small
          onAction={() => {
            dispatch(postActions.createModalOpen({}));
          }}
        />
      </div>
      {postState.fetchPost.length > 0 &&
        postState.fetchPost.map((post) => (
          <div key={post.id} className="space-y-4 divide-y-[2px]">
            <Link
              to={`${post.id}`}
              state={{ post }}
              className="flex cursor-pointer flex-col pt-4"
            >
              <div key={post.id} className="text-red-500">
                <span className="flex ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 w-12">
                  {post.category}
                </span>
                <div className="mt-2 px-4 text-gray-700">
                  <span className="text-orange-500 font-medium">Q.</span>
                  {post.title}
                </div>
                <div className="mt-5 px-4 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
                  <span>{post.author.nickname}</span>
                  <span>{post.createAt.slice(0, 10)}</span>
                </div>
                <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t w-full">
                  <span className="flex space-x-2 items-center text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>궁금해요 1</span>
                  </span>
                  <span className="flex space-x-2 items-center text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      ></path>
                    </svg>
                    <span>답변 1</span>
                  </span>
                  <span className="flex space-x-2 items-center text-sm">
                    <svg
                      className="h-4 w-4 "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>like {post.likeUsers.length}</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      <Pagination currentPage={page} totalPage={totalPage} />
    </Container>
  );
};

export default Community;
