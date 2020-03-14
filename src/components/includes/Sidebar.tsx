import * as React from 'react';
import { NavLink } from 'react-router-dom';

export class Sidebar extends React.Component<{}, {}> {

  createNav = () => {


    const items: itemNav[] = [
      { text: "Home", url: "/", fa_icon: "fab fa-houzz", color: "red-700" },
      { text: "Portfolio", url: "/portfolio", fa_icon: "fas fa-briefcase", color: "pink-500" },
      { text: "Resume", url: "/resume", fa_icon: "fab fa-black-tie", color: "purple-200" },
      { text: "Skills", url: "/skills", fa_icon: "fas fa-cogs", color: "blue-200" },
      { text: "AboutMe", url: "/about", fa_icon: "fas fa-address-card", color: "green-200" },
      { text: "Contact", url: "/contact", fa_icon: "fas fa-envelope-open", color: "orange-300" },
    ]

    let nav: any = []
    items.map((item, i) => {
      return nav.push(
        <li key={i} className="p-1 mr-3 flex-1 pr-2">
          <NavLink exact activeClassName={`border-${item.color} text-${item.color} hover:text-${item.color} spanWhite `} to={item.url}
            className={`block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-${item.color}`}>
            <i className={item.fa_icon + " pr-0 md:pr-3 "}></i>
            <span
              className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">{item.text}</span>
          </NavLink>
        </li >)
    })
    return nav
  }



  render() {



    return (

      <div className="bg-gray-900 shadow-lg h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48">
        <div
          className="md:mt-5 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-evenly">
          <ul className="  list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left overflow-y-auto  ">
            {this.createNav()}
          </ul>
        </div>


      </div>
    )
  }
}



interface itemNav {
  text: string,
  url: string,
  fa_icon: string,
  color: string
}


/*

<div className="bg-gray-900 shadow-lg h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48">
<div
  className="md:mt-5 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
  <ul className="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
    <li className="mr-3 flex-1">
      <a href="#"
        className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
        <i className="fas fa-tasks pr-0 md:pr-3"></i><span
          className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Tasks</span>
      </a>
    </li>
    <li className="mr-3 flex-1">
      <a href="#"
        className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500">
        <i className="fa fa-envelope pr-0 md:pr-3"></i><span
          className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Messages</span>
      </a>
    </li>
    <li className="mr-3 flex-1">
      <a href="#"
        className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-blue-600">
        <i className="fas fa-chart-area pr-0 md:pr-3 text-blue-600"></i><span
          className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Analytics</span>
      </a>
    </li>
    <li className="mr-3 flex-1">
      <a href="#"
        className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500">
        <i className="fa fa-wallet pr-0 md:pr-3"></i><span
          className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Payments</span>
      </a>
    </li>
  </ul>
</div>


</div>


*/