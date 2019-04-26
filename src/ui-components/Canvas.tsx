import * as React from 'react';
import Paddle from './Paddle';
import Ball, { BallProps } from './Ball';

export interface CanvasProps {
}

export interface CanvasState {
    paddleXPos: number,
    balls: Array<BallProps>,
    gameOver: boolean,
    intervalId: any
}

class Canvas extends React.Component<CanvasProps, CanvasState> {
    initialPaddleXPos = 500;

    constructor(props: CanvasProps) {
        super(props);
        this.state = {
            paddleXPos: this.initialPaddleXPos,
            balls: this.generateBalls(),
            gameOver: false,
            intervalId: null
        };
    }

    componentDidMount() {
        window.onkeydown = this.handleKeyDown;
    }

    generateBalls = () => {
        let balls = new Array<BallProps>();
        for (let index = 0; index < 10; index++) {
            balls.push({
                xPos: Math.floor(Math.random() * 1000),
                yPos: 100,
                ballGoingUp: Math.round(Math.random()) === 1,
                ballGoingLeft: Math.round(Math.random()) === 1,
                speed: Math.random() * 1000,
                paddleXPos: this.initialPaddleXPos,
                ballLostEvent: this.handleDroppedBall,
                id: index
            });
        }
        return balls;
    }

    handleKeyDown = (ev: KeyboardEvent) => {
        let { paddleXPos } = this.state;
        switch (ev.key) {
            case "ArrowLeft": {
                if (paddleXPos > 0) paddleXPos -= 10;
                break;
            }
            case "ArrowRight": {
                if (paddleXPos < 1000) paddleXPos += 10;
                break;
            }
            default: break;
        }
        this.setState({ paddleXPos });
    }

    handleDroppedBall = (ball: Ball) => {
        console.log("lost a ball");
        const { balls } = this.state;
        this.setState({ balls: balls.filter(f => f.id !== ball.props.id) });
    }

    draw = () => {
        //const { gameOver } = this.state;
        //if (!gameOver) { this.moveBall() } else { this.gameOver(); }

    }



    gameOver = () => {
        const { intervalId } = this.state;
        console.log("Gameover");
        if (intervalId) clearInterval(intervalId);
    }

    render() {
        const { paddleXPos, balls } = this.state;
        return (
            <svg viewBox="0 0 1000 800" xmlns="http://www.w3.org/2000/svg">
                <Paddle xPos={paddleXPos}></Paddle>
                {balls.map(b => <Ball {...b} paddleXPos={paddleXPos} />)}
            </svg>);
    }
}

export default Canvas;