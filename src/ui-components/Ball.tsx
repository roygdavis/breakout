import * as React from 'react';

export interface BallProps {
    xPos: number;
    yPos: number;
    ballGoingUp: boolean
    ballGoingLeft: boolean;
    speed: number;
    paddleXPos: number;
    ballLostEvent: any,
    id: number;
}

export interface BallState {
    xPos: number;
    yPos: number;
    ballGoingUp: boolean
    ballGoingLeft: boolean;
    speed: number;
    paddleXPos: number;
}

class Ball extends React.Component<BallProps, BallState> {
    timer: NodeJS.Timeout;

    constructor(props: BallProps) {
        super(props);
        this.state = { ...this.props };
        this.timer = setInterval(() => this.moveBall(), this.state.speed);
    }

    moveBall = () => {
        let { xPos, yPos, ballGoingUp, ballGoingLeft, paddleXPos } = this.state;
        // set this ball position
        if (xPos > 1000) ballGoingLeft = true;
        if (xPos < 0) ballGoingLeft = false;
        if (yPos < 0) ballGoingUp = false;
        if (yPos > 480) {
            if (xPos > (paddleXPos - 50)
                && xPos < (paddleXPos + 50)) {
                ballGoingUp = true;
            }
            else {
                this.props.ballLostEvent(this);
            }
        }
        // move
        yPos += ballGoingUp ? -10 : 10;
        xPos += ballGoingLeft ? -10 : 10;

        this.setState({ xPos, yPos, ballGoingUp, ballGoingLeft, paddleXPos });
    }

    render() {
        const { xPos, yPos } = this.state;
        return <circle
            cx={xPos}
            cy={yPos}
            r="10"
            fill="rgb(127,127,127)"></circle>
    }
}

export default Ball;