import React from "react";
import { motion } from "framer-motion";
const CCAboutCC = () => {
  return (
    <>
      {/* Container for demo purpose */}
      <div className="container my-24 px-6 mx-auto">
        {/* Section: Design Block */}
        <section className="mb-32 text-gray-800 text-center lg:text-left">
          <h2 className="text-3xl font-bold  text-center justify-center text-gray-200">
            What We<span className="text-blue-600"> Provide?</span>
          </h2>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n      @media (min-width: 992px) {\n        .rotate-lg-6 {\n          transform: rotate(6deg);\n        }\n      }\n    ",
            }}
          />
          <div className="sm:px-6 py-12 md:px-12">
            <div className="container mx-auto xl:px-32">
              <div className="grid lg:grid-cols-2  items-center">
                <div className="md:mt-12 lg:mt-0 mb-12 lg:mb-0">
                  <div
                    className="relative block rounded-lg shadow-lg px-6 py-12 md:px-12 lg:-mr-14 bg-white/90"
                    // style={{
                    //   background: "hsla(0, 0%, 100%, 0.55)",
                    //   backdropFilter: "blur(30px)",
                    //   zIndex: 1,
                    // }}
                  >
                    <h2 className="text-3xl font-bold mb-2 text-blue-600">
                      ClassCraft
                    </h2>
                    <p className="font-semibold mb-4">An online Educational</p>
                    <p className="text-gray-500 mb-6">
                      Nunc tincidunt vulputate elit. Mauris varius purus
                      malesuada neque iaculis malesuada. Aenean gravida magna
                      orci, non efficitur est porta id. Donec magna diam.
                    </p>
                    <p className="text-gray-500 mb-6">
                      Ad, at blanditiis quaerat laborum officia incidunt
                      cupiditate dignissimos voluptates eius aliquid minus
                      praesentium! Perferendis et totam ipsum ex aut earum
                      libero accusamus voluptas quod numquam saepe, consequuntur
                      nihil quia tenetur consequatur. Quis, explicabo deserunt
                      quasi assumenda ea maiores nulla, et dolor saepe
                      praesentium natus error reiciendis voluptas iste.
                    </p>
                    <ul className="flex justify-center md:justify-start">
                      <li>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          className="w-4 text-blue-600"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                      </li>
                      <li>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          className="w-4 text-blue-600"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                      </li>
                      <li>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          className="w-4 text-blue-600"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                      </li>
                      <li>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          className="w-4 text-blue-600"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                      </li>
                      <li>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          className="w-4 text-blue-600"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:mb-12 lg:mb-0 rotate-lg-6 md:pl-12">
                  <motion.img
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
                    src="/raising-hand-animate.svg"
                    className="w-full rounded-lg shadow-lg  py-10"
                    alt=""
                  />
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

export default CCAboutCC;
