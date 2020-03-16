import * as React from 'react';

export const NoMatchPage = () => {
    return (
        <React.Fragment>
            <section className="p-10 bg-white flex justify-center">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 ">
                            <div className="col-sm-10 col-sm-offset-1  text-center">
                                <div className="four_zero_four_bg">
                                    <h1 className="text-center">404</h1>


                                </div>

                                <div className="contant_box_404">
                                    <div className="container mx-auto px-4">

                                        <section className="py-8 px-4 text-center">
                                            <div className="max-w-auto md:max-w-lg mx-auto">
                                                {/* <img className="mb-8 object-scale-down h-20  w-full" src={img} alt="" /> */}
                                                <h2 className="text-5xl mb-2 font-heading">Page not found</h2>
                                                <p className="mb-6 text-gray-500">The page you are looking for does not exist, or is currently under maintenance.</p>
                                                <div> <a href={process.env.PUBLIC_URL} className="link_404">Go to Home</a></div>


                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </React.Fragment>

    );
};

