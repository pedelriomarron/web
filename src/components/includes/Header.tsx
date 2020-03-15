import * as React from 'react';
import { Text } from '../../containers/Language'

interface IProps {
    title: string
    subtitle: string
    classColor: string
}

interface IState {
}


export default class Header extends React.PureComponent<IProps, IState> {





    render() {


        return (
            <div className={this.props.classColor + "  p-2 shadow text-xl text-white  mb-10 "}>
                <section className="font-sans container m-auto flex flex-col py-8 max-w-xl text-center px-6">
                    <header className="">
                        <div className="text-3xl font-bold text-gray-800 mx-2 mb-3 uppercase md:text-5xl sm:text-2xl ">
                            <Text tid={this.props.title} />
                        </div>
                        <p className="text-lg mb-3 text-gray-700 mx-2">
                            <Text tid={this.props.subtitle} />
                        </p>
                    </header>
                </section>
            </div>
        )
    }
}