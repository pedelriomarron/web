import * as React from 'react';
import Header from '../includes/Header'

export class Skills extends React.Component<{}, {}> {

    addSkills = () => {
        const skills = [
            {
                title: "Javascript", img: "fab fa-js", frameworks:
                    <div><i className="fab fa-angular"></i> Angular, <i className="fab fa-react"></i> React  </div>,
                color: "/skills/javascript.svg"
            },
            {
                title: "PHP", img: "fab fa-php", frameworks:
                    <div><i className="fab fa-symfony"></i> Symfony, <i className="fab fa-laravel"></i> Laravel  </div>,
                color: "/skills/php.svg"
            },
            {
                title: "Node.js", img: "fab fa-node", frameworks:
                    <div> Express.js </div>,
                color: "/skills/nodejs.svg"
            },
            {
                title: "Database", img: "fas fa-database", frameworks_text: "Management systems", frameworks:
                    <div>MySQL, MongoDB  </div>,
                color: "/skills/database.svg"
            },
            {
                title: "Java", img: "fab fa-java", frameworks_text: "Technologies", frameworks: <div> JSP  </div>,
                color: "/skills/java.svg"
            },
            {
                title: "CSS", img: "fab fa-css3-alt", frameworks:
                    <div><i className="fab fa-bootstrap"></i> Bootstrap, TailwindCSS , Materialize  </div>,
                color: "/skills/css-3.svg"
            },
            {
                title: "Linux", img: "fab fa-linux", frameworks_text: "Services", frameworks:
                    <div>Apache, Bind, Samba, FTP   </div>,
                color: "/skills/linux-tux.svg"
            },

            {
                title: "Python", img: "fab fa-python", frameworks:
                    <div> Django  </div>,
                color: "/skills/python.svg"
            },
            {
                title: "Windows", img: "fab fa-windows", frameworks_text: "Services", frameworks:
                    <div>IIS, Active Directory </div>,
                color: "/skills/windows.svg"
            },



        ]
        let dom: any = []
        skills.map((item, i) => {
            return dom.push(
                <div key={i} className=" p-4 lg:w-1/4 px-4 mb-6">
                    {/* <i className={item.img + ` fa-4x text-${item.color}`}></i> */}
                    <img alt="" className="object-scale-down h-12  w-full" src={process.env.PUBLIC_URL + item.color}></img>

                    <h3 className="text-xl my-2 font-heading">{item.title}</h3>
                    <div>
                        <div className="text-gray-700 leading-relaxed">
                            {
                                item.frameworks_text
                                    ? <b>{item.frameworks_text}: </b>
                                    : <b>Frameworks: </b>

                            }
                            {item.frameworks}
                        </div>
                    </div>


                </div>)
        })
        return dom
    }




    render() {


        return (

            <React.Fragment>
                <Header title="Skills" subtitle="Here I show you some of my most outstanding skills." classColor="bg-blue-200"></Header>
                <section className="">
                    <div className=" ">
                        <div className="p-5 text-center text-2xl font-bold text-gray-800 mx-2 mb-3 uppercase md:text-2xl sm:text-xl ">
                            Languages & Technologies
                        </div>
                        <div className="flex flex-wrap mx-4 mb-6 justify-evenly text-center">
                            {this.addSkills()}
                        </div>
                    </div>


                </section>

            </React.Fragment>






        )
    }
}





















