import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Sanula Rajapaksha",
    role: "Team Leader & Full-Stack Developer",
    favSpot: "Front-end, back-end, and databases",
    image: "/Images/sanula-rajapaksha.jpeg"
  },
  {
    name: "Minodya Jayasinghe",
    role: "Marketing & Front-End Support",
    favSpot: "Social media and UI design support",
    image: "/Images/minodya-jayasinghe.jpeg"
  },
  {
    name: "Rizlan Sinnan",
    role: "Front-End Developer",
    favSpot: "Responsive, user-friendly interfaces",
    image: "/Images/rizlan-sinnan.png"
  },
  {
    name: "Vinuka Shenul",
    role: "Front-End & Marketing Support",
    favSpot: "UI development and marketing activities",
    image: "/Images/vinuka-shenul.jpeg"
  },
  {
    name: "Ammar Abdur",
    role: "Back-End Developer",
    favSpot: "Server logic, APIs, and performance",
    image: "/Images/ammar-abdur.jpeg"
  },
  {
    name: "Venuja Dulen",
    role: "Front-End & Marketing Support",
    favSpot: "UI design and social engagement",
    image: "/Images/venuja-dulen.jpeg"
  }
];

export default function Team() {
  return (
    <section id="team" className="py-24 container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold mb-4">Meet the Locals Behind Seygo</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We are a team of explorers, techies, and storytellers passionate about sharing the real Sri Lanka with the world.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group w-[300px] h-[400px] [perspective:1000px]"
          >
            <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl rounded-2xl">
              
              {/* Front */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden bg-white">
                <div className="h-[75%] w-full overflow-hidden">
                   <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="h-[25%] flex flex-col items-center justify-center p-4 bg-white">
                  <h3 className="text-xl font-serif font-bold">{member.name}</h3>
                  <p className="text-primary text-sm font-medium">{member.role}</p>
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 w-full h-full bg-primary text-white [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl flex flex-col items-center justify-center p-8 text-center">
                <span className="text-secondary font-serif italic text-lg mb-2">Favorite Spot</span>
                <h3 className="text-2xl font-bold mb-6">{member.favSpot}</h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  "I love this place because it represents the raw, untouched beauty of our island."
                </p>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
