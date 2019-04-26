import * as React from 'react';
import { BrickProps } from './Brick';

export interface BallProps {
    xPos: number;
    yPos: number;
    ballGoingUp: boolean;
    ballGoingLeft: boolean;
    speed: number;
    paddleXPos: number;
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
        let ballLost = false;
        // set this ball position
        if (xPos > 1000) ballGoingLeft = true;
        if (xPos < 0) ballGoingLeft = false;
        if (yPos < 0) ballGoingUp = false;
        if (yPos > 480) {
            ballLost = !this.didBallHitPaddle();
            ballGoingUp = !ballLost;
        }
        if (yPos < 100) {
            const hit = this.brickHitDetection();
            if (hit) ballGoingUp = !ballGoingUp;
        }
        // move
        yPos += ballGoingUp ? -10 : 10;
        xPos += ballGoingLeft ? -10 : 10;

        this.setState({ xPos, yPos, ballGoingUp, ballGoingLeft });

        if (ballLost) this.props.ballLostEvent(this);
    }

    brickHitDetection = () => {
        let { xPos, yPos, ballGoingUp } = this.state;
        for (let index = 0; index < this.props.bricks.length; index++) {
            const element = this.props.bricks[index];
            if ((yPos < element.yPos && yPos > element.yPos - 20) && (xPos > element.xPos && xPos < element.xPos + 100)) {
                this.props.brickHit(element);
                return true;
            }
        }
        return false;
    }

    didBallHitPaddle = () => {
        const { xPos } = this.state;
        const { paddleXPos } = this.props;
        if (xPos > (paddleXPos - 50) && xPos < (paddleXPos + 50)) {
            //console.log(`Collision detection - ID = ${this.props.id}\t Ball X = ${xPos}\t Paddle X = ${paddleXPos}`);
            return true;
        }
        else {
            return false;
        }
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