

import * as React from 'react';

interface IProps {

}

interface IState {
}


export default class Loading extends React.PureComponent<IProps, IState> {
    constructor(props: any) {
        super(props)
    }





    render() {


        return (
            <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
                <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{
                    top: "50%"
                }} >
                    <i className="fas fa-circle-notch fa-spin fa-5x"></i>
                </span>
            </div>

        )
    }
}