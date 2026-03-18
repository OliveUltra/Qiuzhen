// js/data.js
// 赛事、赔率、AI、社区等静态数据

export const MATCHES = [
  { id:'match_ac_inter',  league:'意甲',    round:'第28轮',   time:'03:45', status:'直播中',  home:'AC米兰',    away:'国际米兰',   hc:'#E24B4A', ac:'#185FA5', score:'1-1', hf:['W','W','D','W','L'], af:['W','D','W','W','W'], posts:[{t:'米兰德比：双雄激战欧冠资格，数据深度解析',a:'王牌一哥'},{t:'（粉丝福利）米兰德比谁能笑到最后？',a:'汤汤聊球'}] },
  { id:'match_bren_wol',  league:'英超',    round:'第30轮',   time:'04:00', status:'未开赛',  home:'布伦特福德', away:'狼队',        hc:'#E24B4A', ac:'#EF9F27', hf:['W','D','W','L','W'], af:['L','W','D','L','W'], posts:[{t:'布伦特福德主场迎战狼队，能否稳固第七？',a:'足球狂想曲'},{t:'历史交锋数据揭示暗流涌动',a:'得金圣手'}] },
  { id:'match_sp_fra',    league:'德甲',    round:'第25轮',   time:'22:30', status:'未开赛',  home:'圣保利',     away:'法兰克福',    hc:'#5F5E5A', ac:'#E24B4A', hf:['L','D','W','L','D'], af:['W','W','D','W','L'], posts:[{t:'圣保利主场迎战法兰克福，保级大战一触即发',a:'绿茵指南针'}] },
  { id:'match_baj_lev',   league:'西甲',    round:'第27轮',   time:'04:00', status:'未开赛',  home:'巴列卡诺',   away:'莱万特',      hc:'#E24B4A', ac:'#185FA5', hf:['W','W','W','D','W'], af:['L','D','W','D','L'], posts:[{t:'状态大好，巴列卡诺是否主场有表现',a:'绿茵指南针'}] },
  { id:'match_lan_mez',   league:'法甲',    round:'第25轮',   time:'22:00', status:'未开赛',  home:'朗斯',       away:'梅斯',        hc:'#E24B4A', ac:'#888780', hf:['D','W','L','W','D'], af:['L','L','D','W','L'], posts:[{t:'朗斯主场迎战梅斯，保级之路再添变数',a:'龙老师解球'}] },
  { id:'match_wuh_bjg',   league:'中超',    round:'第1轮',    time:'19:00', status:'未开赛',  home:'武汉三镇',   away:'北京国安',    hc:'#E24B4A', ac:'#185FA5', hf:['W','D','W','W','L'], af:['W','W','D','W','W'], posts:[{t:'中超焦点对决：武汉三镇主场迎战北京国安',a:'足球狂想曲'}] },
  { id:'match_zj_qd',     league:'中超',    round:'第1轮',    time:'15:30', status:'未开赛',  home:'浙江队',     away:'青岛西海岸',  hc:'#3B6D11', ac:'#185FA5', hf:['D','W','L','W','D'], af:['W','L','D','W','L'], posts:[{t:'中超首轮开幕！浙江队主场能否开门红？',a:'球迷之声'}] },
  { id:'match_ben_por',   league:'葡超',    round:'第25轮',   time:'02:00', status:'未开赛',  home:'本菲卡',     away:'波尔图',      hc:'#E24B4A', ac:'#185FA5', hf:['W','W','W','W','D'], af:['W','W','D','W','W'], posts:[{t:'葡超双雄！本菲卡 vs 波尔图，争冠关键役',a:'葡超专家'}] },
  { id:'match_ful_sou',   league:'英足总杯', round:'1/8决赛', time:'20:00', status:'未开赛',  home:'富勒姆',     away:'南安普顿',    hc:'#E24B4A', ac:'#E24B4A', hf:['W','D','W','W','L'], af:['L','D','L','W','L'], posts:[{t:'英足总杯富勒姆迎战南安普顿，谁能晋级？',a:'野猫侃球'}] },
];

export const LIVE_MATCHES = [
  { league:'意甲', home:'AC米兰',    away:'国际米兰',  hc:'#E24B4A', ac:'#185FA5', score:'1-1',  min:"64'" },
  { league:'英超', home:'布伦特福德', away:'狼队',       hc:'#E24B4A', ac:'#EF9F27', score:'0-0',  min:"23'" },
  { league:'德甲', home:'圣保利',     away:'法兰克福',   hc:'#5F5E5A', ac:'#E24B4A', score:'1-2',  min:"51'" },
  { league:'法甲', home:'朗斯',       away:'梅斯',       hc:'#E24B4A', ac:'#888780', score:'2-1',  min:"78'" },
  { league:'西甲', home:'巴列卡诺',   away:'莱万特',     hc:'#E24B4A', ac:'#185FA5', score:'0-1',  min:"38'" },
  { league:'中超', home:'武汉三镇',   away:'北京国安',   hc:'#E24B4A', ac:'#185FA5', score:'未开', min:'19:00' },
];

export const ODDS_DATA = [
  { home:'AC米兰',    away:'国际米兰',  league:'意甲', time:'直播中', win:'2.45', draw:'3.10', lose:'2.90', asian:'主让半', ou:'2.5球', wchg:'up',   dchg:'flat', lchg:'dn'   },
  { home:'布伦特福德', away:'狼队',      league:'英超', time:'04:00', win:'1.95', draw:'3.40', lose:'3.80', asian:'平手',   ou:'2.5球', wchg:'dn',   dchg:'flat', lchg:'up'   },
  { home:'圣保利',    away:'法兰克福',  league:'德甲', time:'22:30', win:'3.20', draw:'3.15', lose:'2.25', asian:'受让半', ou:'3球',   wchg:'flat', dchg:'dn',   lchg:'up'   },
  { home:'巴列卡诺',  away:'莱万特',    league:'西甲', time:'04:00', win:'2.10', draw:'3.25', lose:'3.40', asian:'主让半', ou:'2.5球', wchg:'up',   dchg:'flat', lchg:'dn'   },
  { home:'武汉三镇',  away:'北京国安',  league:'中超', time:'19:00', win:'2.55', draw:'3.10', lose:'2.80', asian:'平手',   ou:'2.5球', wchg:'flat', dchg:'up',   lchg:'flat' },
];

export const ASIAN_DATA = [
  { home:'AC米兰',    away:'国际米兰',  pan:'主让半球', hw:'0.88', aw:'0.92', trend:'主队水位流入' },
  { home:'布伦特福德', away:'狼队',      pan:'平手盘',   hw:'0.92', aw:'0.88', trend:'客队水位抬升' },
  { home:'巴列卡诺',  away:'莱万特',    pan:'主让半球', hw:'0.85', aw:'0.95', trend:'主队大幅流入' },
  { home:'本菲卡',    away:'波尔图',    pan:'主让半球', hw:'0.88', aw:'0.92', trend:'客队小幅流入' },
];

export const AI_DATA = {
  win: 42, draw: 28, lose: 30,
  factors: [
    { name:'近期状态', val:'AC米兰近5场 3胜1平1负' },
    { name:'历史交锋', val:'近10次主胜4平3负3' },
    { name:'赔率走势', val:'主胜赔率持续下降 (利好主队)' },
    { name:'伤病情报', val:'国际米兰核心中场伤缺' },
  ],
  verdict: '主队略占优势，建议关注主胜或平局，赔率性价比较高。'
};

export const AI_HISTORY = [
  { match:'拉齐奥 vs AC米兰',    league:'意甲',  pred:'客胜', score:'0-1',     hit:true  },
  { match:'皇家社会 vs 奥萨苏纳', league:'西甲',  pred:'主胜', score:'3-1',     hit:true  },
  { match:'布拉干蒂诺 vs 圣保罗', league:'巴西甲', pred:'平局', score:'1-2',    hit:false },
  { match:'尼克斯 vs 勇士',       league:'NBA',   pred:'主胜', score:'110-107', hit:true  },
  { match:'骑士 vs 独行侠',       league:'NBA',   pred:'主胜', score:'120-130', hit:false },
  { match:'本菲卡 vs 波尔图',     league:'葡超',  pred:'主胜', score:'待开赛',  hit:null  },
];

export const COMMUNITY_POSTS = [
  { av:'竹', author:'竹林与风',   role:'精英分析师', community:'悟空武道会', time:'32分钟前', league:'西甲',    title:'阿尔巴塞特保级压力笼罩颓势，残阵出击能否奇迹逆转？',    body:'本场阿尔巴塞特主场迎战拉斯帕尔马斯，近5轮仅1胜，主力前锋伤缺，防线失误频繁。客队状态回暖，连续3场不败。综合赔率走势和亚盘数据，客队优势明显。', views:2341, comments:86,  votes:['主胜 38%','平局 24%','客胜 38%'], color:'#534AB7' },
  { av:'翰', author:'翰哥解红球', role:'篮球专家',   community:'翰哥篮球吧', time:'1小时前',  league:'NBA',     title:'亚特兰大老鹰 vs 奥兰多魔术——客场魔术能否延续强势？',         body:'魔术本赛季客场防守评分联盟前五，老鹰主场虽占地利，但伤病困扰导致轮换深度严重不足。从大数据来看本场大球更值得关注，近5次交锋均越线。',        views:1892, comments:54,  votes:['主胜 35%','客胜 65%'],              color:'#185FA5' },
  { av:'梅', author:'梅西美少女', role:'',           community:'高手集中营', time:'2小时前',  league:'哈萨克超', title:'3.17 周二梅西福利 · 阿拉木图凯拉特 vs 阿克托比',            body:'凯拉特主场连续4场不败，阿克托比客场仅1胜4负。赔率方面主队持续被压低，亚盘平手偏主，水位走势支撑主队。',                                         views:987,  comments:31,  votes:['主胜 61%','平局 22%','客胜 17%'], color:'#E24B4A' },
  { av:'皇', author:'皇霸天',     role:'精英分析师', community:'粤语吧',     time:'3小时前',  league:'英超',    title:'布伦特福德 vs 狼队 · 主场优势能否延续？数据深挖',              body:'布伦特福德近期主场成绩优异，5场4胜1平，进攻端火力全开。狼队客场防守存在明显漏洞，近6次客场失球率高达83%。欧赔主胜1.95性价比极高。',           views:3241, comments:124, votes:['主胜 58%','平局 22%','客胜 20%'], color:'#534AB7' },
];

export const FOOTBALL_LEAGUES = [
  { icon:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', name:'英超', country:'英格兰', badge:'20支球队' },
  { icon:'🇮🇹',       name:'意甲', country:'意大利', badge:'20支球队' },
  { icon:'🇩🇪',       name:'德甲', country:'德国',   badge:'18支球队' },
  { icon:'🇪🇸',       name:'西甲', country:'西班牙', badge:'20支球队' },
  { icon:'🇫🇷',       name:'法甲', country:'法国',   badge:'18支球队' },
  { icon:'🇵🇹',       name:'葡超', country:'葡萄牙', badge:'18支球队' },
  { icon:'🇨🇳',       name:'中超', country:'中国',   badge:'16支球队' },
  { icon:'🌍',        name:'欧冠', country:'欧洲',   badge:'淘汰赛阶段' },
];

export const FOOTBALL_TEAMS = [
  { name:'AC米兰',   c:'#E24B4A', l:'意甲' }, { name:'国际米兰', c:'#185FA5', l:'意甲' },
  { name:'曼城',     c:'#5DCAA5', l:'英超' }, { name:'利物浦',   c:'#E24B4A', l:'英超' },
  { name:'皇家马德里',c:'#EF9F27', l:'西甲' }, { name:'巴塞罗那', c:'#185FA5', l:'西甲' },
  { name:'拜仁慕尼黑',c:'#E24B4A', l:'德甲' }, { name:'北京国安', c:'#185FA5', l:'中超' },
  { name:'山东泰山', c:'#EF9F27', l:'中超' }, { name:'上海申花', c:'#185FA5', l:'中超' },
  { name:'本菲卡',   c:'#E24B4A', l:'葡超' }, { name:'波尔图',   c:'#185FA5', l:'葡超' },
];

export const BBALL_LEAGUES = [
  { icon:'🏀', name:'NBA',   country:'美国', badge:'30支球队' },
  { icon:'🇨🇳', name:'CBA',  country:'中国', badge:'20支球队' },
  { icon:'🎓', name:'NCAA', country:'美国', badge:'学院联赛' },
  { icon:'🇰🇷', name:'韩篮甲',country:'韩国', badge:'10支球队' },
  { icon:'🇯🇵', name:'日篮B1',country:'日本', badge:'24支球队' },
  { icon:'🌏', name:'亚冠杯',country:'亚洲', badge:'洲际赛事' },
];
