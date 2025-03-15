import type { Contestant } from "./types"

// This is mock data for the example
// In a real app, this would come from a database
const contestants: Contestant[] = [
  {
    id: "1",
    name: "李明",
    gender: "male",
    department: "计算机学院",
    grade: "大三",
    introduction:
      "热爱编程和篮球，性格开朗，喜欢交朋友。曾获得校级编程比赛一等奖，希望通过这次比赛认识更多志同道合的朋友。",
    hobbies: "篮球、编程、摄影",
    skills: "编程、演讲",
    photo: "/placeholder.svg?height=400&width=300",
    votes: 245,
    rank: 2,
  },
  {
    id: "2",
    name: "张雨",
    gender: "female",
    department: "文学院",
    grade: "大二",
    introduction: "喜欢文学和音乐，擅长钢琴和写作。性格温柔，希望通过这次比赛展示自己的才艺和气质。",
    hobbies: "钢琴、写作、旅行",
    skills: "钢琴演奏、文学创作",
    photo: "/placeholder.svg?height=400&width=300",
    votes: 312,
    rank: 1,
  },
  {
    id: "3",
    name: "王强",
    gender: "male",
    department: "体育学院",
    grade: "大四",
    introduction: "校篮球队队长，阳光开朗，热爱运动。希望在毕业前参加这次比赛，留下美好回忆。",
    hobbies: "篮球、游泳、健身",
    skills: "各类球类运动、组织活动",
    photo: "/placeholder.svg?height=400&width=300",
    votes: 198,
    rank: 3,
  },
  {
    id: "4",
    name: "刘芳",
    gender: "female",
    department: "艺术学院",
    grade: "大三",
    introduction: "舞蹈专业学生，多次参加校园文艺演出。性格活泼，喜欢尝试新事物。",
    hobbies: "舞蹈、绘画、看电影",
    skills: "现代舞、民族舞",
    photo: "/placeholder.svg?height=400&width=300",
    votes: 176,
    rank: 4,
  },
  {
    id: "5",
    name: "赵阳",
    gender: "male",
    department: "经济学院",
    grade: "研究生一年级",
    introduction: "学习成绩优异，曾获得多项奖学金。性格沉稳，有责任心，希望通过比赛锻炼自己的胆量。",
    hobbies: "阅读、下棋、徒步",
    skills: "演讲、辩论",
    photo: "/placeholder.svg?height=400&width=300",
    votes: 145,
    rank: 6,
  },
  {
    id: "6",
    name: "陈梦",
    gender: "female",
    department: "管理学院",
    grade: "大二",
    introduction: "学生会主席，组织能力强，性格开朗大方。喜欢与人交流，希望通过比赛结交更多朋友。",
    hobbies: "唱歌、组织活动、志愿服务",
    skills: "演讲、活动策划",
    photo: "/placeholder.svg?height=400&width=300",
    votes: 167,
    rank: 5,
  },
  {
    id: "7",
    name: "杨光",
    gender: "male",
    department: "理学院",
    grade: "大三",
    introduction: "物理学专业，喜欢思考和探索。性格温和，做事认真负责。希望通过比赛展示理科生的魅力。",
    hobbies: "天文观测、科技创新、弹吉他",
    skills: "科学实验、吉他演奏",
    photo: "/placeholder.svg?height=400&width=300",
    votes: 132,
    rank: 7,
  },
  {
    id: "8",
    name: "林小雨",
    gender: "female",
    department: "外国语学院",
    grade: "大四",
    introduction: "英语专业，口语流利，曾在国际交流活动中担任翻译。性格活泼开朗，喜欢结交朋友。",
    hobbies: "学习语言、旅行、看美剧",
    skills: "英语口译、日语",
    photo: "/placeholder.svg?height=400&width=300",
    votes: 121,
    rank: 8,
  },
]

export function getContestants(): Contestant[] {
  return contestants
}

export function getContestantById(id: string): Contestant | undefined {
  return contestants.find((contestant) => contestant.id === id)
}

