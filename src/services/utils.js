const validateErr = (schema) => (value) => {
    const { error } = schema.validate(value);

if (error) {
    const [status, message] = error.message.split('|');
    return [status, message];
}
};

module.exports = validateErr;