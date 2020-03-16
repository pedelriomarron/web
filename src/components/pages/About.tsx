import * as React from 'react';
import Header from '../includes/Header'
import sign from "../../img/sign.svg"
import { Text } from '../../containers/Language'

export class About extends React.Component<{}, {}> {




    render() {


        const name: string = "Pedro del Río Marrón"
        const available: boolean = false;
        const cv = "https://drive.google.com/file/d/1TvHb0JQK4aQnimNJ8Q7P8byWJIB3DMTY/view"

        let buttonAvailable
        if (available) {
            buttonAvailable = <div className=" m-1 btn bg-green-600  text-white  hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                <span> <span className="text-red-500">•</span> <Text tid="about_available" /> </span>
            </div>
        } else {
            buttonAvailable = <div className=" m-1 btn bg-gray-800  text-white  hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                <span ><span className="text-red-500">•</span>  <Text tid="about_not_available" /> </span>
            </div>

        }


        return (

            <React.Fragment>
                <Header title="header_about" subtitle="header_about_sub" classColor="bg-green-200"></Header>
                <div className="flex flex-col items-center justify-center lg:mt-10 lg:flex-row p-10  mx-auto mt-10 box-border box-content w-4/5 mx-auto mt-10">
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
                            <p><Text tid="about_extract" />  </p>
                        </div>


                        <div>

                            <img alt="" width="120rem" className=" p-4 object-contain sm:object-cover md:object-fill lg:object-none xl:object-scale-down ..." src={sign} />

                            {buttonAvailable}

                            <a href={cv} rel="noopener noreferrer" target="_blank" className="m-1 bg-red-900 text-white  btn bg-grey-700 hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                                <i className="fas fa-download"> <span> <Text tid="about_download" />  </span> </i>
                            </a>
                        </div>
                    </div>
                </div>
            </React.Fragment >






        )
    }
}