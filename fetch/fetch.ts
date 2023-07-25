import axios from "axios"

export const getChatGPTMsg = async (params: any, config: any) => {
  return axios.post(config.customApiUrl, params, {
    headers: {
      Authorization: `Bearer ${config.key}`,
    }
  })


  // let res = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
  //   headers: {
  //     // "Content-Type": "application/json",
  //     Authorization: `Bearer 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`,
  //   }
  // })
}

