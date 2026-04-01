export const WORLD1_FEEDBACK_MESSAGES = [
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

export const WORLD1_INTROS = {
  task1: {
    backgroundUrl: `${process.env.PUBLIC_URL}/world1/task1bg.png`,
    introText:
      'You reach a giant stone door: “THE DEMOCRACY GATE.”\nMany people use the word democracy… but do they mean the same thing?\nTo pass, you must separate myths from meaning.',
    infoTitle: 'INSTRUCTIONS',
    infoRows: [
      { image: `${process.env.PUBLIC_URL}/world1/task1/correct.png`, alt: 'Correct', text: 'CORRECT' },
      { image: `${process.env.PUBLIC_URL}/world1/task1/middle.png`, alt: 'Warning', text: 'WARNING / DEPENDS' },
      { image: `${process.env.PUBLIC_URL}/world1/task1/wrong.png`, alt: 'Wrong', text: 'WRONG' },
      { image: `${process.env.PUBLIC_URL}/world1/task1/points.png`, alt: 'Points', text: 'POINTS' },
      { image: `${process.env.PUBLIC_URL}/world1/task1/curiositypoints.png`, alt: 'Curiosity points', text: 'CURIOSITY POINTS' },
    ],
    startRoute: '/world-1/task-1',
  },
  task2: {
    backgroundUrl: `${process.env.PUBLIC_URL}/world1/task2/bg_1.png`,
    introText:
      'A map appears before you.\nDemocracy happens at different levels — close to you, across the country, and sometimes beyond borders.\nTo move forward, you must choose the right route of power.',
    infoTitle: 'INSTRUCTIONS',
    infoRows: [
      { pill: 'LOCAL', text: 'CITY / MUNICIPALITY, SCHOOLS, LOCAL SERVICES' },
      { pill: 'NATIONAL', text: 'GOVERNMENT, LAWS, NATIONAL POLICY' },
      { pill: 'EU', text: 'EU-LEVEL RULES, CROSS-BORDER DECISIONS' },
      { pill: 'MIXED', text: 'MORE THAN ONE LEVEL IS INVOLVED' },
    ],
    startRoute: '/world-1/task-2',
  },
  task3: {
    backgroundUrl: `${process.env.PUBLIC_URL}/world1/task3/bg.png`,
    introText:
      'A friendly voice echoes through the hall:\n“In democracy, power has limits.\nYour job is to test decisions: are they fair, legal, and respectful of rights?”',
    infoTitle: 'INSTRUCTIONS',
    infoRows: [
      { image: `${process.env.PUBLIC_URL}/world1/task3/correct.png`, text: 'YES — THIS RESPECTS DEMOCRATIC LIMITS / RIGHTS' },
      { image: `${process.env.PUBLIC_URL}/world1/task3/middle.png`, text: 'NOT SURE — IT DEPENDS / NEEDS MORE CONTEXT' },
      { image: `${process.env.PUBLIC_URL}/world1/task3/wrong.png`, text: 'NO — THIS VIOLATES RIGHTS / ABUSES POWER' },
    ],
    startRoute: '/world-1/task-3',
  },
  task4: {
    backgroundUrl: `${process.env.PUBLIC_URL}/world1/task4/bg.png`,
    introText:
      'DEMOCRACY LIVES OR DIES IN EVERYDAY CHOICES — IN\nSCHOOLS, WORKPLACES, ONLINE SPACES, AND LOCAL\nCOUNCILS.',
    autoNavigateTo: '/world-1/task-4-instructions',
    typeMs: 64,
    holdMs: 1300,
    fadeMs: 650,
  },
  task4Instructions: {
    backgroundUrl: `${process.env.PUBLIC_URL}/world1/task4/bg.png`,
    introText: '',
    infoTitle: 'INSTRUCTIONS',
    infoRows: [
      { text: '1. WHAT’S THE DEMOCRATIC PROBLEM?' },
      { text: '2. WHAT’S THE BEST FIRST STEP?' },
      { text: '3. WHICH VALUE IS INVOLVED? (CHOOSE 1 OF 4)' },
    ],
    startRoute: '/world-1/task-4',
    holdMs: 0,
    fadeMs: 0,
    typeMs: 1,
    revealDelay: 0,
  },
};

export const WORLD1_TASK1 = {
  backgroundUrl: `${process.env.PUBLIC_URL}/world1/task1bg.png`,
  pointsIcon: `${process.env.PUBLIC_URL}/world1/task1/points.png`,
  curiosityIcon: `${process.env.PUBLIC_URL}/world1/task1/curiositypoints.png`,
  whyIcon: `${process.env.PUBLIC_URL}/world1/task1/why.png`,
  answerButtons: {
    correct: `${process.env.PUBLIC_URL}/world1/task1/correct.png`,
    middle: `${process.env.PUBLIC_URL}/world1/task1/middle.png`,
    wrong: `${process.env.PUBLIC_URL}/world1/task1/wrong.png`,
  },
  badges: {
    beginner: `${process.env.PUBLIC_URL}/world1/task1/beginner.png`,
    advanced: `${process.env.PUBLIC_URL}/world1/task1/advanced.png`,
    expert: `${process.env.PUBLIC_URL}/world1/task1/expert.png`,
    curiosity: `${process.env.PUBLIC_URL}/world1/task1/curiosity.png`,
  },
  statements: [
    { id: 1, text: '“People can choose leaders in free and fair elections.”', correct: 'correct', why: 'Elections matter — but democracy doesn’t end on election day.', wrongFeedback: 'Elections matter — but democracy doesn’t end on election day.' },
    { id: 2, text: '“If the majority wants something, it should always happen.”', correct: 'wrong', why: 'Democracy is majority rule AND protection of rights. Otherwise minorities can be harmed.', wrongFeedback: 'Democracy is majority rule AND protection of rights. Otherwise minorities can be harmed.' },
    { id: 3, text: '“Independent courts can limit government power.”', correct: 'correct', why: 'Rule of law protects democracy from becoming whoever wins controls everything.', wrongFeedback: 'Rule of law protects democracy from becoming whoever wins controls everything.' },
    { id: 4, text: '“Opposition and criticism are allowed without punishment.”', correct: 'correct', why: 'Democracy needs disagreement, not fear.', wrongFeedback: 'Democracy needs disagreement, not fear.' },
    { id: 5, text: '“Everyone must agree to keep society stable.”', correct: 'wrong', why: 'Forced agreement is not stability, it is silence.', wrongFeedback: 'Forced agreement is not stability, it is silence.' },
    { id: 6, text: '“Media can investigate those in power.”', correct: 'correct', why: 'Accountability requires information that is not controlled by leaders.', wrongFeedback: 'Accountability requires information that is not controlled by leaders.' },
    { id: 7, text: '“Democracy means the government gives you everything you want.”', correct: 'wrong', why: 'Democracy is not a wish machine. It is a system for fair decision-making.', wrongFeedback: 'Democracy is not a wish machine. It is a system for fair decision-making.' },
    { id: 8, text: '“Citizens can organize, protest, petition, and join associations.”', correct: 'correct', why: 'Participation is not a bonus feature. It is a democratic engine.', wrongFeedback: 'Participation is not a bonus feature. It is a democratic engine.' },
    { id: 9, text: '“Corruption exists in democracies too.”', correct: 'middle', why: 'Democracy reduces corruption risks when institutions work, but it can still happen.', wrongFeedback: 'Democracy reduces corruption risks when institutions work, but it can still happen.' },
    { id: 10, text: '“Democracy is only about national politics.”', correct: 'wrong', why: 'Local democracy often shapes daily life more than national debates.', wrongFeedback: 'Local democracy often shapes daily life more than national debates.' },
  ],
};

export const WORLD1_TASK2 = {
  backgrounds: { match: `${process.env.PUBLIC_URL}/world1/task2/bg_1.png`, routes: `${process.env.PUBLIC_URL}/world1/task2/bg_3.png` },
  pointsIcon: `${process.env.PUBLIC_URL}/world1/task2/points.png`,
  curiosityIcon: `${process.env.PUBLIC_URL}/world1/task2/curiositypoints.png`,
  whyIcon: `${process.env.PUBLIC_URL}/world1/task2/why.png`,
  badges: { beginner: `${process.env.PUBLIC_URL}/world1/task2/beginner.png`, advanced: `${process.env.PUBLIC_URL}/world1/task2/advanced.png`, expert: `${process.env.PUBLIC_URL}/world1/task2/expert.png` },
  levelOptions: ['LOCAL', 'NATIONAL', 'EUROPEAN', 'MIXED'],
  cards: [
    { id: 1, text: 'FIXING STREETLIGHTS AND\nLOCAL ROADS', correct: 'LOCAL' },
    { id: 2, text: 'SCHOOL CURRICULUM RULES', correct: 'MIXED' },
    { id: 3, text: 'FUNDING A LOCAL YOUTH CENTER', correct: 'LOCAL' },
    { id: 4, text: 'MINIMUM WAGE LAW', correct: 'NATIONAL' },
    { id: 5, text: 'TRADE RULES BETWEEN COUNTRIES', correct: 'EUROPEAN' },
    { id: 6, text: 'MUNICIPAL PUBLIC TRANSPORT ROUTES', correct: 'LOCAL' },
    { id: 7, text: 'RULES FOR NATIONAL ELECTIONS', correct: 'NATIONAL' },
    { id: 8, text: 'ENVIRONMENTAL PRODUCT STANDARDS\nACROSS COUNTRIES', correct: 'EUROPEAN' },
    { id: 9, text: 'POLICE OPERATIONAL FUNDING\nIN A CITY', correct: 'MIXED' },
    { id: 10, text: 'TAX POLICY', correct: 'NATIONAL' },
    { id: 11, text: 'REGIONAL DEVELOPMENT FUNDS', correct: 'EUROPEAN' },
    { id: 12, text: 'LOCAL BUILDING PERMITS', correct: 'LOCAL' },
  ],
  scenarios: [
    { id: 1, title: 'SCENARIO 1: YOUTH CENTER\nBUDGET CUT — CHOOSE THE\nMOST EFFECTIVE FIRST ACTION', options: [ { key: 'A', label: 'EMAIL MEMBERS OF EUROPEAN PARLIAMENT', points: 0, isBest: false }, { key: 'B', label: 'ATTEND CITY COUNCIL MEETING, START\nPETITION, CONTACT LOCAL MEDIA', points: 2, isBest: true }, { key: 'C', label: 'POST ANGRY MEMES AND WAIT', points: 0, isBest: false } ] },
    { id: 2, title: 'SCENARIO 2: NATIONAL EDUCATION\nREFORM — WHAT FIRST?', options: [ { key: 'A', label: 'ORGANIZE NATIONAL CAMPAIGN, CONTACT\nMPS, JOIN PUBLIC CONSULTATIONS', points: 2, isBest: true }, { key: 'B', label: 'COMPLAIN TO THE MAYOR', points: 0, isBest: false }, { key: 'C', label: 'ASK THE EU TO CANCEL IT', points: 0, isBest: false } ] },
  ],
};

export const WORLD1_TASK3 = {
  backgroundUrl: `${process.env.PUBLIC_URL}/world1/task3/bg.png`,
  pointsIcon: `${process.env.PUBLIC_URL}/world1/task3/points.png`,
  curiosityIcon: `${process.env.PUBLIC_URL}/world1/task3/curiositypoints.png`,
  answerButtons: { correct: `${process.env.PUBLIC_URL}/world1/task3/correct.png`, middle: `${process.env.PUBLIC_URL}/world1/task3/middle.png`, wrong: `${process.env.PUBLIC_URL}/world1/task3/wrong.png` },
  badges: { beginner: `${process.env.PUBLIC_URL}/world1/task3/beginner.png`, advanced: `${process.env.PUBLIC_URL}/world1/task3/advanced.png`, expert: `${process.env.PUBLIC_URL}/world1/task3/expert.png`, curiosity: `${process.env.PUBLIC_URL}/world1/task3/curiosity.png` },
  cases: [
    { id: 1, statement: 'A JOURNALIST PUBLISHES AN INVESTIGATION ABOUT MISUSE OF PUBLIC MONEY. THE GOVERNMENT LABELS IT “HARMFUL” AND SHUTS THE OUTLET DOWN.', part1Correct: 'wrong', part1Why: 'SHUTTING DOWN INDEPENDENT MEDIA IS A MAJOR RIGHTS AND ACCOUNTABILITY PROBLEM. IN DEMOCRACY, CRITICISM AND INVESTIGATION MUST BE PROTECTED.', paths: [ { key: 'A', label: 'ACCEPT IT — THE GOVERNMENT KNOWS BEST.', correct: false }, { key: 'B', label: 'SUPPORT LEGAL CHALLENGE + PUBLIC PRESSURE + SOLIDARITY WITH JOURNALISTS', correct: true }, { key: 'C', label: 'IGNORE — IT IS NOT MY PROBLEM.', correct: false }, { key: 'D', label: 'FIGHT WITH THREATS AND VIOLENCE.', correct: false } ], pathWhy: 'THE BEST RESPONSE IS LEGAL CHALLENGE + PUBLIC PRESSURE AND SOLIDARITY. IT PROTECTS RIGHTS WITHOUT ESCALATING HARM.' },
    { id: 2, statement: 'THE GOVERNMENT PASSES A LAW ALLOWING IT TO BAN PROTESTS FOR “PUBLIC ORDER” WITHOUT CLEAR LIMITS OR OVERSIGHT.', part1Correct: 'wrong', part1Why: 'BROAD POWERS WITHOUT CLEAR LIMITS CAN BE USED TO SILENCE DISSENT. PROTEST RIGHTS REQUIRE OVERSIGHT AND PROPORTIONATE RULES.', paths: [ { key: 'A', label: 'STAY QUIET — IT DOES NOT AFFECT ME.', correct: false }, { key: 'B', label: 'SUPPORT LEGAL REVIEW + PUBLIC DEBATE + CLEAR SAFEGUARDS', correct: true }, { key: 'C', label: 'SPREAD MISINFORMATION ONLINE.', correct: false }, { key: 'D', label: 'THREATEN OFFICIALS.', correct: false } ], pathWhy: 'LEGAL REVIEW + PUBLIC DEBATE + CLEAR SAFEGUARDS PROTECTS FREEDOMS WHILE KEEPING ORDER PROPORTIONATE.' },
    { id: 3, statement: 'A NEW RULE REQUIRES ALL NGOS RECEIVING FOREIGN DONATIONS TO REGISTER AND PUBLISH DONORS, WITH VAGUE PENALTIES.', part1Correct: 'middle', part1Why: 'TRANSPARENCY CAN BE OKAY, BUT VAGUE PENALTIES CAN BE ABUSED. DEMOCRACY NEEDS CLEAR, FAIR RULES.', paths: [ { key: 'A', label: 'ACCEPT ANYTHING — IT IS FINE.', correct: false }, { key: 'B', label: 'ASK FOR CLEAR LIMITS + INDEPENDENT OVERSIGHT', correct: true }, { key: 'C', label: 'HARASS NGO STAFF.', correct: false }, { key: 'D', label: 'DO NOTHING.', correct: false } ], pathWhy: 'THE RIGHT PATH IS TO DEMAND CLEAR LIMITS AND OVERSIGHT — IT PRESERVES TRANSPARENCY WITHOUT ENABLING ABUSE.' },
    { id: 4, statement: 'AN ELECTION COMMISSION CHANGES POLLING STATION LOCATIONS WITH 24H NOTICE, DISPROPORTIONATELY AFFECTING ONE REGION.', part1Correct: 'wrong', part1Why: 'LAST-MINUTE CHANGES CAN UNDERMINE FAIR ACCESS TO VOTING. ELECTIONS MUST BE PREDICTABLE AND EQUAL.', paths: [ { key: 'A', label: 'IGNORE IT.', correct: false }, { key: 'B', label: 'DEMAND TRANSPARENCY + INDEPENDENT MONITORING + FAIR NOTICE', correct: true }, { key: 'C', label: 'SPREAD HATE.', correct: false }, { key: 'D', label: 'FIGHT AND ESCALATE.', correct: false } ], pathWhy: 'TRANSPARENCY + MONITORING + FAIR NOTICE PROTECTS ELECTION INTEGRITY WITHOUT HARM.' },
  ],
};

export const WORLD1_TASK4 = {
  backgroundUrl: `${process.env.PUBLIC_URL}/world1/task4/bg.png`,
  pointsIcon: `${process.env.PUBLIC_URL}/world1/task4/points.png`,
  curiosityIcon: `${process.env.PUBLIC_URL}/world1/task4/curiositypoints.png`,
  badges: { beginner: `${process.env.PUBLIC_URL}/world1/task4/beginner.png`, advanced: `${process.env.PUBLIC_URL}/world1/task4/advanced.png`, expert: `${process.env.PUBLIC_URL}/world1/task4/expert.png` },
  scenes: [
    { id: 1, title: 'SCENE 1', statement: 'STUDENTS PROPOSE A NEW CHILL SPACE. THE PRINCIPAL DECIDES ALONE AND SAYS “STUDENTS DON’T UNDERSTAND BUDGETS.”', actionOptions: [{ key: 'A', label: 'GIVE UP', correct: false }, { key: 'B', label: 'ASK FOR PARTICIPATION: MEETING, TRANSPARENT BUDGET INFO, STUDENT REPS', correct: true }, { key: 'C', label: 'START RUMORS', correct: false }, { key: 'D', label: 'VANDALIZE THE OFFICE', correct: false }], correctValue: 'TRANSPARENCY/PARTICIPATION' },
    { id: 2, title: 'SCENE 2', statement: 'AN ONLINE CLASS GROUP CHAT STARTS TARGETING A STUDENT WITH MEMES AND INSULTS. SOME PEOPLE SAY IT IS “JUST A JOKE.”', actionOptions: [{ key: 'A', label: 'JOIN IN SO YOU ARE NOT NEXT', correct: false }, { key: 'B', label: 'CHECK IN WITH THE TARGET + REPORT + SET GROUP RULES', correct: true }, { key: 'C', label: 'POST MORE MEMES', correct: false }, { key: 'D', label: 'DOX THE TARGET', correct: false }], correctValue: 'DIGNITY/RESPECT' },
    { id: 3, title: 'SCENE 3', statement: 'AT WORK, A MANAGER ALWAYS PROMOTES FRIENDS. OTHERS ARE TOLD: “DON’T ASK QUESTIONS IF YOU WANT TO STAY.”', actionOptions: [{ key: 'A', label: 'SPREAD RUMORS', correct: false }, { key: 'B', label: 'DOCUMENT, USE HR/WHISTLEBLOWING CHANNELS, ASK FOR CLEAR CRITERIA', correct: true }, { key: 'C', label: 'QUIT WITHOUT SAYING ANYTHING', correct: false }, { key: 'D', label: 'SABOTAGE PROJECTS', correct: false }], correctValue: 'FAIRNESS/EQUALITY' },
    { id: 4, title: 'SCENE 4', statement: 'A LOCAL COUNCIL APPROVES A NEW PROJECT WITHOUT PUBLISHING DOCUMENTS. PEOPLE HEAR ABOUT IT ONLY AFTER IT IS DONE.', actionOptions: [{ key: 'A', label: 'SHOUT AT PEOPLE ONLINE', correct: false }, { key: 'B', label: 'REQUEST DOCUMENTS, ATTEND MEETINGS, ASK FOR PUBLIC CONSULTATION', correct: true }, { key: 'C', label: 'GIVE UP', correct: false }, { key: 'D', label: 'THREATEN COUNCIL MEMBERS', correct: false }], correctValue: 'TRANSPARENCY' },
  ],
};

export const WORLD1_VALUE_OPTIONS = ['TRANSPARENCY', 'TRANSPARENCY/PARTICIPATION', 'DIGNITY/RESPECT', 'FAIRNESS/EQUALITY'];
