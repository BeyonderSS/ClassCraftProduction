import React from "react";
const FAQ = () => {
    return (
        <>
            {/* Container for demo purpose */}
            <div className="container py-24 md:h-screen px-6 mx-auto">
                {/* Section: Design Block */}
                <section className="mb-32 text-gray-100">
                    <div className="grid lg:grid-cols-2 gap-4 lg:gap-x-12 lg:mb-0">
                        <div className="mb-12 lg:mb-0">
                            <h2 className="text-3xl font-bold mb-6">
                                Frequently asked{" "}
                                <span className="text-3xl font-bold mb-2 text-blue-200">
                                    questions
                                </span>
                            </h2>
                            <p className="text-gray-900 mb-12">
                                Didn&apos;t find your answer in the FAQ? Contact our
                                sales team.
                            </p>
                            <form>
                                <div className="form-group mb-6">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleInput7"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-group mb-6">
                                    <input
                                        type="email"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleInput8"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="form-group mb-6">
                                    <textarea
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlTextarea13"
                                        rows={3}
                                        placeholder="Message"
                                        defaultValue={""}
                                    />
                                </div>
                                <div className="form-group form-check text-center mb-6">
                                    <input
                                        type="checkbox"
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                                        id="exampleCheck87"
                                        defaultChecked=""
                                    />
                                    <label
                                        className="form-check-label inline-block text-gray-800"
                                        htmlFor="exampleCheck87"
                                    >
                                        Send me a copy of this message
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                        <div className="mb-6 md:mb-0">
                            <p className="font-bold mb-4">
                                Anim pariatur cliche reprehenderit?
                            </p>
                            <p className="text-gray-900 mb-12">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Sunt autem numquam dolore
                                molestias aperiam culpa alias veritatis
                                architecto eos, molestiae vitae ex eligendi
                                libero eveniet dolorem, doloremque rem aliquid
                                perferendis.
                            </p>
                            <p className="font-bold mb-4">
                                Non cupidatat skateboard dolor brunch?
                            </p>
                            <p className="text-gray-900 mb-12">
                                Distinctio corporis, iure facere ducimus quos
                                consectetur ipsa ut magnam autem doloremque ex!
                                Id, sequi. Voluptatum magnam sed fugit iusto
                                minus et suscipit? Minima sunt at nulla tenetur,
                                numquam unde quod modi magnam ab deserunt ipsam
                                sint aliquid dolores libero repellendus
                                cupiditate mollitia quidem dolorem odit
                            </p>
                            <p className="font-bold mb-4">
                                Praesentium voluptatibus temporibus consequatur
                                non aspernatur?
                            </p>
                            <p className="text-gray-900 mb-12">
                                Minima sunt at nulla tenetur, numquam unde quod
                                modi magnam ab deserunt ipsam sint aliquid
                                dolores libero repellendus cupiditate mollitia
                                quidem dolorem.
                            </p>
                        </div>
                    </div>
                </section>
                {/* Section: Design Block */}
            </div>
            {/* Container for demo purpose */}
        </>
    );
};

export default FAQ;
