import React from 'react'
import ButtonChangeLanguage from '../../common/ButtonChangeLanguage/ButtonChangeLanguage';


// change language click hook
const languages = [
    {
        code: 'en',
        name: 'English',
        country_code: 'en'
    },
    {
        code: 'vn',
        name: 'Vietnamese',
        country_code: 'vn'
    },
    {
        code: 'sp',
        name: 'Spanish',
        country_code: 'sp'
    },
]
export const ButtonChange = () => {

    return (
        <React.Fragment>
            <ButtonChangeLanguage dataLanguages={languages} />
        </React.Fragment>
    );
}
