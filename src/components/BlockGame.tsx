'use client';

import { useState, useEffect, useCallback } from 'react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 20;

type Block = {
    x: number;
    y: number;
    color: string;
};

type GameState = {
    board: (string | null)[][];
    currentBlock: Block[];
    score: number;
    gameOver: boolean;
    isPlaying: boolean;
};

const BLOCK_SHAPES = [
    // I shape
    [
        { x: 0, y: 0, color: '#442d15' },
        { x: 1, y: 0, color: '#442d15' },
        { x: 2, y: 0, color: '#442d15' },
        { x: 3, y: 0, color: '#442d15' }
    ],
    // O shape
    [
        { x: 0, y: 0, color: '#8B4513' },
        { x: 1, y: 0, color: '#8B4513' },
        { x: 0, y: 1, color: '#8B4513' },
        { x: 1, y: 1, color: '#8B4513' }
    ],
    // T shape
    [
        { x: 1, y: 0, color: '#A0522D' },
        { x: 0, y: 1, color: '#A0522D' },
        { x: 1, y: 1, color: '#A0522D' },
        { x: 2, y: 1, color: '#A0522D' }
    ],
    // L shape
    [
        { x: 0, y: 0, color: '#D2691E' },
        { x: 0, y: 1, color: '#D2691E' },
        { x: 0, y: 2, color: '#D2691E' },
        { x: 1, y: 2, color: '#D2691E' }
    ]
];

const BlockGame = () => {
    const [gameState, setGameState] = useState<GameState>({
        board: Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)),
        currentBlock: [],
        score: 0,
        gameOver: false,
        isPlaying: false
    });

    const generateNewBlock = useCallback((): Block[] => {
        const shape = BLOCK_SHAPES[Math.floor(Math.random() * BLOCK_SHAPES.length)];
        return shape.map(block => ({
            ...block,
            x: block.x + Math.floor(BOARD_WIDTH / 2) - 1
        }));
    }, []);

    const isValidPosition = useCallback((block: Block[], board: (string | null)[][]) => {
        return block.every(cell =>
            cell.x >= 0 &&
            cell.x < BOARD_WIDTH &&
            cell.y < BOARD_HEIGHT &&
            (cell.y < 0 || board[cell.y][cell.x] === null)
        );
    }, []);

    const placeBlock = useCallback((block: Block[], board: (string | null)[][]) => {
        const newBoard = board.map(row => [...row]);
        block.forEach(cell => {
            if (cell.y >= 0) {
                newBoard[cell.y][cell.x] = cell.color;
            }
        });
        return newBoard;
    }, []);

    const clearLines = useCallback((board: (string | null)[][]) => {
        const newBoard = board.filter(row => row.some(cell => cell === null));
        const linesCleared = BOARD_HEIGHT - newBoard.length;
        const emptyLines = Array(linesCleared).fill(null).map(() => Array(BOARD_WIDTH).fill(null));
        return { board: [...emptyLines, ...newBoard], linesCleared };
    }, []);

    const moveBlock = useCallback((dx: number, dy: number) => {
        setGameState(prev => {
            if (prev.gameOver || !prev.isPlaying) return prev;

            const newBlock = prev.currentBlock.map(cell => ({
                ...cell,
                x: cell.x + dx,
                y: cell.y + dy
            }));

            if (isValidPosition(newBlock, prev.board)) {
                return { ...prev, currentBlock: newBlock };
            } else if (dy > 0) {
                // Block can't move down, place it
                const newBoard = placeBlock(prev.currentBlock, prev.board);
                const { board: clearedBoard, linesCleared } = clearLines(newBoard);
                const newScore = prev.score + linesCleared * 100;

                if (prev.currentBlock.some(cell => cell.y < 0)) {
                    // Game over
                    return { ...prev, gameOver: true, isPlaying: false };
                }

                return {
                    ...prev,
                    board: clearedBoard,
                    currentBlock: generateNewBlock(),
                    score: newScore
                };
            }

            return prev;
        });
    }, [isValidPosition, placeBlock, clearLines, generateNewBlock]);

    const rotateBlock = useCallback(() => {
        setGameState(prev => {
            if (prev.gameOver || !prev.isPlaying || prev.currentBlock.length === 0) return prev;

            const centerX = Math.round(prev.currentBlock.reduce((sum, cell) => sum + cell.x, 0) / prev.currentBlock.length);
            const centerY = Math.round(prev.currentBlock.reduce((sum, cell) => sum + cell.y, 0) / prev.currentBlock.length);

            const rotatedBlock = prev.currentBlock.map(cell => {
                const relativeX = cell.x - centerX;
                const relativeY = cell.y - centerY;
                return {
                    ...cell,
                    x: centerX - relativeY,
                    y: centerY + relativeX
                };
            });

            if (isValidPosition(rotatedBlock, prev.board)) {
                return { ...prev, currentBlock: rotatedBlock };
            }

            return prev;
        });
    }, [isValidPosition]);

    const startGame = () => {
        setGameState({
            board: Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)),
            currentBlock: generateNewBlock(),
            score: 0,
            gameOver: false,
            isPlaying: true
        });
    };

    const resetGame = () => {
        setGameState({
            board: Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)),
            currentBlock: [],
            score: 0,
            gameOver: false,
            isPlaying: false
        });
    };

    // Game loop
    useEffect(() => {
        if (!gameState.isPlaying || gameState.gameOver) return;

        const interval = setInterval(() => {
            moveBlock(0, 1);
        }, 500);

        return () => clearInterval(interval);
    }, [gameState.isPlaying, gameState.gameOver, moveBlock]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!gameState.isPlaying || gameState.gameOver) return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    moveBlock(-1, 0);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    moveBlock(1, 0);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    moveBlock(0, 1);
                    break;
                case 'ArrowUp':
                case ' ':
                    e.preventDefault();
                    rotateBlock();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameState.isPlaying, gameState.gameOver, moveBlock, rotateBlock]);

    const renderBoard = () => {
        const displayBoard = gameState.board.map(row => [...row]);

        // Add current block to display
        gameState.currentBlock.forEach(cell => {
            if (cell.y >= 0 && cell.y < BOARD_HEIGHT && cell.x >= 0 && cell.x < BOARD_WIDTH) {
                displayBoard[cell.y][cell.x] = cell.color;
            }
        });

        return displayBoard.map((row, y) =>
            row.map((cell, x) => (
                <div
                    key={`${y}-${x}`}
                    className="border border-[#442d15]/20"
                    style={{
                        width: BLOCK_SIZE,
                        height: BLOCK_SIZE,
                        backgroundColor: cell || 'transparent'
                    }}
                />
            ))
        );
    };

    return (
        <div className="flex flex-col items-center space-y-6">
            <div className="text-center">
                {/* <h2 className="text-2xl font-bold mb-2">Block Stacker</h2> */}
                <p className="text-sm opacity-70 mb-4">
                    Use arrow keys to move, ↑ or space to rotate
                </p>
                <div className="text-lg font-bold">Score: {gameState.score}</div>
            </div>

            <div className="relative">
                <div
                    className="grid border-2 border-[#442d15]"
                    style={{
                        gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${BLOCK_SIZE}px)`,
                        gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${BLOCK_SIZE}px)`
                    }}
                >
                    {renderBoard()}
                </div>

                {gameState.gameOver && (
                    <div className="absolute inset-0 bg-[#442d15]/80 flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="text-xl font-bold mb-2">Game Over!</div>
                            <div className="text-sm">Final Score: {gameState.score}</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex space-x-4">
                {!gameState.isPlaying && !gameState.gameOver && (
                    <button
                        onClick={startGame}
                        className="px-4 py-2 bg-[#442d15] text-[#e4c8b7] rounded hover:opacity-80 transition-opacity"
                    >
                        Start Game
                    </button>
                )}

                {(gameState.gameOver || gameState.isPlaying) && (
                    <button
                        onClick={resetGame}
                        className="px-4 py-2 bg-[#442d15] text-[#e4c8b7] rounded hover:opacity-80 transition-opacity"
                    >
                        Reset
                    </button>
                )}
            </div>
        </div>
    );
};

export default BlockGame;
