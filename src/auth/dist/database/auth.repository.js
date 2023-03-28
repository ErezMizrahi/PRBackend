// export const startTransaction = async (model:any , fn: Function) => {
//         const session = await model.startSession();
//         session.startTransaction();
//         try {
//             await fn();
//             session.commitTransaction();
//         } catch (err) {
//             console.error(err);
//             session.abortTransaction();
//         }
// }
export const startTransaction = (model, fn) => function asyncUtilWrap(...args) {
    const fnReturn = async () => {
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
    return Promise.resolve(fnReturn).catch(e => console.error(e));
};
//# sourceMappingURL=auth.repository.js.map