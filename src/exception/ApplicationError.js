export class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'BadRequestError'
  }
}

export class DatabaseError extends Error {
  constructor(message) {
    super(message)
    this.name = 'DatabaseError'
  }
}