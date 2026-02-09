export type ViewState = 'home' | 'bazi' | 'numerology' | 'divination' | 'ask' | 'master';

export interface BaziInput {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  birthCity: string;
  gender: 'male' | 'female';
  isLunar: boolean;
}

export interface BaziResultData {
  summary: string;
  fourPillars: {
    year: { gan: string; zhi: string; god: string };
    month: { gan: string; zhi: string; god: string };
    day: { gan: string; zhi: string; god: string };
    hour: { gan: string; zhi: string; god: string };
  };
  dayMaster: string;
  fiveElements: string; // e.g. "Gold: 2, Wood: 1..."
  luckCycles: string[];
  analysis: {
    character: string;
    marriage: string;
    career: string;
    wealth: string;
    health: string;
    parents: string;
    children: string;
    advice: string;
  };
}

export interface NumerologyResult {
  analysis: string;
  advice: string;
  score: number;
}

export interface DivinationResult {
  level: '大' | '中' | '小';
  luck: '吉' | '凶';
  poem: string;
  explanation: string;
}