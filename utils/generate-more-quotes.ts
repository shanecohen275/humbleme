import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file URL and directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define QuoteData type
type QuoteData = {
  level: number;
  text: string;
};

// Function to read quotes from the JSON file
function readQuotesFromFile(): QuoteData[] {
  try {
    const quotesFilePath = path.join(__dirname, 'quotes.json');
    const data = fs.readFileSync(quotesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading quotes file:`, error);
    return [];
  }
}

// Function to save quotes to the JSON file
function saveQuotesToFile(quotes: QuoteData[]): void {
  try {
    const quotesFilePath = path.join(__dirname, 'quotes.json');
    fs.writeFileSync(quotesFilePath, JSON.stringify(quotes, null, 2));
    console.log(`Saved ${quotes.length} quotes to ${quotesFilePath}`);
  } catch (error) {
    console.error(`Error saving quotes file:`, error);
  }
}

// Function to generate more specific quotes for each level
function generateMoreQuotes(): void {
  // Read existing quotes
  const existingQuotes = readQuotesFromFile();
  console.log(`Read ${existingQuotes.length} existing quotes`);
  
  // Filter out placeholder quotes
  const realQuotes = existingQuotes.filter(q => !q.text.includes('Replace with real quote later'));
  const placeholderQuotes = existingQuotes.filter(q => q.text.includes('Replace with real quote later'));
  
  console.log(`Found ${realQuotes.length} real quotes and ${placeholderQuotes.length} placeholder quotes`);
  
  // Generate theme-based quotes for each level
  const newQuotes: QuoteData[] = [];
  
  // Theme categories
  const themes = [
    "self-awareness",
    "overconfidence",
    "procrastination",
    "ego",
    "workplace",
    "tech-habits",
    "social-faux-pas",
    "life-advice",
    "cultural-satire"
  ];
  
  // Level 1 quotes - "Treat Me Like Royalty" (soft encouragement with light self-awareness)
  const level1Quotes: QuoteData[] = [
    // Self-awareness
    { level: 1, text: "Your self-awareness journey is like watching a kitten discover a mirror—adorably confused, but you'll get there." },
    { level: 1, text: "You're introspective in the way children think they're hiding when they cover their own eyes." },
    { level: 1, text: "Your level of self-awareness is like a participation trophy—it exists, technically." },
    
    // Overconfidence
    { level: 1, text: "Your confidence is like your weekend plans—ambitious on Thursday, questionable by Sunday night." },
    { level: 1, text: "You're not delusional, you're just living in your own special edition of reality where you're always right." },
    { level: 1, text: "Your self-belief is adorable, like when a child thinks they can fly by jumping off the couch." },
    
    // Procrastination
    { level: 1, text: "Your relationship with deadlines is like watching someone try to outrun a tsunami—entertaining but ultimately futile." },
    { level: 1, text: "Your to-do list isn't aging like fine wine; it's more like that forgotten container at the back of your fridge." },
    { level: 1, text: "You're not procrastinating, you're just giving your tasks the chance to solve themselves." },
    
    // Ego
    { level: 1, text: "Your ego wouldn't be so bad if it came with the talent to match." },
    { level: 1, text: "If your self-image were any more inflated, we'd need to register it as an aircraft." },
    { level: 1, text: "Your humility is as rare as your punctuality—a mythical creature people talk about but never actually see." },
    
    // Workplace
    { level: 1, text: "Your career strategy seems to be 'look busy and hope no one asks questions'—surprisingly effective so far." },
    { level: 1, text: "Your contribution to meetings is mainly nodding thoughtfully while mentally planning dinner." },
    { level: 1, text: "Your work ethic is like your diet—it starts strong Monday morning and collapses by Tuesday afternoon." },
    
    // Tech habits
    { level: 1, text: "Your tech savvy is impressive, if the year were 2005." },
    { level: 1, text: "Your password security is like your dating standards—should be higher, but here we are." },
    { level: 1, text: "Your phone battery lasts longer than your motivation—and that's saying something." },
    
    // Social faux pas
    { level: 1, text: "You tell stories like you're paid by the word and there's a hefty bonus for unnecessary details." },
    { level: 1, text: "Your dancing is like your personality—enthusiastic but questionable." },
    { level: 1, text: "Your memory for birthdays is like your memory for gym commitments—selectively unreliable." },
    
    // Life advice
    { level: 1, text: "Your life philosophy is basically 'it'll probably work out'—bold strategy, let's see how it plays out." },
    { level: 1, text: "Your financial planning is like your fantasy football team—based on hope rather than strategy." },
    { level: 1, text: "Your life hacks are just normal activities rebranded with unnecessary complexity." },
    
    // Cultural satire
    { level: 1, text: "Your cultural references are so dated they're practically vintage—which isn't the compliment you think it is." },
    { level: 1, text: "Your taste in music is like your personality—still developing, but showing promise in some areas." },
    { level: 1, text: "Your personal brand is 'trying too hard' with a dash of 'not quite getting it.'" }
  ];
  
  // Level 2 quotes - "Mild Toast" (gentle teasing)
  const level2Quotes: QuoteData[] = [
    // Self-awareness
    { level: 2, text: "Your self-perception is a fascinating work of fiction that should be submitted to a publisher." },
    { level: 2, text: "You see yourself the way dogs see their reflection—vaguely aware something's there, but missing the bigger picture." },
    { level: 2, text: "Your version of 'knowing yourself' is like claiming to be fluent in a language because you know how to say hello." },
    
    // Overconfidence
    { level: 2, text: "Your confidence-to-competence ratio is the mathematical equivalent of dividing by zero." },
    { level: 2, text: "You're living proof that confidence is an excellent substitute for ability, at least in the short term." },
    { level: 2, text: "Your belief in yourself would be inspirational if it were even remotely connected to reality." },
    
    // Procrastination
    { level: 2, text: "You approach deadlines the way cats approach bathtubs—with reluctance, drama, and eventual surrender." },
    { level: 2, text: "Your ability to delay important tasks should qualify you for a PhD in Advanced Procrastination Studies." },
    { level: 2, text: "Future You must have superhuman abilities, considering all the tasks you keep assigning to them." },
    
    // Ego
    { level: 2, text: "Your ego requires its own zip code and possibly its own weather system." },
    { level: 2, text: "In the story of your life, you've cast yourself as the hero, director, and critic—shame about the audience reviews." },
    { level: 2, text: "Your self-importance is like plastic—artificially manufactured and environmentally questionable." },
    
    // Workplace
    { level: 2, text: "Your career path looks less like a ladder and more like a game of Chutes and Ladders." },
    { level: 2, text: "Your LinkedIn profile and actual skills share a relationship similar to dating profiles and reality." },
    { level: 2, text: "Your understanding of 'teamwork' seems to be everyone else doing the work while you provide commentary." },
    
    // Tech habits
    { level: 2, text: "Your approach to technology is like watching someone from the 1800s try to use a smartphone—technically possible but painful to witness." },
    { level: 2, text: "Your tech troubleshooting process consists entirely of turning things off and on and hoping for a miracle." },
    { level: 2, text: "Your digital security is the equivalent of putting a 'Please Don't Steal' sign on an unlocked door." },
    
    // Social faux pas
    { level: 2, text: "Your social awareness is like your Wi-Fi signal—spotty and tends to disappear when you need it most." },
    { level: 2, text: "You tell the same stories so often that your friends have assigned them episode numbers." },
    { level: 2, text: "Your idea of flirting is delivering compliments with all the subtlety of a freight train." },
    
    // Life advice
    { level: 2, text: "Your approach to major life decisions resembles a game show contestant randomly selecting doors." },
    { level: 2, text: "Your concept of meal prep is ordering takeout while wearing workout clothes." },
    { level: 2, text: "Your idea of self-care is just procrastination wearing a fancy bathrobe." },
    
    // Cultural satire
    { level: 2, text: "Your pop culture knowledge stopped updating right around the time you got your first real job." },
    { level: 2, text: "Your fashion sense is boldly answering questions nobody asked." },
    { level: 2, text: "Your social media presence is like watching someone audition for a reality show that doesn't exist." }
  ];
  
  // Level 3 quotes - "Public Roast Level" (sarcasm with a smile)
  const level3Quotes: QuoteData[] = [
    // Self-awareness
    { level: 3, text: "Your self-awareness has the depth of a puddle in the desert—theoretically possible but practically nonexistent." },
    { level: 3, text: "You're about as self-aware as a goldfish with amnesia swimming in circles in a bowl of vodka." },
    { level: 3, text: "Your insights into your own behavior have all the clarity of a foggy mirror in a steam room." },
    
    // Overconfidence
    { level: 3, text: "You have the confidence of a mediocre white man applying for a job requiring ten years of experience he doesn't have." },
    { level: 3, text: "Your confidence is writing checks your abilities can't even spell, let alone cash." },
    { level: 3, text: "You're so far up the Dunning-Kruger peak that you've established a vacation home there." },
    
    // Procrastination
    { level: 3, text: "Your procrastination isn't a habit; it's your defining personality trait with its own Instagram account." },
    { level: 3, text: "Deadlines see you coming and file for restraining orders." },
    { level: 3, text: "Your to-do list should be carbon-dated and placed in a museum of ancient artifacts." },
    
    // Ego
    { level: 3, text: "Your ego needs its own Instagram account, personal assistant, and possibly foreign policy." },
    { level: 3, text: "If your self-importance were converted to electricity, it could power a small city while your actual contributions couldn't light a match." },
    { level: 3, text: "The gap between who you think you are and who you actually are is so vast, NASA is studying it as an unexplored galaxy." },
    
    // Workplace
    { level: 3, text: "Your career strategy is like a chicken playing chess—lots of random movements that occasionally look intentional." },
    { level: 3, text: "Your approach to work is the human equivalent of a Windows progress bar—wildly inaccurate and prone to unexpected freezing." },
    { level: 3, text: "Your professional reputation is built on the same foundation as conspiracy theories—elaborate storytelling with minimal factual support." },
    
    // Tech habits
    { level: 3, text: "Your technology skills are so outdated they qualify for social security benefits." },
    { level: 3, text: "Your browser has more tabs open than you have coherent thoughts in a week." },
    { level: 3, text: "You treat your data like a teenager treats their bedroom—mysterious piles everywhere with no organizational system." },
    
    // Social faux pas
    { level: 3, text: "Your social graces have all the subtlety of a rhinoceros in a crystal shop during an earthquake." },
    { level: 3, text: "Your conversation skills are like a tennis match where you've forgotten to bring the opponent a racket." },
    { level: 3, text: "Your ability to read the room is like trying to read War and Peace in the dark while wearing oven mitts." },
    
    // Life advice
    { level: 3, text: "Your life choices read like a 'what not to do' manual written by your future therapist." },
    { level: 3, text: "Your definition of 'adulting' is remembering to buy toilet paper before completely running out." },
    { level: 3, text: "Your five-year plan has the same relationship to reality as unicorns do to horses—superficially similar but entirely fictional." },
    
    // Cultural satire
    { level: 3, text: "Your cultural references are so outdated archaeologists are studying them alongside hieroglyphics." },
    { level: 3, text: "Your style is answering questions that fashion never asked and probably never wanted to." },
    { level: 3, text: "Your taste in entertainment is like your taste in friends—questionable, but at least consistent in its mediocrity." }
  ];
  
  // Level 4 quotes - "Character Development Arc" (brutally honest with dark wit)
  const level4Quotes: QuoteData[] = [
    // Self-awareness
    { level: 4, text: "Your self-awareness is so nonexistent it makes dark matter look observable." },
    { level: 4, text: "The gap between who you think you are and who you actually are is so vast, light from one end hasn't reached the other yet." },
    { level: 4, text: "Your introspection has the depth of a contact lens and twice the transparency." },
    
    // Overconfidence
    { level: 4, text: "Your confidence is like a peacock's tail—colorful, unnecessarily large, and primarily used to compensate for other shortcomings." },
    { level: 4, text: "You've mistaken the Dunning-Kruger effect for a personality type and embraced it as a lifestyle choice." },
    { level: 4, text: "You're so oblivious to your own incompetence that scientists are studying you as a naturally occurring psychological anomaly." },
    
    // Procrastination
    { level: 4, text: "Your procrastination skills should be submitted to the Olympics as a new endurance sport." },
    { level: 4, text: "Your to-do list has evolved sentience and is planning to write a tell-all memoir about abandonment." },
    { level: 4, text: "Your ability to delay important tasks has transcended skill and become an art form requiring its own academic discipline." },
    
    // Ego
    { level: 4, text: "Your ego has achieved sentience and is considering a presidential run with a platform of 'Me First, Others Never.'" },
    { level: 4, text: "If your self-importance were any more inflated, NASA would classify you as a gas giant." },
    { level: 4, text: "The universe doesn't revolve around you, but don't tell your ego that—it's fragile despite its size." },
    
    // Workplace
    { level: 4, text: "Your career trajectory resembles a drunk bird attempting to navigate through a hurricane." },
    { level: 4, text: "Your work ethic is on a perpetual sabbatical with no forwarding address." },
    { level: 4, text: "Your professional reputation is like a house of cards built by someone with hiccups during an earthquake." },
    
    // Tech habits
    { level: 4, text: "Your understanding of technology makes digital natives consider time travel just to prevent you from touching a computer." },
    { level: 4, text: "Your password security strategy is the digital equivalent of leaving your house key under a doormat with a neon arrow pointing to it." },
    { level: 4, text: "Your tech troubleshooting resembles medieval medicine—a combination of superstition, random attempts, and blaming invisible forces." },
    
    // Social faux pas
    { level: 4, text: "Your social awareness is like a bull in a china shop that's also on fire and filled with landmines." },
    { level: 4, text: "You approach sensitive topics with all the grace of a drunken rhinoceros on roller skates." },
    { level: 4, text: "Your ability to read social cues ranks somewhere between a rock and a particularly oblivious houseplant." },
    
    // Life advice
    { level: 4, text: "Your life choices form a masterclass in what to do if you're trying to speedrun a mid-life crisis." },
    { level: 4, text: "Your financial planning strategy seems to be 'hope the concept of money fundamentally changes before retirement.'" },
    { level: 4, text: "Your approach to major decisions is like letting a blindfolded child throw darts at a board of options." },
    
    // Cultural satire
    { level: 4, text: "Your cultural awareness is stuck in a time capsule that should remain buried for the sake of future generations." },
    { level: 4, text: "Your fashion sense is answering questions that not even the most experimental designers would dare ask." },
    { level: 4, text: "Your taste in entertainment is the punchline to a joke about declining standards in modern society." }
  ];
  
  // Level 5 quotes - "Full Gordon Ramsay" (savage, soul-crushing)
  const level5Quotes: QuoteData[] = [
    // Self-awareness
    { level: 5, text: "You're so oblivious to your own nature that mirrors file restraining orders when they see you coming." },
    { level: 5, text: "Your self-awareness is so nonexistent that philosophers use it to explain the concept of nothingness." },
    { level: 5, text: "If insight into your own behavior were oxygen, you'd have suffocated before finishing this sentence." },
    
    // Overconfidence
    { level: 5, text: "Your confidence-to-competence ratio has mathematicians developing new theories of infinity." },
    { level: 5, text: "You're so far up the Dunning-Kruger curve that you've circled back around and are somehow simultaneously at the bottom." },
    { level: 5, text: "Your self-belief is like a cockroach—impervious to reality, facts, or nuclear strikes of criticism." },
    
    // Procrastination
    { level: 5, text: "Your procrastination isn't a habit, it's so advanced it's developing its own procrastination issues." },
    { level: 5, text: "Archaeologists will discover your unfinished tasks alongside dinosaur fossils and classify them as extinct responsibilities." },
    { level: 5, text: "You delay tasks with such commitment that physicists are studying you to better understand how to postpone the heat death of the universe." },
    
    // Ego
    { level: 5, text: "Your ego is so dense it's creating its own gravitational field, pulling all logic and perspective into a black hole of self-delusion." },
    { level: 5, text: "If narcissism were an Olympic sport, you'd be disqualified for using performance-enhancing entitlement." },
    { level: 5, text: "Your self-importance is so massive it's visible from space, yet somehow invisible to everyone who's actually met you." },
    
    // Workplace
    { level: 5, text: "Your career is the professional equivalent of a dumpster fire being used as a lighthouse." },
    { level: 5, text: "Your work ethic makes sloth bears look like productivity consultants on amphetamines." },
    { level: 5, text: "Your professional reputation has been officially classified as a cautionary tale for business school students." },
    
    // Tech habits
    { level: 5, text: "Your technological competence makes cavemen look like Silicon Valley innovators." },
    { level: 5, text: "Your digital security is so bad that hackers feel ethically obligated to help you before someone less scrupulous finds you." },
    { level: 5, text: "You approach technology with such profound incompetence that AI systems are developing new categories of error messages specifically for you." },
    
    // Social faux pas
    { level: 5, text: "Your social intelligence is so underdeveloped it would need to evolve for several million years just to reach 'awkward.'" },
    { level: 5, text: "Your conversational skills make uncomfortable silences beg for a comeback." },
    { level: 5, text: "You navigate social situations with all the grace and awareness of a blindfolded bull in a fireworks factory during an earthquake." },
    
    // Life advice
    { level: 5, text: "Your life choices read like a comprehensive guide to speedrunning regret and alienating everyone who ever cared about you." },
    { level: 5, text: "Your approach to personal finance is so catastrophic that economists use it to explain market collapses to children." },
    { level: 5, text: "Your decision-making process appears to involve a combination of worst-case scenarios, bad advice, and a profound commitment to future regret." },
    
    // Cultural satire
    { level: 5, text: "Your cultural awareness is stuck somewhere between 'offensive anachronism' and 'actively harmful stereotype.'" },
    { level: 5, text: "Your taste in entertainment is so bad it's being studied as a potential warning sign for serious neurological conditions." },
    { level: 5, text: "Your fashion sense isn't just questionable, it's a full-blown existential crisis with fabric." }
  ];
  
  // Combine all new quotes
  newQuotes.push(...level1Quotes, ...level2Quotes, ...level3Quotes, ...level4Quotes, ...level5Quotes);
  console.log(`Generated ${newQuotes.length} new themed quotes`);
  
  // Combine real quotes with newly generated quotes
  const combinedQuotes = [...realQuotes, ...newQuotes];
  console.log(`Combined quotes count: ${combinedQuotes.length}`);
  
  // Save the combined quotes back to the file
  saveQuotesToFile(combinedQuotes);
  
  // Count quotes by level
  for (let level = 1; level <= 5; level++) {
    const count = combinedQuotes.filter(q => q.level === level).length;
    console.log(`Level ${level}: ${count} quotes`);
  }
}

// Run the function
generateMoreQuotes();