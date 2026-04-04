import BLOG from '@/blog.config'
import type { SiteData } from '../site.types'

export function EmptyData(pageId?: string): SiteData {
  return {
    NOTION_CONFIG: {},
    siteInfo: {
      title: 'AcediaX',
      description: '无法获取 Notion 数据',
      pageCover: '/web.jpg',
      icon: '/logo.svg',
      link: BLOG.LINK
    },
    notice: null,
    allPages: [],
    allNavPages: [],
    latestPosts: [],
    categoryOptions: [],
    tagOptions: [],
    customNav: [],
    customMenu: [],
    postCount: 0
  }
}
