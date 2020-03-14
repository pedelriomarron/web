import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Particles from 'react-particles-js';


interface IProps {

}

interface IState {
}




export default class Homepage extends React.PureComponent<IProps, IState> {

    addFeatures = () => {
        const items = [
            { href: "/portfolio", title: "My Projects", icon: "fas fa-briefcase", subtitle: "Discover information about my projects" },
            { href: "/resume", title: "My Resume", icon: "fab fa-black-tie", subtitle: "Discover my student and professional career" },
            { href: "/skills", title: "My Skills", icon: "fas fa-cogs", subtitle: "Find out a little about the technologies I know" },
            { href: "/contact", title: "Contact Me", icon: "fas fa-envelope-open", subtitle: "You can contact me for anything you need" },



        ]
        let dom: any = []
        items.map((item, i) => {
            return dom.push(<div key={i} className="sm:w-1/4 p-2">
                <div className="bg-white px-6 py-8 rounded-lg shadow-lg text-center">
                    <div className="mb-3">
                        <i className={item.icon + " fa-7x"}></i>
                    </div>
                    <h2 className="text-xl font-medium text-gray-700">{item.title}</h2>
                    <span className="text-blue-500 block mb-5">{item.subtitle}</span>
                    <NavLink className="px-4 py-2 bg-blue-500 text-white rounded-full" to={item.href}>
                        Here</NavLink>
                </div>
            </div>)
        })
        return dom
    }


    render() {

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
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
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
                <div className="py-20 p-10" style={{ background: "linear-gradient(90deg, #93d4ea 0%, #175384 100%)" }}
                >
                    <div className="relative">
                        <Particles className="particle_"
                            params={params} >
                        </Particles>
                        <div className="container mx-auto px-6">


                            <h2 className="text-4xl font-bold mb-2 text-white">
                                Welcome to my website!</h2>
                            <h3 className="text-2xl mb-8 text-gray-200">
                                Here you can find information about the projects I do and what I do.</h3>
                            <NavLink className=" mt-2 bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider" to={"/about"}>
                                Know me</NavLink>

                        </div>
                    </div>
                </div>

                <div id="container" className="w-4/5 mx-auto mt-10">
                    <div className="flex flex-col sm:flex-row">
                        {this.addFeatures()}


                    </div>
                </div>


            </React.Fragment >

        )
    }
}