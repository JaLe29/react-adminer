import { createContext, useEffect, useReducer } from 'react';
import type { FC, ReactNode } from 'react';
import type { Schema } from '../types';
import type { CountOptions, SelectOptions } from '../types/data-provider';
import type { Renders } from '../types/renders';

interface ReactAdminerConfig {
	schema: Schema;
}

interface AppState {
	config?: ReactAdminerConfig;
	setConfig: (c: ReactAdminerConfig) => void;
}

export interface ReactAdminerContextValue {
	renders?: Renders;
	config?: ReactAdminerConfig;
	setConfig: (c: ReactAdminerConfig) => void;
	dataProvider?: {
		select: <T>(entityName: string, options?: SelectOptions) => Promise<T[]>;
		count: (entityName: string, options?: CountOptions) => Promise<number>;
	};
	paths?: {
		editFormPath: string;
	};
}

interface UserProviderProps {
	children: ReactNode;
	renders?: Renders;
	config?: ReactAdminerConfig;
	dataProvider?: {
		select: <T>(entityName: string, options?: SelectOptions) => Promise<T[]>;
		count: (entityName: string, options?: CountOptions) => Promise<number>;
	};
	paths?: {
		editFormPath: string;
	};
}

type SetConfigAction = {
	type: 'SET_CONFIG';
	payload: {
		config?: ReactAdminerConfig;
	};
};

type Action = SetConfigAction;

const initialAppState: AppState = {
	config: undefined,
	setConfig: (): void => {
		/* */
	},
};

const reducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case 'SET_CONFIG': {
			const {
				payload: { config },
			} = action;
			return {
				...state,
				config,
			};
		}
		default: {
			return { ...state };
		}
	}
};

export const ReactAdminerContext = createContext<ReactAdminerContextValue>({
	...initialAppState,
});

export const ReactAdminerProvider: FC<UserProviderProps> = ({ paths, children, config, renders, dataProvider }) => {
	const [state, dispatch] = useReducer(reducer, initialAppState);

	useEffect(() => {
		dispatch({
			type: 'SET_CONFIG',
			payload: { config },
		});
	}, [JSON.stringify(config)]);

	return (
		<ReactAdminerContext.Provider
			value={{
				...state,
				dataProvider,
				renders,
				paths,
			}}
		>
			{children}
		</ReactAdminerContext.Provider>
	);
};
