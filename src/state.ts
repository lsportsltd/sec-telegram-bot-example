import { Fixture } from "./interfaces";

// this should be persisted in a database in a real-world application
let sessionStore: {
  randomFixtures: Fixture[];
  sessions: { [i: string]: UserSession };
} = {
  randomFixtures: [],
  sessions: {},
};

export interface UserSession {
  chatId: number | null;
  selectedFixture: Fixture | null;
}

export function getSession(chatId: number) {
  return sessionStore.sessions[chatId];
}

export function newSession(chatId: number) {
  sessionStore.sessions[chatId] = {
    chatId,
    selectedFixture: null,
  };

  return sessionStore.sessions[chatId];
}

export function getHighlightedFixturesFromState() {
  return sessionStore.randomFixtures;
}

export function updateHighlightedFixtures(fixtures: Fixture[]) {
  sessionStore.randomFixtures = [...fixtures];
  return sessionStore.randomFixtures;
}

export function clearSession(chatId: number) {
  delete sessionStore.sessions[chatId];
}

export function updateSession(
  chatId: number,
  partialSession: Partial<UserSession>
) {
  const state = sessionStore.sessions[chatId];
  sessionStore.sessions[chatId] = { ...state, ...partialSession };
  return sessionStore.sessions[chatId];
}
