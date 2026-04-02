export const WORLD2_FEEDBACK_MESSAGES = [
  '{NAME} KEEP GOING',
  '{NAME} NICE CHOICE',
  '{NAME} STAY SHARP',
  '{NAME} TRUST YOUR INSTINCT',
  '{NAME} THINK IT THROUGH',
  '{NAME} YOU\'VE GOT THIS',
  '{NAME} GOOD TRY',
  '{NAME} LET\'S SEE…',
  '{NAME} SOLID MOVE',
];

export const WORLD2_INTROS = {
  task1: {
    backgroundUrl: `${process.env.PUBLIC_URL}/world2/bg1.png`,
    introText:
      'You enter a city covered in floating screens. Headlines flash everywhere. Notifications explode. A voice whispers:\n“In the digital world, speed wins. But democracy needs accuracy.”\nTo move forward, you must identify what kind of information you are seeing.',
    infoTitle: 'INSTRUCTIONS',
    infoRows: [
      { image: `${process.env.PUBLIC_URL}/world1/task1/correct.png`, text: 'VERIFIED INFORMATION' },
      { image: `${process.env.PUBLIC_URL}/world1/task1/middle.png`, text: 'OPINION / FRAMING' },
      { image: `${process.env.PUBLIC_URL}/world1/task1/wrong.png`, text: 'MANIPULATIVE / MISLEADING' },
      { image: `${process.env.PUBLIC_URL}/world1/task1/missleading.png`, text: 'MISSING CONTEXT' },
      { image: `${process.env.PUBLIC_URL}/world1/task1/points.png`, text: 'POINTS' },
      { image: `${process.env.PUBLIC_URL}/world1/task1/curiositypoints.png`, text: 'CURIOSITY POINTS' },
    ],
    startRoute: '/world-2/task-1',
  },
  task2: {
    backgroundUrl: `${process.env.PUBLIC_URL}/world2/bg2.png`,
    introText:
      'You enter a digital labyrinth. A message appears:\n“Every viral claim has a starting point. Can you trace it before it traces you?”\nChoose the most reliable verification step first.',
    infoTitle: 'INSTRUCTIONS',
    infoRows: [
      { text: 'BEST VERIFICATION STEP = +3' },
      { text: 'PARTIAL REASONABLE STEP = +1' },
      { text: 'WRONG STEP = 0' },
      { text: 'ALWAYS LOOK FOR PRIMARY SOURCE / TRACEABLE EVIDENCE' },
    ],
    startRoute: '/world-2/task-2',
  },
  task3: {
    backgroundUrl: `${process.env.PUBLIC_URL}/world2/bg3.png`,
    introText:
      'You enter the Civic Feed Lab. Screens float around you showing chaotic headlines, angry comments and viral memes. A message appears:\n“Democracy does not survive only by rejecting bad information. It survives when citizens create better information.”\nBuild a responsible post about a real civic issue.',
    infoTitle: 'INSTRUCTIONS',
    infoRows: [
      { text: 'ROUND 1 — CHOOSE THE MOST RESPONSIBLE HEADLINE' },
      { text: 'ROUND 2 — CHOOSE THE BEST SOURCE' },
      { text: 'ROUND 3 — CHOOSE THE BEST TONE' },
      { text: 'ROUND 4 — CHOOSE THE BEST CALL TO ACTION' },
    ],
    startRoute: '/world-2/task-3',
  },
};

export const WORLD2_TASK1 = {
  backgroundUrl: `${process.env.PUBLIC_URL}/world2/bg1.png`,
  pointsIcon: `${process.env.PUBLIC_URL}/world1/task1/points.png`,
  curiosityIcon: `${process.env.PUBLIC_URL}/world1/task1/curiositypoints.png`,
  whyIcon: `${process.env.PUBLIC_URL}/world1/task1/why.png`,
  answerButtons: {
    correct: `${process.env.PUBLIC_URL}/world1/task1/correct.png`,
    middle: `${process.env.PUBLIC_URL}/world1/task1/middle.png`,
    wrong: `${process.env.PUBLIC_URL}/world1/task1/wrong.png`,
    missleading: `${process.env.PUBLIC_URL}/world1/task1/missleading.png`,
  },
  badges: {
    beginner: `${process.env.PUBLIC_URL}/world2/task1/beginner.png`,
    advanced: `${process.env.PUBLIC_URL}/world2/task1/advanced.png`,
    expert: `${process.env.PUBLIC_URL}/world2/task1/expert.png`,
    curiosity: `${process.env.PUBLIC_URL}/world2/task1/curiosity.png`,
  },
  statements: [
    {
      id: 1,
      text: '“BREAKING: ELECTIONS CANCELLED!!!”\nSmall text: “…in one small village due to flooding.”',
      correct: 'missleading',
      why: 'Headline creates panic. Full context changes meaning.',
      wrongFeedback: 'This is MISSING CONTEXT. The headline exaggerates by hiding the full situation.',
    },
    {
      id: 2,
      text: '“Experts say climate policy may affect prices.”\nLink to the named research institute.',
      correct: 'correct',
      why: 'Named source + traceable research.',
      wrongFeedback: 'This is VERIFIED INFORMATION because it links to a named and traceable source.',
    },
    {
      id: 3,
      text: '“Only idiots support this law.”\nNo evidence.',
      correct: 'wrong',
      why: 'Emotional attack replaces argument.',
      wrongFeedback: 'This is MANIPULATIVE / MISLEADING because emotion replaces evidence.',
    },
    {
      id: 4,
      text: '“In my opinion, the government focuses too much on cities.”',
      correct: 'middle',
      why: 'Opinion is valid, but it is not the same as fact.',
      wrongFeedback: 'This is OPINION / FRAMING, not a verified factual claim.',
    },
    {
      id: 5,
      text: 'Cropped video showing politician laughing during serious debate.\nThe full version shows different context.',
      correct: 'missleading',
      why: 'Partial truth can mislead.',
      wrongFeedback: 'This is MISSING CONTEXT because the cropped version changes meaning.',
    },
    {
      id: 6,
      text: '“Shocking study proves schools are failing!”\nStudy is 15 years old, small sample.',
      correct: 'wrong',
      why: 'Outdated + exaggerated claim.',
      wrongFeedback: 'This is MANIPULATIVE / MISLEADING because the claim is exaggerated and weakly supported.',
    },
    {
      id: 7,
      text: '“City budget increased by 3% compared to last year.”\nOfficial document linked.',
      correct: 'correct',
      why: 'Official document + clear comparison.',
      wrongFeedback: 'This is VERIFIED INFORMATION because it links to an official source.',
    },
    {
      id: 8,
      text: 'Meme: “They don’t want you to know this.”\nNo source.',
      correct: 'wrong',
      why: 'No source + manipulative framing.',
      wrongFeedback: 'This is MANIPULATIVE / MISLEADING because it relies on emotional suspicion, not evidence.',
    },
    {
      id: 9,
      text: '“This reform might improve youth employment.”\nSpeculative article.',
      correct: 'middle',
      why: 'This is framed as a possibility, not proven fact.',
      wrongFeedback: 'This is OPINION / FRAMING because it is speculative, not verified.',
    },
    {
      id: 10,
      text: '“Country X has the highest inflation in Europe.”\nTrue, but timeframe is missing.',
      correct: 'missleading',
      why: 'True fact + missing timeframe can still mislead.',
      wrongFeedback: 'This is MISSING CONTEXT because timing changes how the statement should be understood.',
    },
  ],
};

export const WORLD2_TASK2 = {
  backgroundUrl: `${process.env.PUBLIC_URL}/world2/bg2.png`,
  pointsIcon: `${process.env.PUBLIC_URL}/world1/task1/points.png`,
  curiosityIcon: `${process.env.PUBLIC_URL}/world1/task1/curiositypoints.png`,
  whyIcon: `${process.env.PUBLIC_URL}/world1/task1/why.png`,
  badges: {
    beginner: `${process.env.PUBLIC_URL}/world2/task2/beginner.png`,
    advanced: `${process.env.PUBLIC_URL}/world2/task2/advanced.png`,
    expert: `${process.env.PUBLIC_URL}/world2/task2/expert.png`,
  },
  scenarios: [
    {
      id: 1,
      title: 'SCENARIO 1',
      statement: 'CLAIM: “NEW LAW BANS ALL PROTESTS.”',
      why: 'Primary source beats social noise.',
      options: [
        { key: 'A', label: 'SHARE IMMEDIATELY', points: 0, correct: false },
        { key: 'B', label: 'CHECK OFFICIAL LEGAL TEXT', points: 3, correct: true },
        { key: 'C', label: 'READ COMMENTS', points: 1, correct: false },
        { key: 'D', label: 'SCREENSHOT IT', points: 0, correct: false },
      ],
    },
    {
      id: 2,
      title: 'SCENARIO 2',
      statement: 'CLAIM: “SCIENTISTS CONFIRM CHOCOLATE CURES STRESS.”',
      why: 'Original study + journal credibility is the strongest first step.',
      options: [
        { key: 'A', label: 'SEARCH ORIGINAL STUDY + JOURNAL CREDIBILITY', points: 3, correct: true },
        { key: 'B', label: 'TRUST INFLUENCER', points: 0, correct: false },
        { key: 'C', label: 'ASK FRIEND', points: 1, correct: false },
        { key: 'D', label: 'IGNORE', points: 0, correct: false },
      ],
    },
    {
      id: 3,
      title: 'SCENARIO 3',
      statement: 'CLAIM: “VIDEO PROVES ELECTION FRAUD.”',
      why: 'Reverse image / video verification and date check come before sharing conclusions.',
      options: [
        { key: 'A', label: 'REVERSE IMAGE SEARCH + DATE CHECK', points: 3, correct: true },
        { key: 'B', label: 'TRUST ACCOUNT NAME', points: 0, correct: false },
        { key: 'C', label: 'SHARE “JUST IN CASE”', points: 0, correct: false },
        { key: 'D', label: 'ATTACK POLITICIAN', points: 0, correct: false },
      ],
    },
    {
      id: 4,
      title: 'SCENARIO 4',
      statement: 'ANONYMOUS POST ACCUSING NGO OF CORRUPTION.',
      why: 'Look for documented evidence and independent reporting.',
      options: [
        { key: 'A', label: 'LOOK FOR FINANCIAL REPORTS + INVESTIGATIVE JOURNALISM', points: 3, correct: true },
        { key: 'B', label: 'BELIEVE IT BECAUSE MANY SHARES', points: 0, correct: false },
        { key: 'C', label: 'SPREAD RUMOR', points: 0, correct: false },
        { key: 'D', label: 'COMMENT ANGRILY', points: 1, correct: false },
      ],
    },
    {
      id: 5,
      title: 'SCENARIO 5',
      statement: 'CLAIM: “BREAKING NEWS!” POSTED BY NEW ACCOUNT.',
      why: 'Check the account, then verify whether credible outlets confirm it.',
      options: [
        { key: 'A', label: 'CHECK ACCOUNT HISTORY + VERIFICATION + OTHER OUTLETS', points: 3, correct: true },
        { key: 'B', label: 'SCREENSHOT', points: 1, correct: false },
        { key: 'C', label: 'REACT WITH EMOJI', points: 0, correct: false },
        { key: 'D', label: 'REPORT INSTANTLY', points: 1, correct: false },
      ],
    },
    {
      id: 6,
      title: 'SCENARIO 6',
      statement: 'EDITED PHOTO CIRCULATING.',
      why: 'Image verification tools are the strongest first step here.',
      options: [
        { key: 'A', label: 'USE IMAGE VERIFICATION TOOLS', points: 3, correct: true },
        { key: 'B', label: 'TRUST BECAUSE HIGH QUALITY', points: 0, correct: false },
        { key: 'C', label: 'IGNORE', points: 1, correct: false },
        { key: 'D', label: 'SHARE WITH WARNING', points: 0, correct: false },
      ],
    },
  ],
};

export const WORLD2_TASK3 = {
  backgroundUrl: `${process.env.PUBLIC_URL}/world2/bg3.png`,
  pointsIcon: `${process.env.PUBLIC_URL}/world1/task1/points.png`,
  curiosityIcon: `${process.env.PUBLIC_URL}/world1/task1/curiositypoints.png`,
  badges: {
    beginner: `${process.env.PUBLIC_URL}/world2/task3/beginner.png`,
    advanced: `${process.env.PUBLIC_URL}/world2/task3/advanced.png`,
    expert: `${process.env.PUBLIC_URL}/world2/task3/expert.png`,
  },
  rounds: [
    {
      id: 1,
      title: 'ROUND 1 — HEADLINE CHOICE',
      statement: 'TOPIC: “THE CITY PLANS TO REDESIGN THE CENTRAL PUBLIC PARK.”\nCHOOSE THE MOST RESPONSIBLE HEADLINE.',
      correctKey: 'B',
      points: 8,
      feedback: 'Neutral headlines reduce emotional manipulation and allow readers to focus on facts.',
      options: [
        { key: 'A', label: '“SHOCKING SECRET PLAN ABOUT OUR PARK!!!”' },
        { key: 'B', label: '“CITY COUNCIL APPROVES PARK REDESIGN PROPOSAL”' },
        { key: 'C', label: '“THEY ARE DESTROYING OUR PARK!”' },
        { key: 'D', label: '“THIS IS THE END OF PUBLIC SPACE!”' },
      ],
    },
    {
      id: 2,
      title: 'ROUND 2 — INFORMATION SOURCE',
      statement: 'CHOOSE HOW YOU WILL SUPPORT YOUR POST.',
      correctKey: 'B',
      points: 8,
      feedback: 'Traceable primary sources strengthen credibility and reduce misinformation.',
      options: [
        { key: 'A', label: 'SCREENSHOT FROM ANONYMOUS FACEBOOK COMMENT' },
        { key: 'B', label: 'OFFICIAL COUNCIL WEBSITE + LINK TO PUBLIC DOCUMENT' },
        { key: 'C', label: '“MY FRIEND WORKS THERE.”' },
        { key: 'D', label: 'VIRAL TIKTOK VIDEO' },
      ],
    },
    {
      id: 3,
      title: 'ROUND 3 — TONE & LANGUAGE',
      statement: 'CHOOSE THE TONE OF YOUR POST.',
      correctKey: 'B',
      points: 7,
      feedback: 'Respectful language invites dialogue. Emotional attacks increase polarization.',
      options: [
        { key: 'A', label: '“ONLY IGNORANT PEOPLE SUPPORT THIS.”' },
        { key: 'B', label: '“HERE’S WHAT THE PROPOSAL INCLUDES. WHAT DO YOU THINK?”' },
        { key: 'C', label: '“SHARE THIS BEFORE THEY DELETE IT!”' },
        { key: 'D', label: '“THIS PROVES THE COUNCIL IS CORRUPT.”' },
      ],
    },
    {
      id: 4,
      title: 'ROUND 4 — CALL TO ACTION',
      statement: 'CHOOSE HOW TO END YOUR POST.',
      correctKey: 'B',
      points: 7,
      feedback: 'Responsible participation connects information to democratic action.',
      options: [
        { key: 'A', label: '“SHARE IMMEDIATELY SO EVERYONE PANICS.”' },
        { key: 'B', label: '“PUBLIC MEETING IS ON TUESDAY — ATTEND AND EXPRESS YOUR OPINION.”' },
        { key: 'C', label: '“ATTACK THE MAYOR IN COMMENTS.”' },
        { key: 'D', label: '“BOYCOTT ALL CITY SERVICES.”' },
      ],
    },
  ],
};