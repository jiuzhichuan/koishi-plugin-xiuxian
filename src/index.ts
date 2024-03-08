import { Context, Schema, Random, h } from 'koishi';
export const name = "xiuxian";
export interface Config { }

export const usage = `# <center>【修仙世界】</center><center>休闲挂机小游戏</center>

# <center>👉[![alt 爱发电](https://static.afdiancdn.com/static/img/logo/logo.png) 爱发电](https://afdian.net/a/jiuzhichuan)  👈</center>
 如果对这个插件感到满意，可以小小的充个电，让我有更大动力更新


## 🎈 介绍
当你上学带着手机无聊之时，当你上班摸鱼找不到好玩的东西的时候，挂机修仙类——\`koishi-plugin-xiuxian\`

## 🎮 使用
指令|说明|例子|状态
:-:|:-:|:-:|:-:
修仙签到|每日签到可获得灵力，提升境界|修仙签到|完成
闭关|通过闭关获得灵力，初始每秒获得0.5灵力|闭关|完成
出关|出关，获得闭关时长得到的灵力|出关 | 完成
突破境界/突破|当灵力超过当前境界时即可突破|突破|完成
修仙面板|查看自己的修仙面板状态|修仙面板|完成
移动 [上/下/左/右] | 类RPG移动 | 移动 上|施工中


## 🙏 致谢
- [Koishi](https://koishi.chat/) - 机器人框架
- [鬼谷八荒](https://dahuangwangluo.com/) - 灵感来源之一
- 麦Mai —— 1207108696`;
export const Config: Schema<Config> = Schema.object({})
const randoms = new Random(() => Math.random());
const crypto = require('crypto');

declare module 'koishi' {
    interface Tables {
        修仙: 修仙数据;
        // dice: xiuxian_dice;
    }
}
export interface 修仙数据 {
    id: number;
    userId: string;
    name: string;
    Time: number;
    realm: number;
    Psychic_power: number;
    status: string;
    Fairy_label: string;
    fight: string;
    player_HP: number;
    player_PP: number;
    Battle_Status: object;
    first_variable: string;
    skill: string[];
    lingshi: number;
    x: number;
    y: number;
}

export async function apply(ctx: Context) {
    ctx.model.extend('修仙', {
        id: 'unsigned',
        userId: 'string', //道友ID
        name: 'string', //道友昵称
        Time: 'unsigned', //闭关时间
        realm: 'unsigned', //境界
        Psychic_power: 'unsigned', //灵力
        status: 'string', //状态
        Fairy_label: 'string', //修仙签
        lingshi: 'unsigned', //灵石
        x: 'unsigned',// x坐标
        y: 'unsigned',// y坐标
    }, {
        autoInc: true,
    });
    
    // const Introduction = {"剑":"造成□伤害","匕首":"[1-3]造成□伤害(9次)","回旋镖":"造成□*2伤害,自身受到□伤害","火球":"[偶数]造成□伤害,燃烧1个骰子","雪球":"[奇数]造成□伤害,冰冻1个骰子","诅咒":"[1]造成□+1伤害，施加1层诅咒","毒药咒语":"[3]施加4层中毒","治愈水晶":"[1-3]回复□生命值","木质盾牌":"[1-4]获得□点护盾","复制":"[4-6]复制1个骰子","铲":"颠倒1个骰子","绝佳手气":"[1-5]重投1个点数更大的骰子","战斗翻滚":"重投1个骰子(3次)"};
    // const status = ["燃烧","冰冻","中毒","诅咒","护盾"];
    // const outfit = ["剑","匕首","回旋镖"];
    // const Attributes = ["毒药咒语","火球","雪球","诅咒"];
    // const Defence =["治愈水晶","木质盾牌"];
    // const Auxiliary = ["复制","铲","绝佳手气"];
    // const unusual = ["战斗翻滚"];

    // ————————————————————————————地图系统——————————————————————————————
/*     const place = {
        "0.0": {
            "name": "泉塔城",
            "description": "泉塔城，正在建设中",
            'command': `【商店】`
        },
        "0.1": {
            "name": "玄冥岩洞",
            "description": "玄冥岩洞隐藏在幽深的山谷之中，里面的矿石是泉塔城—黑心商人最喜欢的，可以拿去换钱",
            'command': `【挖矿】`
        },
        "0.2": {
            "name": "任务大殿",
            "description": "任务大厅是发布任务和领取任务的地方，各位道友可以在这里接取各种任务，赚取奖励和经验。",
            'command': `【任务列表】`
        },
        "1.0": {
            "name": "灵秘塔楼",
            "description": "在【灵秘塔楼】需要支付相应灵石进行闭关修炼，可保护玩家不受外界干扰/增加闭关获得灵力，例如：恶意骚扰闭关",
            'command': `【闭关】\n【出关】`
        },
        "-1.0": {
            "name": "秘境入口",
            "description": "通往秘境之路，有各种各样的秘境——建设中",
            'command': `【通秘】`
        }
    }; */
    const 境界名称 = ["人凡期","人凡期初阶","人凡期中阶","人凡期高阶","灵基期","灵基期初阶","灵基期中阶","灵基期高阶","纳真期","纳真期初阶","纳真期中阶","纳真期高阶","破虚期","破虚期初阶","破虚期中阶","破虚期高阶","辟神期","辟神期初阶","辟神期中阶","辟神期高阶","合道期","合道期初阶","合道期中阶","合道期高阶","易位期","易位期初阶","易位期中阶","易位期高阶","泰剧期","泰剧期初阶","泰剧期中阶","泰剧期高阶","超凡期","超凡期初阶","超凡期中阶","超凡期高阶","仙道者"];
/*     ctx.command('修仙系统')
        .subcommand('移动 <path>')
        .action(async ({ session }, path) => {
            const { userId, username } = session
            const read = await ctx.database.get('修仙', { userId })
            const currentPosition = place[`${read[0]?.x}.${read[0]?.y}`]
            if (read[0].status == '修炼中') {
                return `══移动位置══\n道友：${username}\n移动失败，你在闭关中`}
            const move = [{direction:'上',x:0,y:1},{direction:'下',x:0,y:-1},{direction:'左',x:-1,y:0},{direction:'右',x:1,y:0}]
            const targetOption = move.find(option => option.direction === path) // 将变量move的所有direction和path做判断
            if (!targetOption) { //判断失败返回如下
                return `══移动位置══\n道友：${username}\n位置：${currentPosition?.name}\n描述：${currentPosition?.description}\n\n移动失败，前面没路啦！`
            }
            const X = read[0]?.x + targetOption.x
            const Y = read[0]?.y + targetOption.y
            const XY = `${X}.${Y}`
            if (XY in place) {
                ctx.database.set('修仙', { userId }, { x: X, y: Y })
                const Position = place[XY]
                return `══移动位置══
道友：${username}
你走到了${Position?.name}
描述：${Position?.description}
上：${place[`${X}.${Y + 1}`]?.name || "没有路"}
下：${place[`${X}.${Y - 1}`]?.name || "没有路"}
左：${place[`${X - 1}.${Y}`]?.name || "没有路"}
右：${place[`${X + 1}.${Y}`]?.name || "没有路"}`
            } else {
                return `══移动位置══\n道友：${username}\n位置：${currentPosition?.name}\n描述：${currentPosition?.description}\n\n移动失败，前面没路啦！`
            }
        })
    ctx.command('修仙系统')
        .subcommand('修仙位置')
        .action(async ({ session }) => {
            const { userId, username } = session;
            const read = await ctx.database.get('修仙', { userId });
            const currentPlace = place[`${read[0]?.x}.${read[0]?.y}`] || { name: "没有路", description: "没有路" };
            const upPlace = place[`${read[0]?.x}.${read[0]?.y + 1}`] || { name: "没有路", description: "没有路" };
            const downPlace = place[`${read[0]?.x}.${read[0]?.y - 1}`] || { name: "没有路", description: "没有路" };
            const leftPlace = place[`${read[0]?.x - 1}.${read[0]?.y}`] || { name: "没有路", description: "没有路" };
            const rightPlace = place[`${read[0]?.x + 1}.${read[0]?.y}`] || { name: "没有路", description: "没有路" };
            return `══当前位置══
${currentPlace?.description}
道友：${username}
位置：${currentPlace?.name}
可用指令：\n${currentPlace?.command}\n
上：${upPlace?.name}
下：${downPlace?.name}
左：${leftPlace?.name}
右：${rightPlace?.name}`
        });
 */
    // ————————————————————————————地图系统——————————————————————————————
    ctx.command('修仙系统')
    .subcommand('赞助列表')
    .action(async({session}) => {
    const afdian = (await b(ctx));
    let msg = '━━赞助列表━━\n'
    const a = (await n(ctx));
    if (a.ec == 200){
      afdian.data.list.forEach(sponsor => {
        const [month, day, year] = new Date(sponsor.last_pay_time * 1000).toLocaleString('en-US', {timeZone: 'Asia/Shanghai'}).split(',')[0].split('/');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        msg += `昵称: ${sponsor.user.name}\n最后赞助时间: ${formattedDate}\n累计赞助金额: ${sponsor.all_sum_amount}\n━━━━━━━━━━━━━\n`
      });
      return msg
    }else{
      return `糟糕！我出错了！请联系我的开发者哦！`
    }})
    ctx.command('修仙系统') //指令名称 包括说明
        .subcommand('检测更新') // 子命令
        .action(async ({ session }) => {
            const packageJson = require('../package.json'); // package.json 在上级目录
            const version = packageJson.version;
            const plugin = await ctx.http.get(`https://registry.npmjs.org/koishi-plugin-${name}`)
            const len = Object.keys(plugin.time)
            return `══修仙世界══\n当前版本：${version}\n最新版本：${len[len.length - 1]}`
        })
    ctx.command('修仙系统', '休闲修仙文字游戏')
        .action(async ({ session }) => {
            const { userId, username } = session;
            return h.image('https://i0.hdslb.com/bfs/article/51231ef7084680b4d48eae342da0aa87486188624.png')
        });
    ctx.command('修仙系统')
        .subcommand('赞助')
        .action(async ({ session }) => {
            const { userId, username } = session;
            return h.image('https://i0.hdslb.com/bfs/article/4e8cfea5f492cc55d3284509461b058a486188624.jpg')
        });
    ctx.command('修仙系统')
        .subcommand('修仙重命名 <name>')
        .action(async({session},name) =>{
            const { userId, username } = session;
            const read = await ctx.database.get('修仙',{userId})
            if( name == undefined){
                return '══修仙世界══\n格式错误！\n正确格式：修仙重命名 [名称]'
            }else if ( read[0].name == ''){
                await ctx.database.set('修仙',{userId},{name})
                return `══修仙世界══\n重命名成功\n你的新名字：${name}`
            }

        })
    ctx.command('修仙系统')
        .subcommand('注册游戏 <name>')
        .action(async ({ session },name) => {
            const { userId, username } = session;
            const read = await ctx.database.get('修仙', { userId });
            if(!name){
                return `══修仙世界══\n格式错误！\n正确格式:注册游戏 [昵称]`}
            else if (read.length == 0) {
                await ctx.database.create("修仙", { userId,name, Time: 0, realm: 0, Fairy_label: '0', Psychic_power: 0, lingshi: 0, status: '空闲中' });
                return `══修仙世界══\n道友：${name}\n注册成功\n欢迎加入修仙世界\nTips：“修仙面板”可以查看你的信息`;
            }
            else {
                return `══修仙世界══\n道友：${read?.[0]?.name == '' ? userId : read?.[0]?.name}\n你已经注册了`;
            }
        });
    ctx.command('修仙系统')
        .subcommand('修仙签到')
        .action(async ({ session }) => {
            const { userId, username } = session;
            const read = await ctx.database.get('修仙', { userId });
            const power = randoms.int(10000, 20000);
            const time = Math.floor(Date.now() / 1000);
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const date = currentDate.getDate();
            const formattedTime = `${year}-${month}-${date}`;
            if (read.length == 0) {
                return `══修仙签到══\n道友：${read?.[0]?.name == '' ? userId : read?.[0]?.name}\n你还未注册\nTips：发送“注册游戏”`;
            }
            else if (read?.[0]?.Fairy_label == formattedTime) { //判断是否今日签到
                return `══修仙签到══\n道友：${read?.[0]?.name == '' ? userId : read?.[0]?.name}\n今日你已签到过了`;
            }
            else {
                await ctx.database.set("修仙", { userId: userId }, { Fairy_label: formattedTime, Psychic_power: read?.[0]?.Psychic_power + power });
                return `══修仙签到══\n道友：${read?.[0]?.name == '' ? userId : read?.[0]?.name}\n今日仙签成功\n道友获得${power}灵力`;
            }
        });
    ctx.command('修仙系统')
        .subcommand('修仙面板')
        .action(async ({ session }) => {
            const { userId } = session;
            const read = await ctx.database.get('修仙', { userId });
            const points = [0,2500,5000,7500,10000,25000,50000,75000,100000,250000,500000,750000,1000000,2500000,5000000,7500000,10000000,25000000,50000000,75000000,100000000,250000000,500000000,750000000,1000000000,2500000000,5000000000,7500000000,10000000000,25000000000,50000000000,75000000000,100000000000,250000000000,500000000000,750000000000,1000000000000];
            if (read?.[0]?.realm == undefined && read?.[0]?.Psychic_power == undefined) {
                return `══修仙面板══\n道友：${read?.[0]?.name == '' ? userId : read?.[0]?.name}\n你还未注册\nTips：发送“注册游戏”`;
            }
            else {
                const realm = read?.[0]?.realm ?? 0;
                const psychicPower = read?.[0]?.Psychic_power ?? 0;
                const text = `══修仙面板══\n道友：${read?.[0]?.name == '' ? userId : read?.[0]?.name}\n境界：${境界名称[realm]}\n`
                    + `距离下个境界：${psychicPower}/${points[realm + 1]}\n` 
                    // + `当前位置：${place[`${read[0]?.x}.${read[0]?.y}`].name}`
                    + `当前每秒闭关获得灵力：${realm === 0 ? 0.5 : (realm - 0.2)}`;
                return text + (realm == 0 ? `\n` : `\n`);
            }
        });
    ctx.command('修仙系统')
        .subcommand('闭关')
        .action(async ({ session }) => {
            const { userId, username } = session;
            const read = await ctx.database.get('修仙', { userId });
            const time = Math.floor(Date.now() / 1000);
            const currentDate = new Date(time * 1000);
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            if (read.length == 0) {
                return `══闭关修仙══\n道友：${read?.[0]?.name == '' ? userId : read?.[0]?.name}\n你还未注册\nTips：发送“注册游戏”`;
            }else if (read?.[0]?.Fairy_label == undefined) {
                return `══闭关修仙══\n你还未签到，请先签到后闭关吧\nTips:发送“修仙签到”签到吧`;
            }else if (read?.[0]?.status == '修炼中') {
                return '你已经开始闭关了';
            }else {
                await ctx.database.set('修仙', { userId: userId }, { Time: time, status: '修炼中' });
                return `══闭关修仙══\n道友：${read?.[0]?.name == '' ? userId : read?.[0]?.name}\n开始时间：${formattedDate}\n每秒获得：${read?.[0]?.realm == 0 ? 0.5 : (read?.[0]?.realm + 0.2)}灵力\n道友请努力冲刺最顶峰吧`;
            }
        });
    ctx.command('修仙系统')
        .subcommand('出关')
        .action(async ({ session }) => {
            const { userId, username } = session;
            const read = await ctx.database.get('修仙', { userId })
            if (read.length == 0) {
                return `══出关问世══\n道友：${read?.[0]?.name == '' ? userId : read?.[0]?.name}\n你还未注册\nTips：发送“注册游戏”`;
            }
            else if (read?.[0]?.status == '修炼中') {
                const a = Math.floor(Date.now() / 1000);
                const Psychic = a - read?.[0]?.Time; //现在时间减去挂机时间，进行计算
                const b = Math.ceil(read?.[0]?.realm == 0 ? 0.5 * Psychic : (Psychic * read?.[0]?.realm - 0.2)); //判断是否是初始境界，如果是不用扣除0.5灵力值
                await ctx.database.set('修仙', { userId: userId }, { Time: 0, Psychic_power: Math.ceil(read?.[0]?.Psychic_power + b), status: '空闲中' });
                return `══出关问世══\n道友：${read?.[0]?.name == '' ? userId : read?.[0]?.name}\n修炼时长：${Psychic}秒\n获得灵力：${b}`;
            }
            else {
                return '══出关问世══\n道友：' + userId + '\n你还没有开始闭关修炼';
            }
        });
    ctx.command('修仙系统')
        .subcommand('突破境界')
        .alias('突破')
        .action(async ({ session }) => {
            const { userId, username } = session;
            const read = await ctx.database.get('修仙', { userId });
            const realm = [0,2500,5000,7500,10000,25000,50000,75000,100000,250000,500000,750000,1000000,2500000,5000000,7500000,10000000,25000000,50000000,75000000,100000000,250000000,500000000,750000000,1000000000,2500000000,5000000000,7500000000,10000000000,25000000000,50000000000,75000000000,100000000000,250000000000,500000000000,750000000000,1000000000000];
            if (read.length == 0) {
                return `══突破境界══\n道友：${read?.[0]?.name == '' ? userId : read?.[0]?.name}\n你还未注册\nTips：发送“注册游戏”`;
            }
            else if (read?.[0]?.Psychic_power >= realm[(read?.[0]?.realm + 1)]) {
                await ctx.database.set('修仙', { userId: userId }, { realm: read?.[0]?.realm + 1 });
                return '══突破境界══\n道友：' + userId + '\n' + 境界名称[read?.[0]?.realm] + '->' + 境界名称[(read?.[0]?.realm + 1)] + '\n突破成功';
            }
            else {
                return '══突破境界══\n道友：' + userId + '\n' + '你的灵力还不够突破';
            }
        });
        ctx.command('修仙系统')
        .subcommand('天骄榜')
        .action(async ({ session }) => {
            const { userId, username } = session;
            // 一次性从数据库中获取所有修仙者数据
            const allData = await ctx.database.get('修仙', {});
            // 对数据进行预处理，筛选出有效数据并计算排名
            const validData = allData.filter(item => item.Psychic_power > 0);//filter函数，快速排序
            validData.sort((a, b) => b.Psychic_power - a.Psychic_power); // 这部分进行排序，降序排序，b大于a的话 b排在前面
            const topTen = validData.slice(0, 10); // 排列出10人天骄
            const numeral = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
            let tata = ''; // 存放文本
            let i = 1; // 将i++
            topTen.filter(pride => {
                const name = pride.name || pride.userId;
                tata += `第${numeral[i++]}名: ${name}\n\t境界：${境界名称[pride.realm]}\n`
            });
            return '══天骄榜══\n' + tata + 'Tips:想要在天骄榜显示昵称，可在【泉塔城】购买【重名符】\n新版本可以【修仙重命名 [名称]】,只能一次哦';
        });
    
    ctx.command('修仙系统')
        .subcommand('境界列表')
        .action(async ({ session }) => {
            const { userId, username } = session;
            let dat = '';
            for (let i = 0; i < 境界名称.length; i++) {
                const 境界 = 境界名称[i];
                dat += `${i}.${境界}\n`;
            }
            return '══境界列表══\n' + dat;
        });
}

const u='\x64\x35\x38\x37\x30\x37\x64\x34\x62\x30\x65\x30\x31\x31\x65\x64\x38\x34\x38\x35\x35\x32\x35\x34\x30\x30\x32\x35\x63\x33\x37\x37',t='\x55\x56\x50\x41\x42\x43\x34\x48\x6a\x63\x64\x53\x52\x79\x65\x4a\x37\x74\x66\x72\x38\x67\x78\x39\x54\x70\x77\x68\x35\x33\x51\x45';async function n(n){let e=Math.floor(Date.now()/1e3),r={page:1},o=`params${JSON.stringify(r)}ts${e}user_id${u}`,s=crypto.createHash("md5").update(t+o).digest("hex"),a={user_id:u,params:JSON.stringify(r),ts:e,sign:s},d=await n.http.post("https://afdian.net/api/open/ping",a);return d}async function b(n){let e=Math.floor(Date.now()/1e3),r={page:1},o=`params${JSON.stringify(r)}ts${e}user_id${u}`,s=crypto.createHash("md5").update(t+o).digest("hex"),a={user_id:u,params:JSON.stringify(r),ts:e,sign:s},d=await n.http.post("https://afdian.net/api/open/query-sponsor",a);return d}


function HP(currentHP, maxHP) {
    if (currentHP < 0) {
        currentHP = 0;
    }else if (currentHP > maxHP) {
        currentHP = maxHP;
    }
    const percentage = Math.floor((currentHP / maxHP) * 100);
    const barLength = Math.floor((percentage / 10));
    const progressBar = '[' + '='.repeat(barLength) + ' '.repeat(10 - barLength) + ']';
    return progressBar + currentHP;
}

//更新预告
/*魔道系统，地图系统，秘境系统，上榜交税，闭关保护，以及野外PK*/