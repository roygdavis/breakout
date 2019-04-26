import * as React from 'react';
import Paddle from './Paddle';
import Ball, { BallProps } from './Ball';
import Brick, { BrickProps } from './Brick';

export interface CanvasProps {
}

export interface CanvasState {
    paddleXPos: number,
    balls: Array<BallProps>,
    bricks: Array<BrickProps>,
    gameOver: boolean,
    intervalId: any
}

class Canvas extends React.Component<CanvasProps, CanvasState> {
    initialPaddleXPos = 500;
    numberOfBalls = 10;
    paddleWidth = 150;
    paddleHeight = 20;
    brickPower = 1; // alpha

    constructor(props: CanvasProps) {
        super(props);
        const bricks = this.generateBricks();
        const balls = this.generateBalls(bricks);
        this.state = {
            paddleXPos: this.initialPaddleXPos,
            balls: balls,
            gameOver: false,
            intervalId: null,
            bricks: bricks
        };
    }

    componentDidMount() {
        window.onkeydown = this.handleKeyDown;
        window.onmousemove = this.handleMouseMove;
    }

    generateBalls = (bricks: Array<BrickProps>) => {
        let balls = new Array<BallProps>();
        for (let index = 0; index < this.numberOfBalls; index++) {
            balls.push({
                xPos: Math.floor(Math.random() * 1000),
                yPos: 100,
                ballGoingUp: Math.round(Math.random()) === 1,
                ballGoingLeft: Math.round(Math.random()) === 1,
                speed: Math.random() * 100,
                paddleXPos: this.initialPaddleXPos,
                ballLostEvent: this.handleDroppedBall,
                id: index,
                bricks: bricks,
                brickHit: this.handleBrickHit,
                paddleHeight: this.paddleHeight,
                paddleWidth: this.paddleWidth
            });
        }
        return balls;
    }

    generateBricks = () => {
        let bricks = new Array<BrickProps>();
        let id = 0;
        for (let y = 0; y < 100; y += 20) {
            for (let x = 0; x < 1000; x += 100) {
                bricks.push({
                    xPos: x,
                    yPos: y,
                    power: this.brickPower,
                    id: id
                });
                id++;
            }
        }
        return bricks;
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

    handleMouseMove = (ev: MouseEvent) => {
        //console.log(ev.clientX);
        let { paddleXPos } = this.state;
        paddleXPos = ev.clientX;
        this.setState({ paddleXPos });
    }

    handleDroppedBall = (ball: Ball) => {
        //console.log("lost a ball");
        const { balls } = this.state;
        this.setState({ balls: balls.filter(f => f.id !== ball.props.id) });
    }

    handleBrickHit = (brick: BrickProps) => {
        //console.log(brick);
        const { bricks } = this.state;
        const b = bricks.find(b => b.id === brick.id);
        b!.power -= 0.2;
        if (b!.power < 0) b!.power = 0;
        this.setState({ bricks });
    }

    gameOver = () => {
        const { intervalId } = this.state;
        console.log("Gameover");
        if (intervalId) clearInterval(intervalId);
    }

    render() {
        const { paddleXPos, balls, bricks } = this.state;
        return (
            <svg viewBox="0 0 1000 800" xmlns="http://www.w3.org/2000/svg">
                <Paddle xPos={paddleXPos} width={this.paddleWidth} height={this.paddleHeight}></Paddle>
                {balls.map(b => <Ball key={b.id} {...b} paddleXPos={paddleXPos} bricks={bricks} brickHit={(brick: BrickProps) => this.handleBrickHit(brick)} />)}
                {bricks.map(k => <Brick key={k.id} {...k}></Brick>)}
            </svg>);
    }
}

export default Canvas;