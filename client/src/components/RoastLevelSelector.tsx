import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface RoastLevelSelectorProps {
  level: number;
  onLevelChange: (level: number) => void;
}

const levelData = {
  1: {
    name: "Treat Me Like Royalty",
    description: "Soft encouragement with light self-awareness",
    color: "bg-[#8DE4AF] border-[#8DE4AF] text-[#8DE4AF]",
    emoji: "😇"
  },
  2: {
    name: "Mild Toast",
    description: "Gentle teasing, like your gran trying to be edgy",
    color: "bg-[#C4E08D] border-[#C4E08D] text-[#C4E08D]",
    emoji: "😊"
  },
  3: {
    name: "Public Roast",
    description: "Sarcasm with a smile; sting just enough to be memorable",
    color: "bg-[#FFD15C] border-[#FFD15C] text-[#FFD15C]",
    emoji: "😏"
  },
  4: {
    name: "Character Development Arc",
    description: "Brutally honest with dark wit, but still oddly inspiring",
    color: "bg-[#FF8D5C] border-[#FF8D5C] text-[#FF8D5C]",
    emoji: "😬"
  },
  5: {
    name: "Full Gordon Ramsay",
    description: "Savage, soul-crushing roast that makes you laugh through tears",
    color: "bg-[#E45C5C] border-[#E45C5C] text-[#E45C5C]",
    emoji: "🔥"
  }
};

export default function RoastLevelSelector({ level, onLevelChange }: RoastLevelSelectorProps) {
  const [activeColor, setActiveColor] = useState(levelData[1].color);
  
  // Update color when level changes
  useEffect(() => {
    if (levelData[level as keyof typeof levelData]) {
      setActiveColor(levelData[level as keyof typeof levelData].color);
    }
  }, [level]);

  // Handle level selection
  const handleLevelChange = (value: number[]) => {
    onLevelChange(value[0]);
  };

  const handleLevelClick = (selectedLevel: number) => {
    onLevelChange(selectedLevel);
  };

  const getColorClass = (colorString: string) => {
    return colorString.split(' ')[0]; // Extract just the bg color class
  };

  // Custom styles for slider track with a gradient
  const sliderTrackStyles = {
    background: "linear-gradient(to right, #8DE4AF, #C4E08D, #FFD15C, #FF8D5C, #E45C5C)",
    height: "10px",
    borderRadius: "5px"
  };
  
  // Calculate positions for the slider thumb to align with emojis
  // The slider works on percentages where 0% is leftmost and 100% is rightmost
  // For 5 levels, we need to map levels 1-5 to positions that align with emojis
  const sliderPositions = {
    1: 0,      // Leftmost position (0%)
    2: 25,     // 25% from left
    3: 50,     // Center (50%)
    4: 75,     // 75% from left
    5: 100     // Rightmost position (100%)
  };

  return (
    <motion.section 
      className="w-full mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="w-full px-4 py-6 bg-card rounded-xl shadow-md">
        {/* Level Indicators */}
        <div className="grid grid-cols-5 gap-0 mb-1 px-1">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div 
              key={lvl}
              className="flex justify-center"
            >
              <span 
                onClick={() => handleLevelClick(lvl)}
                className={`text-xs font-medium cursor-pointer transition-all duration-300 text-center ${
                  level === lvl ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
                style={{ fontSize: '0.7rem', maxWidth: '100%' }}
              >
                {lvl === 1 ? "Treat Me Like Royalty" : 
                 lvl === 2 ? "Mild Toast" : 
                 lvl === 3 ? "Public Roast" : 
                 lvl === 4 ? "Character Development Arc" : 
                 "Full Gordon Ramsay"}
              </span>
            </div>
          ))}
        </div>
        
        {/* Custom slider with precise emoji alignment */}
        <div className="relative py-4 mb-2">
          {/* Gradient background track */}
          <div 
            className="absolute top-1/2 left-1/2 h-2 -translate-y-1/2 -translate-x-1/2 rounded-md w-[90%]"
            style={sliderTrackStyles}
          ></div>
          
          {/* Custom clickable areas for each level */}
          <div className="relative grid grid-cols-5 w-full h-10 z-10">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <div 
                key={lvl}
                className="h-full cursor-pointer flex items-center justify-center"
                onClick={() => handleLevelClick(lvl)}
              >
                {/* Thumb indicator visible only for current level */}
                {level === lvl && (
                  <div className="w-5 h-5 rounded-full bg-white border-2 border-white shadow-md relative z-20" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Level Emojis */}
        <div className="grid grid-cols-5 gap-0 mt-3 px-2">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div key={lvl} className="flex justify-center">
              <span className="text-xl">{levelData[lvl as keyof typeof levelData].emoji}</span>
            </div>
          ))}
        </div>
        
        {/* Current Level Info */}
        <div className="mt-6 text-center">
          <div className={`inline-block px-4 py-2 rounded-full ${getColorClass(activeColor)} text-background font-semibold mb-2 transition-all duration-300`}>
            Level {level}: {levelData[level as keyof typeof levelData].name}
          </div>
          <p className="text-sm text-muted-foreground">
            {levelData[level as keyof typeof levelData].description}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
