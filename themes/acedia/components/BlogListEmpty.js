import { siteConfig } from '@/lib/config'

/**
 * 空的文章列表
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListEmpty = () => {
  return (
    <div className="text-center py-20">
      <i className="fas fa-box-open text-4xl text-gray-400" />
      <p className="mt-4 text-gray-500">{siteConfig('MESSAGE_404') || '没有找到文章'}</p>
    </div>
  )
}

export default BlogPostListEmpty