import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import { Blog } from './Blog'
import BlogPostListEmpty from './BlogListEmpty'
import PaginationNumber from './PaginationNumber'

/**
 * 文章列表分页表格
 * @param page 当前页
 * @param posts 所有文章
 * @param postCount 文章总数
 * @returns {JSX.Element}
 * @constructor
 */
const BlogListPage = ({ page = 1, posts = [], postCount, siteInfo }) => {
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('PROXIO_POSTS_PER_PAGE', 12, CONFIG) // 默认每页12篇文章
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const showPagination = postCount >= POSTS_PER_PAGE
  
  // 计算当前页的文章列表
  const startIndex = (page - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = posts.slice(startIndex, endIndex)

  if (!currentPosts || currentPosts.length === 0 || page > totalPage) {
    return <BlogPostListEmpty />
  } else {
    return (
      <div className='w-full'>
        {/* 文章列表 */}
        <Blog posts={currentPosts} />
        
        {showPagination && (
          <PaginationNumber page={page} totalPage={totalPage} />
        )}
      </div>
    )
  }
}

export default BlogListPage