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

        database()
            .ref('user/'+key)
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

export const commentRender = () => {
    return new Promise(function (resolve, reject) {
        database()
            .ref('/user')
            .on('child_added', snapshot => {
                // console.log('A new node has been added', snapshot.val());
            })

        return () => database().ref('/users').off('child_added', onChildAdd);
    })
}