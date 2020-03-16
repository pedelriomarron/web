import * as React from 'react';
import { correctTitle } from '../../../utils'
import { getLanguages } from '../../../services/RepoService';



interface IProps {
    homepage: string;
    url: string;
    name: string
    description: string;
    full_name: string;
    html_url: string
}

interface IState {
    languages: Array<string>;
    img: string;
    correct: boolean
}


export class Repo extends React.PureComponent<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = { correct: false, languages: [], img: `https://raw.githubusercontent.com/${this.props.full_name}/master/config/preview.png` }

        const getLenguagesFunc = async () => {
            let ln = await getLanguages(`https://api.github.com/repos/${this.props.full_name}/languages`, {})
            this.setState({ languages: Object.keys(ln) })
            return ln
        }
        getLenguagesFunc()

    }

    async checkCorrect() {

        let res = await fetch(this.state.img)
            .then(response => {
                if (response.ok)
                    return true
                else
                    return false
            })

        this.setState({ ...this.state, correct: res })
    }


    addLanguage() {

        if (this.state.languages) {
            let dom: any = []
            this.state.languages.map((item: any, i: any) => {
                return dom.push(<span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{item}</span>)
            })
            return dom

        }
    }



    async componentDidMount() {
        await this.checkCorrect()
    }

    render() {

        return (

            <React.Fragment>
                {
                    this.state.correct
                        ?
                        <div className={this.props.children + "w-full md:w-full lg:w-2/4 xl:w-1/4 p-2   md:flex justify-center bord box-border p-5  transition  ease-in-out duration-500  transform hover:-translate-y-3 hover:scale-110 "}>
                            <div className="rounded shadow-lg  bg-white  ">
                                <img className="w-full   object-scale-down h-32  w-full" src={this.state.img} alt="" />
                                <div className="px-6 py-4">

                                    <div className="text-xl font-semibold text-gray-700">
                                        <div className="capitalize" >{correctTitle(this.props.name)}</div>
                                    </div>
                                    <p className="text-gray-500 block text-base">
                                        {this.props.description !== null
                                            ? this.props.description.substr(0, 80)
                                            : "..."
                                        }
                                        ...
                            </p>
                                </div>
                                <div className="px-6 py-4 fa-2x text-blue-900">
                                    <a className="cursor-pointer" rel="noopener noreferrer" target="_blank" href={this.props.homepage} ><i className="p-2 fas fa-eye"></i></a>
                                    <a className="cursor-pointer" rel="noopener noreferrer" target="_blank" href={this.props.html_url}><i className="p-2 fab fa-github-square"></i></a>
                                </div>
                                <div className="px-6 py-4">
                                    {this.addLanguage()}
                                </div>
                            </div>
                        </div>
                        : ""
                }

            </React.Fragment>
        )
    }
}


