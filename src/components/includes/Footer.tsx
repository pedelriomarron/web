import * as React from 'react';

export class Footer extends React.Component<{}, {}> {

    private year: number = new Date().getFullYear();

    addRRSS = () => {
        const rrss = [
            { href: "https://github.com/pedelriomarron", icon: "fab fa-github", class: "hover:text-gray-900" },
            { href: "https://www.linkedin.com/in/pedelriomarron/", icon: "fab fa-linkedin", class: " hover:text-blue-500" },
            { href: "https://www.npmjs.com/~pedelriomarron", icon: "fab fa-npm", class: "hover:text-red-800" }

        ]
        let dom: any = []
        rrss.map((item, i) => {
            dom.push(<a key={i} target="_blank" href={item.href} className={"hover:text-gray-700 p-2 " + item.class} >  <i className={item.icon}> </i> </a>)
        })
        return dom
    }




    render() {

        return (
            <div className="footer xl:pb-0 lg:pb-0 md:pb-0 pb-12 ">
                <div className="skew-footer bg-gray-900 "></div>
                <footer className="bg-gray-900 text-white flex-grow py-8 pt-20 ">
                    <div className="md:flex md:justify-start flex-wrap text-center">
                        <div className="px-3 mb-3  md:w-1/3 "></div>
                        <div id="social_footer" className="px-3 mb-3  md:w-1/3 ">
                            <div className="px-6 text-3xl text-gray-500">
                                {this.addRRSS()}
                            </div>
                        </div>
                        <div className="px-3 mb-3  md:w-1/3 ">
                        </div>
                    </div>
                    <div className="text-center text-sm">
                        <div className="">
                            <hr className="p-1 m-1 w-1/4 mx-auto" />
                            Copyright © <span id="footer_year"> {this.year}</span> | All Rights Reserved
                     </div>
                        <div className=""> <span id="autor"></span></div>
                        <div><span id="version"></span></div>
                    </div>
                </footer>
            </div>
        )
    }
}