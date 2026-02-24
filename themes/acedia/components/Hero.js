/* eslint-disable @next/next/no-img-element */
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import SmartLink from '@/components/SmartLink'
import { useState, useEffect } from 'react'

/**
 * 打字机效果组件
 */
const TypewriterText = ({ text, delay = 150 }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // 确保在客户端才设置 mounted 状态
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    // SSR 安全检查
    if (typeof window === 'undefined' || !isMounted || !text || typeof text !== 'string') {
      return
    }
    
    let timeoutId
    if (currentIndex < text.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [currentIndex, text, delay, isMounted])

  // 如果尚未挂载或 text 不存在，返回完整文本
  if (!isMounted || !text || typeof text !== 'string') {
    return <span>{text || ''}</span>
  }
  
  return <span>{displayedText}</span>
}

/**
 * 英雄大图区块
 */
export const Hero = props => {
  const config = props?.NOTION_CONFIG || CONFIG
  const pageCover = props?.siteInfo?.pageCover
  const bannerImage =
    siteConfig('PROXIO_HERO_BANNER_IMAGE', null, config) || pageCover
  const bannerIframe = siteConfig('PROXIO_HERO_BANNER_IFRAME_URL', null, config)
  const PROXIO_HERO_BUTTON_1_TEXT = siteConfig(
    'PROXIO_HERO_BUTTON_1_TEXT',
    null,
    config
  )
  const PROXIO_HERO_BUTTON_2_TEXT = siteConfig(
    'PROXIO_HERO_BUTTON_2_TEXT',
    null,
    config
  )
  const PROXIO_HERO_BUTTON_2_ICON = siteConfig(
    'PROXIO_HERO_BUTTON_2_ICON',
    null,
    config
  )
  
  // 使用GREETING_WORDS配置作为主要打字内容，如果未配置则使用英雄区标题
  const greetingWords = siteConfig('GREETING_WORDS')?.split(',') || []
  const heroTitle1 = siteConfig('PROXIO_HERO_TITLE_1', null, config)
  const heroTitle2 = siteConfig('PROXIO_HERO_TITLE_2', 'I am a slow walker, but I never walk backwards.', config)
  
  return (
    <>
      {/* <!-- ====== Hero Section Start --> */}
      <div id='home' className='h-screen relative overflow-hidden bg-primary '>
        {/* 横幅图片 */}
        {!bannerIframe && bannerImage && (
          <LazyImage
            priority
            className='w-full object-cover absolute h-screen left-0 top-0 pointer-events-none'
            src={bannerImage}
          />
        )}
        <iframe
          src={bannerIframe}
          className='w-full absolute h-screen left-0 top-0 pointer-events-none'
        />
        {/* 阴影遮罩 */}
        <div className='h-1/2 w-full absolute left-0 bottom-0 z-10'>
          <div
            className='h-full w-full absolute bg-gradient-to-b from-transparent to-black'
          />
        </div>

        {/* 文字标题等 */}
        <div className='w-full absolute bottom-0 z-20 pb-15 text-white text-white-in-light'>
          <div className='container -mx-4 flex flex-wrap items-center'>
            <div className='w-full px-4'>
              <div
                className='hero-content wow fadeInUp mx-auto max-w-[780px] text-center'
                data-wow-delay='0.5s'>
                {/* 主标题 - 打字机效果 */}
                <h1 className='mb-6 text-3xl font-bold leading-snug sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]'>
                  <TypewriterText text={heroTitle1} delay={100} />
                </h1>
                {/* 次标题 - 打字机效果 */}
                <p className='mx-auto mb-9 max-w-[600px] text-base font-medium  sm:text-lg sm:leading-[1.44]'>
                  <TypewriterText text={heroTitle2} delay={100} />
                </p>
                {/* 按钮组 */}
                <ul className='mb-10 flex flex-wrap items-center justify-center gap-5'>
                  {PROXIO_HERO_BUTTON_1_TEXT && (
                    <li>
                      <SmartLink
                        href={siteConfig('PROXIO_HERO_BUTTON_1_URL', '')}
                        className='inline-flex items-center justify-center rounded-2xl bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2'>
                        {PROXIO_HERO_BUTTON_1_TEXT}
                      </SmartLink>
                    </li>
                  )}
                  {PROXIO_HERO_BUTTON_2_TEXT && (
                    <li>
                      <SmartLink
                        href={siteConfig('PROXIO_HERO_BUTTON_2_URL', '')}
                        className='inline-flex items-center justify-center rounded-2xl bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2'>
                        {PROXIO_HERO_BUTTON_2_ICON && (
                          <img className='mr-4 w-5' src={PROXIO_HERO_BUTTON_2_ICON} />
                        )}
                        {PROXIO_HERO_BUTTON_2_TEXT}
                      </SmartLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- ====== Hero Section End --> */}
    </>
  )
}