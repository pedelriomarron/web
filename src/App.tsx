import React from 'react';
import { Footer } from './components/includes/Footer';
import { About } from './components/pages/About';
import { Resume } from './components/pages/Resume';

import { Sidebar } from './components/includes/Sidebar';
import { Route, Redirect } from 'react-router';
import { Contact } from './components/pages/Contact';
import { Skills } from './components/pages/Skills';
import { Portfolio } from './components/pages/portfolio/Portfolio';
import { HashRouter as Router } from 'react-router-dom';


function App() {
  return (
    <React.Fragment>
      <div className="bg-gray-900 font-sans leading-normal tracking-normal mt-0">
        <div className="flex flex-col md:flex-row">

          <Sidebar></Sidebar>

          <div className="main-content flex-1 bg-gray-100  md:mt-0 pb-0 md:pb-0 flex flex-col ">
            <div className="flex flex-wrap">
              <div className="w-full md:w-full xl:w-full p-0">
                <div>
                  {/*
                  <Route exact path="/" component={Homepage} />
                  <Route path="/homepage" component={Homepage} />

                   */}
                  <Route exact path="/" component={Portfolio} />

                  <Route path="/portfolio" component={Portfolio} />
                  <Route path="/skills" component={Skills} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/resume" component={Resume} />
                  <Route path="/about" component={About} />
                  {/* <Route render={() => (<Redirect to="/homepage" />)} /> */}


                </div>
              </div>
            </div>

            <div className="flex flex-row flex-wrap flex-grow mt-2">

            </div>
            <Footer></Footer>
          </div>
        </div>
      </div>
    </React.Fragment>





  );
}

export default App;
