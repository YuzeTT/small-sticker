// import React from 'react'

export default function Notice() {
  return (
    <div>
      <div className='-mx-4 bg-zinc-100 h-[1px] mb-3'></div>
      <div className='text-[24px] font-bold'>站点通知</div>
      <div className='-mx-4 bg-zinc-100 h-[1px] my-3'></div>


      <figure className="max-w-screen-md mx-auto text-center">
        <svg className="w-5 h-5 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
        </svg>
        <blockquote>
          <p className="text-xl font-medium text-gray-900 dark:text-white">十分遗憾，网站引起了部分人的不安，甚至采取了<span className='text-red-500 font-bold'>不正当手段</span></p>
        </blockquote>
        <div className="ps-3 mt-3 text-sm text-gray-500 dark:text-gray-400">站长 | YuzeTT</div>
      </figure>


      <div>
        <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
          <p className="text-sm font-medium leading-relaxed text-gray-900 dark:text-white">前情提要：<b>网站绝大部分资金（95%+）来源于小红书的广告费</b>，因为广告费足以支持网站维护，所以早期所有工具都是免费的</p>
        </blockquote>
        <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
          <p className="text-sm font-medium leading-relaxed text-gray-900 dark:text-white">关于收费：因网站免费导致利用接单盈利的人不满因此被恶意举报，故网站启用了收费制度，以减轻网站负担同时不抢他人饭碗</p>
        </blockquote>
      </div>
      <div className='my-4 text-sm'>网站同时也遭受了一定程度的黑客攻击（不过都抗住了），然而事情并没有那么快平息...</div>
      <div className='my-4 text-sm'>下文是全过程时间线，爱吃瓜的可以看看</div>
      <div>
        <ol className="relative border-s border-gray-200 list-none">
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023/10/29</time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">大麦票根生成器被举报</h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">大麦票根生成器发布2小时后，小红书笔记遭到人为举报下架。</p>
            <img src="/images/notice/1.jpg" alt="1" className='rounded-md shadow-lg' />
            <img src="/images/notice/2.png" alt="1" className='rounded-md shadow-lg mt-2' />

          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023/10/30</time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">申诉成功但无法展示</h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">暂不清楚是否为小红书的平台Bug，申诉成功后依旧显示违规，修改笔记依然秒下架。</p>
            <img src="/images/notice/3.png" alt="1" className='rounded-md shadow-lg' />
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023/10/31</time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">邮件联系薯队长无果</h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">反馈相关问题后根据回复引导进入反馈页面，提示已经申诉无法再次申诉。</p>
            <img src="/images/notice/4.png" alt="1" className='rounded-md shadow-lg' />
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023/11/17</time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">举报持续不断 账号报废</h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">虽然举报均未成立，但是对于账号依旧产生了极大的影响，后续所有笔记均无自然流量。多次联系官方，依旧无果。</p>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023/11/25</time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">账号健康等级下滑到底</h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">因被多次举报导致账号健康等级变为异常，平台将回收所有权益。理由为：“你的帐号历史存在大量社区不鼓励、不提倡的行为，如：发布不实信息、不友好/不合适的内容等”。</p>
            <img src="/images/notice/5.png" alt="1" className='rounded-md shadow-lg' />
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023/11/28</time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">网站资金源切断</h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">小红书回收了所有权限，网站至此也再无流量。网站采取保守措施，保留所有功能但是完全依靠赞助生存。</p>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023/11/28</time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">未完待续...</h3>
            {/* <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">小红书回收了所有权限，网站至此也再无流量。</p> */}
          </li>
        </ol>
      </div>
      {/* ======== Don't remove ======== */}
      {/* <div className='my-4'>
        <div className="text-xl font-bold">关于后续</div>
        <div className="text-sm mt-2 op80 mb-3">如果您有需求可以点击下面的按钮（小红书号：7252590990）找到我直接约稿</div>
        <a href="https://www.xiaohongshu.com/user/profile/650ab27f000000001603b1c9" className='flex items-center justify-center rounded-full text-center bg-[#FF2442] text-white py-2'>在小红书约稿</a>
      </div> */}
      <div className='my-4'>
        <div className="text-xl font-bold">写在最后</div>
        <div className="text-sm mt-2 op80">竞争可怕吗？倒也不。可怕的是通过不正当手段，损害他人利益的人。提供性价比更高，更快捷，更方便的服务，不是所有行业的初衷吗...</div>
      </div>
    </div>
  )
}
