import { useState } from "react";

interface Quote {
  id: string;
  text: string;
  level: string;
}
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoastLevelSelector from "@/components/RoastLevelSelector";
import QuoteDisplay from "@/components/QuoteDisplay";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Home() {
  const [level, setLevel] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch a random quote based on the selected level
  const { data: quote, isLoading, isError } = useQuery({
    queryKey: [`/api/quotes/random?level=${level}`, refreshTrigger],
    retry: 1,
  });

  // Function to get a new quote for the current level
  const handleNewQuote = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-light flex flex-col text-foreground">
      <Header />
      
      <main className="w-full max-w-2xl mx-auto px-4 flex-grow flex flex-col items-center justify-start pt-4 pb-16">
        <motion.section 
          className="w-full mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-bold text-xl mb-3">Choose Your Daily Humbling Scale</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            Select how roasted you want to be today. From gentle encouragement to full character assassination.
          </p>
        </motion.section>
        
        <RoastLevelSelector 
          level={level} 
          onLevelChange={setLevel} 
        />
        
        <QuoteDisplay 
          quote={quote?.text} 
          level={level} 
          isLoading={isLoading}
          isError={isError}
        />
        
        <motion.section 
          className="w-full flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button 
            onClick={handleNewQuote}
            size="lg"
            className="font-semibold rounded-full shadow transition-all hover:shadow-md active:scale-95"
          >
            <ReloadIcon className="mr-2 h-4 w-4" />
            New Humbling
          </Button>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}
