import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Particles from 'react-particles-js';
import { Text } from '../../containers/Language'


interface IProps {

}

interface IState {
}



export const Homepage = () => {




    const addFeatures = () => {
        const items = [
            { href: "/portfolio", title: "feature_projects", icon: "fas fa-briefcase", subtitle: "feature_projects_sub" },
            { href: "/resume", title: "feature_resume", icon: "fab fa-black-tie", subtitle: "feature_resume_sub" },
            { href: "/skills", title: "feature_skills", icon: "fas fa-cogs", subtitle: "feature_skills_sub" },
            { href: "/contact", title: "feature_contact", icon: "fas fa-envelope-open", subtitle: "feature_contact_sub" },



        ]
        let dom: any = []
        items.map((item, i) => {
            return dom.push(
                <NavLink key={i} className="w-full md:w-full lg:w-2/4 xl:w-1/4 p-2   md:flex justify-center text-blue-900 hover:text-blue-700 transition  ease-in-out duration-500  transform hover:-translate-y-3 hover:scale-110  " to={item.href}>
                    <div className="bg-white px-6 py-8 rounded-lg shadow-lg text-center">
                        <div className="mb-3">
                            <div className="" >
                                <i className={item.icon + " fa-7x "}></i></div>
                        </div>
                        <div className="">
                            <h2 className="text-xl font-medium text-gray-700  "><Text tid={item.title}></Text></h2>
                            <span className="text-gray-500 block mb-5"><Text tid={item.subtitle}></Text></span>
                        </div>


                    </div>

                </NavLink>
            )
        })
        return dom
    }




    const params: any = {
        "particles": {
            "number": {
                "value": 180,
                "density": {
                    "enable": true,
                    "value_area": 700
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {

                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true

    };



    return (
        <React.Fragment>
            <div className="py-20 p-10" style={{ background: "linear-gradient(90deg, #93d4ea 0%, #175384 100%)" }} >
                <div className="relative">
                    <Particles className="  particle_"
                        params={params} >
                    </Particles>
                    <div className="hero container mx-auto px-6 ">
                        <h2 className="text-4xl font-bold mb-2 text-white">
                            <Text tid="homepage_title" />
                        </h2>
                        <h3 className="text-2xl mb-8 text-gray-200">
                            <Text tid="homepage_subtitle"></Text>
                        </h3>
                        <NavLink className="z-50  mt-2 bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider" to={"/about"}>
                            <Text tid="homepage_btn" />
                        </NavLink>
                    </div>
                </div>
            </div>
            <div id="container" className="w-4/5 mx-auto mt-10">
                <div className="flex flex-wrap flex-col sm:flex-row   md:flex content-center flex-wrap   ">
                    {addFeatures()}
                </div>
            </div>
        </React.Fragment >
    )
}

export default Homepage;