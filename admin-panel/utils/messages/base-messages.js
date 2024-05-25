const generateNotNullMessage = fieldname => {
    return `${fieldname} cannot be empty.`;
}
const generateAlreadyExistsMessage = fieldname => {
    return `${fieldname} already exists.`;
}

const DATA_ADDED_SUCCESSFULLY = "Data added successfully.";
const DATA_UPDATED_SUCCESSFULLY = "Data updated successfully."
const DATA_DELETED_SUCCESSFULLY = "Data deleted successfully.";
const DATA_DOESNT_EXISTS = "Data doesn't exists.";

module.exports = {
    generateNotNullMessage,
    generateAlreadyExistsMessage,
    DATA_ADDED_SUCCESSFULLY,
    DATA_UPDATED_SUCCESSFULLY,
    DATA_DELETED_SUCCESSFULLY,
    DATA_DOESNT_EXISTS
};