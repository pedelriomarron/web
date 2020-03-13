import * as React from 'react';
import { correctTitle } from '../../../utils'



interface IProps {
    homepage: string;
    img: string;
    url: string;
    name: string
    description: string;
    languages: Array<string>
}

interface IState {
}


export class Repo extends React.PureComponent<IProps, IState> {
    constructor(props: any) {
        super(props)
        // this.state = {}


    }


    addLanguage() {

        if (this.props.languages) {
            let dom: any = []
            this.props.languages.map((item: any, i: any) => {
                dom.push(<span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{item}</span>)
            })
            return dom

        }



    }



    render() {

        return (
            <React.Fragment>
                <div className="p-1 ">
                    <div className="rounded shadow-lg  bg-gray-200  ">
                        <a className="cursor-pointer" target="_blank" href={this.props.homepage}><img className="w-full  bg-black cursor-pointer" src={this.props.img} alt="" /> </a>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2"> <a className="capitalize" target="_blank" href={this.props.url}>{correctTitle(this.props.name)}</a></div>
                            <p className="text-gray-700 text-base">
                                {this.props.description !== null
                                    ? this.props.description.substr(0, 80)
                                    : "..."
                                }
                                ...
                            </p>
                        </div>
                        <div className="px-6 py-4">
                            {this.addLanguage()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


