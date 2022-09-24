import { createContext, useEffect, useReducer } from 'react';
import type { FC, ReactNode } from 'react';
import type { DataProvider, ReactAdminerConfig, Renders } from '../types';

interface AppState {
	config?: ReactAdminerConfig;
	setConfig: (c: ReactAdminerConfig) => void;
}

export interface ReactAdminerContextValue {
	renders?: Renders;
	config?: ReactAdminerConfig;
	setConfig: (c: ReactAdminerConfig) => void;
	dataProvider?: DataProvider;
	paths?: {
		editFormPath?: string;
		listPath?: string;
	};
	router?: {
		functions: Record<string, any>;
		components: Record<string, any>;
	};
}

interface UserProviderProps {
	children: ReactNode;
	renders?: Renders;
	config?: ReactAdminerConfig;
	dataProvider?: DataProvider;
	paths?: {
		editFormPath?: string;
		listPath?: string;
	};
	router?: {
		functions: Record<string, any>;
		components: Record<string, any>;
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

export const ReactAdminerProvider: FC<UserProviderProps> = ({
	router,
	paths,
	children,
	config,
	renders,
	dataProvider,
}) => {
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
				router,
			}}
		>
			{children}
		</ReactAdminerContext.Provider>
	);
};
