export class ClientError extends Error {
	status;
	detail;
	requestId;
	type: string | undefined = undefined;

	constructor(
		error: { requestId: string; message: string; detail: string; status: number; type?: string },
		options: ErrorOptions | undefined = undefined
	) {
		const { message, detail, status, requestId, type } = error;

		super(message, options);

		this.requestId = requestId;
		this.detail = detail;
		this.status = status;
		this.type = type;
	}
}
