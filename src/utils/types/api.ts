import API_METHODS from "constants/ApiMethods";

export type ServerSettings = {
	next?: NextFetchRequestConfig;
	cache?: RequestCache;
};
export type ServerProps = {
	settings?: ServerSettings | undefined;
	payload?: any;
};

export type ClientSettings = {
	method: string;
	url: string;
	headers: any;
	withCredentials: boolean;
	data?: any;
	params?: any;
};

export type OnSuccessFunction = (a: any) => void;
export type OnFailureFunction = (a: any) => void;

export type ApiConfig = {
	url?: string;
	isFormData?: boolean;
};

export type UpdateStatusPayload = {
	_id: string;
	status: string;
};

export type ApiMethodType = keyof typeof API_METHODS;

type BasicAPIMethodData = {
	method: ApiMethodType;
	onSuccess?: OnSuccessFunction;
};

export type APIMethodData = BasicAPIMethodData & {
	authHeader?: string;
};

export type CMSApiMethodData = BasicAPIMethodData & {
	useBasicCMSOnSuccess?: boolean;
};

export type APIMethodsData = Array<APIMethodData>;

export type APIMethodDefinition = {
	[method in ApiMethodType]: (props?: ApiProps) => Promise<any>;
};

export type ApiHeaders = Record<string, string>;

export type ClientPayload = Record<string, any>;

export type ClientConfig = {
	isFormData?: boolean;
	headers?: Record<string, string>;
	onSuccess?: (data: any) => void;
	onFailure?: (error: any) => void;
};

export type ApiResponse<T = any> = {
	body: T;
	status: "SUCCESS" | "ERROR";
	message: string;
};

export type ExtraApiData = {
	onSuccess?: (data: any) => void;
	onFailure?: (error: any) => void;
};

export type ApiProps = {
	payload?: ClientPayload;
	config?: ClientConfig;
};
