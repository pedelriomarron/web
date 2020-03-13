import * as React from 'react';
import Header from '../includes/Header'
import sign from "../../img/sign.svg"
import me from "../../img/me.jpeg"

export class About extends React.Component<{}, {}> {




    render() {

        const extract: string = "Desde pequeño soy un apasionado de las nuevas tecnologías, siempre me he servido de ellas para facilitar el trabajo y obtener el mejor resultado. Me considero una persona autodidacta y resolutiva con una gran capacidad de adaptación.";
        const name: string = "Pedro del Río Marrón"
        const available: boolean = false;

        let buttonAvailable
        if (available) {
            buttonAvailable = <a className=" m-1 btn bg-green-600  text-white  hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                <span> <span className="text-red-500">•</span> Actualmente  Disponible</span>
            </a>
        } else {
            buttonAvailable = <a className=" m-1 btn bg-gray-800  text-white  hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                <span ><span className="text-red-500">•</span> Actualmente No Disponible</span>
            </a>

        }


        return (

            <React.Fragment>
                <Header title="About Me" subtitle="dfj dfj dfh fhjdh jdfh " classColor="bg-green-200"></Header>
                <div className="flex flex-col items-center justify-center lg:mt-10 lg:flex-row p-3">
                    <div className="mb-10 lg:px-6 lg:my-0">
                        <img src="https://pedrodelrioweb.appspot.com/assets/img/about/about-1.jpg" alt={name} className="object-contain sm:object-cover md:object-fill  lg:object-none xl:object-scale-down shadow-2xl" />

                    </div>
                    <div className="mb-10 text-gray-900 lg:px-6 lg:my-0">
                        <div className="mb-4 text-xl text-black">
                            <h1 className="mb-4">
                                {name} <span className="text-gray-900">(@pedelriomarron)</span>
                            </h1>

                            <h2>

                            </h2>
                        </div>
                        <hr className="hidden my-6 lg:block" />
                        <div className="mb-4 text-justify wink-body wink-home">
                            <p>{extract}</p>
                        </div>


                        <div>

                            <img width="120rem" className=" p-4 object-contain sm:object-cover md:object-fill lg:object-none xl:object-scale-down ..." src={sign} />

                            {buttonAvailable}

                            <a href="#" className="m-1 bg-red-900 text-white  btn bg-grey-700 hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                                <i className="fas fa-download"> <span> Download CV</span> </i>
                            </a>
                        </div>
                    </div>
                </div>
            </React.Fragment >






        )
    }
}