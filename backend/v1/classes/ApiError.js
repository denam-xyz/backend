module.exports = ApiError;

function ApiError(ApiErrorcode, message) {
	this.ApiErrorcode = ApiErrorcode;
	this.message = message;
};