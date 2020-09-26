class DrivingRecordSmartContract {

    apply(transaction, blocks){

        // go throw all blocks
        blocks.forEach(block => {
            block.transactions.forEach(trans => {
                if(transaction.driverLicenseNumber == trans.driverLicenseNumber){
                    transaction.noOfViolations += 1

                    if(transaction.noOfViolations > 5) {
                        transaction.isDriverLicenseSuspended = true
                    }
                }
            })
        });
    }
}

module.exports = DrivingRecordSmartContract