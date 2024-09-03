export interface RandomFixtures {
  fixtures: Fixture[];
}

export interface Entity {
  id: string;
  name: string;
  displayName: string;
}

export interface Fixture extends Entity {
  date: string;
  participants: Participant[];
  markets: Market[];
  league: League;
  sport: Sport;
  location: string;
}

export interface Participant extends Entity {}

export interface Market extends Entity {
  lSportsId: number | null;
  bets: Bet[];
}

export interface Bet extends Entity {
  lSportsName: string;
  odds: number;
  selected: boolean;
  line?: string;
  player?: Player;
}

export interface Player extends Entity {
  lSportsId: number | null;
  lVisionId: string | null;
}

export interface League extends Entity {}

export interface Sport extends Entity {}

export interface Tip {
  id: string;
  betId: string;
  fixtureId: string;
  marketId: string;
  playerId?: string | null;
  lSportsFixtureId: number;
  lSportsLocationId: number;
  lSportsSportId: number;
  lSportsPlayerId?: number | null;
  tip?: string;
}

export interface ChatAnswer {
  error: any;
  message: ChatAnswerMessage;
  relatedQuestions: string;
  history: Record<string, string[]>;
}

export interface ChatAnswerMessage {
  betId: string;
  fixtureId: string;
  id: string;
  marketId: string;
  playerId: string;
  status: string;
  text: string;
  timestamp: string;
  type: string;
  lSportsFixtureId: number;
  lSportsLocationId: number;
  lSportsPlayerId: number;
  lSportsSportId: number;
}
