import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  X,
  Linkedin,
  Github,
  Twitter,
  ExternalLink,
  Users,
  Code2,
  Palette,
  Server,
  Megaphone,
  Star,
  MapPin,
  Mail,
  ChevronRight,
} from "lucide-react";

const teamMembers = [
  {
    name: "Sanula Rajapaksha",
    role: "Team Leader & Full-Stack Developer",
    tag: "Founder",
    tagColor: "bg-primary/10 text-primary",
    domain: "Full-Stack",
    domainIcon: Code2,
    favSpot: "Mirissa Beach",
    favSpotDesc: "Where the southern coast meets perfect surf.",
    bio: "Sanula leads the Seygo vision end-to-end — from architecting the backend APIs to shipping pixel-perfect frontend experiences. He believes the best products come from people who deeply love what they're building.",
    skills: ["React", "Node.js", "PostgreSQL", "AWS", "TypeScript"],
    image: "/Images/sanula-rajapaksha.jpeg",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    quote: "\"Build things that matter to people, not just things that work.\"",
    color: "from-primary/20 to-teal-500/10",
    accent: "border-primary",
  },
  {
    name: "Minodya Jayasinghe",
    role: "Marketing & Front-End Support",
    tag: "Growth",
    tagColor: "bg-secondary/15 text-amber-700",
    domain: "Marketing",
    domainIcon: Megaphone,
    favSpot: "Galle Fort",
    favSpotDesc: "History, cafes, and the most Instagrammable streets.",
    bio: "Minodya drives Seygo's storytelling — shaping the brand voice across social media, content strategy, and UI design support. She turns complex features into simple, human narratives.",
    skills: ["Brand Strategy", "Social Media", "Figma", "Content Creation", "SEO"],
    image: "/Images/minodya-jayasinghe.jpeg",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    quote: "\"Great design is when people don't notice it — they just feel it.\"",
    color: "from-amber-400/15 to-orange-300/10",
    accent: "border-secondary",
  },
  {
    name: "Rizlan Sinnan",
    role: "Front-End Developer",
    tag: "UI Lead",
    tagColor: "bg-violet-100 text-violet-700",
    domain: "Frontend",
    domainIcon: Palette,
    favSpot: "Ella Rock",
    favSpotDesc: "The hike worth every step for that summit view.",
    bio: "Rizlan crafts the interfaces users fall in love with. With a sharp eye for detail and motion, he brings wireframes to life with fluid animations and responsive precision across every breakpoint.",
    skills: ["React", "Tailwind CSS", "Framer Motion", "Figma", "GSAP"],
    image: "/Images/rizlan-sinnan.png",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    quote: "\"Every pixel has a purpose. Every interaction tells a story.\"",
    color: "from-violet-400/15 to-purple-300/10",
    accent: "border-violet-400",
  },
  {
    name: "Vinuka Shenul",
    role: "Front-End & Marketing Support",
    tag: "Creative",
    tagColor: "bg-pink-100 text-pink-700",
    domain: "Creative",
    domainIcon: Palette,
    favSpot: "Sigiriya",
    favSpotDesc: "Ancient rock fortress with views beyond imagination.",
    bio: "Vinuka bridges the gap between engineering and design. He contributes to UI development while supporting the marketing team with creative assets, campaign materials, and social engagement.",
    skills: ["HTML/CSS", "JavaScript", "Adobe XD", "Canva", "Copywriting"],
    image: "/Images/vinuka-shenul.jpeg",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    quote: "\"Creativity is intelligence having fun — especially in code.\"",
    color: "from-pink-400/15 to-rose-300/10",
    accent: "border-pink-400",
  },
  {
    name: "Ammar Abdur",
    role: "Back-End Developer",
    tag: "Backend",
    tagColor: "bg-emerald-100 text-emerald-700",
    domain: "Backend",
    domainIcon: Server,
    favSpot: "Knuckles Range",
    favSpotDesc: "Where misty mountains and silence do the talking.",
    bio: "Ammar is the infrastructure backbone of Seygo. He designs the APIs, optimizes database queries, handles auth flows, and ensures the platform scales seamlessly as the user base grows.",
    skills: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    image: "/Images/ammar-abdur.jpeg",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    quote: "\"A great API is invisible — users just experience speed and reliability.\"",
    color: "from-emerald-400/15 to-teal-300/10",
    accent: "border-emerald-400",
  },
  {
    name: "Venuja Dulen",
    role: "Front-End & Marketing Support",
    tag: "Community",
    tagColor: "bg-sky-100 text-sky-700",
    domain: "Frontend",
    domainIcon: Users,
    favSpot: "Nuwara Eliya",
    favSpotDesc: "Tea country that smells like morning and possibility.",
    bio: "Venuja is Seygo's community connector — supporting UI development while building the brand presence online. He engages with early adopters, manages social channels, and keeps the Seygo community thriving.",
    skills: ["React", "Community Management", "Content Strategy", "Tailwind CSS", "Analytics"],
    image: "/Images/venuja-dulen.jpeg",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    quote: "\"Technology connects, but community is what makes people stay.\"",
    color: "from-sky-400/15 to-blue-300/10",
    accent: "border-sky-400",
  },
];

function BioModal({
  member,
  onClose,
}: {
  member: (typeof teamMembers)[0];
  onClose: () => void;
}) {
  const Icon = member.domainIcon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative bg-gradient-to-br ${member.color} p-6 border-b border-gray-100`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors text-foreground"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4">
            <div className={`w-20 h-20 rounded-2xl overflow-hidden border-2 ${member.accent} shadow-lg shrink-0`}>
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${member.tagColor} uppercase tracking-wider`}>
                {member.tag}
              </span>
              <h3 className="text-xl font-serif font-bold mt-1 text-foreground">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Quote */}
          <blockquote className="text-sm text-muted-foreground italic border-l-2 border-primary pl-4 leading-relaxed">
            {member.quote}
          </blockquote>

          {/* Bio */}
          <p className="text-sm text-foreground/80 leading-relaxed">{member.bio}</p>

          {/* Fav Spot */}
          <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-2xl">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-foreground">Favourite Spot</p>
              <p className="text-sm font-semibold text-primary">{member.favSpot}</p>
              <p className="text-xs text-muted-foreground">{member.favSpotDesc}</p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1 bg-muted rounded-full text-foreground/70 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
            <span className="text-xs text-muted-foreground">Connect:</span>
            {[
              { icon: Linkedin, href: member.social.linkedin, label: "LinkedIn", color: "hover:text-blue-600" },
              { icon: Github, href: member.social.github, label: "GitHub", color: "hover:text-gray-900" },
              { icon: Twitter, href: member.social.twitter, label: "Twitter", color: "hover:text-sky-500" },
            ].map(({ icon: SocialIcon, href, label, color }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`w-8 h-8 bg-muted rounded-xl flex items-center justify-center text-muted-foreground ${color} transition-colors`}
              >
                <SocialIcon className="w-4 h-4" />
              </a>
            ))}
            <a
              href="#contact"
              className="ml-auto flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              Get in touch
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Team() {
  const [selected, setSelected] = useState<(typeof teamMembers)[0] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="team" className="py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-secondary/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-bold tracking-widest uppercase border border-primary/15 mb-6">
            <Users className="w-3.5 h-3.5" />
            The Team
          </span>
          <h2 className="text-foreground mb-4">
            Meet the Locals<br />
            <span className="text-gradient">Behind Seygo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Six builders passionate about Sri Lanka, travel technology,
            and making exploration more authentic for everyone.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-8 mb-16 flex-wrap"
        >
          {[
            { label: "Team Members", value: "6" },
            { label: "Combined Experience", value: "18+ yrs" },
            { label: "Disciplines", value: "5" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-serif font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {teamMembers.map((member, i) => {
            const Icon = member.domainIcon;
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelected(member)}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Gradient header */}
                <div className={`h-40 relative bg-gradient-to-br ${member.color} overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className={`absolute top-3 left-3 w-8 h-8 bg-white/80 rounded-xl flex items-center justify-center border ${member.accent}`}>
                    <Icon className="w-4 h-4 text-foreground" />
                  </div>
                  <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${member.tagColor} uppercase tracking-wider`}>
                    {member.tag}
                  </span>
                  {/* Avatar */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <div className={`w-20 h-20 rounded-2xl overflow-hidden border-2 ${member.accent} shadow-lg`}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="pt-12 pb-5 px-5 text-center">
                  <h3 className="text-lg font-serif font-bold text-foreground">{member.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{member.role}</p>

                  {/* Fav spot */}
                  <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-primary font-medium">
                    <MapPin className="w-3 h-3" />
                    {member.favSpot}
                  </div>

                  {/* Skills preview */}
                  <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                    {member.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-semibold">
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Social mini row */}
                  <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    {[
                      { icon: Linkedin, href: member.social.linkedin },
                      { icon: Github, href: member.social.github },
                      { icon: Twitter, href: member.social.twitter },
                    ].map(({ icon: SocialIcon, href }, idx) => (
                      <a
                        key={idx}
                        href={href}
                        onClick={(e) => e.stopPropagation()}
                        className="w-7 h-7 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        <SocialIcon className="w-3.5 h-3.5" />
                      </a>
                    ))}
                    <button className="ml-auto flex items-center gap-1 text-[11px] text-primary font-semibold hover:gap-2 transition-all">
                      View Bio <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Hover star badge */}
                <div className="absolute top-3 right-12 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Star className="w-4 h-4 text-secondary fill-secondary" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground text-sm mb-4">
            We're always looking for passionate people to join our journey.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors text-sm"
          >
            Join the Team
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Bio Modal */}
      <AnimatePresence>
        {selected && (
          <BioModal member={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
