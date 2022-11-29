import React from 'react'

const GenderView = ({ gender }) => {

    const switchGender = gender => {

        var gender_text = ''

        switch (gender) {
            case 1:
                gender_text = 'Male'
                break
            case 2:
                gender_text = 'Female'
                break
            case 3:
                gender_text = 'Unknown'
                break
            default:
                gender_text = 'Not update'
        }
        return gender_text
    }

    return (
        <span>Gender: {switchGender(gender)}</span>
    )
}

export default GenderView