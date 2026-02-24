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

  // 客户端挂载检测
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  // 打字机效果逻辑
  useEffect(() => {
    // SSR 安全检查和初始文本设置
    if (typeof window === 'undefined') {
      return
    }
    
    if (!isMounted) {
      // 客户端挂载后立即显示完整文本作为 fallback
      setDisplayedText(text || '')
      return
    }
    
    // 重置状态当文本改变时
    if (currentIndex === 0 && text) {
      setDisplayedText('')
    }
    
    let timeoutId
    if (text && currentIndex < text.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText(prev => prev + (text[currentIndex] || ''))
        setCurrentIndex(prev => prev + 1)
      }, delay)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [currentIndex, text, delay, isMounted])

  // 服务端渲染或未挂载时的 fallback
  if (typeof window === 'undefined' || !isMounted) {
    return <span className="typewriter-fallback">{text || ''}</span>
  }
  
  // 客户端渲染时的打字机效果
  return (
    <span className="typewriter-active">
      {displayedText}
      {currentIndex < (text?.length || 0) && (
        <span className="cursor-blink">|</span>
      )}
    </span>
  )
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
      <div id='home' className='relative overflow-hidden bg-primary'>
        {/* 背景图片容器 */}
        <div className='w-full h-96 md:h-[500px] lg:h-[600px] relative overflow-hidden'>
          {!bannerIframe && bannerImage && (
            <LazyImage
              priority
              className='w-full h-full object-cover'
              src={bannerImage}
            />
          )}
          <iframe
            src={bannerIframe}
            className='w-full h-full object-cover'
          />
          {/* 阴影遮罩 */}
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40' />
        </div>


        {/* 文字内容区域 - 居中对齐但不居中定位 */}
        <div className='py-16 md:py-20 lg:py-24 bg-primary'>
          <div className='container px-4 md:px-6 lg:px-8'>
            <div className='max-w-3xl mx-auto text-center'>
              <div 
                className='hero-content wow fadeInUp space-y-6'
                data-wow-delay='0.3s'>
                {/* 主标题 */}
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
                  <TypewriterText text={heroTitle1} delay={100} />
                </h1>
                
                {/* 副标题 */}
                <p className='text-lg md:text-xl text-gray-200 font-medium leading-relaxed'>
                  <TypewriterText text={heroTitle2} delay={100} />
                </p>
                
                {/* 按钮组 */}
                {(PROXIO_HERO_BUTTON_1_TEXT || PROXIO_HERO_BUTTON_2_TEXT) && (
                  <div className='flex flex-col sm:flex-row gap-4 mt-8'>
                    {PROXIO_HERO_BUTTON_1_TEXT && (
                      <SmartLink
                        href={siteConfig('PROXIO_HERO_BUTTON_1_URL', '')}
                        className='inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-medium text-dark shadow-lg transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-xl w-full sm:w-auto'>
                        {PROXIO_HERO_BUTTON_1_TEXT}
                      </SmartLink>
                    )}
                    {PROXIO_HERO_BUTTON_2_TEXT && (
                      <SmartLink
                        href={siteConfig('PROXIO_HERO_BUTTON_2_URL', '')}
                        className='inline-flex items-center justify-center rounded-xl bg-transparent border-2 border-white px-6 py-3 text-base font-medium text-white shadow-lg transition duration-300 ease-in-out hover:bg-white/10 hover:shadow-xl w-full sm:w-auto'>
                        {PROXIO_HERO_BUTTON_2_ICON && (
                          <img className='mr-3 w-5 h-5' src={PROXIO_HERO_BUTTON_2_ICON} alt='' />
                        )}
                        {PROXIO_HERO_BUTTON_2_TEXT}
                      </SmartLink>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- ====== Hero Section End --> */}
    </>
  )
}