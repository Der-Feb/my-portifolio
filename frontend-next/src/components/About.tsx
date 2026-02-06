import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto px-6">
        <div ref={ref} className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Image Section */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-secondary overflow-hidden card-elevated">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary rounded-2xl -z-10" />
            </div>

            {/* Content Section */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-primary font-medium mb-2 block"
              >
                About Me
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6"
              >
                Turning ideas into reality through code
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4 text-muted-foreground leading-relaxed"
              >
                <p>
                  I'm a passionate developer with a keen eye for design and a love for creating seamless user experiences. With over 5 years of experience in the industry, I've worked on projects ranging from startups to enterprise solutions.
                </p>
                <p>
                  My approach combines technical expertise with creative problem-solving, ensuring every project I touch is not just functional but also beautiful and intuitive.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-gradient">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-gradient">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-gradient">30+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
