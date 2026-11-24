// Who made a call: GHL records carry the user, WAVV records carry the number
// the call came from. Business numbers only; no customer data lives here.
export const CALLER_PRESETS = [
  { key: 'krystle', name: 'Krystle Lao', username: 'krystle', ghlUserId: 'h2SoDgp5J2G1LytaWtoU', numbers: '6293565535', calendarIds: ['Tr1Vvz2LAAx6HmF4z9nb', 'qbBvR5hUf1VzET7r4EEH'], pipelineId: 'P7k2PbCusnQ9tYt48LQl' },
  { key: 'juan', name: 'Juan Carlos Telles Garcia', username: 'juancarlos', ghlUserId: 'pfGqrdgwQ7mVzfPdtKxJ', numbers: '6292870159,6293069072,6292478626,6292764016,6293021411', calendarIds: ['t9KNhArH3PxkfUXlUycw', 'vXJdhscM6i1oPWjfNCP5'] },
];

// Main booking calendars. A booking here counts for a caller only when that
// caller made it or owns the contact.
export const SHARED_CALENDAR_IDS = ['QO7LCJe62qeDxjE1VuuP', 'WDGkiiKCUeTkVOqhysfd'];
