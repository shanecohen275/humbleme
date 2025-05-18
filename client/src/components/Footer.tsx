import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer 
      className="w-full bg-card py-4 border-t border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="max-w-2xl mx-auto px-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} HumbleMe</p>
        <div className="flex space-x-4">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
