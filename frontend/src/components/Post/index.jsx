import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getListPost as getListPostAction, postListPost } from '@app/redux/post/actions'

const Post = () => {
  const data = useSelector((state) => state.posts.data)
  const loading = useSelector((state) => state.posts.loading)
  const postData = useSelector((state) => state.posts.postData)

  const dispatch = useDispatch()
  const getAllPost = useCallback(() => dispatch(getListPostAction()), [dispatch])
  const postPost = useCallback((data) => dispatch(postListPost(data)), [dispatch])
  useEffect(() => {
    getAllPost()
  }, [])
  const handleClick = () => {
    postPost({
      contentHTML: 'contentHTML',
      contentMarkdown: 'contentHTML',
      imageBase64: 'imageBase64',
      name: 'name',
      address: 'address',
    })
  }
  return (
    <>
      <button onClick={() => handleClick()}>Click me!</button>
    </>
  )
}

export default Post
