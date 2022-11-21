import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import dayjs from 'dayjs';

dayjs.extend(localeData);
dayjs.extend(weekday);

export * from './contexts/ReactAdminerContext';
export * from './hooks/useReactAdminerContext';
export * from './components/List';
export * from './components/Edit';
export * from './types/types';

export { default as FavoriteList } from './components/FavoriteList';
export { default as EditButton } from './components/EditButton';
