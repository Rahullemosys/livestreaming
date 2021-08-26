import { database } from "../../Setup";

export const submitComment = (Name, comment, Id) => {
    return new Promise(function (resolve, reject) {

        let key;
        if (Id != null) {
            key = Id;
        } else {
            key = database()
                .ref()
                .push().key
        }

        let values = {
            Id: key,
            Name: Name,
            comment: comment,
        }

        console.log(values, "console form index")

        database()
            .ref('user')
            .push(values)
            .then((snapshort) => {
                resolve(snapshort)
                console.log(snapshort, "snapshort")
            }).catch((error) => {
                reject(error)
                console.log(error, "error")
            })

 

    })
}