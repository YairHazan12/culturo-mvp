import {
  ConceptModule,
  Culture,
  InteractiveScenario,
  PlaybookModule,
  Scenario,
  Skill,
} from "./types";

export const SKILL_LABELS: Record<Skill, string> = {
  "trust-building": "Trust building",
  "indirect-communication": "Indirect communication",
  "negotiation-signals": "Negotiation signals",
  hierarchy: "Hierarchy",
  "saving-face": "Saving face",
  "meeting-etiquette": "Meeting etiquette",
  "follow-up-strategy": "Follow-up strategy",
};

export const cultures: Culture[] = [
  {
    code: "CN",
    name: "China",
    flag: "🇨🇳",
    status: "active",
    tagline: "Launch market — full playbook, scenarios, and coach available",
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    status: "coming-soon",
    tagline: "Consensus building, ringi-sho, and supplier relations",
  },
  {
    code: "KR",
    name: "South Korea",
    flag: "🇰🇷",
    status: "coming-soon",
    tagline: "Conglomerate hierarchy and rapid-cycle negotiation",
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    status: "coming-soon",
    tagline: "Multi-stakeholder deals and offshore operations",
  },
  {
    code: "AE",
    name: "UAE",
    flag: "🇦🇪",
    status: "coming-soon",
    tagline: "Relationship-first deals and majlis etiquette",
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    status: "coming-soon",
    tagline: "Directness, process rigor, and procurement discipline",
  },
  {
    code: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    status: "coming-soon",
    tagline: "Warmth-led trust and long sales cycles",
  },
];

export const scenarios: Scenario[] = [
  {
    id: "timeline-pushback",
    title: "Soft pushback on a tight timeline",
    industry: "Enterprise SaaS",
    difficulty: "Intermediate",
    image: "/images/negotiation-meeting.jpeg",
    imageAlt: "Two business teams negotiating across a meeting table",
    setup:
      "You are a U.S. sales lead. Your CEO wants the contract signed this week. You are on a video call with Mr. Liu, VP of Procurement at a Shanghai manufacturing group.",
    partnerLine: "This timeline may be a little difficult.",
    context:
      "There has been three weeks of relationship building. Mr. Liu has signaled interest but has not seen final pricing approved by his internal committee.",
    options: [
      {
        id: "a",
        text: "Understood — what date would work better on your side? We can adjust if you can confirm by end of week.",
        score: 86,
        risk: "low",
        feedback:
          "Strong. You acknowledge the soft no, offer flexibility, and keep a clear ask. Tone is respectful, not transactional.",
      },
      {
        id: "b",
        text: "Our CEO needs the contract signed this week or we will move forward with another partner.",
        score: 22,
        risk: "high",
        feedback:
          "Direct ultimatum causes loss of face, breaks the relationship, and signals you do not understand internal decision cycles.",
      },
      {
        id: "c",
        text: "No problem, take all the time you need.",
        score: 41,
        risk: "moderate",
        feedback:
          "Polite but vague. You lose momentum and the deal can drift. No clear next step or commitment loop.",
      },
    ],
    bestResponse:
      "Thank you, Mr. Liu. We understand there are internal considerations on your side. To help both teams plan, could we align on a target date that works for your committee? We remain very committed to finding a path that works for both sides.",
    bestResponseRationale:
      "Acknowledges the soft no, removes pressure, names the real obstacle (the committee), and keeps a relationship-led close.",
    followUp:
      "Send a short message within 24 hours summarizing the call, restating the proposed target date, and offering a private prep call with his internal champion.",
    relatedModuleSlug: "yes-does-not-mean-agreement",
    skill: "indirect-communication",
  },
  {
    id: "silent-room",
    title: "The silent room after your pitch",
    industry: "Industrial equipment",
    difficulty: "Advanced",
    image: "/images/committee-meeting.jpg",
    imageAlt: "A Chinese buying committee seated around a glass conference table",
    setup:
      "You finish your 20-minute pitch to a buying committee in Shenzhen. There are five seconds of silence. No one nods.",
    partnerLine: "(Silence)",
    context:
      "The senior executive in the room has not spoken. Two younger team members are taking notes. You feel the urge to fill the silence.",
    options: [
      {
        id: "a",
        text: "Wait. Make eye contact with the senior executive. Ask a low-stakes question to the room.",
        score: 88,
        risk: "low",
        feedback:
          "Silence often means processing, not rejection. Direct your question to the most senior person and keep the question small.",
      },
      {
        id: "b",
        text: "Quickly add three more value points to keep momentum.",
        score: 35,
        risk: "elevated",
        feedback:
          "Stacking value reads as anxious and pushy. It also overloads junior translators and undermines the senior decision-maker.",
      },
      {
        id: "c",
        text: "Ask 'Do you want to sign today?'",
        score: 18,
        risk: "high",
        feedback:
          "A closing question this early forces a public commitment. Public 'no' is costly, so the answer will be a polite deflection that closes the door.",
      },
    ],
    bestResponse:
      "Thank you for the time today. I'd love to understand which part of this is most relevant to your team's priorities this quarter.",
    bestResponseRationale:
      "Hands the floor back to the senior executive, signals respect, and converts silence into structured dialogue without pushing for commitment.",
    followUp:
      "Send a brief written recap in both English and Chinese, addressed to the senior executive by title, with a one-page summary attached.",
    relatedModuleSlug: "handling-silence",
    skill: "meeting-etiquette",
  },
  {
    id: "dinner-toast",
    title: "First dinner with the partner team",
    industry: "Logistics",
    difficulty: "Entry",
    image: "/images/ganbei-toast.jpg",
    imageAlt: "Business colleagues raising glasses for a ganbei toast at dinner",
    setup:
      "Your team is hosted at a private dinner. The Chinese CEO offers a toast 'to our future cooperation.' You are not the most senior on your side.",
    partnerLine: "干杯 (Ganbei) — to our future cooperation!",
    context:
      "Your own CEO is at the table. Two factory managers and the Chinese CEO's son (the COO) are also present.",
    options: [
      {
        id: "a",
        text: "Let your CEO respond first. Stand, raise glass with two hands, acknowledge the host, then your CEO, then the room.",
        score: 92,
        risk: "low",
        feedback:
          "Respects hierarchy on both sides, uses correct gesture, and builds trust.",
      },
      {
        id: "b",
        text: "Stand up first, give a long toast about your product roadmap.",
        score: 28,
        risk: "elevated",
        feedback:
          "Skipping your own CEO and turning a toast into a pitch breaks etiquette twice in one move.",
      },
      {
        id: "c",
        text: "Stay seated, nod, take a small sip.",
        score: 44,
        risk: "moderate",
        feedback:
          "Not offensive but misses an important trust-building beat at the most relational moment of the trip.",
      },
    ],
    bestResponse:
      "(After your CEO responds) Stand, lower your glass slightly below the host's, and say: 'Thank you for the welcome. We are honored to be your partner and look forward to building something lasting together.'",
    bestResponseRationale:
      "Lowering the glass signals respect for hierarchy. Speaking of 'lasting partnership' values the relationship over the transaction.",
    followUp:
      "The next morning, send a handwritten or hand-signed thank-you note to the host, naming the specific dish or moment.",
    relatedModuleSlug: "dinner-gifts-trust",
    skill: "trust-building",
  },
  {
    id: "delayed-response",
    title: "Three days of silence after sending the contract",
    industry: "Consumer goods",
    difficulty: "Intermediate",
    image: "/images/email-laptop-cafe.avif",
    imageAlt: "A professional reviewing email on a laptop while waiting for a reply",
    setup:
      "You sent the final redlined contract on Monday. It is Thursday morning, no reply. Your CFO is asking for status.",
    partnerLine: "(No response for 3 days)",
    context:
      "Last week, the procurement director said the contract would 'move quickly.' Chinese New Year is not nearby. There is no obvious reason for the silence.",
    options: [
      {
        id: "a",
        text: "Send a short, warm follow-up offering to help with any internal review and asking if there is anything they need from your side.",
        score: 84,
        risk: "low",
        feedback:
          "Light touch, offers help, removes pressure, and creates an opening for them to share what is really happening internally.",
      },
      {
        id: "b",
        text: "Send a firm email saying you need a response by EOD or the offer expires.",
        score: 19,
        risk: "high",
        feedback:
          "Deadline threats almost always destroy Chinese B2B deals. It will be read as disrespect and erase three months of relationship building.",
      },
      {
        id: "c",
        text: "Do nothing. Wait another week.",
        score: 47,
        risk: "moderate",
        feedback:
          "Patience matters, but doing nothing risks the deal stalling silently. A light check-in is appropriate.",
      },
    ],
    bestResponse:
      "Hi Director Zhang — thank you again for your time last week. I know contracts often go through several internal reviews. Please let me know if there is anything from our side that would help your team. We remain very committed to working with you.",
    bestResponseRationale:
      "Acknowledges multi-step internal review (common in China), offers help, and avoids any framing that could cause loss of face.",
    followUp:
      "If no response in 5 business days, ask your local intermediary or BD partner for a quiet read of the room.",
    relatedModuleSlug: "handling-silence",
    skill: "follow-up-strategy",
  },
  {
    id: "hierarchy-meeting",
    title: "Who do you address in the meeting?",
    industry: "Financial services",
    difficulty: "Entry",
    image: "/images/business-meeting.jpg",
    imageAlt: "A Chinese business team seated in a meeting room",
    setup:
      "Six people are in the room. A senior director is in the corner seat, mostly silent. A younger team lead is asking most of the questions.",
    partnerLine: "(Team lead) 'Can you explain pricing in more detail?'",
    context:
      "You came to close a multi-year partnership.",
    options: [
      {
        id: "a",
        text: "Answer the question, then turn slightly toward the senior director to acknowledge them, and continue.",
        score: 90,
        risk: "low",
        feedback:
          "Correct. Engage the asker but route respect to the most senior person; they are the real decision-maker.",
      },
      {
        id: "b",
        text: "Speak only to the team lead since they are asking the questions.",
        score: 42,
        risk: "moderate",
        feedback:
          "You miss the decision-maker. The senior director will quietly disengage.",
      },
      {
        id: "c",
        text: "Walk over and hand a business card directly to the senior director mid-question.",
        score: 31,
        risk: "elevated",
        feedback:
          "Interrupts the speaker and feels theatrical. Hand cards at start or end of meeting, with two hands.",
      },
    ],
    bestResponse:
      "Detailed answer to the team lead's question, then: 'Director Wang, would you like me to go deeper on the contract structure, or is the pricing model the right starting point?'",
    bestResponseRationale:
      "Answers the question raised, then explicitly defers strategic direction to the senior executive — a classic respect-of-hierarchy move.",
    followUp:
      "After the meeting, send your business card and a brief note to the senior director's executive assistant.",
    relatedModuleSlug: "hierarchy-meetings",
    skill: "hierarchy",
  },
];

export const playbook: PlaybookModule[] = [
  {
    slug: "yes-does-not-mean-agreement",
    title: "When 'yes' does not mean agreement",
    minutes: 6,
    skill: "indirect-communication",
    image: "/images/cultural-context.webp",
    imageAlt: "Understanding cultural context in Chinese business communication",
    situation:
      "You finish presenting a proposal. The room nods. People say 'yes, yes' and 'okay.' You leave the meeting believing the deal is moving. Two weeks later, nothing happens.",
    whatGoesWrong:
      "U.S. teams often hear verbal agreement as commitment. In China, 'yes' often means 'I hear you' or 'I understand,' not 'I agree.'",
    meaningInChina:
      "Agreement is signaled through follow-up actions: a meeting with a more senior person, a request for documents, an internal champion appearing, or a quiet ask to revise pricing. Words alone are not the contract.",
    whatToSayInstead:
      "End meetings with a concrete, low-stakes next step. Example: 'Would it be helpful if we sent a short summary today and proposed a follow-up call with your technical lead next week?'",
    dos: [
      "Ask for a specific next step before leaving the room",
      "Read body language and silence as data",
      "Confirm in writing in both languages within 24 hours",
    ],
    donts: [
      "Don't celebrate verbal 'yes' as a closed deal",
      "Don't push for a verbal commitment in front of the team",
      "Don't assume silence means rejection",
    ],
    quiz: [
      {
        q: "Your Chinese counterpart says 'yes, yes, no problem' three times during the call. What is the most accurate read?",
        options: [
          "The deal is done.",
          "They are acknowledging — not necessarily agreeing.",
          "They are stalling.",
        ],
        correctIndex: 1,
        why: "'Yes' is most often a marker of polite acknowledgement. Real commitment shows up in follow-up actions.",
      },
      {
        q: "Best next step at the end of a positive-sounding meeting?",
        options: [
          "Ask them to sign a memo of intent on the spot.",
          "Send a thank-you and propose a specific, small next action with a date.",
          "Wait one month to give them space.",
        ],
        correctIndex: 1,
        why: "A small, dated next step preserves face and gives you a real-world signal of commitment.",
      },
      {
        q: "Which of these is the strongest sign of real interest?",
        options: [
          "Verbal 'yes' from the most senior person.",
          "They introduce you to a more senior decision-maker or ask for technical due diligence.",
          "They smile a lot.",
        ],
        correctIndex: 1,
        why: "Movement in the org chart and concrete requests are the real signals.",
      },
    ],
    practiceScenarioId: "timeline-pushback",
  },
  {
    slug: "reading-soft-rejection",
    title: "Reading soft rejection signals",
    minutes: 5,
    skill: "indirect-communication",
    image: "/images/communication.webp",
    imageAlt: "Chinese business communication across a table",
    situation:
      "You ask for a commitment. Your counterpart says, 'It may be inconvenient,' or 'We will need to study this.'",
    whatGoesWrong:
      "Many U.S. teams interpret these phrases as 'maybe' and keep pushing. Pushing harder accelerates the loss of the deal.",
    meaningInChina:
      "Phrases like 'a little difficult,' 'we will consider,' 'inconvenient,' and 'need to study' are almost always polite 'no' signals that protect face on both sides.",
    whatToSayInstead:
      "Acknowledge the signal, lower pressure, and surface the real constraint: 'I appreciate you sharing that. Could you help me understand which part of this is most challenging on your side, so we can think together?'",
    dos: [
      "Recognize soft-no language as data, not noise",
      "Slow down, ask open questions",
      "Offer optionality (different scope, different timing)",
    ],
    donts: [
      "Don't double down on the original offer",
      "Don't ask 'so is that a yes or no?'",
      "Don't move to a discount as the first response",
    ],
    quiz: [
      {
        q: "'This may be a little inconvenient' most likely means…",
        options: ["Mild concern", "Polite no", "Pricing issue"],
        correctIndex: 1,
        why: "It is one of the most common soft-no signals in Chinese business communication.",
      },
      {
        q: "Best immediate response?",
        options: [
          "Drop the price 10%",
          "Acknowledge and explore the underlying constraint",
          "Restate the deal terms",
        ],
        correctIndex: 1,
        why: "Pricing reactions teach your counterpart that 'inconvenient' = discount, which damages every future round.",
      },
      {
        q: "Which signal is a real 'yes'?",
        options: [
          "'We will study this'",
          "'Let's involve our technical director next week'",
          "'No problem'",
        ],
        correctIndex: 1,
        why: "Pulling in a more senior person is action-level commitment.",
      },
    ],
    practiceScenarioId: "delayed-response",
  },
  {
    slug: "saving-face-disagreement",
    title: "Saving face during disagreement",
    minutes: 7,
    skill: "saving-face",
    image: "/images/business-group-1.webp",
    imageAlt: "A group of Chinese professionals in discussion",
    situation:
      "Your counterpart proposes a solution that you believe is technically wrong. The room is watching.",
    whatGoesWrong:
      "Direct correction ('That's incorrect') in front of the team causes loss of face for the speaker and embarrasses the senior people who let them speak.",
    meaningInChina:
      "Face is collective. Embarrassing one person also embarrasses the team and the company. Even when you are right, the cost of public correction is usually higher than the win.",
    whatToSayInstead:
      "Frame your view as additive, not corrective: 'That's an interesting approach. Building on that idea, we have also seen X work in similar situations — would it be useful to compare both?'",
    dos: [
      "Use 'building on' language",
      "Offer choices, not corrections",
      "Move technical disagreement offline / 1:1 if needed",
    ],
    donts: [
      "Don't say 'that's wrong' in front of the team",
      "Don't laugh, sigh, or look at your team for confirmation",
      "Don't escalate to email reply-all",
    ],
    quiz: [
      {
        q: "A junior counterpart presents a clearly flawed plan. Best move in the room?",
        options: [
          "Correct it immediately, in detail.",
          "Add your view as an alternative to compare.",
          "Stay silent and email later.",
        ],
        correctIndex: 1,
        why: "Adds your view while preserving the speaker's face and the team's harmony.",
      },
      {
        q: "Which phrase protects face best?",
        options: [
          "'You're missing the point.'",
          "'Let me add another angle to consider.'",
          "'We can't do it that way.'",
        ],
        correctIndex: 1,
        why: "Additive framing keeps everyone in the discussion.",
      },
      {
        q: "After a tense moment, what restores trust fastest?",
        options: [
          "A long email explaining your reasoning",
          "A small, private gesture to the senior person involved",
          "Bringing it up next week in front of the team again",
        ],
        correctIndex: 1,
        why: "Private acknowledgement to seniority restores face quietly and quickly.",
      },
    ],
    practiceScenarioId: "silent-room",
  },
  {
    slug: "trust-before-deal",
    title: "Building trust before pushing the deal",
    minutes: 8,
    skill: "trust-building",
    image: "/images/banquet-round-table.jpg",
    imageAlt: "A Chinese business banquet around a large round table",
    situation:
      "Your team has 90 days to close. Your counterpart wants a third dinner and a factory visit before discussing terms.",
    whatGoesWrong:
      "U.S. teams treat dinners as 'soft' time and try to compress relationship building. The Chinese side reads this as transactional and risky.",
    meaningInChina:
      "Trust is not a phase before the deal. Trust is the deal. Relationship signals (time invested, seniority shown up, personal warmth) are weighted heavily in the buy decision.",
    whatToSayInstead:
      "'We would be honored to visit the factory. Could we also propose a working session the day after, so our technical leads can spend real time together?'",
    dos: [
      "Send senior people to early meetings",
      "Accept dinner invitations whenever possible",
      "Find shared third-party connections",
    ],
    donts: [
      "Don't say 'let's skip the dinner and just sign'",
      "Don't send only junior staff to the first meeting",
      "Don't treat relationship time as a tax on the deal",
    ],
    quiz: [
      {
        q: "Why does your counterpart want a third dinner?",
        options: [
          "Stalling for price",
          "Investing in long-term trust",
          "Politeness only",
        ],
        correctIndex: 1,
        why: "Repeated relational time is the primary trust signal in Chinese B2B culture.",
      },
      {
        q: "Best way to honor relationship time while protecting the timeline?",
        options: [
          "Compress everything into one trip",
          "Pair relationship time with a focused working session the next day",
          "Send a more junior person",
        ],
        correctIndex: 1,
        why: "Pairing relational and working time respects both speeds.",
      },
      {
        q: "Who should attend the first major meeting?",
        options: ["Your most junior BD", "An equivalent or higher seniority match", "Whoever has the calendar"],
        correctIndex: 1,
        why: "Matching seniority shows respect for the relationship.",
      },
    ],
    practiceScenarioId: "dinner-toast",
  },
  {
    slug: "negotiate-without-damaging-relationship",
    title: "Negotiating without damaging the relationship",
    minutes: 8,
    skill: "negotiation-signals",
    image: "/images/guanxi-meeting.avif",
    imageAlt: "Business partners meeting to negotiate in China",
    situation:
      "You need a 12% price reduction to close. Your counterpart has hinted that pricing is sensitive.",
    whatGoesWrong:
      "Hard, fast, adversarial moves (ultimatums, walk-away threats, deadline pressure) break the relationship and rarely move the price.",
    meaningInChina:
      "Negotiation is layered. Price is one variable; payment terms, scope, exclusivity, future volume, intro to other accounts, and timing are equally tradeable. The 'real' price often emerges through several quiet rounds.",
    whatToSayInstead:
      "'We are committed to making this work for both sides. Could we explore a structure where we adjust pricing in exchange for a longer term or expanded scope?'",
    dos: [
      "Trade across multiple variables",
      "Slow the pace deliberately",
      "Anchor with respect for the relationship, not the number",
    ],
    donts: [
      "Don't use 'final offer' language",
      "Don't reveal your walk-away point",
      "Don't show internal disagreement to the other side",
    ],
    quiz: [
      {
        q: "Best opening move when price seems blocked?",
        options: [
          "Restate your number more firmly",
          "Introduce a new variable (term, scope, volume)",
          "Threaten to leave",
        ],
        correctIndex: 1,
        why: "Expanding the variables creates space without forcing a public concession.",
      },
      {
        q: "Pace of negotiation should be…",
        options: [
          "Faster than your normal cycle",
          "About the same",
          "Slower than your normal cycle",
        ],
        correctIndex: 2,
        why: "Patience signals respect and gives both sides cover to consult internally.",
      },
      {
        q: "'Final offer' framing usually…",
        options: [
          "Speeds the deal",
          "Forces a public no",
          "Has no effect",
        ],
        correctIndex: 1,
        why: "It corners your counterpart and erases their options for face-saving movement.",
      },
    ],
    practiceScenarioId: "timeline-pushback",
  },
  {
    slug: "hierarchy-meetings",
    title: "Understanding hierarchy in meetings",
    minutes: 5,
    skill: "hierarchy",
    image: "/images/professionals-entrance.avif",
    imageAlt: "Chinese professionals walking through a modern office entrance",
    situation:
      "You walk into a 6-person meeting. You are not sure who the decision-maker is.",
    whatGoesWrong:
      "U.S. teams often speak to whoever asks the most questions, missing the silent senior decision-maker.",
    meaningInChina:
      "Seniority is signaled by seating position, order of entry, who is served tea first, and who speaks last (not first). The decision-maker is often the quietest person in the room.",
    whatToSayInstead:
      "Acknowledge the senior person early, then engage the room. 'Director Wang, thank you for hosting us. With your permission, I'd like to walk the team through our proposal.'",
    dos: [
      "Greet by title in seniority order",
      "Exchange business cards with two hands",
      "Watch where people sit",
    ],
    donts: [
      "Don't ignore the quiet person in the corner",
      "Don't hand cards with one hand",
      "Don't joke in early meetings",
    ],
    quiz: [
      {
        q: "Decision-maker is usually…",
        options: [
          "The loudest person",
          "The most senior person, often quietest",
          "The translator",
        ],
        correctIndex: 1,
        why: "Speaking last and least is a senior-position signal.",
      },
      {
        q: "Business cards should be exchanged…",
        options: ["With one hand, casually", "With two hands, reading the card before putting it down", "By email only"],
        correctIndex: 1,
        why: "Receiving cards with two hands and pausing on the title is a small but high-signal respect move.",
      },
      {
        q: "When unsure who is most senior…",
        options: [
          "Ask directly in the meeting",
          "Watch entry order and seating",
          "Address everyone the same",
        ],
        correctIndex: 1,
        why: "The room itself signals seniority — observe before speaking.",
      },
    ],
    practiceScenarioId: "hierarchy-meeting",
  },
  {
    slug: "handling-silence",
    title: "Handling silence and delayed responses",
    minutes: 6,
    skill: "follow-up-strategy",
    image: "/images/professionals-walking.jpg",
    imageAlt: "Business professionals walking and talking in a corporate corridor",
    situation:
      "Silence after your pitch, or no email response for several days after a contract is sent.",
    whatGoesWrong:
      "U.S. teams panic-fill silence in the room or send a sharper email to break the quiet. Both moves damage the deal.",
    meaningInChina:
      "Silence is processing, internal alignment, or a sign of unresolved internal opinion. It is rarely rejection. Multi-stakeholder review takes time.",
    whatToSayInstead:
      "After 3–5 days of silence: 'Thank you again for the discussion. I imagine your team is reviewing internally — please let us know if anything from our side would help.'",
    dos: [
      "Wait, then send a warm low-pressure note",
      "Offer help with internal review",
      "Use intermediaries when you have them",
    ],
    donts: [
      "Don't send a deadline or ultimatum",
      "Don't change pricing as a reaction to silence",
      "Don't email the senior person reply-all if your champion went quiet",
    ],
    quiz: [
      {
        q: "Best wait time before a follow-up after sending a contract?",
        options: ["Same day", "3–5 business days", "Three weeks"],
        correctIndex: 1,
        why: "Long enough to respect internal review, short enough to keep momentum.",
      },
      {
        q: "Tone of the follow-up should be…",
        options: ["Firm and time-bound", "Warm and helpful", "Apologetic"],
        correctIndex: 1,
        why: "Warmth keeps the relational thread; pressure breaks it.",
      },
      {
        q: "If silence continues, who should you ask first?",
        options: ["The CEO", "Your local intermediary or champion", "The procurement assistant by phone"],
        correctIndex: 1,
        why: "Local intermediaries can read the room privately and protect both sides' face.",
      },
    ],
    practiceScenarioId: "delayed-response",
  },
  {
    slug: "follow-up-messages",
    title: "Follow-up messages after a Chinese business meeting",
    minutes: 5,
    skill: "follow-up-strategy",
    image: "/images/business-group-2.webp",
    imageAlt: "A group of young Chinese professionals after a meeting",
    situation:
      "You leave a strong first meeting. You want to follow up before momentum fades.",
    whatGoesWrong:
      "U.S. follow-ups are often transactional, action-item heavy, and skip relationship language. They read as cold to a Chinese counterpart.",
    meaningInChina:
      "A good follow-up restates the relationship first, then the work. It acknowledges seniority, thanks the host, and proposes a small concrete next step.",
    whatToSayInstead:
      "Open with thanks and a personal note ('thank you for the warm welcome and the excellent dinner'), then the substance ('attached is the one-page summary we discussed'), then a small next ask.",
    dos: [
      "Personalize: name a moment from the meeting",
      "Address the senior person by title",
      "Attach a short bilingual summary if possible",
    ],
    donts: [
      "Don't send only a bullet list of action items",
      "Don't reply-all if you're not sure of the org chart",
      "Don't ask for a signature in the first follow-up",
    ],
    quiz: [
      {
        q: "Best structure for the follow-up?",
        options: [
          "Action items only",
          "Relationship line → recap → small next step",
          "Single sentence: 'Looking forward.'",
        ],
        correctIndex: 1,
        why: "Threading relationship language through a clear recap honors both worlds.",
      },
      {
        q: "Bilingual summaries are…",
        options: ["Unnecessary", "A strong respect signal when scoped to one page", "Required for legal reasons"],
        correctIndex: 1,
        why: "Optional, but high-signal. One-pager respects the reader's time and language.",
      },
      {
        q: "First follow-up should ask for…",
        options: [
          "A signature",
          "A small, dated next step",
          "Pricing concessions",
        ],
        correctIndex: 1,
        why: "Small next steps test commitment without forcing a public 'yes'.",
      },
    ],
    practiceScenarioId: "delayed-response",
  },
  {
    slug: "dinner-gifts-trust",
    title: "Dinner, gifts, and informal trust-building",
    minutes: 7,
    skill: "trust-building",
    image: "/images/red-envelopes.jpg",
    imageAlt: "A Chinese family exchanging red gift envelopes",
    situation:
      "You are invited to a dinner with your partner team. You wonder about toasts, seating, and whether to bring a gift.",
    whatGoesWrong:
      "Underestimating these moments. Or overcompensating with extravagant gifts that put your counterpart in an awkward position.",
    meaningInChina:
      "Dinners are where trust is built. Gifts should be modest, branded with thoughtfulness (something from your home city/region), and given with two hands. Seating respects seniority.",
    whatToSayInstead:
      "'It is our honor to host (or be hosted by) you. We brought a small gift from our city — please accept this as a token of our appreciation.'",
    dos: [
      "Bring small, regional, well-wrapped gifts",
      "Use two hands for gift exchange",
      "Toast the host first, then the table",
    ],
    donts: [
      "Don't gift in quantities of 4 (associated with bad luck)",
      "Don't refuse food or drink without explanation",
      "Don't bring gifts that are too expensive — it embarrasses the receiver",
    ],
    quiz: [
      {
        q: "Best gift profile?",
        options: [
          "Most expensive item you can find",
          "Modest, regional, thoughtfully wrapped",
          "Generic corporate swag",
        ],
        correctIndex: 1,
        why: "Thoughtfulness ranks far above price.",
      },
      {
        q: "Toast order at dinner?",
        options: [
          "Whoever feels like standing first",
          "Host first, then by seniority",
          "Alphabetical",
        ],
        correctIndex: 1,
        why: "Toast order is a small but reliable seniority signal.",
      },
      {
        q: "Which is unlucky?",
        options: ["Gift in pair", "Gift in 4s", "Gift in 8s"],
        correctIndex: 1,
        why: "The number 4 sounds like 'death' in Mandarin and is avoided.",
      },
    ],
    practiceScenarioId: "dinner-toast",
  },
  {
    slug: "challenge-respectfully",
    title: "How to challenge a Chinese partner respectfully",
    minutes: 7,
    skill: "saving-face",
    image: "/images/handshake-closeup.jpeg",
    imageAlt: "Close-up of two business people shaking hands",
    situation:
      "Your partner's delivery has slipped 3 weeks. You need to escalate, but you cannot afford to break the relationship.",
    whatGoesWrong:
      "Public escalation (reply-all email, executive call without warning, threats of penalty clauses) destroys trust and slows the delivery further.",
    meaningInChina:
      "Escalation is most effective through private, indirect channels: a 1:1 with your counterpart, a quiet ask to their internal champion, or your senior speaking to their senior privately.",
    whatToSayInstead:
      "'I want to raise something important with you privately. We are seeing some slippage on the timeline. I trust your team. How can we work together to bring this back on track?'",
    dos: [
      "Raise it in private first",
      "Frame it as 'we' not 'you'",
      "Use seniority symmetry — match the level",
    ],
    donts: [
      "Don't reply-all",
      "Don't bring up penalties as the first move",
      "Don't show internal frustration to their team",
    ],
    quiz: [
      {
        q: "First move when delivery slips?",
        options: [
          "Send a formal email with penalty clause attached",
          "Schedule a private call with your direct counterpart",
          "Escalate to both CEOs immediately",
        ],
        correctIndex: 1,
        why: "Private 1:1 protects face and preserves your counterpart's room to fix the issue.",
      },
      {
        q: "Best framing of the conversation?",
        options: [
          "'You missed the deadline.'",
          "'We are seeing slippage and want to think with you about it.'",
          "'This is unacceptable.'",
        ],
        correctIndex: 1,
        why: "'We' framing creates joint ownership; 'you' framing creates defensiveness.",
      },
      {
        q: "If a 1:1 doesn't move things, next step?",
        options: [
          "Reply-all email",
          "Senior-to-senior private call",
          "Public LinkedIn post",
        ],
        correctIndex: 1,
        why: "Matching seniority privately is the next escalation rung — never public.",
      },
    ],
    practiceScenarioId: "delayed-response",
  },
];

export const conceptModules: ConceptModule[] = [
  {
    slug: "guanxi",
    title: "Guanxi",
    subtitle: "The relationship network that runs Chinese business",
    minutes: 4,
    emoji: "🀄",
    image: "/images/temple-handshake.jpg",
    imageAlt: "Business partners shaking hands in front of a traditional Chinese temple",
    accent: "red",
    bigIdea:
      "In China, trust isn't a step before the deal — it is the deal. Guanxi (关系) is the web of personal relationships and mutual obligation that decides who gets the meeting, the price, and the yes.",
    cards: [
      {
        icon: "🔗",
        title: "What Guanxi is",
        body: "A living network of reciprocal relationships. Favors are remembered, balanced over time, and extended to your whole company.",
      },
      {
        icon: "💗",
        title: "Why relationships matter",
        body: "Contracts set terms; guanxi sets willingness. A partner with strong guanxi will solve problems off the books that a contract never could.",
      },
      {
        icon: "🍵",
        title: "How it's built",
        body: "Time, presence, and small consistent gestures — dinners, introductions, remembering names and families. It compounds slowly.",
      },
      {
        icon: "♻️",
        title: "Reciprocity",
        body: "Every favor creates a quiet obligation. Accept help graciously, and look for natural ways to give back before you're asked.",
      },
    ],
    mistakes: [
      "Treating relationship time as a tax on the deal",
      "Sending only junior staff to early meetings",
      "Going transactional the moment terms come up",
      "Disappearing after the contract is signed",
    ],
    tips: [
      "Invest before you need anything",
      "Match seniority to seniority",
      "Remember the personal details — and follow up on them",
      "Give favors generously, count them never",
    ],
    takeaways: [
      "Guanxi is the real decision layer above the contract",
      "It transfers to your company, not just to you",
      "Patience and presence beat persuasion",
    ],
    scenario: {
      prompt:
        "Your counterpart invites you to a third dinner — but your CEO wants terms discussed this week.",
      partnerLine: "Let's enjoy dinner first. Business can wait until we know each other better.",
      choices: [
        {
          text: "We'd be honored. Could we also set a short working session the next morning?",
          good: true,
          feedback:
            "Perfect. You honor the relationship while gently protecting the timeline — pairing guanxi with progress.",
        },
        {
          text: "Thank you, but we really should lock the terms tonight.",
          good: false,
          feedback:
            "Pushing past the relationship signal reads as transactional and slows the deal further.",
        },
      ],
    },
  },
  {
    slug: "first-business-meeting",
    title: "First Business Meeting",
    subtitle: "Make the right impression in the first 15 minutes",
    minutes: 5,
    emoji: "🤝",
    image: "/images/handshake-office.jpeg",
    imageAlt: "Two businesspeople shaking hands across a table in a modern office",
    accent: "gold",
    bigIdea:
      "The first meeting is a relationship audition, not a pitch. Hierarchy, seating, cards, and rapport are read closely — and they decide whether a second meeting happens.",
    cards: [
      {
        icon: "🎟️",
        title: "Meeting etiquette",
        body: "Arrive early, dress conservatively, and let the host set the pace. Silence is normal — don't rush to fill it.",
      },
      {
        icon: "🪪",
        title: "Introductions",
        body: "Exchange business cards with both hands, Chinese side up. Receive each card, read it, and place it respectfully on the table.",
      },
      {
        icon: "🏛️",
        title: "Hierarchy",
        body: "Greet the most senior person first. The decision-maker is often the quietest in the room — route respect to them.",
      },
      {
        icon: "🌱",
        title: "Rapport building",
        body: "Open with warmth, not the agenda. Small talk about the trip, the city, or the meal is real work, not a delay.",
      },
    ],
    mistakes: [
      "Handing a business card with one hand",
      "Speaking only to the loudest questioner",
      "Opening with the hard sell",
      "Correcting or interrupting a senior person",
    ],
    tips: [
      "Enter and greet in order of seniority",
      "Bring a small, thoughtful regional gift",
      "Mirror the host's pace and formality",
      "Let your most senior person lead the room",
    ],
    takeaways: [
      "The first meeting earns the second — it rarely closes anything",
      "Cards, seating, and order all signal respect",
      "Rapport is the agenda, not a warm-up to it",
    ],
    scenario: {
      prompt:
        "A junior team lead asks most of the questions while a senior director sits quietly in the corner.",
      partnerLine: "(Team lead) Can you explain your pricing in more detail?",
      choices: [
        {
          text: "Answer the lead, then turn to the director: 'Director Wang, would you like me to go deeper here?'",
          good: true,
          feedback:
            "Exactly right. You engage the asker but route strategic respect to the real decision-maker.",
        },
        {
          text: "Focus entirely on the team lead since they're driving the questions.",
          good: false,
          feedback:
            "You miss the decision-maker, who will quietly disengage. Always acknowledge seniority in the room.",
        },
      ],
    },
  },
];

export const interactiveScenarios: InteractiveScenario[] = [
  {
    id: "shenzhen-close",
    title: "Closing the Shenzhen deal",
    industry: "Enterprise SaaS · $4.2M",
    setup:
      "You're a U.S. sales lead on a video call with Mr. Liu, VP of Procurement at a Shenzhen manufacturing group. Three weeks of relationship building are behind you. Your CEO wants this signed soon. Every choice moves Trust and Deal momentum — read the room.",
    steps: [
      {
        id: "open",
        partnerLine:
          "Good to see you again. Before we talk terms — how was your trip? Did you try the restaurant my assistant recommended?",
        context: "Mr. Liu opens with warmth, not business. This is a deliberate relationship check.",
        choices: [
          {
            text: "It was wonderful — the Dongpo pork was unforgettable. Thank you for the recommendation.",
            trust: 18,
            deal: 4,
            reply: "(smiles) I'm glad. Good food is the start of good business.",
            note: "You matched his warmth and honored the gesture. Guanxi points banked early.",
          },
          {
            text: "It was fine, thanks. Shall we jump into the contract? I know we're both busy.",
            trust: -14,
            deal: -6,
            reply: "(pauses) Of course. Business first, then.",
            note: "Skipping the relational opening reads as cold and transactional. You've started in a hole.",
          },
          {
            text: "I didn't have time, unfortunately — back-to-back meetings. But I'm ready to move fast on this.",
            trust: -4,
            deal: 2,
            reply: "I see. Yes, let's look at where we are.",
            note: "Neutral. You didn't offend, but you missed a free chance to build warmth.",
          },
        ],
      },
      {
        id: "pushback",
        partnerLine: "About the timeline you proposed… this may be a little difficult for us.",
        context:
          "'A little difficult' is almost always a polite no. He's signaling an internal constraint, not negotiating.",
        choices: [
          {
            text: "I appreciate you sharing that. Could you help me understand what's most challenging on your side?",
            trust: 16,
            deal: 10,
            reply:
              "Honestly — our internal committee hasn't approved the final figure yet. It takes time.",
            note: "You read the soft-no and surfaced the real obstacle (the committee) without pressure. Excellent.",
          },
          {
            text: "Our CEO needs this signed this week, or we'll have to consider other partners.",
            trust: -28,
            deal: -20,
            reply: "(long silence) … I understand. We will need to discuss internally.",
            note: "An ultimatum causes loss of face and signals you don't understand decision cycles. Damaging.",
          },
          {
            text: "No problem at all — take all the time you need.",
            trust: 4,
            deal: -10,
            reply: "Thank you. We'll be in touch.",
            note: "Polite but you lost momentum and a next step. The deal can now drift silently.",
          },
        ],
      },
      {
        id: "committee",
        partnerLine:
          "The committee will want to feel confident. But I cannot push them too hard myself.",
        context:
          "He's telling you he's a potential internal champion — but he needs ammunition and cover, not pressure.",
        choices: [
          {
            text: "What if we prepared a short bilingual summary your committee could review, and offered a private call with your technical lead?",
            trust: 14,
            deal: 16,
            reply:
              "(nods) That would help. Send it to me first — I'll make sure it reaches the right people.",
            note: "You armed your champion and made him look good internally. This is how Chinese B2B deals actually move.",
          },
          {
            text: "Can you just tell us what number the committee wants? We can probably match it.",
            trust: -10,
            deal: -6,
            reply: "It's not only about the number. Let me see what I can do.",
            note: "Reducing it to price misreads the moment and teaches him that pressure equals discount.",
          },
          {
            text: "We trust you to handle the committee. Let us know how it goes.",
            trust: 0,
            deal: -8,
            reply: "I'll try. No promises.",
            note: "You left your champion to fight alone with no support. Momentum fades.",
          },
        ],
      },
      {
        id: "close",
        partnerLine:
          "I think we can find a path. Let's stay in close contact over the next two weeks.",
        context: "He's signaling cautious optimism. The final move sets the tone for follow-up.",
        choices: [
          {
            text: "Thank you, Mr. Liu. I'll send the summary today and a short note — and we remain committed to building something lasting together.",
            trust: 12,
            deal: 12,
            reply: "(warmly) Good. I look forward to it. Let's make this work.",
            note: "Warm, concrete, relationship-framed close with a clear next step. Textbook.",
          },
          {
            text: "Great — I'll send a contract for signature tomorrow to keep things moving.",
            trust: -8,
            deal: -4,
            reply: "Let's wait until the committee has reviewed. No need to rush.",
            note: "Pushing for signature before internal review forces a premature commitment. Slight backslide.",
          },
        ],
      },
    ],
    outcomes: [
      {
        min: 150,
        label: "Deal signed",
        outcome:
          "Two weeks later, Mr. Liu's committee approves. The contract is signed at full value, and he personally introduces you to two other accounts in his network.",
        impact: "$4.2M closed · 2 referral accounts opened · relationship that compounds.",
        cultural:
          "You treated trust as the deal, read every soft-no correctly, and made your champion look good internally. That is exactly how guanxi converts into signatures.",
      },
      {
        min: 90,
        label: "Deal advancing",
        outcome:
          "The deal stays alive and moves to final committee review. It will likely close, but you'll need another round of relationship-building to seal it.",
        impact: "$4.2M in play · timeline slipped ~3 weeks · recoverable.",
        cultural:
          "You got the big moments right but left some trust on the table. Tightening your soft-no reading and champion support would have closed faster.",
      },
      {
        min: 0,
        label: "Deal stalled",
        outcome:
          "Mr. Liu goes quiet. Emails get shorter, then stop. The committee never convenes. The deal dies without anyone ever saying no.",
        impact: "$4.2M lost · 3 weeks of relationship-building erased · hard to re-enter.",
        cultural:
          "Pressure and transactional framing caused loss of face and broke the relationship. In China, a deal rarely dies loudly — it dies in silence.",
      },
    ],
  },
];

export const skillProgress: Record<Skill, number> = {
  "trust-building": 62,
  "indirect-communication": 48,
  "negotiation-signals": 35,
  hierarchy: 71,
  "saving-face": 41,
  "meeting-etiquette": 58,
  "follow-up-strategy": 53,
};

export const adminDepartments = [
  {
    name: "Sales",
    headcount: 42,
    completion: 78,
    readiness: 71,
    deals: 8,
    risk: "moderate" as const,
  },
  {
    name: "Partnerships",
    headcount: 18,
    completion: 64,
    readiness: 58,
    deals: 4,
    risk: "elevated" as const,
  },
  {
    name: "Procurement",
    headcount: 24,
    completion: 82,
    readiness: 74,
    deals: 12,
    risk: "low" as const,
  },
  {
    name: "Executive Team",
    headcount: 9,
    completion: 100,
    readiness: 88,
    deals: 6,
    risk: "low" as const,
  },
  {
    name: "Operations",
    headcount: 31,
    completion: 49,
    readiness: 46,
    deals: 3,
    risk: "high" as const,
  },
];

export const weakSkillsTeam: { skill: Skill; gap: number }[] = [
  { skill: "negotiation-signals", gap: 38 },
  { skill: "saving-face", gap: 31 },
  { skill: "indirect-communication", gap: 27 },
  { skill: "follow-up-strategy", gap: 19 },
];

export const recentScenarioRuns = [
  { user: "Jordan M.", dept: "Sales", scenario: "Soft pushback on a tight timeline", score: 88, when: "2h ago" },
  { user: "Priya R.", dept: "Partnerships", scenario: "The silent room after your pitch", score: 72, when: "Yesterday" },
  { user: "Marcus T.", dept: "Procurement", scenario: "Three days of silence after sending the contract", score: 81, when: "Yesterday" },
  { user: "Wen-Hsi L.", dept: "Sales", scenario: "First dinner with the partner team", score: 94, when: "2 days ago" },
  { user: "Andre J.", dept: "Operations", scenario: "Who do you address in the meeting?", score: 56, when: "3 days ago" },
];

export const dealRiskMap = [
  { account: "Shenzhen Manufacturing Group", value: "$4.2M", stage: "Final terms", risk: "high" as const, weakSkill: "negotiation-signals" as Skill },
  { account: "Hangzhou Logistics Co.", value: "$1.8M", stage: "Discovery", risk: "moderate" as const, weakSkill: "trust-building" as Skill },
  { account: "Beijing Tech Holdings", value: "$6.5M", stage: "Pilot", risk: "low" as const, weakSkill: "follow-up-strategy" as Skill },
  { account: "Chengdu Consumer Brands", value: "$2.1M", stage: "Proposal", risk: "elevated" as const, weakSkill: "indirect-communication" as Skill },
  { account: "Suzhou Electronics", value: "$3.4M", stage: "Renewal", risk: "moderate" as const, weakSkill: "saving-face" as Skill },
];
