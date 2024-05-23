import { Segmented } from 'antd';
import { useState } from "react"

export default function Coffee() {

    const [app, setApp] = useState('微信')

    return (
        <div>
            <div className="text-lg font-bold w-full bg-green-100 text-center py-2 rounded-lg text-green-700">喔喔喔！你是要赞助吗！！</div>

            <div className='card p-2 rounded-2xl mt-4'>
                <Segmented options={['微信', '支付宝']} block={true} value={app} onChange={(v) => { setApp(v.toString()) }} />

                <div mt-2>
                    {app === '微信' ?
                        <img src="/images/wechat.JPG" alt="" rounded-md /> :
                        <img src="/images/alipay.PNG" alt="" rounded-md />
                    }
                </div>
            </div>

            <div className='card p-2 rounded-2xl mt-4'>
                <div className='text-lg font-bold mb-2'>一些后话</div>
                <div>
                    <p>本站最初一直都是免费使用的，但是由于票根类的饭圈工具触及了饭圈美工的利益，小红书被恶意举报后，为了不影响市场增加了会员制度。但近期发现瑞幸等奶茶标签又火了起来，索性全部免费了</p>
                    <p>目前网站的月支出并不高，仅靠赞助就能养活啦~ 因为这个网站是我未成年时开发的，技术比较烂 可能有一些BUG，不过新网站也在逐步开发了，体验更好导出更快的说！欢迎加入QQ群一起吹水~</p>
                    <p>网站仅靠我一人维护，可能更新较慢，还请谅解qwq</p>
                    <p className='line-through'>如果你有能力修复BUG和新增功能 PR plz</p>
                </div>
            </div>
        </div>
    )
}
