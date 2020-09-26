class Transaction {

    constructor(driverLicenseNumber, violationDate, violiationType){
        this.driverLicenseNumber = driverLicenseNumber
        this.violationDate = violationDate
        this.violiationType = violiationType
        this.noOfViolation = 1
        this.isDriverLicenseSuspended = false
    }
}

module.exports = Transaction