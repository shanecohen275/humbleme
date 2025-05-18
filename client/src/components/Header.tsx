import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header 
      className="w-full py-6 px-4 flex justify-center items-center mb-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-1">
          <i className="fas fa-fire text-primary text-2xl mr-2"></i>
          <h1 className="font-bold text-3xl md:text-4xl">HumbleMe</h1>
        </div>
        <p className="text-center text-muted-foreground text-sm md:text-base max-w-md">
          Soul-nudging humbling quotes calibrated to your roast tolerance
        </p>
      </div>
    </motion.header>
  );
}
