import * as React from 'react';
import { BrickProps } from './Brick';

export interface BallProps {
    xPos: number;
    yPos: number;
    ballGoingUp: boolean;
    ballGoingLeft: boolean;
    speed: number;
    paddleXPos: number;
    paddleYPos: number;
    paddleWidth: number;
    paddleHeight: number;
    ballLostEvent: any,
    bricks: Array<BrickProps>,
    brickHit: any,
    id: number;
}

export interface BallState {
    xPos: number;
    yPos: number;
    ballGoingUp: boolean
    ballGoingLeft: boolean;
    speed: number;
}

class Ball extends React.Component<BallProps, BallState> {
    timer: NodeJS.Timeout | undefined;

    constructor(props: BallProps) {
        super(props);
        this.state = { ...this.props };
    }

    componentDidMount() {
        this.timer = setInterval(() => this.moveBall(), this.state.speed);
    }

    componentWillUnmount() {
        if (this.timer) clearInterval(this.timer);
    }

    moveBall = () => {
        let { xPos, yPos, ballGoingUp, ballGoingLeft } = this.state;

        // set this ball position
        if (xPos > 1000) ballGoingLeft = true;
        if (xPos < 0) ballGoingLeft = false;
        if (yPos < 0) ballGoingUp = false;
        if (!ballGoingUp && this.didBallHitPaddle()) ballGoingUp = true;

        if (yPos < 110) {
            const hit = this.brickHitDetection();
            if (hit) ballGoingUp = !ballGoingUp;
        }
        // move
        yPos += ballGoingUp ? -10 : 10;
        xPos += ballGoingLeft ? -10 : 10;

        this.setState({ xPos, yPos, ballGoingUp, ballGoingLeft });

        if (yPos > this.props.paddleYPos) this.props.ballLostEvent(this);
    }

    brickHitDetection = () => {
        let { xPos, yPos } = this.state;
        for (let index = 0; index < this.props.bricks.length; index++) {
            const element = this.props.bricks[index];
            if ((yPos >= element.yPos && yPos <= element.yPos + 20) && (xPos >= element.xPos && xPos <= element.xPos + 100)) {
                this.props.brickHit(element);
                return true;
            }
        }
        return false;
    }

    didBallHitPaddle = () => {
        const { xPos, yPos } = this.state;
        const { paddleXPos, paddleWidth } = this.props;
        if (yPos > this.props.paddleYPos - 20) {
            console.log(yPos);
            if (xPos > paddleXPos && xPos < paddleXPos + paddleWidth) {
                //console.log(`Collision detection - ID = ${this.props.id}\t Ball X = ${xPos}\t Paddle X = ${paddleXPos}`);
                return true;
            }
        }
        return false;
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