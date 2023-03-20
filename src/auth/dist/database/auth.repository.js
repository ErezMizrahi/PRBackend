export const startTransaction = async (model, fn) => {
    const session = await model.startSession();
    session.startTransaction();
    try {
        await fn();
        session.commitTransaction();
    }
    catch (err) {
        console.error(err);
        session.abortTransaction();
    }
};
//# sourceMappingURL=auth.repository.js.map