import { GoogleGenAI, Type } from "@google/genai";
import { BaziInput, BaziResultData, NumerologyResult } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_TEXT = 'gemini-3-flash-preview';

/**
 * Generates a Bazi analysis based on user input.
 * Simulates the persona of Master Li Zhiru.
 */
export const generateBaziAnalysis = async (input: BaziInput): Promise<BaziResultData> => {
  const prompt = `
    你现在是李治儒老师，一位资深的国学易学大师。请根据以下用户的生辰信息进行专业的八字命理排盘与分析。
    
    用户信息：
    性别：${input.gender === 'male' ? '男' : '女'}
    出生日期：${input.birthDate} ${input.birthTime}
    出生地：${input.birthCity}
    历法：${input.isLunar ? '农历' : '阳历'}

    请返回严格的JSON格式数据，不要包含Markdown代码块标记。
    JSON结构如下：
    {
      "summary": "简短的命局总结（100字以内）",
      "fourPillars": {
        "year": { "gan": "天干", "zhi": "地支", "god": "十神" },
        "month": { "gan": "天干", "zhi": "地支", "god": "十神" },
        "day": { "gan": "天干", "zhi": "地支", "god": "自坐" },
        "hour": { "gan": "天干", "zhi": "地支", "god": "十神" }
      },
      "dayMaster": "日主五行（如：甲木）",
      "fiveElements": "五行强弱统计（如：金旺缺木...）",
      "luckCycles": ["2024 甲辰", "2034 乙巳", "2044 丙午", "2054 丁未"],
      "analysis": {
        "character": "性格分析（200字左右，古风口吻）",
        "marriage": "婚姻情感分析（200字左右，古风口吻）",
        "career": "事业分析（200字左右，古风口吻）",
        "wealth": "财运分析（200字左右，古风口吻）",
        "health": "健康分析（200字左右，古风口吻）",
        "parents": "父母分析（100字左右）",
        "children": "子女分析（100字左右）",
        "advice": "大师建议（命理建议，调候用神建议，150字左右）"
      }
    }
    
    风格要求：
    1. 语气稳重、专业、带有传统文化的厚重感。
    2. 分析内容要详实，切中要害，符合传统子平八字理论。
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_TEXT,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    const text = response.text || "{}";
    return JSON.parse(text) as BaziResultData;
  } catch (error) {
    console.error("Error generating Bazi analysis:", error);
    throw new Error("大师正在闭关，请稍后再试。");
  }
};

/**
 * Analyzes Phone Number or ID Card using "Digital Awakening" logic.
 */
export const analyzeNumerology = async (type: 'phone' | 'id', number: string): Promise<NumerologyResult> => {
  const prompt = `
    你现在是李治儒老师，请根据《数字觉醒》的学术观点，分析以下${type === 'phone' ? '手机号码' : '身份证号码'}的数字能量。

    号码：${number}

    请返回严格的JSON格式数据，不要包含Markdown代码块标记。
    JSON结构如下：
    {
      "analysis": "详细的数字能量磁场分析，包含吉凶星、财运、事业、健康等方面的影响。（300字左右）",
      "advice": "针对此号码的建议。如果是手机号，请给出换号或改运建议；如果是身份证，给出化解建议。（150字左右）",
      "score": 75 (0-100的评分)
    }

    风格要求：
    1. 语气权威、直接。
    2. 结合八星磁场（天医、延年、生气、伏位、绝命、五鬼、六煞、祸害）理论进行解读。
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_TEXT,
      contents: prompt,
      config: {
         responseMimeType: "application/json",
      }
    });
    const text = response.text || "{}";
    return JSON.parse(text) as NumerologyResult;
  } catch (error) {
    console.error("Error analyzing number:", error);
    throw new Error("数字解析失败，请检查输入。");
  }
};

/**
 * Answer Book / Q&A Functionality
 */
export const askMaster = async (question: string): Promise<string> => {
  const prompt = `
    你现在是李治儒老师，正在为信众答疑解惑。
    用户的问题是：${question}
    
    请给出一个基于易学、国学智慧的回答。
    
    要求：
    1. 语气亲切但庄重，类似“答案之书”的指引，但要有具体的易学依据（如阴阳五行、流年运势）。
    2. 不要泛泛而谈，要针对个人运势或心境给出明确的指引或哲理。
    3. 篇幅控制在150字以内。
    4. 结尾加上一句暖心的祝福。
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_TEXT,
      contents: prompt,
    });
    return response.text || "心诚则灵，天道酬勤。";
  } catch (error) {
    console.error("Error asking master:", error);
    return "云深不知处，请稍后再问。";
  }
};