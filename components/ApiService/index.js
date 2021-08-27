import { database } from "../../Setup";

export const submitComment = (Name, comment, Id, hostName) => {
    return new Promise(function (resolve, reject) {

        let key;
        if (Id != null) {
            key = Id;
        } else {
            key = database()
                .ref()
                .push().key
        }

        const values = {
            Id: key,
            Name: Name,
            comment: comment,
        }

        console.log(hostName,"function call")

        database()
            .ref('user/' + key)
            .update(values)
            .then((snapshort) => {
                resolve(snapshort)
                console.log(snapshort, "snapshort")
            }).catch((error) => {
                reject(error)
                console.log(error, "error")
            })
    })
}

export const deleteComments = () => {
    return new Promise(function (resolve, reject) {

        database().ref('/user').remove();

    })
}