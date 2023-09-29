import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
const CCHero = () => {
  // Define the animation variants

  return (
    <>
      {/* Container for demo purpose */}
      <div>
        {/* Section: Design Block */}
        <section className="mb-40 min-h-screen  overflow-hidden">
          {/* <style
            dangerouslySetInnerHTML={{
              __html:
                "\n      .background-radial-gradient {\n        background-color: hsl(218, 41%, 15%);\n        background-image: radial-gradient(\n          650px circle at 0% 0%,\n          hsl(218, 41%, 35%) 15%,\n          hsl(218, 41%, 30%) 35%,\n          hsl(218, 41%, 20%) 75%,\n          hsl(218, 41%, 19%) 80%,\n          transparent 100%\n        ),\n        radial-gradient(\n          1250px circle at 100% 100%,\n          hsl(218, 41%, 45%) 15%,\n          hsl(218, 41%, 30%) 35%,\n          hsl(218, 41%, 20%) 75%,\n          hsl(218, 41%, 19%) 80%,\n          transparent 100%\n        );\n      }\n      #radius-shape-1 {\n        height: 220px;\n        width: 220px;\n        top: -60px;\n        left: -130px;\n        background: radial-gradient(#44006b, #ad1fff);\n        overflow: hidden;\n      }\n      #radius-shape-2 {\n        border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;\n        bottom: -60px;\n        right: -110px;\n        width: 300px;\n        height: 300px;\n        background: radial-gradient(#44006b, #ad1fff);\n        overflow: hidden;\n      }\n      .bg-glass {\n        background-color: hsla(0, 0%, 100%, 0.9);\n        backdrop-filter: saturate(200%) blur(25px);\n      }\n    ",
            }}
          /> */}

          <div className="px-6 py-12  lg:py-24 md:px-12 text-center lg:text-left">
            <div className="container mx-auto xl:px-32 text-gray-800">
              <div className="grid lg:grid-cols-2 gap-12  items-center">
                <div className="mt-12 lg:mt-0" style={{ zIndex: 10 }}>
                  <h1
                    className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12"
                    style={{ color: "hsl(218, 81%, 95%)" }}
                  >
                    ClassCraft <br />
                    <span
                      style={{
                        color: "hsl(218, 81%, 75%)",
                      }}
                    >
                      <span className="flex flex-row text-lg tracking-wider py-5 pl-1 ">
                        {" "}
                        Powered By.
                      </span>
                      FlourisherEdge
                    </span>
                  </h1>
                  <p
                    className="opacity-70"
                    style={{ color: "hsl(218, 81%, 85%)" }}
                  >
                    Step into the world of Class Craft, a cutting-edge Learning
                    Management System meticulously crafted to align seamlessly
                    with your unique needs, revolutionizing your perception of
                    education.
                  </p>
                </div>
                <div className="mb-12 lg:mb-0 relative">
                  <motion.div
                    animate="bubble"
                    variants={{
                      bubble: {
                        x: [0, 5, -5, 10, -10, 0],
                        y: [0, 10, -10, 5, -5, 0],
                        transition: {
                          duration: 10,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "reverse",
                        },
                      },
                    }}
                    id="radius-shape-1"
                    className="absolute rounded-full shadow-lg"
                  />
                  <motion.div
                    animate="bubble"
                    variants={{
                      bubble: {
                        x: [0, -10, 10, -5, 5, 0],
                        y: [0, -5, 5, -10, 10, 0],
                        transition: {
                          duration: 10,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "reverse",
                        },
                      },
                    }}
                    id="radius-shape-2"
                    className="absolute shadow-lg"
                  />
                  <motion.div
                    animate="bubble"
                    variants={{
                      bubble: {
                        x: [0, -10, 10, -5, 5, 0],
                        y: [0, -5, 5, -10, 10, 0],
                        transition: {
                          duration: 10,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "reverse",
                        },
                      },
                    }}
                    className="block rounded-lg shadow-xl bg-glass"
                  >
                    <Image
                      src="/webinar-animate.svg"
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Section: Design Block */}
      </div>
      {/* Container for demo purpose */}
    </>
  );
};

export default CCHero;
