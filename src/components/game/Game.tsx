/* eslint-disable no-plusplus */
import React, { useReducer } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { GameState, GameActions, Ship } from 'constants/Types';
import { INITIAL_STATE, FIRSTCOLUMNSQUARES, LASTCOLUMNSQUARES } from 'constants/constant';
import Factory from 'containers/Factory/Factory';
import NewGameBoard from 'components/NewGameBoard/NewGameBoard';
import PlayerView from '../playerview/PlayerView';
import ShipFactory from '../shipfactory/ShipFactory';
import Modal from '../UI/Modal/Modal';
import styles from './Game.module.scss';

const gameReducer = (state: GameState, action: GameActions) => {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...INITIAL_STATE, ...action.payload };
    case 'PLAYER_MOVE':
      return { ...state, ...action.payload };
    case 'COMPUTER_MOVE':
      return { ...state, ...action.payload };
    case 'UPDATE_HIT':
      return { ...state, ...action.payload };
    case 'RESET_BOARD':
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};

const Game: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const setShips = (builtShips: any, builtComputerShips: any) => {
    dispatch({
      type: 'SET_BOARD',
      payload: { playerShips: builtShips, computerShips: builtComputerShips },
    });
  };

  const removeComputerMove = (i: number) => {
    const modifiedComputerMoves = state.computerMoves.slice();
    const computerHitIndex = state.computerMoves.findIndex((move: number) => move === i);
    modifiedComputerMoves.splice(computerHitIndex, 1);
    dispatch({ type: 'COMPUTER_MOVE', payload: { computerMoves: modifiedComputerMoves } });
  };

  const getAdjacentHorizontalSquare = (i: number) => {
    if (
      state.computerMoves.includes(state.lastSuccessfulMoves[i] - 1) &&
      !FIRSTCOLUMNSQUARES.includes(state.lastSuccessfulMoves[i])
    ) {
      return state.lastSuccessfulMoves[i] - 1;
    }
    if (
      state.computerMoves.includes(state.lastSuccessfulMoves[i] + 1) &&
      !LASTCOLUMNSQUARES.includes(state.lastSuccessfulMoves[i])
    ) {
      return state.lastSuccessfulMoves[i] + 1;
    }
    return null;
  };

  const getAdjacentVerticalSquare = (i: number) => {
    if (state.computerMoves.includes(state.lastSuccessfulMoves[i] + 10)) {
      return state.lastSuccessfulMoves[i] + 10;
    }
    if (state.computerMoves.includes(state.lastSuccessfulMoves[i] - 10)) {
      return state.lastSuccessfulMoves[i] - 10;
    }
    return null;
  };

  const getAdjacentSquare = () => {
    let square = 0;
    if (state.lastSuccessfulMoves.length >= 2) {
      if (
        state.lastSuccessfulMoves[0] + 1 === state.lastSuccessfulMoves[1] ||
        state.lastSuccessfulMoves[0] - 1 === state.lastSuccessfulMoves[1]
      ) {
        for (let i = state.lastSuccessfulMoves.length - 1; i > -1; i--) {
          square = getAdjacentHorizontalSquare(i);
          if (_.isNumber(square)) {
            return square;
          }
        }
      } else {
        for (let i = state.lastSuccessfulMoves.length - 1; i > -1; i--) {
          square = getAdjacentVerticalSquare(i);
          if (_.isNumber(square)) {
            return square;
          }
        }
      }
    } else {
      for (let i = state.lastSuccessfulMoves.length - 1; i > -1; i--) {
        square = getAdjacentHorizontalSquare(i);
        if (_.isNumber(square)) {
          return square;
        }
        square = getAdjacentVerticalSquare(i);
        if (_.isNumber(square)) {
          return square;
        }
      }
    }
    return null;
  };

  const getComputerMove = () => {
    let nextMove;
    if (state.successfulComputerHit === true) {
      nextMove = getAdjacentSquare();
    }
    if (_.isUndefined(nextMove) || _.isNull(nextMove)) {
      nextMove = _.sample(state.computerMoves);
    }
    removeComputerMove(nextMove);
    return nextMove;
  };

  const setSuccessfulHit = (move: number) => {
    const modifiedSuccessfulMoves = state.lastSuccessfulMoves.slice();
    modifiedSuccessfulMoves.push(move);
    dispatch({
      type: 'UPDATE_HIT',
      payload: { lastSuccesfulMoves: modifiedSuccessfulMoves, successfulComputerHit: true },
    });
  };

  const resetSuccessfulHit = () => {
    dispatch({
      type: 'UPDATE_HIT',
      payload: { lastSuccesfulMoves: [], successfulComputerHit: false },
    });
  };

  const isSunk = (positions: any, isComputer: boolean) => {
    const sunkStatus = positions.every((position: boolean) => position === true);
    if (sunkStatus) {
      toast.info(
        `${isComputer ? 'Allied battleship has been sunk!' : 'Enemy battleship has been sunk!'}`,
        {
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
    }
    if (sunkStatus && isComputer === true) {
      resetSuccessfulHit();
    }
    return sunkStatus;
  };

  const resolveBoardState = (move: number, shipId: number, ships: any, isComputer: boolean) => {
    const shipIndex = ships.findIndex((ship: any) => ship.id === shipId);
    const hitIndex = ships[shipIndex].positions.indexOf(move);
    ships[shipIndex].hits[hitIndex] = true;
    ships[shipIndex].isSunk = isSunk(ships[shipIndex].hits, isComputer);
    return ships;
  };

  const resolveComputerTurn = (move: number) => {
    let modifiedPlayerShips = state.playerShips.slice();
    let foundShip = -1;
    modifiedPlayerShips.forEach((ship) => {
      if (ship.positions.includes(move)) {
        foundShip = ship.id;
      }
    });
    if (foundShip > -1) {
      setSuccessfulHit(move);
      modifiedPlayerShips = resolveBoardState(move, foundShip, modifiedPlayerShips, true);
    }
    return modifiedPlayerShips;
  };

  const resolveGameState = (playerShips: any, computerShips: any) => {
    const playerShipsSunk = _.every(playerShips, (ship) => ship.isSunk === true);
    const computerShipsSunk = _.every(computerShips, (ship) => ship.isSunk === true);
    if (playerShipsSunk) {
      toast.error(`${'You lose!'}`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return true;
    }
    if (computerShipsSunk) {
      toast.success(`${'You win!'}`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return true;
    }
    return false;
  };

  const receivePlayerAttack = (shipId: number, playerMove: number) => {
    let modifiedComputerShips = state.computerShips.slice();
    if (!_.isNull(shipId)) {
      modifiedComputerShips = resolveBoardState(
        playerMove,
        shipId,
        state.computerShips.slice(),
        false
      );
    }

    const computerMove = getComputerMove();
    const modifiedPlayerShips = resolveComputerTurn(computerMove);

    const gameResolved = resolveGameState(modifiedPlayerShips, modifiedComputerShips);

    dispatch({
      type: 'PLAYER_MOVE',
      payload: {
        computerShips: modifiedComputerShips,
        playerMoves: [...state.playerMoves, playerMove],
        gameResolved,
        playerShips: modifiedPlayerShips,
        completedComputerMoves: [...state.completedComputerMoves, computerMove],
      },
    });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_BOARD' });
  };

  return (
    <div className={styles.game_page}>
      <h1 className={styles.game_title}>BATTLESHIP</h1>
      <div className={styles.areaOne}>
        <NewGameBoard />
      </div>
      <div className={styles.areaTwo}>
        <Factory />
      </div>
    </div>
  );
};

export default Game;
