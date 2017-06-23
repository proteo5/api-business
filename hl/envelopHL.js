class envelop {
    constructor(result, message, data) {
        this.result = result;
        this.message = message;
        this.data = data;
        this.results = { notSet: 'notSet', success: "success", notSuccess: "notSuccess", error: "error" }
    }
    Fill(result, message, data) {
        this.result = result;
        this.message = message;
        this.data = data;
        return this;
    }
}

module.exports = new envelop;