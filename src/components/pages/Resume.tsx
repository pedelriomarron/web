import * as React from 'react';
import Header from '../includes/Header';

export class Resume extends React.Component<{}, {}> {





    addResume = () => {
        const dataTimeline = [
            {
                name: "Educación",
                icon: "fa fa-graduation-cap",
                items: [
                    {
                        title: "Desarrollo Web",
                        year: "2018 - Presente",
                        college: "IES Marqués de Comares & IES Trassierra"
                    },
                    {
                        title: "Administración de Sistemas",
                        year: "2016 - 2018",
                        college: "IES Marqués de Comares"
                    },
                    {
                        title: "Sistemas Microinfo. y Redes",
                        year: "2014 - 2016",
                        college: "CES Lope de Vega SCA"
                    }
                ]
            },
            {
                name: "Experiencia",
                icon: "fas fa-briefcase",
                items: [
                    {
                        title: "Prácticas: Desarrollador Web",
                        year: "abr de 2018 - jun de 2018",
                        college: "Eurotransportcar"
                    },
                    {
                        title: "Prácticas: Técnico Informático",
                        year: "mar 2016 - may 2016",
                        college: "PC-ON Córdoba"
                    }
                ]
            }
        ]
        let dom: any = []
        dataTimeline.map((item, j) => {
            let ul: any = []
            let uldiv: any = []
            item.items.map((item, i) => {
                return ul.push(<li key={i + "-" + j} className="bg-blue-100 p-3 m-3 rounded timeline-item "> <div className="text-xl  pb-3">{item.title}</div> <div className="text-xs pb-1">{item.year}</div> <div className="text-sm">{item.college}</div> </li>)
            })
            uldiv.push(<ul key={j + j + "-"} className="pl-10 pb-10">{ul}</ul>)
            return dom.push(<div key={j} className="p-5 lg:w-1/2 sm:w-full"> <div className="uppercase text-2xl"> <i className={"rounded-full p-3  bg-blue-400 " + item.icon} > </i> {item.name} </div>  {uldiv} </div>)


        })
        return dom
    }






    render() {
        return (
            <React.Fragment>
                <Header title="Resume" subtitle="I show you my student and work career." classColor="bg-purple-200"></Header>
                <div id="timeline" className="md:flex md:justify-start flex-wrap p-10  ">
                    {this.addResume()}
                </div>
            </React.Fragment>

        )
    }
}