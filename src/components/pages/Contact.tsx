import * as React from 'react';
import Header from '../includes/Header'

export class Contact extends React.Component<{}, {}> {




    addSocial = (data: any) => {

        let dom: any = []
        data.map((item: any, i: number) => {
            return dom.push(<div key={i} className="text-center"><a rel="noopener noreferrer" href={item.url} target="_blank"><i className={item.fa_icon + " fa-2x p-3 "}></i><div ><div >{item.name}</div></div><hr className="my-4 border-gray-300" /></a></div>)
        })
        return dom
    }




    render() {


        const leftInfo = [
            { name: "GitHub", url: "https://github.com/pedelriomarron", fa_icon: "fab fa-github text-grey-900" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/pedelriomarron/", fa_icon: "fab fa-linkedin text-blue-500" },
            //{ name: "npm", url: "", fa_icon: "fab fa-npm text-red-700" }

        ]

        const rightInfo = [
            { name: "+34 622 86 11 62", url: "tel:+34622861162", fa_icon: "fas fa-phone text-yellow-500" },
            { name: "pedelriomarron@gmail.com", url: "mailto:pedelriomarron@gmail.com", fa_icon: "fas fa-envelope text-red-700" }
        ]

        return (

            <React.Fragment>
                <Header title="Contact Me" subtitle="If you have any questions I invite you to contact me, I will try to answer you as soon as possible." classColor="bg-orange-300"></Header>
                <div className="flex justify-center">
                    <div className="m-5 p-5">
                        <div className="flex flex-col -mx-4 md:flex-row">
                            <div className="mx-4 my-4">
                                {this.addSocial(leftInfo)}
                            </div>
                            <div className="mx-4 my-4">
                                {this.addSocial(rightInfo)}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>




        )
    }
}