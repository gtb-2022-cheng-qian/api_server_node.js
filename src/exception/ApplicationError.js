export class NotFoundError extends Error {
    constructor(message, statusMessage) {
        super(message)
        this.name = 'NotFoundError'
        this.statusMessage = statusMessage
    }
}

export class BadRequestError extends Error {
    constructor(message) {
        super(message)
        this.name = 'BadRequestError'
    }
}

export class ConflictError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ConflictError'
    }
}

export class DatabaseError extends Error {
    constructor(message) {
        super(message)
        this.name = 'DatabaseError'
    }
}