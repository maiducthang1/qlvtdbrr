import React from "react";
import Lottie from 'react-lottie';
import add from '../../styles/animation/add.json'


class AddAnimation extends React.Component {
    state = { isStopped: true };
    render() {
        const defaultOptions = {
            animationData: add,
        };

        return (
            <div>
                <Lottie
                    options={defaultOptions}
                    height={70}
                    width={70}

                />
            </div >
        );
    }
}
export default AddAnimation