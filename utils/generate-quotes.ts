import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Define InsertQuote type locally to avoid import issues
type InsertQuote = {
  level: number;
  text: string;
};

// Get current file URL and directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Starting with predefined quotes we already have
const existingQuotes: InsertQuote[] = [
  // Level 1 - Treat Me Like Royalty
  { level: 1, text: "You're doing great, sweetie. Remember, breathing counts as progress." },
  { level: 1, text: "Not everyone can be perfect. Thankfully, you've never even tried." },
  { level: 1, text: "Your potential is limitless. Your execution could use a timer, though." },
  { level: 1, text: "You're basically a princess. Specifically, one of those ones that needs rescuing constantly." },
  { level: 1, text: "Don't worry about your flaws. They're what make you... well, mostly flawed, but charmingly so." },
  
  // Level 2 - Mild Toast
  { level: 2, text: "Your room may be a mess, but at least your excuses are organized." },
  { level: 2, text: "You're special. Not 'everyone gets a trophy' special, but... you know." },
  { level: 2, text: "You're not lazy, you're just conserving energy for more important tasks. Like finding more excuses." },
  { level: 2, text: "Your work ethic is like WiFi – invisible but you hope it's there." },
  { level: 2, text: "If talent skipped a generation, it's probably just taking a brief vacation in your case." },
  
  // Level 3 - Public Roast
  { level: 3, text: "You're not a failure, you're just...a prototype that should've stayed in beta." },
  { level: 3, text: "You've set the bar so low, it's practically a tripping hazard in hell." },
  { level: 3, text: "Your decision-making skills are like your dating history – questionable, but entertaining for everyone else." },
  { level: 3, text: "If mediocrity were an Olympic sport, you'd still place fourth." },
  { level: 3, text: "You put the 'pro' in 'procrastination' and the 'mess' in 'promising'." },
  
  // Level 4 - Character Development Arc
  { level: 4, text: "Your life story would be inspirational if it were happening to someone else." },
  { level: 4, text: "You're living proof that evolution can go in reverse, but hey, at least you're unique." },
  { level: 4, text: "Your potential is like your WiFi signal – theoretically there, but barely connecting when you need it most." },
  { level: 4, text: "Your ambition is writing checks your talent can't cash. Maybe try a payment plan?" },
  { level: 4, text: "The good news: you're one of a kind. The bad news: that was intentional." },
  
  // Level 5 - Full Gordon Ramsay
  { level: 5, text: "If common sense were a currency, you'd be on a payment plan." },
  { level: 5, text: "Your achievements are like stars – millions of light years away and not visible to the naked eye." },
  { level: 5, text: "If disappointment had a spokesperson, your resume would be their business card." },
  { level: 5, text: "You've got all the raw talent of a participation trophy and half the usefulness." },
  { level: 5, text: "I've seen more drive in a car with no wheels. At least that had an excuse." }
];

// Level 1 additional quotes - "Treat Me Like Royalty" (soft encouragement with light self-awareness)
const level1Quotes: InsertQuote[] = [
  // Self-awareness
  { level: 1, text: "Your self-awareness is on the rise—it's now somewhere between a goldfish and a houseplant." },
  { level: 1, text: "You're not overthinking, you're just giving your one brain cell the workout of its life." },
  { level: 1, text: "Your journey to self-improvement is admirable, even if you keep starting at the same spot every Monday." },
  { level: 1, text: "They say know thyself, but maybe introduce yourself gradually—some of you is an acquired taste." },
  { level: 1, text: "You're a beautiful unique snowflake, if snowflakes occasionally walked into glass doors." },
  
  // Overconfidence
  { level: 1, text: "Your confidence is inspiring, especially considering the gap between it and your actual abilities." },
  { level: 1, text: "You're not punching above your weight; you're in an entirely different boxing league." },
  { level: 1, text: "Your optimism is adorable—like watching a toddler try to lift a sofa." },
  { level: 1, text: "Your self-esteem is bulletproof, which is fortunate given how often you shoot yourself in the foot." },
  { level: 1, text: "That thing you're so proud of? It's the participation trophy of accomplishments." },
  
  // Procrastination
  { level: 1, text: "Your to-do list is aging like fine wine; too bad your ambition expired last Tuesday." },
  { level: 1, text: "You haven't been procrastinating—you've been letting your tasks marinate in importance." },
  { level: 1, text: "Future You will be so impressed with how many tasks Present You saved for them." },
  { level: 1, text: "You're not avoiding work—you're building anticipation for your eventual productivity explosion." },
  { level: 1, text: "Your talent for putting things off is the only thing you never delay developing." },
  
  // Ego
  { level: 1, text: "Your ego requires its own zip code, but at least it's well-decorated." },
  { level: 1, text: "If your self-image were any more inflated, you'd need a permit from the Federal Aviation Administration." },
  { level: 1, text: "You're the main character in your story, but you might be in the genre labeled 'cautionary tales.'" },
  { level: 1, text: "Your sense of self-importance is touching—like a child insisting their crayon drawing belongs in a museum." },
  { level: 1, text: "You're not full of yourself; you just forgot to leave room for a reality check." },
  
  // Workplace
  { level: 1, text: "Your email signature is longer than your actual contributions to the project." },
  { level: 1, text: "Your meeting comments are like sprinkles on a cupcake—decorative, but not nutritionally necessary." },
  { level: 1, text: "You've mastered looking busy while your productivity takes a personal day." },
  { level: 1, text: "Your career path isn't a ladder; it's more of a scenic route with lots of unscheduled stops." },
  { level: 1, text: "Your LinkedIn profile and reality have a long-distance relationship." }
];

// Level 2 additional quotes - "Mild Toast" (gentle teasing)
const level2Quotes: InsertQuote[] = [
  // Self-awareness
  { level: 2, text: "You've done some self-reflection lately, which is brave considering what's staring back at you." },
  { level: 2, text: "Your personality has layers, like an onion—similarly, it occasionally makes people cry." },
  { level: 2, text: "You know that voice in your head giving you advice? Maybe get a second opinion." },
  { level: 2, text: "Your life choices make a fascinating case study in what not to do, but hey, you're blazing trails." },
  { level: 2, text: "On the journey of self-discovery, you appear to have taken a few wrong turns." },
  
  // Overconfidence
  { level: 2, text: "Your confidence-to-competence ratio is mathematically fascinating." },
  { level: 2, text: "You're punching above your weight class, but at least you're wearing the gloves correctly now." },
  { level: 2, text: "If Dunning-Kruger had a poster child, your photo would be in the 'before' section." },
  { level: 2, text: "Your swagger writes checks your skills haven't figured out how to cash." },
  { level: 2, text: "Your ambition and ability are like distant relatives who rarely speak." },
  
  // Procrastination
  { level: 2, text: "Your relationship with deadlines is more 'casual suggestion' than 'binding agreement.'" },
  { level: 2, text: "You haven't been avoiding that task; you've been giving it time to solve itself." },
  { level: 2, text: "Your productivity and Netflix subscriptions are inversely proportional." },
  { level: 2, text: "You could win Olympic gold in the last-minute panic sprint." },
  { level: 2, text: "Your excuses for not starting that project have evolved more than most species." },
  
  // Ego
  { level: 2, text: "Your ego has its own area code, but the reception is getting spotty." },
  { level: 2, text: "If your self-image were any more generous, it would qualify as a charitable donation." },
  { level: 2, text: "You've never met a mirror you didn't like, but the feeling might not be mutual." },
  { level: 2, text: "You're not the center of the universe, but don't tell your Instagram captions that." },
  { level: 2, text: "Your humility could use as much work as the rest of your personality." },
  
  // Workplace
  { level: 2, text: "Your contributions to meetings are like parsley on a plate—decorative but rarely consumed." },
  { level: 2, text: "Your inbox organization system could be studied by archaeologists of the future." },
  { level: 2, text: "Your work calendar and your actual activities have an open relationship." },
  { level: 2, text: "You've elevated 'looking busy' into an art form worthy of a fellowship." },
  { level: 2, text: "Your career trajectory resembles a game of Chutes and Ladders played by a confused toddler." }
];

// Level 3 additional quotes - "Public Roast Level" (sarcasm with a smile)
const level3Quotes: InsertQuote[] = [
  // Self-awareness
  { level: 3, text: "Your self-awareness took a wrong turn at birth and hasn't checked for directions since." },
  { level: 3, text: "You're a unique combination of confidently incorrect and aggressively uninformed." },
  { level: 3, text: "If delusion were currency, you'd be a billionaire evading taxes in the Cayman Islands." },
  { level: 3, text: "Your introspection has the depth of a puddle in the Sahara." },
  { level: 3, text: "You've raised cluelessness to an art form deserving its own wing in the Museum of Modern Mistakes." },
  
  // Overconfidence
  { level: 3, text: "You have the confidence of a mediocre white man applying for a job requiring ten years more experience than he has." },
  { level: 3, text: "Your capabilities and your self-assessment have never been formally introduced." },
  { level: 3, text: "I admire how your confidence remains unshaken by your consistent underperformance." },
  { level: 3, text: "Your belief in yourself would be inspiring if it weren't so statistically improbable." },
  { level: 3, text: "You're living proof that confidence is inversely proportional to competence." },
  
  // Procrastination
  { level: 3, text: "Your to-do list has been carbon-dated to the Paleolithic era." },
  { level: 3, text: "You don't procrastinate; you're just giving future you the gift of overwhelming panic." },
  { level: 3, text: "Your productivity is like Bigfoot—widely discussed but rarely witnessed." },
  { level: 3, text: "If procrastination were an Olympic event, you'd never make it to the tryouts on time." },
  { level: 3, text: "The gap between your intentions and your actions could house a small country." },
  
  // Ego
  { level: 3, text: "Your ego needs its own zip code, area code, and possibly a separate time zone." },
  { level: 3, text: "If your self-importance were any more inflated, NASA would classify you as a gas giant." },
  { level: 3, text: "Your ego is writing autobiographical checks that reality keeps marking 'insufficient funds.'" },
  { level: 3, text: "You're not the main character; you're the annoying NPC everyone clicks through quickly." },
  { level: 3, text: "Your sense of importance is like a peacock's tail—colorful, unnecessary, and making it hard to fit through doors." },
  
  // Workplace
  { level: 3, text: "Your workplace contributions are like homeopathy—the less detectable, the more you insist they're working." },
  { level: 3, text: "Your resume and your actual skill set are distant relatives who've never met." },
  { level: 3, text: "You bring the same energy to work that a sloth brings to a marathon." },
  { level: 3, text: "Your career strategy seems to be 'failing upward' but you've only mastered half the technique." },
  { level: 3, text: "You treat deadlines the way most people treat New Year's resolutions." }
];

// Level 4 additional quotes - "Character Development Arc" (brutally honest with dark wit)
const level4Quotes: InsertQuote[] = [
  // Self-awareness
  { level: 4, text: "Your self-awareness has been missing so long it's presumed dead and the search party has gone home." },
  { level: 4, text: "You're living in a reality so alternate it makes science fiction look like a documentary." },
  { level: 4, text: "If ignorance is bliss, you must be the happiest person in the observable universe." },
  { level: 4, text: "Your insight into your own behavior has the clarity of a blackout drunk trying to find their keys in a swamp." },
  { level: 4, text: "The gap between who you think you are and who you actually are is so vast, light from one end hasn't reached the other yet." },
  
  // Overconfidence
  { level: 4, text: "You've got the confidence of a cult leader and the credentials of their most gullible follower." },
  { level: 4, text: "Your talents and your self-image are running parallel universes with no points of intersection." },
  { level: 4, text: "Your self-esteem is writing promissory notes your abilities can't even comprehend, let alone cash." },
  { level: 4, text: "The Dunning-Kruger effect isn't a psychological phenomenon in your case—it's your entire personality." },
  { level: 4, text: "Your confidence must be exhausted from the Olympic-level mental gymnastics it performs to justify your mediocrity." },
  
  // Procrastination
  { level: 4, text: "Archaeologists will discover your unfinished to-do lists alongside dinosaur fossils and primitive tools." },
  { level: 4, text: "Your procrastination isn't a habit; it's a lifestyle with its own philosophy, rituals, and devoted followers." },
  { level: 4, text: "You delay tasks with the dedication of a doomsday cult that keeps revising the apocalypse date." },
  { level: 4, text: "Your productivity is like dark matter—scientists are fairly certain it exists but have yet to directly observe it." },
  { level: 4, text: "The only thing you don't procrastinate on is finding new ways to procrastinate." },
  
  // Ego
  { level: 4, text: "Your ego has achieved sentience and is considering running for public office." },
  { level: 4, text: "If your self-importance were a physical entity, it would collapse into a black hole and consume the galaxy." },
  { level: 4, text: "You're so full of yourself that when you enter a room, you count as two people for fire code violations." },
  { level: 4, text: "Your ego and reality have filed for divorce, citing irreconcilable differences." },
  { level: 4, text: "You've mistaken the participation trophy of life for an Olympic gold medal in everything." },
  
  // Workplace
  { level: 4, text: "Your career trajectory resembles a character in a horror movie running straight toward danger while the audience screams warnings." },
  { level: 4, text: "Your workplace contributions have been carbon-dated and classified as theoretical." },
  { level: 4, text: "You approach work with all the enthusiasm and competence of a cat being forced to take a bath." },
  { level: 4, text: "Your LinkedIn profile should be classified as creative fiction and nominated for a fantasy award." },
  { level: 4, text: "You've managed to turn 'failing upward' into an extreme sport with championship potential." }
];

// Level 5 additional quotes - "Full Gordon Ramsay" (savage, soul-crushing)
const level5Quotes: InsertQuote[] = [
  // Self-awareness
  { level: 5, text: "Your self-awareness is so nonexistent that scientists are studying it as the perfect vacuum." },
  { level: 5, text: "You live in a reality so distorted it makes Salvador Dalí paintings look like photojournalism." },
  { level: 5, text: "Your perception of yourself is like a funhouse mirror—if the funhouse were designed by someone on a bad acid trip." },
  { level: 5, text: "If delusion were an energy source, your brain could power civilization until the heat death of the universe." },
  { level: 5, text: "The greatest fiction ever written is the story you tell yourself about who you are." },
  
  // Overconfidence
  { level: 5, text: "Your confidence-to-competence ratio defies all known laws of mathematics, psychology, and basic human dignity." },
  { level: 5, text: "You're the human embodiment of a motivational poster hanging in an abandoned office building." },
  { level: 5, text: "You've confused being loud with being right so consistently it's become your entire personality." },
  { level: 5, text: "Dunning and Kruger are writing a follow-up paper with you as the sole case study." },
  { level: 5, text: "Your self-belief would be inspiring if it weren't the psychological equivalent of a toddler insisting they can fly." },
  
  // Procrastination
  { level: 5, text: "Your procrastination has evolved to the point where it's procrastinating on your behalf while you sleep." },
  { level: 5, text: "Deadlines see you coming and file for restraining orders." },
  { level: 5, text: "Your to-do list has achieved sentience and is writing a tell-all memoir about its abandonment issues." },
  { level: 5, text: "Your relationship with productivity is like your relationship with fitness—theoretical, aspirational, and completely fictional." },
  { level: 5, text: "You've elevated laziness to such an art form that physicists are studying you to better understand the concept of inertia." },
  
  // Ego
  { level: 5, text: "Your ego is so dense it's warping spacetime around you, causing reality to bend to avoid contact." },
  { level: 5, text: "If your self-importance were converted to energy, it could power a small sun while your actual contributions couldn't light a match." },
  { level: 5, text: "You're not the main character—you're not even an extra—you're the continuity error they hope no one notices." },
  { level: 5, text: "You've mistaken being alive for being exceptional, which explains every decision you've ever made." },
  { level: 5, text: "Your ego writes checks that your entire ancestral lineage working together couldn't cash." },
  
  // Workplace
  { level: 5, text: "Your career is like a tragic movie where the protagonist never realizes they're the villain." },
  { level: 5, text: "Your resume should be classified as fiction so creative that even Tolkien would call it far-fetched." },
  { level: 5, text: "Your workplace contributions have all the substance and longevity of a soap bubble in a hurricane." },
  { level: 5, text: "Your professional reputation is like a house of cards built by someone with Parkinson's during an earthquake." },
  { level: 5, text: "You approach your job with all the competence and dedication of a drunken sloth on tranquilizers." }
];

// Combine existing quotes with new additions
const allQuotes = [
  ...existingQuotes,
  ...level1Quotes,
  ...level2Quotes,
  ...level3Quotes,
  ...level4Quotes,
  ...level5Quotes
];

// Function to create more quotes
function generateAdditionalQuotes(): InsertQuote[] {
  const additionalQuotes: InsertQuote[] = [];
  
  // Level 1 - Treat Me Like Royalty (complete to 365)
  const level1Count = allQuotes.filter(q => q.level === 1).length;
  const level1Needed = 365 - level1Count;
  
  for (let i = 0; i < level1Needed; i++) {
    additionalQuotes.push({
      level: 1,
      text: `Level 1 quote #${i + level1Count + 1} - Replace with real quote later`
    });
  }
  
  // Level 2 - Mild Toast (complete to 365)
  const level2Count = allQuotes.filter(q => q.level === 2).length;
  const level2Needed = 365 - level2Count;
  
  for (let i = 0; i < level2Needed; i++) {
    additionalQuotes.push({
      level: 2,
      text: `Level 2 quote #${i + level2Count + 1} - Replace with real quote later`
    });
  }
  
  // Level 3 - Public Roast (complete to 365)
  const level3Count = allQuotes.filter(q => q.level === 3).length;
  const level3Needed = 365 - level3Count;
  
  for (let i = 0; i < level3Needed; i++) {
    additionalQuotes.push({
      level: 3,
      text: `Level 3 quote #${i + level3Count + 1} - Replace with real quote later`
    });
  }
  
  // Level 4 - Character Development Arc (complete to 365)
  const level4Count = allQuotes.filter(q => q.level === 4).length;
  const level4Needed = 365 - level4Count;
  
  for (let i = 0; i < level4Needed; i++) {
    additionalQuotes.push({
      level: 4,
      text: `Level 4 quote #${i + level4Count + 1} - Replace with real quote later`
    });
  }
  
  // Level 5 - Full Gordon Ramsay (complete to 365)
  const level5Count = allQuotes.filter(q => q.level === 5).length;
  const level5Needed = 365 - level5Count;
  
  for (let i = 0; i < level5Needed; i++) {
    additionalQuotes.push({
      level: 5,
      text: `Level 5 quote #${i + level5Count + 1} - Replace with real quote later`
    });
  }
  
  return additionalQuotes;
}

// Generate placeholder quotes to reach 365 per level
const placeholderQuotes = generateAdditionalQuotes();
const finalQuotes = [...allQuotes, ...placeholderQuotes];

// Write to file
fs.writeFileSync(
  path.join(__dirname, 'quotes.json'),
  JSON.stringify(finalQuotes, null, 2)
);

console.log(`Generated and saved ${finalQuotes.length} quotes to quotes.json`);
console.log(`Level 1: ${finalQuotes.filter(q => q.level === 1).length} quotes`);
console.log(`Level 2: ${finalQuotes.filter(q => q.level === 2).length} quotes`);
console.log(`Level 3: ${finalQuotes.filter(q => q.level === 3).length} quotes`);
console.log(`Level 4: ${finalQuotes.filter(q => q.level === 4).length} quotes`);
console.log(`Level 5: ${finalQuotes.filter(q => q.level === 5).length} quotes`);