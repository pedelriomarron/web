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
                return dom.push(<span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{item}</span>)
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
                        <div className={this.props.children + " p-3"}>
                            <div className="rounded shadow-lg  bg-gray-200  ">
                                <a className="cursor-pointer" rel="noopener noreferrer" target="_blank" href={this.props.homepage}><img className="w-full  bg-black cursor-pointer" src={this.state.img} alt="" /> </a>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2"> <a className="capitalize" rel="noopener noreferrer" target="_blank" href={this.props.html_url}>{correctTitle(this.props.name)}</a></div>
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
                        : ""
                }

            </React.Fragment>
        )
    }
}


