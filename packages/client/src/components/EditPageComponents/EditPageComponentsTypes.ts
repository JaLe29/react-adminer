export interface EditPageComponent {
	value: any;
	onChange: (value: any) => void;
	propertyName: string;
	disabled?: boolean;
}
