import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface QuoteDisplayProps {
  quote?: string;
  level: number;
  isLoading: boolean;
  isError: boolean;
}

// Border colors for different levels
const levelBorderColors = {
  1: "border-[#8DE4AF]",
  2: "border-[#C4E08D]",
  3: "border-[#FFD15C]",
  4: "border-[#FF8D5C]",
  5: "border-[#E45C5C]"
};

// Icon colors for different levels
const levelIconColors = {
  1: "text-[#8DE4AF]",
  2: "text-[#C4E08D]",
  3: "text-[#FFD15C]",
  4: "text-[#FF8D5C]",
  5: "text-[#E45C5C]"
};

export default function QuoteDisplay({ quote, level, isLoading, isError }: QuoteDisplayProps) {
  // Get border color based on level
  const borderColorClass = levelBorderColors[level as keyof typeof levelBorderColors];
  const iconColorClass = levelIconColors[level as keyof typeof levelIconColors];
  
  return (
    <motion.section 
      className="w-full mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={`w-full px-6 py-8 bg-card rounded-xl shadow-md border-l-4 ${borderColorClass} transition-all`}>
        <div className="flex">
          <i className={`fas fa-quote-left text-3xl mr-4 opacity-70 ${iconColorClass}`}></i>
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4" />
              </motion.div>
            ) : isError ? (
              <motion.blockquote 
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-medium text-lg md:text-xl text-destructive"
              >
                Oops! Failed to fetch a humbling quote. Your ego gets a break today.
              </motion.blockquote>
            ) : (
              <motion.blockquote 
                key={quote || "initial"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-medium text-lg md:text-xl"
              >
                {quote || "Select a humbling level to see your personalized quote."}
              </motion.blockquote>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
