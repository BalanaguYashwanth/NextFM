import React, { useState } from 'react'
import { storage } from '../authentication/authenticate'

export default function uploadfile({file}) {
    const uploadTask = storage.ref('image/' + file.name).put(file)
    uploadTask.on(
        'state changed',
        snapshot => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
        },
        error => { console.log(error) },

        () => {
            storage
                .ref('image')
                .child(file.name)
                .getDownloadURL()
                .then((url) => {
                    localStorage.setItem('url', url);
                }
                )
        }
    )
    if (localStorage.getItem('url')) {
        return localStorage.getItem('url')
    }
}



