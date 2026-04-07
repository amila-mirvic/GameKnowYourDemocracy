export const WORLD4_FEEDBACK_MESSAGES = [
  "{NAME} THINK STRATEGICALLY",
  "{NAME} GOOD ADVOCACY MOVE",
  "{NAME} BUILD YOUR INFLUENCE",
  "{NAME} STAY FOCUSED",
  "{NAME} NICE DECISION",
  "{NAME} PUSH FOR IMPACT",
  "{NAME} THINK ABOUT POWER",
  "{NAME} GOOD TARGETING",
];

export const WORLD4_INTROS = {
  task1: {
    backgroundUrl: `${process.env.PUBLIC_URL}/world4/bg1.png`,
    introText:
      "You move forward and reach a new stage.\n“Many people speak. But not all influence change.”",
    infoTitle: "INSTRUCTIONS",
    infoRows: [
      { image: `${process.env.PUBLIC_URL}/world1/task1/correct.png`, text: "EFFECTIVE ADVOCACY" },
      { image: `${process.env.PUBLIC_URL}/world1/task1/middle.png`, text: "LIMITED / WEAK ADVOCACY" },
      { image: `${process.env.PUBLIC_URL}/world1/task1/wrong.png`, text: "NOT ADVOCACY" },
      { image: `${process.env.PUBLIC_URL}/world1/task1/points.png`, text: "POINTS" },
      { image: `${process.env.PUBLIC_URL}/world1/task1/curiositypoints.png`, text: "CURIOSITY POINTS" },
    ],
    startRoute: "/world-4/task-1",
  },
  task2: {
    backgroundUrl: `${process.env.PUBLIC_URL}/world4/bg2.png`,
    introText:
      "You continue and see several situations.\n“Advocacy is not about speaking louder.\nIt is about speaking to the right people.”",
    infoTitle: "INSTRUCTIONS",
    infoRows: [
      { text: "MATCH EACH ISSUE WITH THE MOST RELEVANT TARGET" },
      { text: "2 ISSUES PER ROUND" },
      { text: "CORRECT MATCH = +3" },
      { text: "THINK ABOUT WHO HAS THE POWER TO CHANGE THE ISSUE" },
    ],
    startRoute: "/world-4/task-2",
  },
  task3: {
    backgroundUrl: `${process.env.PUBLIC_URL}/world4/bg3.png`,
    introText:
      "You reach the next stage.\n“Even the right cause can fail if the message is unclear.”",
    infoTitle: "INSTRUCTIONS",
    infoRows: [
      { text: "BUILD AN EFFECTIVE ADVOCACY MESSAGE STEP BY STEP" },
      { text: "DEFINE THE PROBLEM CLEARLY" },
      { text: "USE EVIDENCE" },
      { text: "PROPOSE A SOLUTION AND CALL TO ACTION" },
    ],
    startRoute: "/world-4/task-3",
  },
  task4: {
    backgroundUrl: `${process.env.PUBLIC_URL}/world4/bg4.png`,
    introText:
      "You reach the final stage.\nA message appears:\n“Advocacy is not one moment. It is a process.”\n“Your choices will shape what happens next.”",
    infoTitle: "INSTRUCTIONS",
    infoRows: [
      { text: "MOVE THROUGH 4 ADVOCACY STEPS" },
      { text: "EACH CHOICE SHAPES THE OUTCOME" },
      { text: "THINK INFORMED, COLLECTIVE, AND STRATEGIC" },
      { text: "FINISH BY REFLECTING ON WHAT MATTERED MOST" },
    ],
    startRoute: "/world-4/task-4",
  },
};

export const WORLD4_TASK1 = {
  backgroundUrl: `${process.env.PUBLIC_URL}/world4/bg1.png`,
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
    {
      id: 1,
      text: "MEETING A DECISION-MAKER WITH A PROPOSAL",
      correct: "correct",
      why: "Advocacy is stronger when it speaks directly to people who can make decisions.",
      wrongFeedback: "This belongs to EFFECTIVE ADVOCACY.",
    },
    {
      id: 2,
      text: "POSTING “THIS IS BAD” WITHOUT EXPLANATION",
      correct: "middle",
      why: "It shows concern, but without clarity or a goal it remains weak.",
      wrongFeedback: "This belongs to LIMITED / WEAK ADVOCACY.",
    },
    {
      id: 3,
      text: "USING EVIDENCE TO SUPPORT ARGUMENTS",
      correct: "correct",
      why: "Evidence makes advocacy more credible and persuasive.",
      wrongFeedback: "This belongs to EFFECTIVE ADVOCACY.",
    },
    {
      id: 4,
      text: "SPREADING RUMORS",
      correct: "wrong",
      why: "Rumors damage trust and weaken real advocacy efforts.",
      wrongFeedback: "This belongs to NOT ADVOCACY.",
    },
    {
      id: 5,
      text: "ORGANIZING A CAMPAIGN WITH A CLEAR GOAL",
      correct: "correct",
      why: "Strong advocacy is organized and directed toward change.",
      wrongFeedback: "This belongs to EFFECTIVE ADVOCACY.",
    },
    {
      id: 6,
      text: "COMPLAINING PRIVATELY",
      correct: "wrong",
      why: "Private frustration without action does not create advocacy.",
      wrongFeedback: "This belongs to NOT ADVOCACY.",
    },
    {
      id: 7,
      text: "ATTACKING INDIVIDUALS",
      correct: "wrong",
      why: "Advocacy focuses on issues, evidence, and solutions, not personal attacks.",
      wrongFeedback: "This belongs to NOT ADVOCACY.",
    },
    {
      id: 8,
      text: "RAISING AWARENESS WITHOUT NEXT STEPS",
      correct: "middle",
      why: "Awareness matters, but without action it remains limited.",
      wrongFeedback: "This belongs to LIMITED / WEAK ADVOCACY.",
    },
    {
      id: 9,
      text: "COLLABORATING WITH ORGANIZATIONS",
      correct: "correct",
      why: "Working with others strengthens influence and reach.",
      wrongFeedback: "This belongs to EFFECTIVE ADVOCACY.",
    },
    {
      id: 10,
      text: "IGNORING AVAILABLE PARTICIPATION CHANNELS",
      correct: "wrong",
      why: "Advocacy uses existing channels to influence decisions.",
      wrongFeedback: "This belongs to NOT ADVOCACY.",
    },
    {
      id: 11,
      text: "CREATING A PETITION WITH NO TARGET",
      correct: "middle",
      why: "A petition without a clear target weakens impact.",
      wrongFeedback: "This belongs to LIMITED / WEAK ADVOCACY.",
    },
    {
      id: 12,
      text: "ENGAGING MEDIA WITH VERIFIED FACTS",
      correct: "correct",
      why: "Verified facts improve credibility and public influence.",
      wrongFeedback: "This belongs to EFFECTIVE ADVOCACY.",
    },
  ],
  scenarios: [
    {
      id: 13,
      title: "SCENARIO 1",
      text: "A LOCAL YOUTH SPACE IN YOUR COMMUNITY IS PLANNED TO BE CLOSED DUE TO BUDGET CUTS.",
      correctKey: "B",
      options: [
        { key: "A", label: "POST “THIS IS UNFAIR”", points: 2, feedback: "Expression alone is not enough to influence the decision." },
        { key: "B", label: "ORGANIZE CAMPAIGN + CONTACT MUNICIPALITY + MEDIA", points: 6, feedback: "This is advocacy with a target, strategy, and visibility." },
        { key: "C", label: "IGNORE", points: 0, feedback: "Ignoring the issue gives up influence." },
        { key: "D", label: "SPREAD RUMORS", points: 0, feedback: "Rumors damage trust and reduce credibility." },
      ],
    },
    {
      id: 14,
      title: "SCENARIO 2",
      text: "A CASE OF DISCRIMINATION IS REPORTED IN YOUR COMMUNITY, BUT NO OFFICIAL ACTION HAS BEEN TAKEN YET.",
      correctKey: "B",
      options: [
        { key: "A", label: "ATTACK INDIVIDUALS ONLINE", points: 0, feedback: "Personal attacks escalate conflict without solving the issue." },
        { key: "B", label: "DOCUMENT ISSUE + REPORT + ADVOCACY CAMPAIGN", points: 6, feedback: "Strong advocacy combines evidence, reporting, and public action." },
        { key: "C", label: "STAY SILENT", points: 0, feedback: "Silence leaves the issue unresolved." },
        { key: "D", label: "JOKE ABOUT IT", points: 0, feedback: "This trivializes the issue and is not advocacy." },
      ],
    },
  ],
};

export const WORLD4_TASK2 = {
  backgroundUrl: `${process.env.PUBLIC_URL}/world4/bg2.png`,
  pointsIcon: `${process.env.PUBLIC_URL}/world1/task1/points.png`,
  curiosityIcon: `${process.env.PUBLIC_URL}/world1/task1/curiositypoints.png`,
  whyIcon: `${process.env.PUBLIC_URL}/world1/task1/why.png`,
  badges: {
    beginner: `${process.env.PUBLIC_URL}/world1/task1/beginner.png`,
    advanced: `${process.env.PUBLIC_URL}/world1/task1/advanced.png`,
    expert: `${process.env.PUBLIC_URL}/world1/task1/expert.png`,
  },
  reflectionText:
    "Good advocacy starts with one question:\nWho has the power to change this?",
  rounds: [
    {
      id: 1,
      title: "ROUND 1",
      prompt: "(MATCH EACH ISSUE WITH THE MOST RELEVANT TARGET)",
      pairs: [
        {
          barrierId: "ISSUE 1",
          barrier: "YOUTH CENTER LACKS FUNDING",
          correctSolutionId: "S1",
        },
        {
          barrierId: "ISSUE 2",
          barrier: "NATIONAL EDUCATION POLICY CHANGE",
          correctSolutionId: "S2",
        },
      ],
      solutions: [
        { id: "S1", label: "LOCAL MUNICIPALITY" },
        { id: "S2", label: "GOVERNMENT / PARLIAMENT" },
      ],
      feedback: "Advocacy works best when it targets the level where decisions are made.",
    },
    {
      id: 2,
      title: "ROUND 2",
      prompt: "(MATCH EACH ISSUE WITH THE MOST RELEVANT TARGET)",
      pairs: [
        {
          barrierId: "ISSUE 3",
          barrier: "COMPANY POLLUTING ENVIRONMENT",
          correctSolutionId: "S3",
        },
        {
          barrierId: "ISSUE 4",
          barrier: "LOW YOUTH PARTICIPATION IN COMMUNITY",
          correctSolutionId: "S4",
        },
      ],
      solutions: [
        { id: "S3", label: "COMPANY MANAGEMENT + REGULATORS" },
        { id: "S4", label: "YOUTH ORGANIZATIONS + SCHOOLS" },
      ],
      feedback: "The right target depends on who is responsible and who can act.",
    },
    {
      id: 3,
      title: "ROUND 3",
      prompt: "(MATCH EACH ISSUE WITH THE MOST RELEVANT TARGET)",
      pairs: [
        {
          barrierId: "ISSUE 5",
          barrier: "MISINFORMATION SPREADING ONLINE",
          correctSolutionId: "S5",
        },
        {
          barrierId: "ISSUE 6",
          barrier: "LACK OF ACCESSIBILITY FOR PEOPLE WITH DISABILITIES",
          correctSolutionId: "S6",
        },
      ],
      solutions: [
        { id: "S5", label: "MEDIA + PLATFORMS + CITIZENS" },
        { id: "S6", label: "PUBLIC INSTITUTIONS + SERVICE PROVIDERS" },
      ],
      feedback: "Good advocacy identifies the actors with power to change the problem.",
    },
  ],
};

export const WORLD4_TASK3 = {
  backgroundUrl: `${process.env.PUBLIC_URL}/world4/bg3.png`,
  pointsIcon: `${process.env.PUBLIC_URL}/world1/task1/points.png`,
  curiosityIcon: `${process.env.PUBLIC_URL}/world1/task1/curiositypoints.png`,
  badges: {
    beginner: `${process.env.PUBLIC_URL}/world1/task1/beginner.png`,
    advanced: `${process.env.PUBLIC_URL}/world1/task1/advanced.png`,
    expert: `${process.env.PUBLIC_URL}/world1/task1/expert.png`,
  },
  rounds: [
    {
      id: 1,
      title: "ROUND 1 — DEFINE THE PROBLEM",
      statement: "YOU WANT TO ADVOCATE FOR IMPROVING MENTAL HEALTH SUPPORT FOR YOUNG PEOPLE.",
      correctKey: "B",
      options: [
        { key: "A", label: "EVERYTHING IS BAD", points: 0 },
        { key: "B", label: "YOUNG PEOPLE LACK ACCESS TO MENTAL HEALTH SUPPORT SERVICES", points: 8 },
        { key: "C", label: "NO ONE CARES", points: 0 },
        { key: "D", label: "THE SYSTEM IS BROKEN", points: 0 },
      ],
      feedbackMap: {
        A: "This is too vague to guide advocacy.",
        B: "A clear problem statement makes advocacy stronger.",
        C: "This expresses frustration, not a usable message.",
        D: "This is broad, but not specific enough for advocacy.",
      },
    },
    {
      id: 2,
      title: "ROUND 2 — USE EVIDENCE",
      statement: "WHAT STRENGTHENS YOUR MESSAGE?",
      correctKey: "B",
      options: [
        { key: "A", label: "I HEARD THIS FROM A FRIEND", points: 0 },
        { key: "B", label: "DATA + REPORTS + REAL EXAMPLES", points: 7 },
        { key: "C", label: "SOCIAL MEDIA COMMENTS", points: 0 },
        { key: "D", label: "GUESSING", points: 0 },
      ],
      feedbackMap: {
        A: "Anecdotes alone are not enough.",
        B: "Evidence makes the message credible and persuasive.",
        C: "Comments are not strong evidence.",
        D: "Guessing weakens the argument.",
      },
    },
    {
      id: 3,
      title: "ROUND 3 — PROPOSE SOLUTION",
      statement: "WHAT SHOULD YOU ASK FOR?",
      correctKey: "B",
      options: [
        { key: "A", label: "FIX IT SOMEHOW", points: 0 },
        { key: "B", label: "INTRODUCE SCHOOL-BASED SUPPORT PROGRAMS + FUNDING", points: 8 },
        { key: "C", label: "BLAME INSTITUTIONS", points: 0 },
        { key: "D", label: "DO NOTHING", points: 0 },
      ],
      feedbackMap: {
        A: "The solution is too unclear.",
        B: "Advocacy is stronger when it includes a practical proposal.",
        C: "Blame without a solution is weak advocacy.",
        D: "No action creates no change.",
      },
    },
    {
      id: 4,
      title: "ROUND 4 — CALL TO ACTION",
      statement: "HOW DO YOU MOVE PEOPLE TOWARD CHANGE?",
      correctKey: "B",
      options: [
        { key: "A", label: "SHARE IF YOU AGREE", points: 0 },
        { key: "B", label: "CONTACT DECISION-MAKERS + ATTEND CONSULTATION", points: 7 },
        { key: "C", label: "COMPLAIN ONLINE", points: 0 },
        { key: "D", label: "IGNORE", points: 0 },
      ],
      feedbackMap: {
        A: "This may spread the message, but it is too passive.",
        B: "Strong advocacy includes direct action toward decision-makers.",
        C: "Complaint alone does not create a strategic message.",
        D: "Ignoring the issue ends the advocacy effort.",
      },
    },
  ],
};

export const WORLD4_TASK4 = {
  backgroundUrl: `${process.env.PUBLIC_URL}/world4/bg4.png`,
  pointsIcon: `${process.env.PUBLIC_URL}/world1/task1/points.png`,
  curiosityIcon: `${process.env.PUBLIC_URL}/world1/task1/curiositypoints.png`,
  badges: {
    beginner: `${process.env.PUBLIC_URL}/world1/task1/beginner.png`,
    advanced: `${process.env.PUBLIC_URL}/world1/task1/advanced.png`,
    expert: `${process.env.PUBLIC_URL}/world1/task1/expert.png`,
  },
  worldCompletionBadge: `${process.env.PUBLIC_URL}/world4/badge.png`,
  finalMessage:
    "Advocacy is most effective when it is informed, collective, and strategic.",
  steps: [
    {
      id: 1,
      title: "STEP 1 — YOUR FIRST MOVE",
      statement: "YOUR CITY PLANS TO CLOSE A YOUTH CENTER DUE TO BUDGET CUTS. WHAT DO YOU DO FIRST?",
      multi: false,
      correct: ["B"],
      options: [
        { key: "A", label: "POST FRUSTRATION ONLINE", points: 3 },
        { key: "B", label: "GATHER INFORMATION ABOUT THE DECISION", points: 7 },
        { key: "C", label: "IGNORE IT", points: 0 },
        { key: "D", label: "BLAME OTHERS", points: 0 },
      ],
      feedback: "Strong advocacy starts with understanding the situation.",
    },
    {
      id: 2,
      title: "STEP 2 — BUILDING YOUR APPROACH",
      statement: "NOW YOU KNOW MORE ABOUT THE ISSUE. WHAT IS YOUR NEXT STEP?",
      multi: false,
      correct: ["B"],
      options: [
        { key: "A", label: "ACT ALONE", points: 3 },
        { key: "B", label: "BRING TOGETHER OTHER YOUNG PEOPLE AND ORGANIZATIONS", points: 7 },
        { key: "C", label: "WAIT FOR OTHERS", points: 0 },
        { key: "D", label: "START SPREADING UNVERIFIED CLAIMS", points: 0 },
      ],
      feedback: "Advocacy is stronger when people act together.",
    },
    {
      id: 3,
      title: "STEP 3 — TAKING ACTION",
      statement: "YOU NOW HAVE A GROUP. WHAT ACTION DO YOU TAKE?",
      multi: false,
      correct: ["A"],
      options: [
        { key: "A", label: "ORGANIZED CAMPAIGN + CONTACT MUNICIPALITY + MEDIA", points: 7 },
        { key: "B", label: "ONLY POST ON SOCIAL MEDIA", points: 3 },
        { key: "C", label: "PROTEST WITHOUT CLEAR MESSAGE", points: 0 },
        { key: "D", label: "DO NOTHING", points: 0 },
      ],
      feedback: "Effective advocacy combines visibility and direct pressure.",
    },
    {
      id: 4,
      title: "STEP 4 — RESPONSE FROM DECISION-MAKERS",
      statement: "THE MUNICIPALITY RESPONDS: “WE ARE OPEN TO DISCUSSION.” WHAT DO YOU DO?",
      multi: false,
      correct: ["B"],
      options: [
        { key: "A", label: "REFUSE DIALOGUE", points: 0 },
        { key: "B", label: "PRESENT CLEAR PROPOSAL + EVIDENCE + COMMUNITY SUPPORT", points: 7 },
        { key: "C", label: "ATTACK THEM PUBLICLY", points: 0 },
        { key: "D", label: "STOP THE CAMPAIGN", points: 0 },
      ],
      feedback: "Advocacy is not only opposition — it is proposing solutions.",
    },
    {
      id: 5,
      title: "FINAL REFLECTION",
      statement: "WHAT MADE THE BIGGEST DIFFERENCE IN YOUR STRATEGY?",
      multi: false,
      correct: ["B"],
      options: [
        { key: "A", label: "ACTING QUICKLY", points: 0 },
        { key: "B", label: "ACTING TOGETHER AND STRATEGICALLY", points: 2 },
        { key: "C", label: "BEING LOUD", points: 0 },
        { key: "D", label: "LUCK", points: 0 },
      ],
      feedback: "Advocacy is most effective when it is informed, collective, and strategic.",
    },
  ],
};