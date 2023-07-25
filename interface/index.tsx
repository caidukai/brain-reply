export enum aimodeKeys {
  "GPT35TURBO" = 'GPT35TURBO',
  "GPT35TURBO0301" = "GPT35TURBO0301",
  "GPT4" = "GPT4",
  "GPT4_0314" = "GPT4_0314",
  "GPT4_32K" = "GPT4_32K",
  "GPT4_32K0314" = "GPT4_32K0314"
}

export const aimodeValus = {
  [aimodeKeys.GPT35TURBO]: 'gpt-3.5-turbo',
  [aimodeKeys.GPT35TURBO0301]: 'gpt-3.5-turbo-0301',
  [aimodeKeys.GPT4]: 'gpt-4',
  [aimodeKeys.GPT4_0314]: 'gpt-4-0314',
  [aimodeKeys.GPT4_32K]: 'gpt-4-32k',
  [aimodeKeys.GPT4_32K0314]: 'gpt-4-32k-0314',
}
export const aimodeLabel = {
  [aimodeKeys.GPT35TURBO]: 'GPT-3.5-TURBO',
  [aimodeKeys.GPT35TURBO0301]: 'GPT-3.5-TURBO-0301',
  [aimodeKeys.GPT4]: 'GPT-4  (Plus会员内测中)',
  [aimodeKeys.GPT4_0314]: 'GPT-4-0314  (Plus会员内测中)',
  [aimodeKeys.GPT4_32K]: 'GPT-4-32k  (Plus会员内测中)',
  [aimodeKeys.GPT4_32K0314]: 'GPT-4-32k-0314  (Plus会员内测中)',
}




// GPT-3.5-TURBO (Default ChatGPT)  gpt-3.5-turbo
// GPT-3.5-TURBO-0301   gpt-3.5-turbo-0301
// GPT-4 (Limited Beta)  gpt-4
// GPT-4-0314 (Limited Beta)  gpt-4-0314
//GPT-4-32K (Limited Beta)  gpt-4-32k
// GPT-4-32K-0314 (Limited Beta) gpt-4-32k-0314
export enum messagesRoleType {
  system = 'system',
  user = 'user',
  assistant = 'assistant'
}
export interface messagesType {
  role: messagesRoleType.system | messagesRoleType.user | messagesRoleType.assistant
  content: string,
  isFetching?: boolean,
  c_at?: string
  chat?: ChatType
  // finish: 
}

export interface assistantStartMessagesType {
  role: messagesRoleType.assistant
  c_at?: string
  // finish: 
}

export interface ChatType {
  id?: string
  title: string,
  isFetching: boolean,
  aimodeKey: aimodeKeys.GPT35TURBO | aimodeKeys.GPT35TURBO0301 | aimodeKeys.GPT4 | aimodeKeys.GPT4_0314 | aimodeKeys.GPT4_32K | aimodeKeys.GPT4_32K0314,
  messages: messagesType[]
}
export interface ChatssetType {
  selected: null | number
  openaiKey: null | string
  licensekey: null | string
  customApiUrl: null | string
}
export interface MessageBoxProps {
  item: messagesType,
  // chat: ChatType,
  idx: number
}

export interface AppProps {
  showOpenAISetApiKey: boolean
  showPre: boolean,
  showLicenseSet: boolean,
  showSetNewChatModel: boolean
}